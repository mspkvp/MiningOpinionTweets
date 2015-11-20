# -*- coding: utf-8 -*-

from collections import defaultdict
import csv

tweets = defaultdict(list)
with open ("José Mourinho.csv", "r") as tweets_file:
    reader = csv.reader(tweets_file, delimiter="\t", quotechar='|', quoting=csv.QUOTE_MINIMAL)
    #reader.next() # skip the first row (has the keys identifying the values
    for row in reader:
       #tweets[row[0]].append(row[3])
        print row

raise SystemExit(0)

# text comes in a list as ['text'] and we need the 'text' only
for entity, text in tweets.iteritems():
    tweets[entity] = "".join(text)

############################################
#   DEBUG
###########################################
"""for entity in tweets.keys()[0:5]:
    print entity
    print tweets[entity]
"""

corpus = []
for entity, text in sorted(tweets.iteritems(), key=lambda e: entity):
    corpus.append(text)

from sklearn.feature_extraction.text import TfidfVectorizer
tf = TfidfVectorizer(analyzer='word', ngram_range=(1,1), min_df = 0, max_df=(0.8,1))

tfidf_matrix =  tf.fit_transform(corpus)
feature_names = tf.get_feature_names()

# print nr of features found
print len(feature_names)

"""sorted_phrase_scores = sorted(phrase_scores, key=lambda t: t[1] * -1)
for phrase, score in [(feature_names[word_id], score) for (word_id, score) in sorted_phrase_scores][:20]:
   print('{0: <20} {1}'.format(phrase, score))"""