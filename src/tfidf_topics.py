from collections import defaultdict
import csv

tweets = defaultdict(list)
with open ("josemourinho.csv", "r") as tweets_file:
    reader = csv.reader(tweets_file, delimiter="\t", quotechar='|', quoting=csv.QUOTE_MINIMAL)
    reader.next()
    for row in reader:
        tweets[row[0]].append(row[1])

# text comes in a list as ['text'] and we need the 'text' only
for entity, text in tweets.iteritems():
    tweets[entity] = "".join(text)

corpus = []
for entity, text in sorted(tweets.iteritems(), key=lambda e: entity):
    corpus.append(text)

from sklearn.feature_extraction.text import TfidfVectorizer
tf = TfidfVectorizer(analyzer='word', ngram_range=(1,3), min_df = 0)

tfidf_matrix =  tf.fit_transform(corpus)
feature_names = tf.get_feature_names()

dense = tfidf_matrix.todense()
tweets_entity = dense[0].tolist()[0]
phrase_scores = [pair for pair in zip(range(0, len(tweets_entity)), tweets_entity) if pair[1] > 0]

sorted_phrase_scores = sorted(phrase_scores, key=lambda t: t[1] * -1)

topics_ratings = {}
for phrase, score in [(feature_names[word_id], score) for (word_id, score) in sorted_phrase_scores][:20]:
    print(u'{0: <20} {1}'.format(phrase,score))

############################################
#   DEBUG
###########################################
#"""for entity in tweets.keys()[0:5]:
#    print entity
#    print tweets[entity]

#raise SystemExit(0)
#"""