from urllib.request import urlopen
import requests, re

while (True):  
    try: 
        url = input("Give me an URL: ")
        if (requests.get(url).status_code > 400) : break
        url = urlopen(url)
        with open(input("Give a path: "),"wb") as file: file.write(url.read())
        print ("saved html")
        break
    except:
        print ("failed to save")
        continue
    
