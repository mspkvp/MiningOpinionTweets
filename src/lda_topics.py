
from __future__ import print_function
from time import time
import csv

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation

import os

def print_top_words(model, feature_names, n_top_words):
    for topic_idx, topic in enumerate(model.components_):
        print("Topic #%d:" % topic_idx)
        print(" ".join([feature_names[i]
                        for i in topic.argsort()[:-n_top_words - 1:-1]]))
    print()

corpus = []
tfidif_top_topics = csv.reader(open("tfidf_scores.csv", 'rb'), delimiter="\t", quotechar='|', quoting=csv.QUOTE_MINIMAL)

for row in tfidif_top_topics:
    corpus.append(row[0].split(",")[2:])

#entity_day_dict = dict()

# read all files and store their contents on a dictionary
#for i in os.listdir(os.getcwd() + "/filtered_tweets"):
#    for filename in os.listdir(os.getcwd() + "/filtered_tweets" + "/" + i):
#        entity_day_dict[i+" "+filename] = open(os.getcwd() + "/filtered_tweets" + "/" + i + "/" + filename, 'r').read()

#entity_day_key_index = dict()
#i = 0
#for key in entity_day_dict:
#    entity_day_key_index[i] = key
#    corpus.append(entity_day_dict[key])
#    i += 1

n_features = 10000
n_topics = 30
n_top_words = 25

# Use tf (raw term count) features for LDA.
print("Extracting tf features for LDA...")
tf_vectorizer = CountVectorizer(max_df=0.95, min_df=2, max_features=n_features,
                                stop_words='english')
t0 = time()
tf = tf_vectorizer.fit_transform(corpus)
print("done in %0.3fs." % (time() - t0))

print("Fitting LDA models with tf")
lda = LatentDirichletAllocation(n_topics=n_topics, max_iter=5,
                                learning_method='online', #learning_offset=50.,
                                random_state=0)
t0 = time()
lda.fit(tf)
print("done in %0.3fs." % (time() - t0))

print("\nTopics in LDA model:")
tf_feature_names = tf_vectorizer.get_feature_names()
print_top_words(lda, tf_feature_names, n_top_words)