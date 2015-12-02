# -*- coding: utf-8 -*-
import os
import csv
import unicodedata
import re

read_path = "extracted_tweets"
write_path = "filtered_tweets"


def remove_diacritic(input):
    # Accept a unicode string, and return a normal string (bytes in Python 3)
    # without any diacritical marks.
    return unicodedata.normalize('NFKD', input).encode('ASCII', 'ignore')

if not os.path.exists("filtered_tweets"):
    os.makedirs("filtered_tweets")

for filename in os.listdir(read_path):

    current_read_file = csv.reader(open(read_path + "/" + filename, 'rb'), delimiter="\t", quotechar='|',
                                   quoting=csv.QUOTE_MINIMAL)
    previous_timestamp = ""
    queries = current_read_file.next()
    i = 0
    for query in queries:
        queries[i] = remove_diacritic(query.decode('utf-8'))
        i += 1

    for row in current_read_file:
        current_timestamp = row[3].split("T", 1)[0]
        text = row[1]
        print "Tweet: " + text
        if len(text) <= 80:  # only accept tweets that are at least 80 characters long
            print "Discarded for being too short"
            continue

        print "Decoding tweet"
        text = text.decode('utf-8')  # decode so we can perform operations
        print "Converting to lower case"
        text = text.lower()  # convert to lower case
        print "Removing diacritics"
        text = remove_diacritic(text)  # remove diacritics
        print "Removing queries"
        for query in queries:  # remove the queries from the tweets
            text = text.replace(query, '')
        print "Removing links"
        text = re.sub(r'(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?«»“”‘’]))', '', text)  # remove all links from tweets

        if row[3] != previous_timestamp:
            current_write_file = open(write_path + "/" + filename.split(".", 1)[0] + current_timestamp + ".csv", 'w')

        print "Converted to " + text
        current_write_file.write(text)
