import streamlit as st
import pymupdf

def get_pdf():
    pdf = st.file_uploader("Upload a file", type=["pdf"])
    return pdf

def extract_text(pdf):
    if pdf is not None:
        text = ""
        with pymupdf.open(stream=pdf.read(), filetype="pdf") as doc:
            for page in doc:
                text += page.get_text()
                text += "\n\n"
        return text
    return ""

def pdf_words():
    st.write("Enter some words from the pdf to demonstrate highlighting.")
    st.write("word1, word2, word3, etc.")
    words = st.text_input("Enter words as shown above.")
    word_list = [word.strip() for word in words.split(',') if word.strip()]
    return word_list

def highlight(text, word_list):
    if text and word_list:
        for word in word_list:
            highlighted_word = f'<span style="background-color: yellow; color: black;">{word}</span>'
            text = text.replace(word, highlighted_word)
        st.write("Highlighted text:")
        st.markdown(text, unsafe_allow_html=True)
    else:
        st.write("No words to highlight.")

def main():
    st.write("DEMO OF PDF HIGHLIGHTER")
    st.write("Upload a pdf below:")
    pdf = get_pdf()
    if pdf is not None:
        text = extract_text(pdf)
        if text:
            word_list = pdf_words()
            highlight(text, word_list)
        else:
            st.write("Failed to extract text from the PDF.")

if __name__ == "__main__":
    main()
