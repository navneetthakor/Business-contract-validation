import os
import json
import google.generativeai as genai
import re
import time

class TextComparison:   
        
  def __init__(self, paragraphs_template, paragraphs_contract):
    self.paragraphs_template = paragraphs_template
    self.paragraphs_contract = paragraphs_contract
    self.dict = ()
    self.dev_list = []
    self.model = None
   
    genai.configure(api_key="AIzaSyABsR-Bcf2G2jnuwMIhGB0E2L-AlQkUdVE")

    generation_config = {
      "temperature": 0.85,
      "top_p": 0.9,
      "top_k": 32,
      "max_output_tokens": 1024,
      "response_mime_type": "text/plain",
    }
      
    self.model = genai.GenerativeModel(
      model_name="gemini-1.5-flash",
      generation_config=generation_config,
    )

  def individual_comparator(self, template_text, contract_text):
    combined_input = f"input: \"template text\": \"{template_text}\"\n\n\"contract text\": \"{contract_text}\"\n\nquery: find the difference in contract text in the context of the template text and provide it in brief. If no deviations are found, just print false, nothing else. If deviations are found express it in proper sentence."
    
    try:
      result = self.model.generate_content([combined_input])
    #   time.sleep(1)  # Adding a delay to prevent rate limiting
      return result.text
    except Exception as err:
      print(f"Error occurred while comparing texts: {err}")
      return None

  def find_deviation_words(self, template_text, contract_text):
    combined_input = f"input: \"template text\": \"{template_text}\"\n\n\"contract text\": \"{contract_text}\"\n\nquery: provide the word in contract text which shows the deviation with template text."

    try:
      result = self.model.generate_content([combined_input])
    #   time.sleep(1)  # Adding a delay to prevent rate limiting
      words = re.findall(r'\"(.+?)\"', result.text)
      return words
    except Exception as err:
      print(f"Error occurred while finding deviation words: {err}")
      return []

  def comparator(self):
    dict_heading = []
    dict_text = []

    for heading, paragraph in self.paragraphs_contract.items():
      if heading in self.paragraphs_template:
        deviation_text = self.individual_comparator(self.paragraphs_template[heading], paragraph)
        time.sleep(1)
        if deviation_text:
          dict_heading.append(heading)
          dict_text.append(deviation_text)
          deviation_words = self.find_deviation_words(self.paragraphs_template[heading], paragraph)
          time.sleep(1)
          self.dev_list.extend(deviation_words)
      else:
        print(f"Heading '{heading}' is missing in the provided template or old contract")

    temp_dict = dict(zip(dict_heading, dict_text))
    self.dict = tuple(temp_dict.items())

    return self.dict, self.dev_list
      
  def printComparison(self):
    for key, value in self.dict:
      print(f"Heading: {key}\nDifferences: {value}\n")

    print("Deviation Words List:")
    print(self.dev_list)