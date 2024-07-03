"""
Install the Google AI Python SDK

$ pip install google-generativeai

"""

import os

import google.generativeai as genai

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  # safety_settings not implemented currently
)

response = model.generate_content([
  "input: * **Document:** \"The Acme Corporation is pleased to announce a new partnership with GreenTech Solutions to develop a sustainable energy project in California. The project, which is expected to be completed by December 2025 , will have a budget of $10 million. John Smith, CEO of Acme Corporation, will oversee the project.\" * **NER Results:** [{\"text\": \"Acme Corporation\", \"entity_type\": \"Organization\"},{\"text\": \"GreenTech Solutions\", \"entity_type\": \"Organization\"},{\"text\": \"California\", \"entity_type\": \"Location\"},{\"text\": \"December 2025\", \"entity_type\": \"Date\"},{\"text\": \"$10 million\", \"entity_type\": \"Money\"},{\"text\": \"John Smith\", \"entity_type\": \"Person\"},]",

  "output: Acme Corporation (Organization) is partnering with GreenTech Solutions (Organization) on a sustainable energy project in California (Location). The project is expected to be finished by December 2025 (Date) with a budget of $10 million (Money). John Smith (Person), CEO of Acme Corporation, will lead the project.",

  "input: * **Document:** \"Amazon is pleased to announce a new partnership with Google to develop a sustainable energy project in California. The project, which is expected to be completed by December 2025 , will have a budget of $10 million. John Smith, CEO of Acme Corporation, will oversee the project.\"* **NER Results:** [{\"text\": \"Amazon\", \"entity_type\": \"Organization\"},{\"text\": \"Google\", \"entity_type\": \"Organization\"},{\"text\": \"California\", \"entity_type\": \"Location\"},{\"text\": \"December 2025\", \"entity_type\": \"Date\"},{\"text\": \"$10 million\", \"entity_type\": \"Money\"}, {\"text\": \"John Smith\", \"entity_type\": \"Person\"},]",

  "output: ",
])

print(response.text)