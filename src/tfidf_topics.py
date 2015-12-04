from collections import defaultdict
import csv
import os
import datetime

def getfilenames( entities, date ):
    print(date)
    for i in os.listdir(os.getcwd()):
        print(i)
def retrieve_tfidf_scores( filenames ):
    corpus = []

    tweets = defaultdict(list)
    for filename in filenames:
        with open (filename, "r") as tweets_file:
            reader = csv.reader(tweets_file, delimiter="\t", quotechar='|', quoting=csv.QUOTE_MINIMAL)
            for row in reader:
                tweets[row[0]].append(row[1])

        # text comes in a list as ['text'] and we need the 'text' only
        for entity, text in tweets.items():
            tweets[entity] = "".join(text)

        for entity, text in sorted(tweets.items(), key=lambda e: entity):
            corpus.append(text)

    from sklearn.feature_extraction.text import TfidfVectorizer
    tf = TfidfVectorizer(analyzer='word', ngram_range=(1,1), min_df = 0)

    tfidf_matrix = tf.fit_transform(corpus)
    feature_names = tf.get_feature_names()

    #print("Feature Names: " + str(len(feature_names)))

    # sum values from all documents
    n_features = len(feature_names)
    word_rating = [0.0]*n_features
    n_tweets = len(tfidf_matrix.indptr)-1

    from scipy.sparse import coo_matrix
    cx = coo_matrix(tfidf_matrix)

    for i,j,v in zip(cx.row, cx.col, cx.data):
        word_rating[j] += v

    #print("Amount of Tweets: "+str(n_tweets))
    #print("Amount of Words: " + str(n_features))

    for idx, val in enumerate(word_rating):
        word_rating[idx] /= n_tweets

    feature_rate_list = zip (feature_names, word_rating)

    sorted_phrase_scores = sorted(feature_rate_list, key=lambda t: t[1] * -1)

    for f, v in sorted_phrase_scores:
        print(u'{0: <25} {1}'.format(f, v))

    return sorted_phrase_scores

getfilenames( datetime.datetime.now().strftime("%Y-%m-%d") )

#phrase_scores = [pair for pair in zip(range(0, len(word_rating)), word_rating) if pair[1] > 0]
#sorted_phrase_scores = sorted(feature_rate_list, key=lambda t: t[1] * -1)

#for phrase, score in [(feature_names[word_id], score) for (word_id, score) in sorted_phrase_scores]:
#    print(u'{0: <25} {1}'.format(phrase,score))

############################################
#   DEBUG
###########################################
#"""for entity in tweets.keys()[0:5]:
#    print entity
#    print tweets[entity]

#raise SystemExit(0)
#"""