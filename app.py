from get_sentiments import get_sentiment
from downloads import download

download()

id = input('Enter id: ')
print(get_sentiment(id))