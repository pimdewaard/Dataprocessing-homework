#!/usr/bin/env python
# Name: Pim de Waard
# Student number: 5894778
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import urllib2
import csv

from pattern.web import URL, DOM, plaintext
from pattern.web import NODE, TEXT, COMMENT, ELEMENT, DOCUMENT

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'


def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''
    
    # ADD YOUR CODE HERE TO EXTRACT THE ABOVE INFORMATION ABOUT THE
    # HIGHEST RATED TV-SERIES
    # NOTE: FOR THIS EXERCISE YOU ARE ALLOWED (BUT NOT REQUIRED) TO IGNORE
    # UNICODE CHARACTERS AND SIMPLY LEAVE THEM OUT OF THE OUTPUT.
    tv_series =[]
    series_list = []
    genre_list =[]
    runtime_list = []
    rating_list= []
    table = []
    actor_row = []
    actors_list = []
    
    
    for e in dom.get_elements_by_tagname("div.lister-item-content")[:20]: # Top 20 entries
        for h3 in e('h3 a'):
            series_list.append(encode(plaintext(h3.content)))
            
        for p in e.get_elements_by_tagname("p.text-muted"):
            for span in e.get_elements_by_tagname("span.runtime"):     # Runtime
                runtime_list.append(plaintext(span.content)[:2])
            for span in e.get_elements_by_tagname("span.genre"):        # Genre
                genre_list.append(plaintext(span.content))
                
        for div in e.get_elements_by_tagname("div.ratings-bar"):
            for div in e.get_elements_by_tagname("div.inline-block ratings-imdb-rating"):
                rating_list.append(plaintext(div.content))                            #rating
        
        for p in e('p a'):      # for loop for scraping actors
            s = " "
            actor_row.append(plaintext(p.content))  # actor names are separated strings, this joins the string into one element for the table
            
        actors_list.append(s.join(actor_row))
        actor_row [:] = []
         

    for series, rating, genre, actors, runtime in zip(series_list, rating_list, genre_list, actors_list, runtime_list):
        table = (series, rating, genre, actors, runtime)
        tv_series.append(table)         # creating the table with all information
    
    return tv_series


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])
    writer.writerows(tvseries)  #writing rows to file

    # ADD SOME CODE OF YOURSELF HERE TO WRITE THE TV-SERIES TO DISK

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)
