import streamlit as st
import time
from pdfparser.pdfparser import PdfParser
from ner.ner import Ner
from pdfhighlighter.pdfhighlighter import PdfHighlighter
from textclassifier.heading_classify import classify
from textclassifier.textclassifier import TextClassifier
from textcomparison.textcomparison import TextComparison
from summary.summary import Summary
import os 

def get_pdf(key):
    pdf = st.file_uploader("Upload a file", type=["pdf"], key=key)
    if pdf:
        # st.write(os.listdir('../bcvDjangoBackend/static'))
        filepath ='../bcvDjangoBackend/static/' + key + pdf.name
        with open(filepath , 'wb') as f:
            f.write(pdf.read())
        return  filepath

def extract_text(pdf, heading):
    if(pdf != None):
        text=""
        parser_instance = PdfParser(pdf)
        text = parser_instance.readPdf()
        st.write(f"{heading} pdf text :")
        st.write(text)
        return text

def display_entities(entities_dict):
    st.write("Entities recognized:")
    for entity, details in entities_dict.items():
        entity_type = details[0]
        confidence = details[1]
        if entity_type != 'CARDINAL':
            st.write(f"**Entity:** {entity}")
            st.write(f"- **Type:** {entity_type}")
            st.write(f"- **Confidence:** {confidence}")


def highlight(text, textList):
    if text and textList:
        for word in textList:
            highlighted_word = f'<span style="background-color: yellow; color: black;">{word}</span>'
            text = text.replace(word, highlighted_word)
        st.write("Highlighted text:")
        st.markdown(text, unsafe_allow_html=True)
    else:
        st.write("No words to highlight.")

def main():
    st.title("BUSINESS CONTRACT VALIDATION")

    
    status = "parser"
    # Pdf Parser
    if status == "parser":
        st.write("Provide a contract")
        pdf1path = get_pdf("contract")
        time_a = time.perf_counter()
        user_pdf = extract_text(pdf1path, "Contract")
        time_b = time.perf_counter()

        st.write("Provide a template")
        pdf2path = get_pdf("template")
        time_c = time.perf_counter()
        template_pdf = extract_text(pdf2path, "Template")
        time_d = time.perf_counter()

        if template_pdf:
            st.write("time taken for parsing text : ", ((time_b-time_a) + (time_d-time_c)), " seconds")
        
        if not pdf1path and not pdf2path:
            status = "parser"
        else:
            status = "ner"
    
    

    # NER

    if status == "ner":
        time_e = time.perf_counter()
        dict={}
        if user_pdf:
            ner_instance = Ner(user_pdf)
            ner_instance.ner()
            dict = ner_instance.printNER()
            st.write("Entities recognized in User Pdf :")
            display_entities(dict)
        time_f = time.perf_counter()
        st.write("Time taken to perform NER : ", (time_f-time_e), " seconds")

        status = "highlighter"

    # Pdf Highlighting
    if status == "highlighter":
        time_g = time.perf_counter()
        if dict.keys() is not None:
            textList = list(dict.keys())
            highlight(user_pdf, textList)
        time_h = time.perf_counter()
        print("Time taken to highlight pdf :", (time_h - time_g) , " seconds")
        status = "classifier"

    # Text classifier
    if status == "classifier":
        time_i = time.perf_counter()
        headings = classify(pdf2path)
        st.title("FOUND HEADING")
        st.write(headings)

        text_classifier = TextClassifier(pdf2path," ", headings)
        paragraphs_template = text_classifier.classify()
        count = 1

        st.title("TEMPLATE HEADING PARAGRAPH")
        if paragraphs_template:
            for heading, paragraph in paragraphs_template.items():
                st.write(f"{count}: {heading}")
                st.write(paragraph)
                count += 1


        text_classifier = TextClassifier(pdf1path," ", headings)
        paragraphs_contract = text_classifier.classify()
        count = 1

        st.title("CONTRACT HEADING PARAGRAPH")
        if paragraphs_contract:
            for heading, paragraph in paragraphs_contract.items():
                st.write(f"{count}: {heading}")
                st.write(paragraph)
                count += 1
        
        time_j = time.perf_counter()

        st.write("Time taken to find the heading & classify the template and contract pdf :", (time_j - time_i) , " seconds")
        status = "Comparison"



    # Text Comparison
    if status == "Comparison":
        time_k = time.perf_counter()
        st.title("COMPARISON BETWEEN TEMPLATE AND CONTRACT")
        text_compariosn = TextComparison(paragraphs_contract , paragraphs_template)

        result = text_compariosn.comparator()

        for index, item in enumerate(result):
            key, value = item  # Assuming each element in self.dict is a tuple (key, value)
            st.write(f"Index: {index}, Key: {key}, Value: {value}")
        
        time_l = time.perf_counter()

        st.write("Time taken to compare the template and contract :", (time_l - time_k) , " seconds")
        status = "summary"

    #summary
    if status == "summary":
        time_m = time.perf_counter()
        summrizer = Summary()
        summary = summrizer.getSummary(dict , user_pdf)
        st.title("SUMMARY")
        st.write(summary)
        time_n = time.perf_counter()
        st.write("Time taken to summarize the contract :", (time_n - time_m) , " seconds")


if __name__ == "__main__":
    main()
