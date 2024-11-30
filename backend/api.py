from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.get_sentiments import get_sentiment
from backend.get_emojis import get_emojis
from backend.downloads import download


class Video(BaseModel):
    id: str


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/")
async def root(video: Video):
    sentiment = get_sentiment(video.id)
    if sentiment:
        score = round((((sentiment[0] - -1) * (10 - 1)) / (1 - -1)) + 1)
        return {
            "score": score,
            "comments": sentiment[1],
            "top_comments": {"comments": sentiment[2], "scores": sentiment[3]},
            "emoji": get_emojis(score),
        }
    else:
        raise HTTPException(
            status_code=status.HTTP_206_PARTIAL_CONTENT,
            detail="The video's comments are disabled or invalid video ID",
        )
