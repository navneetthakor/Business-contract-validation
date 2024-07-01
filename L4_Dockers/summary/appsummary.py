import streamlit as st

from summary import Summary


def summary():
    st.write("DEMO OF THE SUMMARY COMPONENT")

    text = st.text_input("Enter the input text")

    ner = st.text_input("Enter the ner tag for the above text")

    if text and ner:
        summrizer = Summary()

        output = summrizer.getSummary(ner , text)

        st.write("Output")
        st.write(output)

    else: 
        st.write("Enter the information asked")



if __name__ == "__main__":
    summary()