# textcomparison/apptextcomparison.py
import streamlit as st
from textcomparison import TextComparison

def comparator():
    st.write("DEMO OF THE COMPARATOR") 

    text1 = st.text_input("Enter the first text")
    text2 = st.text_input("Enter the second text")

    if text1 and text2:

        comparator = TextComparison(text1 , text2)

        output = comparator.individual_comparator(text1 , text2)

        st.write("The output")

        st.write(output)

    else:
        st.write("Enter the text")



if __name__ == "__main__":
    comparator()
