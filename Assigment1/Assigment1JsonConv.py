import json


def returnDictionary():
    try:
        with open('data.json') as json_file:
            ladattu = json.load(json_file)
            return (ladattu)
    except:
        dictionary = {"dog":"koira", "cat":"kissa", "general":"yleinen"}
        return dictionary
    


def saveDictionary(_dictionary):
    with open('data.json', 'w') as json_file:
        json.dump(_dictionary, json_file)
