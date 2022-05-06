import pyautogui as pg

import time

print("program will run in 5 sec")


time.sleep(0.5)

for i in range(100):
    pg.write("chhoti bachhi ho kya")
    time.sleep(0.1)
    pg.press("enter")