import Assigment1JsonConv

dictionari = Assigment1JsonConv.returnDictionary()


def start():
    while (True):
        Welcome()
        komento = str(input(""))
        if komento is ("3"):
            Assigment1JsonConv.saveDictionary(dictionari)
            print("Kiitos")
            return
        elif komento is ("2"):
            print("Mistä sanasta haluat käännöksen?")
            kaannettava = str(input("")).lower()
            if (checkifExist(kaannettava) and validateWord(kaannettava)):
                print(checkifExist(kaannettava))
            elif (validateWord(kaannettava)):
                print("Sanaa ei löydetty")
                print("Lisätäänkö sana kirjastoon? Y/N?")
                vastaus = input("").lower()
                if vastaus != ("n" or "no"):
                    kaannos = input("Mikä on kaannos sanalle? ")
                    dictionari[kaannettava] = kaannos
            else: print ("Kentta ei saa olla tyhjä")
        elif (komento is ("1")):
            print("Sanakirjan täydentäminen")
            sana = input("Sana: ")
            kaannos = input("Käännös: ")
            if (checkifExist(sana) and validateWord(sana) and validateWord(kaannos)):
                dictionari[sana] = kaannos
        else:
            print("komentoa ei löytynyt")


def validateWord(_string):
    if (_string == ""):
        return False
    return True


def checkifExist(word):
    for keys, values in dictionari.items():
        if (word == keys):
            return values
        if (word == values):
            return keys


def Welcome():
    tervehdys = [" ", "Sanakirja", "1) Lisää sana",
                 "2) Hae käännöstä", "3) Lopeta", ""]
    for x in tervehdys:
        print(x)
