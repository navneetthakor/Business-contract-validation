from textclassifier import TextClassifier
import pdfplumber
import json
from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextContainer, LTTextLine, LTChar

def main():


    # Instantiating an NER instance of  Ner class
    classifyInstance = TextClassifier(pdfPath , ContractType)

    # NER main function for making entity relations
    paragraph = classifyInstance.classify()

    # NER method for printing the entities
    classifyInstance.printClassify()


if __name__ == "__main__":
    main()