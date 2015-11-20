import requests
import json
import csv

entities = json.loads('''{ "entities":
    [
        {"name": "José Mourinho", "queries": ["josé mourinho", "mourinho"]},
        {"name": "Cristiano Ronaldo", "queries": ["cristiano ronaldo", "cr7"]}
    ]
}''')['entities']

url = "http://reaction.fe.up.pt/portugal/tweets/select"
username = "popstar_pedrosaleiro"
password = "p3dr0@2013!"
rowsPerRequest = 500
baseQuery = 'created_at:["2014-01-01T00:00:00Z" TO *] AND text:{}'


file = csv.writer(open('dump.csv', 'w'), delimiter="\t", quotechar='|', quoting=csv.QUOTE_MINIMAL, lineterminator='§')

file.writerow(['entity', 'queries', 'tweet_id', 'text', 'user_id'])


def get_tweets(page, q):
    data = {
        "wt ": "json",
        "rows": rowsPerRequest,
        "start": page * rowsPerRequest,
        "q": q
    }

    request = requests.get(url, auth=(username, password), params=data)
    return request.json()['response']


def write_tweets(tweet_list, ent):
    for tweet in tweet_list:
        file.writerow([ent["name"], ",".join(ent["queries"]), tweet["id"], tweet["text"], tweet["user_id"]])

for entity in entities:
    text_filter = '("' + entity["queries"][0] + '"'

    for i in range(1, len(entity["queries"])):
        text_filter += ' OR "' + entity["queries"][i] + '"'

    text_filter += ")"

    query = baseQuery.format(text_filter)
    currentPage = 0
    jsonResponse = get_tweets(currentPage, query)

    numberOfResults = jsonResponse['numFound']

    print("Found {} tweets for {} with query {}".format(numberOfResults, entity["name"], query))

    tweets = jsonResponse['docs']
    tweetCounter = len(tweets)

    print("Done reading {}/{} tweets for {}".format(tweetCounter, numberOfResults, entity["name"]))

    while tweetCounter < numberOfResults:
        currentPage += 1
        jsonResponse = get_tweets(currentPage, query)
        tweets = jsonResponse['docs']
        tweetCounter += len(tweets)
        write_tweets(tweets, entity)
        print("Done reading {}/{} tweets for {}".format(tweetCounter, numberOfResults, entity["name"]))
