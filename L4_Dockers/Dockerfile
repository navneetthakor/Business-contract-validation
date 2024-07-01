FROM python:3.11.4

WORKDIR /usr/app

COPY pdfparser/requirements.txt ./

RUN pip install -r requirements.txt

COPY ner/requirements.txt ./

RUN pip install -r requirements.txt

COPY pdfhighlighter/requirements.txt ./

RUN pip install -r requirements.txt

COPY textclassifier/requirements.txt ./

RUN pip install -r requirements.txt

COPY textcomparison/requirements.txt ./

RUN pip install -r requirements.txt

COPY summary/requirements.txt ./

RUN pip install -r requirements.txt

RUN pip install streamlit

COPY . /usr/app/

EXPOSE 8001

CMD [ "streamlit" , "run" , "streamlitValidation.py" , "--server.port" , "8001" ]