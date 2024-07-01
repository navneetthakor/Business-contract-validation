from textcomparison import TextComparison
import os
import json
import google.generativeai as genai


def main():

    # Instantiating an NER instance of  Ner class
    comparisonInstance = TextComparison(paragraphs_template ,paragraphs_contract)

    dict = comparisonInstance.comparator()
  
    print(dict)
    
    # NER method for printing the entities
    comparisonInstance.printComparison()


if __name__ == "__main__":
    main()
