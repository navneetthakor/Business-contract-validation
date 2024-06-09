"""
dummy file not for standard use
"""

import pathlib
import textwrap

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown




def to_markdown(text):
  """
    Converts a given text to a markdown formatted string by replacing bullet points with markdown bullets.
    
    Args:
    text (str): The input text that needs to be converted to markdown format.
    
    Returns:
    Markdown: A markdown object containing the formatted text.
  """
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))


# configure api_key 
genai.configure(api_key=google_api_key)

# creating model 
model = genai.GenerativeModel('gemini-1.5-pro')

prompt = """
**Input:**

* **Document:** "The Acme Corporation (Organization) is pleased to announce a new partnership with GreenTech Solutions (Organization) to develop a sustainable energy project in California (Location). The project, which is expected to be completed by December 2025 (Date), will have a budget of $10 million (Money). John Smith (Person), CEO of Acme Corporation, will oversee the project."
* **NER Results:** [
    {"text": "Acme Corporation", "entity_type": "Organization"},
    {"text": "GreenTech Solutions", "entity_type": "Organization"},
    {"text": "California", "entity_type": "Location"},
    {"text": "December 2025", "entity_type": "Date"},
    {"text": "$10 million", "entity_type": "Money"},
    {"text": "John Smith", "entity_type": "Person"},
]

**Output:**

Acme Corporation (Organization) is partnering with GreenTech Solutions (Organization) on a sustainable energy project in California (Location). The project is expected to be finished by December 2025 (Date) with a budget of $10 million (Money). John Smith (Person), CEO of Acme Corporation, will lead the project.
"""

response = model.generate_content(prompt)

print(response.text)
