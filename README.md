# Youtube comments sentiment analysis
This app gives the sentiment of your comments from a scale 1 to 10.

To use run:
`docker run -i sahandp2012p/youtube-comments-analysis`
You can also run using the app zip file
Unzip it and then run the app binary with terminal.
To run:
```
./app
```


# NOTICE Docker and Binary are deprecated use website instead

Please set your own developer key for google cloud in .env
and created ssl key with this command and set it .env as SECRET_KEY
```bash
openssl rand -hex 32
```

To use website run:
```bash
npm i
pip install -r requirements.txt
```
then run these two commands as different processes:
```bash
uvicorn api:app
npm run dev
```
