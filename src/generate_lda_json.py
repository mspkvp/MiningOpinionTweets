import csv
import json
import os

lda_topics = csv.reader(open("lda_topics.csv", "rb"), delimiter="\t", quotechar='|', quoting=csv.QUOTE_MINIMAL)
lda_mapping = csv.reader(open("lda_topics_mapping.csv", "rb"), delimiter="\t", quotechar='|', quoting=csv.QUOTE_MINIMAL)


# load topics
topics = []
for row in lda_topics:
	topics.append({"id": row[0], "words": row[1:]})

for row in lda_mapping:
	entity = row[0]
	day = row[1]
	topic_id = int(row[2])
	topic = topics[topic_id]

	if not os.path.exists("pages/data/raw/lda_topics/" + entity):
		os.makedirs("pages/data/raw/lda_topics/" + entity)


	json.dump(topic, open("pages/data/raw/lda_topics/" + entity + "/" + day + ".json", "wb"))