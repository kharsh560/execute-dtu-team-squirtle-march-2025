import requests
from dotenv import load_dotenv
import os
from crawl4ai import AsyncWebCrawler
import google.generativeai as genai
import base64
load_dotenv()

class AIMODEL:
    def __init__(self):
        self.api_key = os.getenv("GEMINI")
        genai.configure(api_key=self.api_key)
        self.generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 8192,
            "response_mime_type": "text/plain",
        }

        # Use gemini-1.5-flash for both text and image processing
        self.model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config=self.generation_config,
        )
        
        # Use the same model for vision tasks
        self.vision_model = self.model  # Use the same model instance for vision tasks

    def generate_search_queries(self, target):
        chat_session = self.model.start_chat(
            history=[
                {
                    "role": "user",
                    "parts": [
                        "Examine the URL and identify the main topic being discussed. Provide the complete main topic on what is being discussed in the url. I dont want any introductory responses from you",
                    ],
                },
            ]
        )
        response = chat_session.send_message(target)
        return response.text
    
    def analyze_image(self, image_data):
        try:
            # Convert binary image data to base64
            encoded_image = base64.b64encode(image_data).decode('utf-8')
            
            # Create the image part for the model
            image_part = {
                "inline_data": {  # Changed from mime_type/data to inline_data format
                    "mime_type": "image/jpeg",
                    "data": encoded_image
                }
            }
            
            # Create a prompt for the vision model
            prompt = "Analyze this image and describe what you see. Identify the main claim or subject matter that would be important to fact-check."
            
            # Send the image to the model
            response = self.vision_model.generate_content([
                prompt,
                image_part
            ])
            
            # Extract the description
            image_description = response.text
            
            # Generate a search query based on the description
            query_prompt = f"Based on this image description: '{image_description}', generate a concise search query (5-10 words) that would help fact-check the main claim or subject in the image."
            query_response = self.model.generate_content(query_prompt)
            search_query = query_response.text
            
            return {
                "description": image_description,
                "search_query": search_query
            }
        except Exception as e:
            print(f"Error in analyze_image: {str(e)}")
            raise

    def analyse_url(self, topic, content, target_content=None):
        chat_session = self.model.start_chat(
            history=[
                {
                    "role": "user",
                    "parts": [
                        "Evaluate the accuracy of a given title and its associated target_content_to_examine using web-scraped data from multiple sources. Analyze the evidence from these sources to determine if the title and content are accurate, false, or uncertain. If the conclusion is uncertain, provide an estimated likelihood of the title's accuracy. \n\n\nAssign a trust score (between 0 and 1) to the title, reflecting its reliability. Include links supporting the conclusion, along with their respective trust scores. Also, provide an explanation for the trustworthiness assessment as a conclusion, avoiding explicit details about the sources—focus instead on their credibility and relevance. Provide the response in a dictionary format, where it has a key value pair, which contains these (title, bool, t_score, concl, source)",
                    ],
                },
            ]
        )

        response = chat_session.send_message(f"Title: {topic}, Target_Content_to_examine: {target_content}, Source_to_refer: {content}")
        return response.text
    
    def fact_check_image(self, image_analysis, scraped_content):
        try:
            # Create a prompt for fact-checking
            prompt = f"""
            I need to fact-check an image. Here's what the image shows:
            
            {image_analysis['description']}
            
            I've searched for information related to this image and found the following content:
            
            {scraped_content}
            
            Based on this information, please:
            1. Determine if the image contains accurate information or if it's misleading
            2. Provide a trust score between 0 and 1 (where 0 is completely false and 1 is completely true)
            3. Explain your reasoning
            4. List any sources that support your conclusion
            
            Format your response as a JSON object with these fields:
            {{
                "title": "Brief description of the claim in the image",
                "bool": true/false (whether the image is accurate),
                "t_score": 0.0-1.0 (trust score),
                "concl": "Your conclusion and explanation",
                "source": [List of sources with URLs]
            }}
            """
            
            # Send the prompt to the model
            response = self.model.generate_content(prompt)
            
            return response.text
        except Exception as e:
            print(f"Error in fact_check_image: {str(e)}")
            raise

async def create_crawler(url):
    async with AsyncWebCrawler(verbose=True) as crawler:
        result = await crawler.arun(
            url=url,
            word_count_threshold=20,
            excluded_tags=['form', 'nav', 'aside', 'footer', 'header', 'iframe', 'script', 'style'],
            remove_overlay_elements=True,
            exclude_external_links=True,
            exclude_social_media_links=True,
        )

        return {url: result.markdown}

def search_urls(search_query=None):
    api_key = os.getenv('CUSTOM_API')
    search_engine_id = os.getenv("SEARCH_ID")

    base_url = "https://www.googleapis.com/customsearch/v1"

    params = {
        'key': api_key,
        'cx': search_engine_id,
        'q': search_query
    }

    response = requests.get(base_url, params=params)
    url = []
    
    if response.status_code == 200:
        response_json = response.json()
        if 'items' in response_json:
            links = response_json['items']
            for item in links:
                print(item['link'])
                url.append(item['link'])
        else:
            print("No 'items' key in response:", response_json)
    else:
        print("Search request failed:", response.status_code, response.text)

    return url