from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import nltk
import string

lemmatizer = WordNetLemmatizer()
stopwords = stopwords.words("english")


def lemmatize(text):
    return lemmatizer.lemmatize(text)


def punc_remove(text):
    return text.translate(str.maketrans("", "", string.punctuation))


def remove_caps(text):
    return text.lower()


def remove_stopwords(text):
    return " ".join([word for word in text.split() if word not in stopwords])


def pipeline(text):
    no_caps = remove_caps(text)
    no_stopwords = remove_stopwords(no_caps)
    no_punc = punc_remove(no_stopwords)
    lemmatized = lemmatize(no_punc)

    return lemmatized
