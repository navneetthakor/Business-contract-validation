import pymupdf
import os
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
from django.conf import settings

class PdfHighlighter:
    def __init__(self, pdf_path, ner_dict):
        self.pdf_path = pdf_path
        self.ner_dict = ner_dict
        self.list = []

    def highlight(self):
        try:
            print("\n\n\nhighlighting user pdf.....\n")
            
            self.list = [key for key in self.ner_dict.keys()]
            # print(self.list)

            doc = pymupdf.open(self.pdf_path)
            print(doc,"\n\n\n")

            for page in doc:
                for word in self.list:
                    instance = page.search_for(word)
                    for inst in instance:
                        page.add_highlight_annot(inst)

            # STATIC_ROOT_PATH = os.path.join(settings.BASE_DIR, settings.STATIC_ROOT)

            highligh_pdf_path = os.path.join('./static/', 'highlighted.pdf')
            # Save the modified PDF
            print("path for highlight is : ", highligh_pdf_path,"\n\n\n")

            doc.save(highligh_pdf_path)
            doc.close() 

            # Upload the file to Cloudinary with filename
            cloudinary.config(
                cloud_name='deziazvyp',
                api_key='115335176222945',
                api_secret='-AJDclFmKfBgeaPqfQtbHqd8sgQ'
            )

            result = cloudinary.uploader.upload(highligh_pdf_path, public_id='highlighted.pdf', resource_type="raw")
            print("\n\nResuult is from cloudinary : ", result,"\n\n\n")
            # Get the URL of the uploaded file
            temp_url = result.get('secure_url')
            if not temp_url:
              raise Exception("Failed to upload file to Cloudinary")

            public_id = result.get('public_id')
            if not public_id:
              raise Exception("Failed to retrieve public ID")

            print(public_id)

            # Remove the local file
            if os.path.exists(highligh_pdf_path):
              os.remove(highligh_pdf_path)
            else:
              raise Exception(f"The file {highligh_pdf_path} does not exist")

            return temp_url

        except Exception as err:
          print(f"Error occurred while highlighting pdf : {err}")

