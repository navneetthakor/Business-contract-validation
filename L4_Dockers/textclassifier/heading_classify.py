import pymupdf

def classify(pdfPath):
    headings = []
    pdf = pymupdf.open(pdfPath)
    for page in pdf:
        blocks = (page.get_text("dict")["blocks"])
        for block in blocks:
            for line in block['lines']:
                for span in line['spans']:
                    if(span['flags'] != 0):
                        if(len(span['text']) > 3 ):
                            headings.append(span['text'])
    print("headings are :\n",headings,"\n\n")

    return headings
