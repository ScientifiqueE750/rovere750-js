enum RadioMessage {
    message1 = 49434
}
let Autorised: string[] = []
radio.onReceivedNumber(function (receivedNumber) {
    control.waitMicros(6000)
})
input.onGesture(Gesture.EightG, function () {
    while (input.isGesture(Gesture.EightG)) {
        input.setSoundThreshold(SoundThreshold.Loud, 255)
        radio.sendValue("ALERTE-8G", 1e+44)
    }
})
input.onGesture(Gesture.SixG, function () {
    while (input.isGesture(Gesture.SixG)) {
        input.setSoundThreshold(SoundThreshold.Loud, 255)
        radio.sendValue("ALERTE-6G", 1e+44)
    }
})
serial.onDataReceived(serial.delimiters(Delimiters.CarriageReturn), function () {
    Rover.MotorStopAll(MotorActions.Stop)
})
radio.onReceivedString(function (receivedString) {
    control.waitMicros(6000)
})
input.onGesture(Gesture.Shake, function () {
    while (input.isGesture(Gesture.Shake)) {
        input.setSoundThreshold(SoundThreshold.Loud, 255)
        radio.sendValue("ALERTE-SECOUER", 1e+44)
    }
})
radio.onReceivedValue(function (name, value) {
    if (value != Autorised) {
        control.waitMicros(6000)
    }
    if (name == "Autorised") {
        control.waitMicros(6000)
    }
    if (name == "RoverMove_Front") {
        Rover.setALLRGB(Rover.colors(RoverColors.Red))
        Rover.setReceiveString("RoverMove_Front")
        Rover.MotorRunDual(value, value)
        control.waitMicros(4)
        Rover.MotorStopAll(MotorActions.Brake)
    }
    if (name == "RoverMove_Back") {
        Rover.setALLRGB(Rover.colors(RoverColors.Orange))
        Rover.setReceiveString("RoverMove_Back")
        Rover.MotorRunDual(value, value)
        control.waitMicros(4)
        Rover.MotorStopAll(MotorActions.Brake)
    }
    if (name == "RoverMove_Left") {
        Rover.setALLRGB(Rover.colors(RoverColors.Green))
        Rover.setReceiveString("RoverMove_Left")
        Rover.MotorRunDual(value, 0)
        control.waitMicros(4)
        Rover.MotorStopAll(MotorActions.Brake)
    }
    if (name == "RoverMove_Right") {
        Rover.setALLRGB(Rover.colors(RoverColors.Yellow))
        Rover.setReceiveString("RoverMove_Right")
        Rover.MotorRunDual(0, value)
        control.waitMicros(4)
        Rover.MotorStopAll(MotorActions.Brake)
    }
    if (name == "Battery_Tension") {
        Rover.setALLRGB(Rover.colors(RoverColors.Black))
        Rover.setReceiveString("Battery_Tension")
        radio.sendMessage(Rover.BatteryLevel())
    }
})
input.onGesture(Gesture.ScreenUp, function () {
    while (input.isGesture(Gesture.ScreenUp)) {
        input.setSoundThreshold(SoundThreshold.Loud, 255)
        radio.sendValue("ALERTE-ECRANVERSLEHAUT", 1e+44)
    }
})
input.onGesture(Gesture.FreeFall, function () {
    while (input.isGesture(Gesture.FreeFall)) {
        input.setSoundThreshold(SoundThreshold.Loud, 255)
        radio.sendValue("ALERTE-CHUTELIBRE", 1e+44)
    }
})
input.onGesture(Gesture.ScreenDown, function () {
    while (input.isGesture(Gesture.ScreenDown)) {
        input.setSoundThreshold(SoundThreshold.Loud, 255)
        radio.sendValue("ALERTE-ECRANVERSLEBAS", 1e+44)
    }
})
input.onGesture(Gesture.ThreeG, function () {
    while (input.isGesture(Gesture.Shake)) {
        input.setSoundThreshold(SoundThreshold.Loud, 255)
        radio.sendValue("ALERTE-3G", 1e+44)
    }
})
basic.forever(function () {
    radio.sendNumber(sonar.ping(
    DigitalPin.P2,
    DigitalPin.P1,
    PingUnit.Centimeters
    ))
})
basic.forever(function () {
    if (control.deviceSerialNumber() == 4785 && control.deviceName() == "E750rover_perif") {
        serial.redirect(
        SerialPin.USB_TX,
        SerialPin.USB_RX,
        BaudRate.BaudRate4800
        )
        serial.writeString("Séance modifications lancer veuillez communiquer via la console micro:bit")
    }
})
basic.forever(function () {
    radio.sendValue("Robot en marche", 1e+44)
})
basic.forever(function () {
    music.play(music.tonePlayable(sonar.ping(
    DigitalPin.P2,
    DigitalPin.P1,
    PingUnit.Centimeters
    ), music.beat(BeatFraction.Breve)), music.PlaybackMode.UntilDone)
})
control.inBackground(function () {
    Autorised.insertAt(1, "RoverMove_Front")
    Autorised.insertAt(2, "RoverMove_Back")
    Autorised.insertAt(3, "RoverMove_Left")
    Autorised.insertAt(4, "RoverMove_Back")
    Autorised.insertAt(5, "Battery_Tension")
    music.setVolume(255)
    radio.setGroup(2012)
    radio.setFrequencyBand(80)
    radio.setTransmitPower(450)
})
