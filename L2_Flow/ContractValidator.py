from L1_individual_components import main

class ContractValidator:
    def __init__(self, inputPdfUrl, templatePdfUrl, agreeType , clause , heading):
        self.inputPdfUrl = inputPdfUrl
        self.templatePdfUrl = templatePdfUrl
        self.agreeType = agreeType
        self.heading = heading
    
    def parsePdfHelper(self, pdfUrl):
        try:
            print("pdfurl is : ", pdfUrl,"\n\n\n")
            pdfparser = main.PdfParser(pdfUrl)
            text = pdfparser.readPdf()
            return text
        except Exception as err:
            print(f"Error occured while reading pdf : {err}")
            raise Exception(f"Error occured while reading pdf : {err}")

    def parseTemplatePdf(self):
        try:
            txt = self.parsePdfHelper(self.templatePdfUrl)
            return txt
        except Exception as err:
            print(f"Error occured while parsing template pdf : {err}")
            raise Exception(f"Error occured while parsing template pdf : {err}")
        
    def parseInputPdf(self):
        try:
            txt = self.parsePdfHelper(self.inputPdfUrl)
            return txt
        except Exception as err:
            print(f"Error occured while parsing input pdf : {err}")
            raise Exception(f"Error occured while parsing input pdf : {err}")
    
    def performNer(self, plainText):
        try:
            ner = main.Ner(plainText)
            ner.ner()
            nerText = ner.printNER()
            return nerText
        except Exception as err:
            print(f"Error occured while performing ner : {err}")
            raise Exception(f"Error occured while performing ner : {err}")
    
    def classifyText(self, pdfPath):
        try:
            classifier = main.TextClassifier(pdfPath,self.agreeType , self.heading)
            paragraph = classifier.classify()
            return paragraph
        except Exception as err:
            print(f"Error occured while reading pdf : {err}")
            raise Exception(f"Error occured while reading pdf : {err}")
        
    def classifyInputText(self):
        try:
            text = self.classifyText(self.inputPdfUrl)
            return text
        except Exception as err:
            print(f"Error occured while reading pdf : {err}")
            raise Exception(f"Error occured while reading pdf : {err}")
            
    def classifyTemplateText(self):
        try:
            text = self.classifyText(self.templatePdfUrl)
            return text
        except Exception as err:
            print(f"Error occured while reading pdf : {err}")
            raise Exception(f"Error occured while reading pdf : {err}")

    def compareText(self, paragraphs_template, paragraphs_contract):
        try:
            textComparison = main.TextComparison(paragraphs_template ,paragraphs_contract)
            dict = textComparison.comparator()
            return dict
        except Exception as err:
            print(f"Error occured while text comparison: {err}")
            raise Exception(f"Error occured while text comparison: {err}")
        
    def highlightPdf(self,ner_dict):
        try:
            pdfHigltr = main.PdfHighlighter(self.inputPdfUrl, ner_dict)
            public_id = pdfHigltr.highlight()
            return public_id
        except Exception as err:
            print(f"Error occured while highlighting pdf : {err}")
            raise Exception(f"Error occured while highlighting pdf : {err}")
        
    def getSummary(self,ner_dict, inputText):
        try:
            summary = main.Summary()
            text = summary.getSummary(ner_dict, inputText)
            return text
        except Exception as err:
            print(f"Error occured in summary : {err}")
            raise Exception(f"Error occured in summary : {err}")

