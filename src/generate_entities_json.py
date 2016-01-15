import json

read = open("entities.txt", "rb")
write =  open("pages/data/entities.json", "wb")

entities = []
for line in read:
	values = line.split("|")
	name = values[0]
	code = values[1]
	entities.append({'name': name, 'code': code})

json.dump(entities, write)