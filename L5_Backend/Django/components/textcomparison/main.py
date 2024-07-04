from textcomparison2 import TextComparison
import os
import json
import google.generativeai as genai


def main():

    # Instantiating an NER instance of  Ner class
    comparisonInstance = TextComparison(paragraphs_template ,paragraphs_contract)

    result_dict, dev_words = comparisonInstance.comparator()
  
    # print(dict)
    
    # NER method for printing the entities
    comparisonInstance.printComparison()


if __name__ == "__main__":
    main()
