FROM python:3.12
ADD get_comments.py .
ADD get_sentiments.py .
ADD app.py .
ADD .env .
RUN pip install python-dotenv google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client nltk

CMD ["python", "app.py"]