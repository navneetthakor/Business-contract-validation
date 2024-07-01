FROM python:3.11.4

WORKDIR /usr/app

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . /usr/app/

EXPOSE 8000

CMD [ "python" , "manage.py" , "runserver" , "0.0.0.8000" ]