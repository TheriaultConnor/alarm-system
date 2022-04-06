let base = false
let alarmNum = 0
let detector = false
input.onButtonPressed(Button.A, function () {
    basic.pause(9000)
    radio.sendString("alarmSet")
    music.playTone(587, music.beat(BeatFraction.Whole))
    base = true
    basic.showLeds(`
        # . # . #
        # # # # #
        # . # . #
        # # # # #
        # . # . #
        `)
})
radio.onReceivedString(function (receivedString) {
    alarmNum = 0
    if (receivedString == "alarmSet") {
        detector = true
    }
    if (detector == true) {
        basic.showLeds(`
            # . # . #
            # # # # #
            # . # . #
            # # # # #
            # . # . #
            `)
    }
    if (receivedString == "alarmOff") {
        detector = false
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("alarmOff")
    music.stopAllSounds()
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
})
input.onGesture(Gesture.Shake, function () {
    if (detector == true) {
        alarmNum = 1
    }
    if (detector == false) {
        alarmNum = 0
    }
})
basic.forever(function () {
    if (alarmNum >= 1) {
        music.playTone(587, music.beat(BeatFraction.Breve))
        basic.showString("breach")
    }
})
