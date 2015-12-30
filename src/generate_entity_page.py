import sys
import csv
import json

entity_code = sys.argv[1]
write_file = open(sys.argv[1] + ".json", "w")
extracted_tweets_file = csv.reader(open("extracted_tweets/" + entity_code + ".csv", 'rb'), delimiter="\t", quotechar='|',
                                   quoting=csv.QUOTE_MINIMAL)

queries = extracted_tweets_file.next()
tweet_count = dict()

comments_json = []
tweet_count_json = []

for row in extracted_tweets_file:
	tweet_id = row[0]
	text = row[1]
	date = row[3]
	date_day = date.split("T", 1)[0]

	if(date_day in tweet_count):
		tweet_count[date_day] += 1
	else:
		tweet_count[date_day] = 0

	line_json = json.dumps({"id": tweet_id, "text": text, "date": date})

	comments_json.append(line_json)

for date, value in sorted(tweet_count.iteritems()):
	tweet_count_json.append({"timestamp": date + "T00:00:00Z", "value": value })

#write_file.write("data.comments = " + json.dumps(comments_json) + ";\n")

write_file.write("data.trends = " + json.dumps(tweet_count_json, indent=4) + ";")

