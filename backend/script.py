#!/usr/bin/python
import sys
from caesarcipher import CaesarCipher

frase = sys.argv[1]
crc8total = sys.argv[2]

# En este script únicamente ejecuto el cifrado césar mediante 
# la llamada al método de cifrado de la librería CaesarCipher
cipher = CaesarCipher(frase.lower(), offset=int(crc8total))

# Y devuelvo el texto encriptado a Node JS
print(str(cipher.encoded))
