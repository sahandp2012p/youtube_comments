import googleapiclient.discovery
import os
from dotenv import load_dotenv

load_dotenv()


def get_comments(id):
    api_service_name = "youtube"
    api_version = "v3"
    DEVELOPER_KEY = os.environ["DEVELOPER_KEY"]

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey=DEVELOPER_KEY
    )

    all_comments = []
    next_page_token = None
    while True:
        request = youtube.commentThreads().list(
            part="snippet",
            videoId=id,
            maxResults=100,
            textFormat="plainText",
            pageToken=next_page_token,
        )

        response = request.execute()

        comments = [
            item["snippet"]["topLevelComment"]["snippet"]["textDisplay"].replace(
                "\n", " "
            )
            for item in response["items"]
        ]
        all_comments.extend(comments)

        next_page_token = response.get("nextPageToken")
        if not next_page_token:
            break

    return all_comments
