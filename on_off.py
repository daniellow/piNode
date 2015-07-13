import RPi.GPIO as GPIO
import time


def on_off():
	GPIO.setmode(GPIO.BOARD)
	GPIO.setup(15, GPIO.OUT)

	GPIO.output(15, GPIO.HIGH)
	time.sleep(2)
	GPIO.output(15, GPIO.LOW)

	print("Success!")

	GPIO.cleanup()
	return

on_off();
