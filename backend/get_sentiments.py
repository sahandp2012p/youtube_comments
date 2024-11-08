from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
from backend.get_comments import get_comments
from backend.preprocess import pipeline


def get_sentiment(id):
    sentiment_object = SentimentIntensityAnalyzer()
    try:
        video_comments = get_comments(id)
    except:
        return False

    polarity = []
    comments = []
    for comment in video_comments:
        sentiment_dict = sentiment_object.polarity_scores(pipeline(comment))
        polarity.append(sentiment_dict["compound"])
        comments.append(comment)
    score_index_pairs = [(score, i) for i, score in enumerate(polarity)]
    sorted_pairs = sorted(score_index_pairs, key=lambda x: x[0], reverse=True)
    scores, sorted_indices = zip(*sorted_pairs)
    comments = [comments[i] for i in sorted_indices]
    return sum(polarity) / len(polarity), len(polarity), comments[:11], scores[:11]
