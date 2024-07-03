from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextContainer, LTTextLine, LTChar, LTAnno


def classify(pdf_path):
    headings = []
    current_bold_text = ""

    for page_layout in extract_pages(pdf_path):
        for element in page_layout:
            if isinstance(element, LTTextContainer):
                for text_line in element:
                    if isinstance(text_line, LTTextLine):
                        for character in text_line:
                            if isinstance(character, LTChar):
                                if "Bold" in character.fontname:
                                    current_bold_text += character.get_text()
                                elif current_bold_text:
                                    headings.append(current_bold_text.strip())
                                    current_bold_text = ""
                            elif isinstance(character, LTAnno):
                                if current_bold_text:
                                    current_bold_text += character.get_text()
                        if current_bold_text:
                            headings.append(current_bold_text.strip())
                            current_bold_text = ""

    print(headings)
    
    return headings