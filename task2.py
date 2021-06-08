import os
import hashlib
 
fileNames = os.listdir()
for i in range(len(fileNames)):
    fileName = fileNames[i]
    file = open(f"{fileName}", "r").read()
    sha = hashlib.sha3_256()
    sha.update(f"{file}".encode('utf-8'))
    print(fileName, sha.hexdigest())