import requests
import csv
import os

url = "http://reaction.fe.up.pt/portugal/tweets/select"
username = "popstar_pedrosaleiro"
password = "p3dr0@2013!"
rowsPerRequest = 500
baseQuery = 'created_at:["2014-01-01T00:00:00Z" TO *] AND text:({})'

if not os.path.exists("extracted_tweets"):
    os.makedirs("extracted_tweets")


def get_tweets(page, q):
    data = {
        "wt ": "json",
        "rows": rowsPerRequest,
        "start": page * rowsPerRequest,
        "q": q,
        "sort": "timestamp asc"
    }
    print("Retrieving tweets from server")
    request = requests.get(url, auth=(username, password), params=data)
    return request.json()['response']


def write_tweets(tweets, entity_file):
    for tweet in tweets:
        entity_file.writerow([tweet["id"], tweet["text"].replace('\n', ' ').encode('utf-8'), tweet["user_id"],
                              tweet["timestamp"]])


def process_entity(entity_line):
    entity_attributes = entity_line.split('|')
    current_entity_file = csv.writer(open('extracted_tweets/{}.csv'.format(entity_attributes[1]), 'w'), delimiter="\t",
                                     quotechar='|', quoting=csv.QUOTE_MINIMAL)
    queries = entity_attributes[2:]
    queries.pop()
    current_entity_file.writerow(queries);

    text_filter = '"' + queries[0] + '"'

    for i in range(1, len(queries)):
        text_filter += ' OR "' + queries[i] + '"'

    current_page = 0
    json_response = get_tweets(current_page, text_filter)

    number_of_results = json_response['numFound']

    print("Found {} tweets for {} with query {}".format(number_of_results, entity_attributes[0], text_filter))

    tweets = json_response['docs']
    tweet_counter = len(tweets)
    write_tweets(tweets, current_entity_file)

    while tweet_counter < number_of_results:
        current_page += 1
        json_response = get_tweets(current_page, text_filter)
        tweets = json_response['docs']
        tweet_counter += len(tweets)
        write_tweets(tweets, current_entity_file)
        print("Done reading {}/{} tweets for {}".format(tweet_counter, number_of_results, entity_attributes[0]))


with open("entities.txt") as entities_file:
    for line in entities_file:
        process_entity(line)