'''Make a Python program, which can validate if the input 
string is a valid Finnish id number. You must calculate that the checksum
is correct. Also output the birthdate of the person in
 format day.month.year and tell the gender (male/female)'''

import re

while (True):
    try:
        answer = str(input("Give an id-number: "))
        
    except:
        print ("Could not read id")


     