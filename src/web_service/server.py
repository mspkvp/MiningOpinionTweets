from flask import Flask, jsonify
from flask.ext.cors import CORS
import csv

app = Flask(__name__)

CORS(app)

topics = []
topics_mapping = dict()
topics_csv = csv.reader(open("../lda_topics.csv", "rb"), delimiter="\t", quotechar='|',  quoting=csv.QUOTE_MINIMAL)
mapping_csv = csv.reader(open("../lda_topics_mapping.csv", "rb"), delimiter="\t", quotechar='|',  quoting=csv.QUOTE_MINIMAL)

print("loading topics")
for row in topics_csv:
    topics.append(row[1:])

print("loading topics mapping")
for row in mapping_csv:
    topics_mapping[row[0] + " " + row[1]] = int(row[2])


@app.route("/<entity_code>")
def get_entity_info(entity_code):
    extracted_tweets_file = csv.reader(open("../extracted_tweets/" + entity_code + ".csv", 'rb'), delimiter="\t",
                                       quotechar='|',
                                       quoting=csv.QUOTE_MINIMAL)

    result = dict(tweets=[], trends=[], queries=extracted_tweets_file.next())
    tweet_count = dict()

    for row in extracted_tweets_file:
        tweet_id = row[0]
        text = row[1]
        date = row[3]
        date_day = date.split("T", 1)[0]

        if date_day in tweet_count:
            tweet_count[date_day] += 1
        else:
            tweet_count[date_day] = 0

        result["tweets"].append(dict(id=tweet_id, text=text, date=date))

    for date, value in sorted(tweet_count.iteritems()):
        result["trends"].append({"timestamp": date + "T00:00:00Z", "value": value})

    return jsonify(result)


@app.route("/<entity_code>/<date>/topics")
def get_topics(entity_code, date):
    result = []
    entity_id = entity_code + " " + date
    topic_id = topics_mapping[entity_id]
    topic_words = topics[topic_id]
    word_count_csv = csv.reader(open("../word_count/" + date + "/" + entity_code + ".csv", "rb"))
    word_count = dict()
    counter = 0
    for row in word_count_csv:
        word_count[row[0]] = int(row[1])

    for word in topic_words:
        count = 1
        if word in word_count:
            count = word_count[word] + 1

        result.append({'name': word, 'count': count, 'forms': "", 'sentiment': "positive", 'id': counter,
                       'comment_ids': []})
        counter += 1
    try:
        return jsonify(dict(topics=result))
    except KeyError:
        return "No tweets for this entity on this day", 404

if __name__ == "__main__":
    app.run()
