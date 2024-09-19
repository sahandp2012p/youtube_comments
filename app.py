from downloads import download
download()
from get_sentiments import get_sentiment


id = input('Enter id: ')
print((((get_sentiment(id)[0]--1)*(10-1))/(1--1))+1)