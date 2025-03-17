from flask import Flask, request, jsonify
import asyncio
from backend import AIMODEL, search_urls, create_crawler
import json
import base64
from flask_cors import CORS
from flask import json
import os
import requests
from dotenv import load_dotenv
import re
# Add these imports at the top
import tempfile
import subprocess
import os
from pydub import AudioSegment
import speech_recognition as sr

app = Flask(__name__)

# Update CORS configuration to allow all origins including Vite's development server
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:3000", "http://localhost:3000", 
                                         "http://127.0.0.1:5500", "http://localhost:5500",
                                         "http://127.0.0.1:5173", "http://localhost:5173"]}},
     supports_credentials=False)

# Load environment variables
load_dotenv()

model = AIMODEL()

def clean_response(raw_response):
    try:
        # If raw_response is already a dictionary, return it
        if isinstance(raw_response, dict):
            if 'bool' in raw_response:
                raw_response['bool'] = True if raw_response['bool'] == 'true' else False if raw_response['bool'] == 'false' else raw_response['bool']
            return raw_response
            
        # Try to find JSON in the response
        json_start = raw_response.find("{")
        json_end = raw_response.rfind("}") + 1
        
        if json_start >= 0 and json_end > json_start:
            clean_json = raw_response[json_start:json_end]
            data = json.loads(clean_json)
            if 'bool' in data:
                data['bool'] = True if data['bool'] == 'true' else False if data['bool'] == 'false' else data['bool']
            return data
        
        # If no valid JSON found, create a default response
        return {
            "title": "Analysis Result",
            "bool": None,
            "t_score": 0.5,
            "concl": raw_response,
            "source": []
        }
    except Exception as e:
        print(f"Error cleaning response: {str(e)}")
        return {
            "title": "Error in Analysis",
            "bool": None,
            "t_score": 0.5,
            "concl": "An error occurred while processing the analysis result.",
            "source": []
        }

@app.route("/analyze", methods=["POST"])
def analyze():
    print("GOT THE QUERY\n")
    user_input = request.json.get("query")
    print(user_input)

    if not user_input:
        return jsonify({"error": "No query provided"}), 400

    # Check if the input is a URL
    if any(kwd in user_input for kwd in ["http", "www", "https", "://"]):
        target = asyncio.run(create_crawler(user_input))[user_input]
        print("Target content: ", target)
        query = model.generate_search_queries(user_input)
    else:
        query = user_input
        target = query

    print("Generated Query:", query)
    urls = search_urls(query)  # Perform a search to get relevant URLs

    scraped_content = {}
    for url in urls[:4]:
        content = asyncio.run(create_crawler(url))
        scraped_content.update(content)

    print("DONE SCRAPING\n")
    combined_content = "\n".join(scraped_content.values())  # Combine the scraped content
    combined_content += f"\n\n\nThese are the url's which were used to analyse : {urls}"
    analysis_result_raw = model.analyse_url(query, combined_content, target)
    print("DONE ANALYZING\n")

    analysis_result = clean_response(analysis_result_raw)
    print(analysis_result)

    return jsonify(analysis_result)

@app.route("/analyze-image", methods=["POST", "OPTIONS"])
def analyze_image():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        return "", 200

    print("RECEIVED IMAGE FOR ANALYSIS\n")

    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    image_file = request.files['image']

    # Read the image data
    image_data = image_file.read()

    try:
        # Analyze the image to get a description and search query
        image_analysis = model.analyze_image(image_data)
        print("Image Analysis:", image_analysis)

        # Use the generated search query to find relevant URLs
        search_query = image_analysis["search_query"]
        print("Generated Search Query:", search_query)

        urls = search_urls(search_query)

        # Scrape content from the URLs
        scraped_content = {}
        for url in urls[:4]:
            content = asyncio.run(create_crawler(url))
            scraped_content.update(content)

        print("DONE SCRAPING\n")
        combined_content = "\n".join(scraped_content.values())
        combined_content += f"\n\n\nThese are the url's which were used to analyse : {urls}"

        # Analyze the content
        analysis_result_raw = model.analyse_url(search_query, combined_content, image_analysis["description"])
        print("DONE ANALYZING\n")

        analysis_result = clean_response(analysis_result_raw)
        
        # Add the image analysis to the result
        analysis_result["image_analysis"] = image_analysis["description"]
        
        print(analysis_result)
        return jsonify(analysis_result)
    
    except Exception as e:
        print(f"Error in analyze_image: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/analyze-youtube", methods=["POST", "OPTIONS"])
def analyze_youtube():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        return "", 200
    
    print("RECEIVED YOUTUBE VIDEO FOR ANALYSIS\n")
    
    data = request.json
    video_id = data.get('videoId')
    
    if not video_id:
        return jsonify({"error": "No video ID provided"}), 400
    
    try:
        # Get video details from YouTube API
        youtube_api_key = os.getenv("YOUTUBE_API_KEY")
        if not youtube_api_key:
            return jsonify({"error": "YouTube API key not configured"}), 500
            
        video_url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet&id={video_id}&key={youtube_api_key}"
        response = requests.get(video_url)
        video_data = response.json()
        
        if 'items' not in video_data or len(video_data['items']) == 0:
            return jsonify({"error": "Video not found"}), 404
        
        video_info = video_data['items'][0]['snippet']
        video_title = video_info.get('title', '')
        video_description = video_info.get('description', '')
        
        # Generate search query based on video content
        search_query = model.analyze_video(video_title, video_description)
        print(f"Generated search query: {search_query}")
        
        # Search for relevant URLs
        urls = search_urls(search_query)
        
        if not urls or len(urls) == 0:
            return jsonify({
                "title": video_title,
                "bool": None,
                "t_score": 0.5,
                "concl": "Unable to find relevant information to fact-check this video.",
                "source": [],
                "video_analysis": f"Analysis of YouTube video: {video_title}"
            })
        
        # Scrape content from URLs
        scraped_content = {}
        for url in urls[:4]:  # Limit to first 4 URLs
            try:
                content = asyncio.run(create_crawler(url))
                scraped_content.update(content)
            except Exception as e:
                print(f"Error scraping {url}: {str(e)}")
        
        print("DONE SCRAPING\n")
        
        if not scraped_content:
            return jsonify({
                "title": video_title,
                "bool": None,
                "t_score": 0.5,
                "concl": "Unable to analyze content related to this video.",
                "source": urls[:4],
                "video_analysis": f"Analysis of YouTube video: {video_title}"
            })
        
        combined_content = "\n".join(scraped_content.values())
        combined_content += f"\n\n\nThese are the url's which were used to analyse: {urls[:4]}"
        
        # Analyze the content
        analysis_result_raw = model.analyse_url(search_query, combined_content, video_title)
        print("DONE ANALYZING\n")
        
        analysis_result = clean_response(analysis_result_raw)
        analysis_result['video_analysis'] = f"Analysis of YouTube video: {video_title}"
        
        return jsonify(analysis_result)
    
    except Exception as e:
        print(f"Error in analyze_youtube: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/analyze-video", methods=["POST", "OPTIONS"])
def analyze_video():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        return "", 200

    print("RECEIVED VIDEO FOR ANALYSIS\n")

    if 'video' not in request.files:
        return jsonify({"error": "No video provided"}), 400

    video_file = request.files['video']
    
    # Get the original filename for analysis
    video_filename = video_file.filename
    
    # Create a temporary directory to work with the video
    with tempfile.TemporaryDirectory() as temp_dir:
        # Save the uploaded video to the temporary directory
        video_path = os.path.join(temp_dir, video_filename)
        video_file.save(video_path)
        
        # Extract audio from the video
        audio_path = os.path.join(temp_dir, "audio.wav")
        transcript = ""
        extraction_success = False
        
        try:
            # Try to extract audio using ffmpeg
            print(f"Extracting audio from {video_path}")
            ffmpeg_cmd = f'ffmpeg -i "{video_path}" -vn -acodec pcm_s16le -ar 44100 -ac 2 "{audio_path}" -y'
            subprocess.run(ffmpeg_cmd, shell=True, check=True, stderr=subprocess.PIPE)
            
            # Check if audio file was created and has content
            if os.path.exists(audio_path) and os.path.getsize(audio_path) > 1000:
                extraction_success = True
                print("Audio extraction successful")
                
                # Convert audio to format suitable for speech recognition
                try:
                    # Load the audio file
                    audio = AudioSegment.from_wav(audio_path)
                    
                    # Split audio into smaller chunks for better recognition
                    chunk_length_ms = 60000  # 60 seconds
                    chunks = [audio[i:i+chunk_length_ms] for i in range(0, len(audio), chunk_length_ms)]
                    
                    # Initialize recognizer
                    r = sr.Recognizer()
                    
                    # Process each chunk
                    full_transcript = []
                    for i, chunk in enumerate(chunks):
                        # Export chunk to a temporary file
                        chunk_path = os.path.join(temp_dir, f"chunk_{i}.wav")
                        chunk.export(chunk_path, format="wav")
                        
                        # Recognize speech in the chunk
                        with sr.AudioFile(chunk_path) as source:
                            audio_data = r.record(source)
                            try:
                                text = r.recognize_google(audio_data)
                                full_transcript.append(text)
                                print(f"Transcribed chunk {i+1}/{len(chunks)}")
                            except sr.UnknownValueError:
                                print(f"Could not understand audio in chunk {i+1}")
                            except sr.RequestError as e:
                                print(f"Error with speech recognition service: {e}")
                    
                    # Combine all transcribed chunks
                    transcript = " ".join(full_transcript)
                    print(f"Transcription complete: {len(transcript)} characters")
                    
                except Exception as e:
                    print(f"Error in speech recognition: {str(e)}")
                    transcript = f"Audio extracted but transcription failed: {str(e)}"
            else:
                print("Audio extraction produced no usable audio")
                transcript = "No usable audio found in the video."
                
        except subprocess.CalledProcessError as e:
            print(f"Error extracting audio: {e.stderr.decode() if e.stderr else str(e)}")
            transcript = f"Failed to extract audio from video: {str(e)}"
        except Exception as e:
            print(f"Unexpected error in video processing: {str(e)}")
            transcript = f"Error processing video: {str(e)}"
        
        # Generate search query based on video filename and transcript
        search_query, video_analysis = model.analyze_video(video_filename, transcript=transcript)
        
        # Add transcript to the analysis if available
        if transcript and len(transcript) > 20:
            video_analysis = f"{video_analysis}\n\nTranscript: {transcript}"
        else:
            video_analysis = f"{video_analysis}\n\nAudio extraction {'succeeded' if extraction_success else 'failed'}."
        
        print(f"Generated search query: {search_query}")
        
        # Perform search and scrape content
        urls = search_urls(search_query)
        
        scraped_content = {}
        for url in urls[:4]:
            try:
                content = asyncio.run(create_crawler(url))
                scraped_content.update(content)
            except Exception as e:
                print(f"Error scraping {url}: {str(e)}")
        
        # Combine scraped content
        combined_content = "\n".join(scraped_content.values())
        combined_content += f"\n\n\nThese are the URLs which were used to analyze: {urls}"
        
        # Analyze the content
        analysis_result_raw = model.analyse_url(search_query, combined_content, video_analysis)
        analysis_result = clean_response(analysis_result_raw)
        
        # Add video analysis to the result
        analysis_result["video_analysis"] = video_analysis
        
        return jsonify(analysis_result)

if __name__ == "__main__":
    app.run(debug=True)