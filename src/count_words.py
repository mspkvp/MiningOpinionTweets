import csv
import os
from sklearn.feature_extraction.text import CountVectorizer
from scipy.sparse import coo_matrix

write_path = "word_count"
entity_day_dict = dict()

if not os.path.exists(write_path):
    os.makedirs(write_path)

# read all files and store their contents on a dictionary
for i in os.listdir(os.getcwd() + "/filtered_tweets"):
    for filename in os.listdir(os.getcwd() + "/filtered_tweets" + "/" + i):
        entity_day_dict[i+" "+filename.split('.', 1)[0]] = open(os.getcwd() + "/filtered_tweets" + "/" + i + "/" + filename, 'r').read()



for entity_day in entity_day_dict:
    entity_day_values = entity_day.split(' ', 1)

    if not os.path.exists(write_path + "/" + entity_day_values[0]):
        os.makedirs(write_path + "/" + entity_day_values[0])

    test = entity_day_dict[entity_day]

    word_count = dict()
    tf_vectorizer = CountVectorizer()

    tf = tf_vectorizer.fit_transform([test])

    cx = coo_matrix(tf)
    words = tf_vectorizer.get_feature_names()
    csv_writer = csv.writer(open(write_path + "/" + entity_day_values[0] + "/" + entity_day_values[1] + ".csv", "wb"))

    for i,j,v in zip(cx.row, cx.col, cx.data):
        csv_writer.writerow([words[j], v])
