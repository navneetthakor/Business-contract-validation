from pdfminer.high_level import extract_text
import re
import json
from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextContainer, LTTextLine, LTChar
import os
import Levenshtein
import re


class TextClassifier:
  
  def __init__(self, pdfPath , ContractType , heading):
    self.pdfPath = pdfPath
    self.paragraphs = None
    self.ContractType = ContractType
    self.heading = heading

  def levenshtein_sim(self , head, headings):
    similarity_list = []
    for heading_name in headings:
        heading_name = heading_name.lower()
        compare_string  = head[:len(heading_name)]
        # print(compare_string)
        distance = Levenshtein.distance(compare_string, heading_name)
        max_len = max(len(compare_string), len(heading_name))
        similarity = 1 - (distance / max_len)
        # similarity_list.append(similarity)
        if(similarity > 0.9):
          return len(heading_name)
    return 0
  
  def clean_text(self , text):
    # Convert text to lowercase
    text = text.lower()

    # Remove punctuation except for numbers, percentage sign, and slash in dates
    text = re.sub(r'[^\w\s%\/]', '', text)
    text = re.sub(r'\d+', '', text)

    # Remove extra whitespace
    text = ' '.join(text.split())

    return text
  
  def extract_paragraphs(self,pdf_path, headings):
    paragraphs = {}
    current_heading = None

    for page_layout in extract_pages(pdf_path):
        for element in page_layout:
            if isinstance(element, LTTextContainer):
                for text_line in element:
                    if isinstance(text_line, LTTextLine):
                        line_text = text_line.get_text().strip()                    
                        cleaned_line_text = self.clean_text(line_text)
                        length = self.levenshtein_sim(cleaned_line_text, headings)
                        if(length > 0):
                            bold = any(isinstance(char, LTChar) and 'Bold' in char.fontname for char in text_line)

                            if bold:                                
                                current_heading = line_text[:length]
                                paragraphs[current_heading] = ""

                        if current_heading:
                            paragraphs[current_heading] += line_text + "\n"

    return paragraphs

  def classify(self):
    try:
      self.paragraphs = self.extract_paragraphs(self.pdfPath, self.heading)

      print(self.paragraphs)
        
      print("dummy text classifier method")
      return self.paragraphs
    except Exception as err:
      print(f"Error occured while classifying text : {err}")

  def printClassify(self):
    print("dummy classify print method")
    for heading, paragraph in self.paragraphs.items():
      print(f"{heading}:\n{paragraph}\n\n")
