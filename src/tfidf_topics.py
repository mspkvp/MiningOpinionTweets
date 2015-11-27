from collections import defaultdict
import csv

tweets = defaultdict(list)
with open (u"José Mourinho_filtered.csv", "r") as tweets_file:
    reader = csv.reader(tweets_file, delimiter="\t", quotechar='|', quoting=csv.QUOTE_MINIMAL)
    for row in reader:
        tweets[row[0]].append(row[1])

# text comes in a list as ['text'] and we need the 'text' only
for entity, text in tweets.items():
    tweets[entity] = "".join(text)

corpus = []
for entity, text in sorted(tweets.items(), key=lambda e: entity):
    corpus.append(text)

from sklearn.feature_extraction.text import TfidfVectorizer
tf = TfidfVectorizer(analyzer='word', ngram_range=(1,1), min_df = 0)

tfidf_matrix = tf.fit_transform(corpus)
feature_names = tf.get_feature_names()

print(len(feature_names))

print(len(tfidf_matrix.toarray()))

# sum values from all documents
word_vals = [0.0]*len(tfidf_matrix.toarray())

for idx, row in enumerate(tfidf_matrix.toarray()):
    for col in row:
        word_vals[idx] = (word_vals[idx] + col)/2.0

# dense = tfidf_matrix.todense()
tweets_entity = word_vals # tfidf_matrix.toarray()[0] # dense[0].tolist()[0]

phrase_scores = [pair for pair in zip(range(0, len(tweets_entity)), tweets_entity) if pair[1] > 0]
sorted_phrase_scores = sorted(phrase_scores, key=lambda t: t[1] * -1)

for phrase, score in [(feature_names[word_id], score) for (word_id, score) in sorted_phrase_scores]:
    print(u'{0: <25} {1}'.format(phrase,score))

############################################
#   DEBUG
###########################################
#"""for entity in tweets.keys()[0:5]:
#    print entity
#    print tweets[entity]

#raise SystemExit(0)
#"""