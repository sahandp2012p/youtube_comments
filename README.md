# Youtube Comments

An application for YouTubers to analyze their comments given a score from 1 to 10.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRET_KEY`: Which is the key for creating passwords in the api.

To create run:

```bash
$ openssl rand -hex 32
```

`DEVELOPER_KEY`: Which is the api key for YouTube api v3: [Get from this link](https://developers.google.com/youtube/v3)

## Run Locally

First you will have to clone this repo:

```bash
$ git clone https://github.com/sahandp2012p/youtube_comments.git
```

Then, You will first have to [install bun](https://bun.sh/).

And then [install the latest python version](https://www.python.org/).

Then you will have to run these commands to install the dependencies:

```bash
$ bun install
$ python -m venv python_env
$ source ./python_env/bin/activate
$ pip install -r requirements.txt
```

And then you will have to run the python server using this command:

```bash
$ uvicorn backend.api:app
```

Then run the below command to build the code and open the server that uses minified code

```bash
$ bun start
```

## FAQ

#### Is this app free?

Yes, since this app is completely open-source this app is completely free to use

#### Will I have link my youtube account to this app?

No, you just can enter the video id in the website.

# Acnowledgements

Special thanks to [@MPBDev](https://github.com/MPBCoder) for the Readme
