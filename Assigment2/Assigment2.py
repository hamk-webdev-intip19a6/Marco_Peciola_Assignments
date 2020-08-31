import re
import statistics

s = input("")
listN = re.findall(r'[-+]?[\d]+',s)
for i in range(len(listN)): 
    listN[i] = int(listN[i]) 
print (round(sum(listN),1), round(statistics.mean(listN),1), round(statistics.median(listN),1))


