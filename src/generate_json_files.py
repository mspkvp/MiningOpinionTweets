import csv
import json
import os


def generate_files(entity_code):

    if not os.path.exists("pages/data/raw/comments/" + entity_code):
        os.makedirs("pages/data/raw/comments/" + entity_code)

    extracted_tweets_file = csv.reader(open("extracted_tweets/" + entity_code + ".csv", 'rb'), delimiter="\t",
                                           quotechar='|',
                                           quoting=csv.QUOTE_MINIMAL)

    extracted_tweets_file.next()
    docs = dict()
    trends = []
    tweet_count = dict()

    for row in extracted_tweets_file:
        tweet_id = row[0]
        text = row[1]
        date = row[3]
        date_day = date.split("T", 1)[0]

        if date_day in tweet_count:
            tweet_count[date_day] += 1
        else:
            tweet_count[date_day] = 1

        if date_day in docs:
            docs[date_day].append(dict(id=tweet_id, text=text, created_at=date))
        else:
            docs[date_day] = [dict(id=tweet_id, text=text, created_at=date)]

    for date, value in sorted(tweet_count.iteritems()):
        trends.append({"timestamp": date + "T00:00:00Z", "value": value})

    for date, comments in docs.iteritems():
        open("pages/data/raw/comments/" + entity_code + "/" + date + ".json", "w").write(json.dumps(comments, indent=4))

    open("pages/data/raw/trends/" + entity_code + ".json", "w").write(json.dumps(trends, indent=4))


if not os.path.exists("pages/data/raw/trends/"):
    os.makedirs("pages/data/raw/trends/")

entities_file = open("entities.txt", "rb")

with open("entities.txt") as entities_file:
    for line in entities_file:
        generate_files(line.split('|')[1])

