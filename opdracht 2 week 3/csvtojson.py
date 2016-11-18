#data from https://www.worlddata.info/downloads/

#Pim de Waard
#5894778


import csv
import json

csvfile = open('countries.csv', 'r')
jsonfile = open('countrylifeexp.json', 'w')


reader = csv.DictReader( csvfile, delimiter =";")

for rows in reader:
    out = json.dump(rows, jsonfile)
    jsonfile.write("\n")
