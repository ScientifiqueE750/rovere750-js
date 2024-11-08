def on_data_received():
    Rover.motor_stop_all(MotorActions.STOP)
serial.on_data_received(serial.delimiters(Delimiters.CARRIAGE_RETURN),
    on_data_received)

def on_received_value(name, value):
    if name == "":
        pass
    if name == "":
        pass
    if name == "":
        pass
    if "" == "":
        pass
radio.on_received_value(on_received_value)

def on_forever():
    if control.device_serial_number() == 4785 and control.device_name() == "E750rover_perif":
        serial.redirect(SerialPin.USB_TX, SerialPin.USB_RX, BaudRate.BAUD_RATE4800)
        serial.write_string("Séance modifications lancer veuillez communiquer via la console micro:bit")
basic.forever(on_forever)

def on_forever2():
    radio.send_number(sonar.ping(DigitalPin.P2, DigitalPin.P1, PingUnit.CENTIMETERS))
basic.forever(on_forever2)

def on_forever3():
    radio.send_value("Robot en marche", 1e+44)
basic.forever(on_forever3)

def on_forever4():
    music.play(music.tone_playable(sonar.ping(DigitalPin.P2, DigitalPin.P1, PingUnit.CENTIMETERS),
            music.beat(BeatFraction.BREVE)),
        music.PlaybackMode.UNTIL_DONE)
basic.forever(on_forever4)

def on_forever5():
    pass
basic.forever(on_forever5)

def on_in_background():
    music.set_volume(255)
    radio.set_group(2012)
    radio.set_frequency_band(80)
    radio.set_transmit_power(450)
control.in_background(on_in_background)
