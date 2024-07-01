"""
Install the Google AI Python SDK

$ pip install google-generativeai

"""

import os

import google.generativeai as genai



class Summary :
    
  def __init__(self):
    # os.environ["GOOGLE_API_KEY"] = 'AIzaSyD6BBJzZsKNJQaCd7yr6r-IIfpIkKaQ0kg'
    genai.configure(api_key= "AIzaSyD6BBJzZsKNJQaCd7yr6r-IIfpIkKaQ0kg")

    # Create the model
    generation_config = {
      "temperature": 1,
      "top_p": 0.95,
      "top_k": 64,
      "max_output_tokens": 8192,
      "response_mime_type": "text/plain",
    }

    self.model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    # safety_settings not implemented currently
    )

  def getSummary(self, nerText, plainText):
    try:
      response = self.model.generate_content([
        "input: * **Document:** \"The Acme Corporation is pleased to announce a new partnership   with GreenTech Solutions to develop a sustainable energy project in California. The   project, which is expected to be completed by December 2025 , will have a budget of $10   million. John Smith, CEO of Acme Corporation, will oversee the project.\" * **NER   Results:** [{'The Acme Corporation': ['ORG', 0.9999966224034628], 'GreenTech Solutions': ['ORG', 0.9999956488609314], 'California': ['GPE', 0.9999967813491821], 'December 2025': ['DATE', 0.9999942183494568], '$10 million': ['MONEY', 0.9999931653340658], 'John Smith': ['PERSON', 0.9999985098838806], 'Acme Corporation': ['ORG', 0.9999963641166687]}]",

        "output: Acme Corporation (Organization) is partnering with GreenTech Solutions   (Organization) on a sustainable energy project in California (Location). The project is   expected to be finished by December 2025 (Date) with a budget of $10 million (Money).   John Smith (Person), CEO of Acme Corporation, will lead the project.",

        f"input: * **Document:** \"{plainText}\" * **NER Results:** \"{nerText}\"",

        "output: ",
      ])

      print(response.text)
      return response.text
    except Exception as err:
      print(err)
      raise Exception('error occured in summary component')
    
