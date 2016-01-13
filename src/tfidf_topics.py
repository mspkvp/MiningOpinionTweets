import os
import logging
from collections import defaultdict
import csv

logging.basicConfig(filename='tfidf_analyzer.log', level=logging.DEBUG)


def retrieve_tfidf_scores():

    entity_day_dict = dict()

    # read all files and store their contents on a dictionary
    for i in os.listdir(os.getcwd() + "/filtered_tweets"):
        for filename in os.listdir(os.getcwd() + "/filtered_tweets" + "/" + i):
            entity_day_dict[i+" "+filename] = open(os.getcwd() + "/filtered_tweets" + "/" + i + "/" + filename, 'r').read()

    corpus = []
    entity_day_key_index = dict()
    i = 0
    for key in entity_day_dict:
        entity_day_key_index[i] = key
        corpus.append(entity_day_dict[key])
        i += 1

    from sklearn.feature_extraction.text import TfidfVectorizer
    tf = TfidfVectorizer(analyzer='word', ngram_range=(1,1), min_df=0.01)

    tfidf_matrix = tf.fit_transform(corpus)
    feature_names = tf.get_feature_names()

    from scipy.sparse import coo_matrix
    cx = coo_matrix(tfidf_matrix)


    logging.info("Organizing words per entity a day...")
    words_entity_day = defaultdict(list)

    for i,j,v in zip(cx.row, cx.col, cx.data):
        try:
            words_entity_day[i]
        except KeyError:	
            words_entity_day[i] = []
        words_entity_day[i].append((feature_names[j], v))

    logging.info("Sorting words on each entity/day...")
    for key, value in words_entity_day.iteritems():
        words_entity_day[key] = sorted(value, key=lambda t: t[1], reverse=True)

    if not os.path.exists("./tfidf_scores/"):
        os.makedirs("./tfidf_scores/")

    logging.info("Writing to files...")
    file = csv.writer(open('tfidf_scores.csv', 'wb'))

    for key, value in words_entity_day.iteritems():
        logging.info('\tWriting to {0}'.format(entity_day_key_index[key]))
        #f = open("./tfidf_scores/" + entity_day_key_index[key], 'w')
        #for word, rating in value:
        #    f.write(u'{0: <25} {1}\n'.format(word, rating))
        #f.close()
        split = entity_day_key_index[key].split(' ')
        date = split[0]
        entity_name = split[1].split('.')[0]
        array_to_write = [entity_name, date]

        for word, rating in value[0:20]:
            array_to_write.append(word)

        file.writerow(array_to_write)


    return

retrieve_tfidf_scores()
