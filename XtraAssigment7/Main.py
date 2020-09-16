from UrlHandler import urlChecker

while (True):
    print("Im'm the profanity checker")
    urlToCheck = input("Give me an url, i will count the amount of hate-words: ")
    print ("The total amount of profanities found on the given url:",urlChecker(urlToCheck))

# http://www.google.com
# https://www.pornhub.com/