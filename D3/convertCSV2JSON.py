#data from https://www.worlddata.info/downloads/

#Pim de Waard
#5894778

import csv
import json

# constants to make everything easier
csvfile = open('top20city.csv', 'r')
jsonfile = 'top20city.json'

# file is separated by ";"
reader = csv.DictReader( csvfile, delimiter =";")

# created a list and adds the rows to the list
json_list = []
for row in reader:
    json_list.append(row)

# writes the json output to the file
file(jsonfile, 'w').write(json.dumps(json_list))
