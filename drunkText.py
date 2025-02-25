import time
from threading import Thread, Lock
import sys

lock = Lock()

def animate_text(text, delay=0.1):
    with lock:
        for char in text:
            sys.stdout.write(char)
            sys.stdout.flush()
            time.sleep(delay)
        print()

def sing_lyric(lyric, delay, speed):
    time.sleep(delay)
    animate_text(lyric, speed)

def sing_song():
    lyrics = [
        ("Deleted the message, but I still remember it said", 0.08),
        ("I wish I was who you drunk texted at midnight", 0.07),
        ("Wish I was the reason you stay up 'til 3", 0.07),
        ("And you can't fall asleep", 0.09),
        ("Waiting for me to replyyyyy", 0.12),
    ]
    delays = [0.3, 5.9, 11.2, 14.5, 17.2]
    
    threads = []
    for i in range(len(lyrics)):
        lyric, speed = lyrics[i]
        t = Thread(target=sing_lyric, args=(lyric, delays[i], speed))
        threads.append(t)
        t.start()
    
    for thread in threads:
        thread.join()

if __name__ == "__main__":
    sing_song()