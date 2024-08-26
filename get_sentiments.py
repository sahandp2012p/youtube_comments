from nltk.sentiment import SentimentIntensityAnalyzer
from get_comments import get_comments
import nltk
nltk.download('vader_lexicon')

def get_sentiment(id):
    sentiment_object = SentimentIntensityAnalyzer()
    comments = get_comments(id)
    polarity = []
    for comment in comments:
        sentiment_dict = sentiment_object.polarity_scores(comment)
        polarity.append(sentiment_dict['compound'])
    return sum(polarity)/len(polarity)