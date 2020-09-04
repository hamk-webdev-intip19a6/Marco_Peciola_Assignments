'''Make a Python program, which can validate if the input 
string is a valid Finnish id number. You must calculate that the checksum
is correct. Also output the birthdate of the person in
 format day.month.year and tell the gender (male/female)'''
import re

SecretDict = {"A":10, "B":11, "C":12, "D":13, "E":14, "F":15, "H":16, "J":17, "K":18, "L":19, "M":20, "N":21, "P":22, "R":23, "S":24, "T":25, "U":26, "V":27, "W":28, "X":29, "Y":30}
while (True):
    try:
        answer = input("Give an id-number: ")
        if re.match(r"^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d+|\d\d-|[01]\dA)\d{3}[\dABCDEFHJKLMNPRSTUVWXY]$",answer):
            if (answer[6] == "-"):
                y = ".19"+answer[4:6]
            else:
                y = ".20"+answer[4:6]
            ageF = "born in {d}.{m}".format(d = answer[0:2], m = answer[2:4]+y)      
            sex = int(answer[7:10])
            checksum = (answer[0:6]+answer[7:10])
            lastN = int(answer[-1])
            if (lastN is not (int(checksum)%31)):
                print ("Checksum not valid")
                break
            elif sex %2==0:
                print ("You are a female",ageF)
            else:
                print ("You are a male",ageF)   
    except ValueError:
            lastL = answer[-1]
            if int(checksum)%31 != SecretDict[answer[-1]]:
                print("CheckSum not valid")
                break
            elif sex %2==0:
                print ("You are a female",ageF)
            else:
                print ("You are a male",ageF) 


               



     