from flask import Flask, jsonify
import csv
import json

app = Flask(__name__)


@app.route("/<entity_code>")
def get_entity_info(entity_code):
    extracted_tweets_file = csv.reader(open("../extracted_tweets/" + entity_code + ".csv", 'rb'), delimiter="\t",
                                       quotechar='|',
                                       quoting=csv.QUOTE_MINIMAL)

    result = dict(tweets=[], count=[], queries=extracted_tweets_file.next())
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
        result["count"].append({"timestamp": date + "T00:00:00Z", "value": value})

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
