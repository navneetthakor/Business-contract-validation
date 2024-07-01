from pdfhighlighter import PdfHighlighter

def main():

    # Instantiating an NER instance of  Ner class
    pdfHighlighterInstance = PdfHighlighter("pdfPath", "ner_entities")

    # NER main function for making entity relations
    pdfHighlighterInstance.highlight()


if __name__ == "__main__":
    main()