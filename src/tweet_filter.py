import csv
from collections import defaultdict
import unicodedata
import re


def remove_diacritic(input):
    # Accept a unicode string, and return a normal string (bytes in Python 3)
    # without any diacritical marks.
    return unicodedata.normalize('NFKD', input).encode('ASCII', 'ignore')


tweets = defaultdict(list)
queries = []

file = csv.writer(open('José Mourinho_filtered.csv', 'w'), delimiter="\t", quotechar='|', quoting=csv.QUOTE_MINIMAL) #todo desmartelar isto

with open ("José Mourinho.csv", "r") as tweets_file: #todo desmartelar isto
    reader = csv.reader(tweets_file, delimiter="\t", quotechar='|', quoting=csv.QUOTE_MINIMAL)
    queries = next(reader)  # skip the first row (has the keys identifying the values
    for row in reader:
        tweets[row[0]].append(row[1])
        tweets[row[0]].append(row[2])

for i, query in enumerate(queries):
    query = remove_diacritic(query)
    queries[i] = query.decode('ascii')

initialtweets = len(tweets)
finaltweets = 0
for tweet in tweets:

    text = tweets[tweet][0]

    text = text.lower() # convert to lower case

    text = remove_diacritic(text) # remove diacritics

    text = text.decode('ascii') # decode so we can perform the replace

    for query in queries: # remove the queries from the tweets
        text = text.replace(query, '')

    text = re.sub(r'^https?:\/\/.*[\r\n]*', '', text) # remove all links from tweets

    if len(text) >= 80: # only accept tweets that are at least 80 characters long after the filters
        file.writerow([tweet, text, tweets[tweet][1]])
        finaltweets +=1

print("Filtered from {} to {} tweets".format(initialtweets, finaltweets))