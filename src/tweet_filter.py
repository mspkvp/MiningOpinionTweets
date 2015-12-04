# -*- coding: utf-8 -*-
import os
import csv
import unicodedata
import re
import logging

logging.basicConfig(filename='filter.log', level=logging.DEBUG)
read_path = "extracted_tweets"
write_path = "filtered_tweets"


def remove_diacritic(input):
    # Accept a unicode string, and return a normal string (bytes in Python 3)
    # without any diacritical marks.
    return unicodedata.normalize('NFKD', input).encode('ASCII', 'ignore')

if not os.path.exists(write_path):
    os.makedirs(write_path)

for filename in os.listdir(read_path):
    entity_codename = filename.split(".", 1)[0]

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

        if not os.path.exists(write_path + "/" + current_timestamp):
            os.makedirs(write_path + "/" + current_timestamp)
        text = row[1]
        print "Tweet: " + text
        if len(text) <= 80:  # only accept tweets that are at least 80 characters long
            logging.info("Discarded for being too short")
            continue

        logging.info("Decoding tweet")
        text = text.decode('utf-8')  # decode so we can perform operations
        logging.info("Converting to lower case")
        text = text.lower()  # convert to lower case
        logging.info("Removing diacritics")
        text = remove_diacritic(text)  # remove diacritics
        logging.info("Removing queries")
        for query in queries:  # remove the queries from the tweets
            text = text.replace(query, '')
        logging.info("Removing links")
        text = re.sub(r'https?://[^\s<>"]+|www\.[^\s<>"]+', '', text)  # remove all links from tweets
        text += " "
        if row[3] != previous_timestamp:
            current_write_file = open(write_path + "/" + current_timestamp + "/" + entity_codename + ".txt", 'a')

        logging.info("Converted to " + text)
        current_write_file.write(text)
