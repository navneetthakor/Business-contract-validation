import sys
import os

from ControlFlow.ContractValidator import ContractValidator

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../L1_individual_components/')))

def validatContract(inputPdf, templatePdf,agreeType, clasue , heading):

    try:

        # creating model 
        model = ContractValidator(inputPdf, templatePdf, agreeType , clasue , heading)

        # parsing pdfs 
        print("Parsing pdf :\n")
        inputText = model.parseInputPdf()
        templateText = model.parseTemplatePdf()


        # ner for input pdf 
        print("Performing NER :\n")
        inputPdfNer = model.performNer(inputText)
        print("Printing ner response :\n\n")
        print(inputPdfNer)
        hashable_ner_dict = tuple(sorted(inputPdfNer.items()))



        # highligh pdf 
        print("Performing highlighting :\n")
        highlitedPdf = model.highlightPdf(inputPdfNer)
        
        # classify text 
        print("Performing classification :\n")
        inputClassifiedText = model.classifyInputText()
        templateClassifiedText = model.classifyTemplateText()

        print("inputclassifiedtext:\n", inputClassifiedText,'\n\n\n')
        print("tempclassifiedtext:\n", templateClassifiedText,'\n\n\n')

        print("Finding deviations :\n")
        # compare classified text 
        compare_dic = model.compareText(inputClassifiedText, templateClassifiedText)

        print("Printing summary :\n")
        # summary of pdf 
        summary = model.getSummary(inputPdfNer, inputText)

        # returning output
        print("Returning to node server :\n")
        return {
            "compare_dic": compare_dic,
            "highlitedPdf": highlitedPdf,
            "summary": summary,
            "ner_dict": inputPdfNer
        }


    except Exception as err:
        print("error occured in main function")
        raise Exception(f"error: {err}")



if __name__ == "__main__":
    validatContract()

