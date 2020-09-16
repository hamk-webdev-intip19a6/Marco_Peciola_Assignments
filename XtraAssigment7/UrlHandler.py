from bs4 import BeautifulSoup
import re
from collections import Counter

badwords = []
try:
    with open('badwords.txt', 'r') as file:  
        badwords = file.read().splitlines() 
except EnvironmentError: 
    print ("Could not open file")

def urlChecker(userInput):
    try:
        import requests
        page = requests.get(userInput)
        if (page.status_code > 400):         
            return "Page couldn't be saved"
        soup = BeautifulSoup(page.content,'lxml')
        total = ""
        for match in soup.find_all('p'):
            total += str(match.get_text())
        if total is False:
            return "Couldn't scrape any text"
        print(total)
        counts = 0
        for word in badwords:
            if word in total:
                counts +=1
        return counts
    except requests.exceptions.RequestException as e:
        return "Could not open url:"
