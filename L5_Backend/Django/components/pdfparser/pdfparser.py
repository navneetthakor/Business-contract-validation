import pymupdf

class PdfParser:
  def __init__(self, pdfPath):
    self.pdfPath = pdfPath
    self.text = ""

  def readPdf(self):
    try:
      # if filepath is present:
      if isinstance(self.pdfPath, str):
        pdf = pymupdf.open(self.pdfPath)

      else:
        # if file like object is present (mainly for streamlit)
        pdf = pymupdf.open(stream=self.pdfPath.read(), filetype="pdf")
        
      for page in pdf:
        self.text += page.get_text()
        self.text += "\n\n"
      return self.text
    except Exception as err:
      print(f"Error occured while reading pdf : {err}")

  def printPdf(self):
    print(self.text)