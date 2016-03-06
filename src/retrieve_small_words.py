
read_path = "filtered_tweets"


for filename in os.listdir(read_path):
    entity_codename = filename.split(".", 1)[0]

    current_read_file = csv.reader(open(read_path + "/" + filename, 'rb'), delimiter="\t", quotechar='|',
                                   quoting=csv.QUOTE_MINIMAL)
    queries = current_read_file.next()

    for row in current_read_file:
    	text = row[1]