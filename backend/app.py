from flask import Flask, request, jsonify
import asyncio
from backend import AIMODEL, search_urls, create_crawler
import json
import base64
from flask_cors import CORS
from flask import json
import os
app = Flask(__name__)

# Update CORS configuration to allow all origins including Vite's development server
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:3000", "http://localhost:3000", 
                                         "http://127.0.0.1:5500", "http://localhost:5500",
                                         "http://127.0.0.1:5173", "http://localhost:5173"]}},
     supports_credentials=False)

model = AIMODEL()

def clean_response(raw_response):
    json_start = raw_response.find("{")
    json_end = raw_response.rfind("}") + 1
    clean_json = raw_response[json_start:json_end]
        
    data = json.loads(clean_json)
    if 'bool' in data:
        data['bool'] = True if data['bool'] == 'true' else False if data['bool'] == 'false' else data['bool']
        
    return data
        
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
        
        # Combine the scraped content
        combined_content = "\n".join(scraped_content.values())
        combined_content += f"\n\n\nThese are the url's which were used to analyse: {urls}"
        
        # Fact-check the image using the scraped content
        fact_check_result_raw = model.fact_check_image(image_analysis, combined_content)
        print("DONE FACT-CHECKING\n")
        
        # Clean the response
        fact_check_result = clean_response(fact_check_result_raw)
        print(fact_check_result)
        
        # Add the image analysis to the result
        fact_check_result["image_analysis"] = image_analysis["description"]
        
        return jsonify(fact_check_result)
    except Exception as e:
        print(f"Error during image analysis: {str(e)}")
        return jsonify({"error": f"Error analyzing image: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)

