from __future__ import print_function
from time import time
import csv
import sys
import os

from sklearn.feature_extraction.text import CountVectorizer

import numpy as np
import lda

import logging
logging.basicConfig(filename='lda_analyser.log', level=logging.DEBUG)

if not os.path.exists("results"):
    os.makedirs("results")

entity_code = sys.argv[1]
n_topics = sys.argv[2]
n_features = 10000
n_top_words = int(sys.argv[2]) + 1

corpus = []
topics_write_file = csv.writer(open("lda_topics_{}topics_{}words_{}.csv".format(n_topics,
                                                                                n_top_words - 1,
                                                                                entity_code), "wb"),
                               delimiter="\t", quotechar='|', quoting=csv.QUOTE_MINIMAL)
write_file = csv.writer(open("results/lda_topics_{}topics_{}words_mapping_{}.csv".format(n_topics,
                                                                                 n_top_words - 1,
                                                                                 entity_code), "wb"),
                                delimiter="\t", quotechar='|', quoting=csv.QUOTE_MINIMAL)


def print_top_words(model, doc_topic, feature_names, n_top_words, dictionary):
    for i, topic_dist in enumerate(model):

        topic_words = np.array(feature_names)[np.argsort(topic_dist)][:-n_top_words:-1]
        #write_file.write('Topic {}: {}\n'.format(i, ' '.join(topic_words)))
        topic_row = [str(i)]
        topic_row.extend(topic_words)
        topics_write_file.writerow(topic_row)

    for i in range(len(corpus)):
        document_row = [dictionary[i][0], dictionary[i][1]]
        document_row.append(doc_topic[i].argmax())
        #document_row.append(corpus[i])
        write_file.writerow(document_row)


entity_day_dict = dict()

# read all files and store their contents on a dictionary
for i in os.listdir(os.getcwd() + "/filtered_tweets"):
    for filename in os.listdir(os.getcwd() + "/filtered_tweets" + "/" + i):
        if(filename == entity_code + ".txt"):
            entity_day_dict[i+" "+filename] = open(os.getcwd() + "/filtered_tweets" + "/" + i + "/" + filename, 'r').read()


entity_day_key_index = dict()
i = 0
for key in entity_day_dict:
    entity_day_key_index[i] = key.split(" ")
    corpus.append(entity_day_dict[key])
    i += 1



# Use tf (raw term count) features for LDA.
logging.info("Extracting tf features for LDA...")
tf_vectorizer = CountVectorizer(max_df=0.95, min_df=2, max_features=n_features,
                                stop_words='english')
t0 = time()
tf = tf_vectorizer.fit_transform(corpus)

logging.info("done in %0.3fs." % (time() - t0))

logging.info("Fitting LDA models with tf")
model = lda.LDA(n_topics=n_topics, n_iter=1500, random_state=1)
    #LatentDirichletAllocation(n_topics=n_topics, max_iter=5, learning_method='online', #learning_offset=50., random_state=0)
t0 = time()
model.fit(tf)
logging.info("done in %0.3fs." % (time() - t0))


topic_word = model.topic_word_
doc_topic = model.doc_topic_
logging.info("\nTopics in LDA model:")
tf_feature_names = tf_vectorizer.get_feature_names()
print_top_words(topic_word, doc_topic, tf_feature_names, n_top_words, entity_day_key_index)