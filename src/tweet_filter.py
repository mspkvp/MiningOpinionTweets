# -*- coding: utf-8 -*-
import os
import csv
import unicodedata
import re
import logging
import operator
from collections import Counter

logging.basicConfig(filename='filter.log', level=logging.DEBUG)
read_path = "extracted_tweets"
write_path = "filtered_tweets"
pt_stopwords = []
en_stopwords = []


def load_stopwords():
    pt = [remove_diacritic(x.strip('\n').decode('utf-8')) for x in open("stopwords_pt.txt").readlines()]
    en = [remove_diacritic(x.strip('\n').decode('utf-8')) for x in open("stopwords_en.txt").readlines()]
    return pt, en


def remove_diacritic(input):
    # Accept a unicode string, and return a normal string (bytes in Python 3)
    # without any diacritical marks.
    return unicodedata.normalize('NFKD', input).encode('ASCII', 'ignore')


def remove_nonalphanumeric(x):
    return re.sub('[^0-9a-zA-Z#]+', '', x)


pt_stopwords, en_stopwords = load_stopwords()

small_words_whitelist = map(str.strip, open("small_words_whitelist.txt", "r").readlines())

if not os.path.exists(write_path):
    os.makedirs(write_path)

for filename in os.listdir(read_path):
    entity_codename = filename.split(".", 1)[0]

    current_read_file = csv.reader(open(read_path + "/" + filename, 'rb'), delimiter="\t", quotechar='|',
                                   quoting=csv.QUOTE_MINIMAL)

    previous_timestamp = ""
    queries = current_read_file.next()
    i = 0
    query_tokens = []
    for query in queries:
        query_tokens.extend(remove_diacritic(query.decode('utf-8')).split(" ")) 
        i += 1

    for row in current_read_file:
        current_timestamp = row[3].split("T", 1)[0]

        if not os.path.exists(write_path + "/" + current_timestamp):
            os.makedirs(write_path + "/" + current_timestamp)
        text = row[1]
        logging.info("Tweet: " + text)
        if len(text) <= 80:  # only accept tweets that are at least 80 characters long
            logging.info("Discarded for being too short")
            continue

        logging.info("Decoding tweet")
        text = text.decode('utf-8')  # decode so we can perform operations

        logging.info("Converting to lower case")
        text = text.lower()  # convert to lower case

        logging.info("Removing diacritics")
        text = remove_diacritic(text)  # remove diacritics
        
        tokens = text.split(" ")

        logging.info("Removing links")
        tokens = [remove_nonalphanumeric(token) for token in tokens if not token.startswith("http:") and not token.startswith("https:")] #remove links and alphanumerics

        logging.info("Removing queries, stopwords and small words")

        tokens_clone = tokens
        blacklist = []
        blacklist.extend(query_tokens)
        blacklist.extend(pt_stopwords)
        blacklist.extend(en_stopwords)

        tokens = [token for token in tokens if token not in blacklist]

        tokens = [token for token in tokens if len(token) > 3 or token in small_words_whitelist]

        if row[3] != previous_timestamp:
            current_write_file = open(write_path + "/" + current_timestamp + "/" + entity_codename + ".txt", 'a')

        current_write_file.write(" ")
        tokens_string = " ".join(tokens)
        current_write_file.write(tokens_string)
        logging.info("Converted to :" + tokens_string)

