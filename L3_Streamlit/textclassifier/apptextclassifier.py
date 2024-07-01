import streamlit as st
from textclassifier import TextClassifier
import io

def get_pdf():
    pdf = st.file_uploader("Choose a file")

    return pdf


def get_header():
    st.write("Enter the clauses of the pdf")
    st.write("Clause 1 name, Clause 2 name, ...")
    clauses = st.text_input("Enter the clauses as shown above")

    clause_names_list = [name.strip() for name in clauses.split(',') if name.strip()]

    return clause_names_list

def classify(pdf , clause_names_list):

    if pdf and clause_names_list:
        st.write("You have uploaded both.")

        pdf_content = pdf.read()
        pdf_file = io.BytesIO(pdf_content)

        # Instantiate the TextClassifier class
        text_classifier = TextClassifier(pdf_file, clause_names_list)
        paragraphs = text_classifier.classify()
        count = 1

        for heading, paragraph in paragraphs.items():
            st.write(f"{count}: {heading}")
            st.write(paragraph)
            count += 1

    return paragraph



if __name__ == "__main__":

    st.write("DEMO OF THE TEXT CLASSIFIER")
    st.write("Provide the demo pdf")    
    pdf = get_pdf()
    clause_names_list = get_header()

    classify(pdf , clause_names_list)
