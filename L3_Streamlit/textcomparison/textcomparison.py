# from textclassifier.textclassifier import TextClassifier
import os
import json
import google.generativeai as genai

class TextComparison:   
        
  def __init__(self , paragraphs_template ,paragraphs_contract):
    # self.pairs = []
    self.paragraphs_template = paragraphs_template
    self.paragraphs_contract = paragraphs_contract
    self.dict = ()
    self.combined_input = ""
    self.model = None
   
    genai.configure(api_key="AIzaSyABsR-Bcf2G2jnuwMIhGB0E2L-AlQkUdVE")

      # Create the model
      # See https://ai.google.dev/api/python/google/generativeai/GenerativeModel
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
        # safety_settings = Adjust safety settings
        # See https://ai.google.dev/gemini-api/docs/safety-settings
    )

    self.combined_input =   """input: \"template text\" : \"This Joint Venture Agreement (\"Agreement\") is entered into on [Date], by and between:Party A: [Name of Party A], a [Type of Entity] organized and existing under the laws of [Country], with its principal place of business at [Address].Party B: [Name of Party B], a [Type of Entity] organized and existing under the laws of [Country], with its principal place of business at [Address].\"\n\n\"contract text\" : \"This Joint Venture Agreement (\"Agreement\") is , made between:Party A: maverricks Industries Inc., a corporation organized and existing under the laws of the State of California, which is located at 123 Main Street, Los Angeles, California.Party B: shallesish Enterprises Ltd., a company under the laws of the United Kingdom\n\"\n\nquery : find the difference in contract text in the context of the template text\nand provide it in brief",
    "output: 1.the date of agreement is not mentioned in contract text\n2.the address of the party b is not  mentioned in contract text",
    "input: \"template text\" : \"Formation of Joint Venture: The Parties hereby agree to form the Joint Venture in accordance with the terms and conditions of this Agreement and applicable laws.Purpose: The purpose of the Joint Venture shall be to develop, market, and sell a new software product.Management: The management of the Joint Venture shall be conducted by a board of directors consisting of three directors, with each Party appointing one director and jointly appointing the third director.Capital Contribution: Each Party shall contribute to the Joint Venture the following capital contribution: ABC Industries Inc. shall contribute $500,000 in cash, and XYZ Enterprises Ltd. shall contribute $300,000 in cash.Distribution of Profits and Losses: Profits and losses of the Joint Venture shall be distributed among the Parties in proportion to their respective ownership interests.Confidentiality: The Parties agree to maintain the confidentiality of all information relating to the Joint Venture and its operations.Term and Termination: The Joint Venture shall commence on the date of this Agreement and shall continue until terminated by mutual agreement of the Parties.Governing Law: This Agreement shall be governed by and construed in accordance with the laws of the State of California.\n\"\n\n\"contract text\" : \"Formation of Joint Venture: The Parties hereby agree to form the Joint Venture in accordance with the terms and conditions of this Agreement and applicable laws.\n\nPurpose: The purpose of the Joint Venture shall be to develop, market, and sell a new software product.\n\nManagement: The management of the Joint Venture shall be conducted by a board of directors consisting of three directors, with each Party appointing one director and jointly appointing the third director.\n\nDistribution of Profits and Losses: Profits and losses of the Joint Venture shall be entitled to mavericks Industries Inc.\n\nConfidentiality: The Parties agree to maintain the confidentiality of all information relating to the Joint Venture and its operations.\n\nTerm and Termination: The Joint Venture shall commence on the date of this Agreement and shall continue until terminated by mutual agreement of the Parties.\n\"\n\nquery : find the difference in contract text in the context of the template text\nand provide it in brief",
    "output: 1. detail on Capital Contribution is missing in the contract text.\n2. Distribution of Profits and Losses is entitled to mavericks which is not accordance with the template text\n3. detail on governing law is missing in the contract text.",
    "input: \"template text\" : \"The term of this Agreement shall commence on the effective date of this Agreement and shall\nterminate on the TERMINATION DATE, during which time the Influencer will create Instagram\ncontent (as described above) for 3 days out of the month of ____________ and one in-feed post\nthat shall not be deleted within one year following its publication. The content shall clearly\nidentify the Brand by stating its name and tagging its official Instagram account. The Influencer\nmay choose which days in ____________ to post the content for Brand’s advertising campaign.\nBeyond the 3 days of stories and the in-feed post, the Influencer is free to publish any additional\ncontent, featuring the Brand and its products – with respect to the Brand’s intellectual property. \n\"\n\n\"contract text\" : \"The term of this Agreement shall commence on the effective date of this Agreement and shall\nterminate on the TERMINATION DATE, during which time the Influencer will create Instagram\ncontent (as described above) for 10 days out of the month of December and one in-feed post\nthat must  be deleted within one year following its publication. The content shall clearly\nidentify the Brand by stating its name and tagging its official Instagram account. The Influencer\nmay choose which days in week to post the content for Brand’s advertising campaign.\nBeyond the 3 days of stories and the in-feed post, the Influencer is free to publish any additional\ncontent, featuring the Brand and its products – with respect to the Brand’s intellectual property. \n\"\n\nquery : find the difference in contract text in the context of the template text\nand provide it in brief",
    "output: 1. contract text it says that  influencer will create reels\n 10 days.\n2. contract text says to delete the reels within one year.,"""
    

  def individual_comparator(self , template_text , contract_text):
    try:
      
      self.combined_input += f"input: \"template text\" : \"{template_text}\"\n\n\"contract text\" : \"{contract_text}\"\n\nquery : find the difference in contract text in the context of the template text\nand provide it in brief"
      
      # Generate content for the last pair using the combined input
      result = self.model.generate_content([self.combined_input])
      
      
      print("dummy comparator method")
      # print(result.text)
      return result.text
    except Exception as err:
      print(f"Error occured while comparing pdf : {err}")

  def comparator(self):
    dict_heading = []
    dict_text = []

    for heading, paragraph in self.paragraphs_contract.items():
       if heading in self.paragraphs_template:
          result = self.individual_comparator(self.paragraphs_template[heading] , paragraph )
          dict_heading.append(heading)
          dict_text.append(result)
       else :
          print("heading is missing \n The heading is not present in the provided template or old contract\n\n")
          

    #directly adding key-pair value to dictinary was not working , so alternative approach of using list then converting it into the dict

    temp_dict = dict(zip(dict_heading, dict_text))
    for key, value in temp_dict.items():
      print(f"Key: {key}, Value: {value}")

    # and the dict was not hashable which was require by the control flow contractvalidatior.py file function , hence changed the dict to tuple which is hashable
    self.dict = tuple(temp_dict.items())

    return self.dict
      

  def printComparison(self):
    print("dummy comparator print method")
    for key, value in self.dict.items():
      print(f"Key: {key}, Value: {value}")

