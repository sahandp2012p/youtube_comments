from fastapi import FastAPI, HTTPException
from get_sentiments import get_sentiment
from fastapi.middleware.cors import CORSMiddleware

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
	if get_sentiment(id):
		return {"score": round((((get_sentiment(id)--1)*(10-1))/(1--1))+1)}
	else:
		raise HTTPException(status_code=500, detail="The video's comments are disabled or Invalid video id")