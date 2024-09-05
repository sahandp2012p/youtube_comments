from fastapi import FastAPI, HTTPException
from get_sentiments import get_sentiment

app = FastAPI()

@app.get("/{id}")
async def root(id):
	if get_sentiment(id):
		return {"score": get_sentiment(id)}
	else:
		raise HTTPException(status_code=500, detail="The video's comments are disabled")