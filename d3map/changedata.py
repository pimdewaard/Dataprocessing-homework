# changes csv file to json file with countries as key and
# fillkey code 

import csv
import json

jsonfile = open('test2.json', 'w')

denslist = []
codelist = []
countrylist = []
correct = []
with open('popdens.csv') as csvfile:
  reader = csv.DictReader(csvfile, delimiter = ";")
  for row in reader:
      denslist.append(row['Populationdens'])
      codelist.append(row['Countrycode'])
      countrylist.append(row['Country'])

values =[]
densvalues = []
for i in range (0, (len(denslist))):
    b = int(float((denslist[i])))
    densvalues.append(b)

    if b >= 1000:
        values.append(">1000")
        continue
    if b >= 500:
        values.append("500-1000")
        continue
    if b >= 250:
        values.append("250-500")
        continue
    if b >= 125:
        values.append("125-250")
        continue
    if b >= 60:
        values.append("60-125")
        continue
    if b >= 30:
        values.append("30-60")
        continue
    if b >= 15 :
        values.append("15-30")
        continue
    if b >= 7 :
        values.append("7-15")
        continue
    if b >= 0 :
        values.append("0-7")
        continue

for code, dens, country, densvalue in zip (codelist, values, countrylist, densvalues):
    table = (code, dens, country, densvalue)
    correct.append(table)

jsonfile.write("{")
jsonfile.write("\n")
for row in correct:
    jsonfile.write("'")
    jsonfile.write(row[0])
    jsonfile.write("': {fillKey: '")
    jsonfile.write(row[1])
    jsonfile.write("', density : '")
    jsonfile.write(str(row[3]))
    jsonfile.write("' },")
    jsonfile.write("\n")

jsonfile.write("}")
