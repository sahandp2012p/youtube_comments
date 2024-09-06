from fastapi import FastAPI, HTTPException
from get_sentiments import get_sentiment
from fastapi.middleware.cors import CORSMiddleware
from get_emojis import get_emojis

app = FastAPI()

origins = ['null']  # NOT recommended - see details below

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/{id}")
async def root(id):
	sentiment = get_sentiment(id)

	if sentiment:
		return {"score": round((((sentiment[0]--1)*(10-1))/(1--1))+1), "comments": sentiment[1], "emoji": get_emojis(round((((sentiment[0]--1)*(10-1))/(1--1))+1))}
	else:
		raise HTTPException(status_code=500, detail="The video's comments are disabled or Invalid video id")