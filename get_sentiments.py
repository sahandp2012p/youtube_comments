from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
from get_comments import get_comments
from preprocess import pipeline

def get_sentiment(id):
    sentiment_object = SentimentIntensityAnalyzer()
    try:
        comments = get_comments(id)
    except:
        return False
    polarity = []
    for comment in comments:
        sentiment_dict = sentiment_object.polarity_scores(pipeline(comment))
        polarity.append(sentiment_dict['compound'])
    return sum(polarity)/len(polarity), len(polarity)

