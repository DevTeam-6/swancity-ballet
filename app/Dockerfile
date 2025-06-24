FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

ENV FLASK_APP=main.py
ENV FLASK_ENV=development

CMD sh -c "python fixtures/load_fixtures.py && flask run --host=0.0.0.0 --port=5000 --reload"
