from pdfparser import PdfParser

def main():

    # Instantiating  a pdfParser instance of PdfParser class
    pdfParserInstance = PdfParser("../../static/download.pdf")

    # Read method to read the input pdf.
    pdf_text = pdfParserInstance.readPdf()

    # Print method to print the text of pdf.
    pdfParserInstance.printPdf()


if __name__ == "__main__":
    main()