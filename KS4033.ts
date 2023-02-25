
/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/


enum MBMotor {
    //% block="left"
    Left = 0,
    //% block="right"
    Right = 1
}

enum MBDirection {
    //% block="forward"
    Forward = 0,
    //% block="backward"
    Backward = 1
}

/**
 * Custom blocks
 */
// Use FontAwesome icon numbers https://fontawesome.com/
// "Truck" is f0d1: https://fontawesome.com/v4/icon/Truck
//% weight=100 color=#FFA833 icon="\uf0d1"
//% block="KS4033 Motor"
namespace motorcontrol {

    // State variables
    let moving = false
    let motorSpeeds = [200, 200]
    let motorDirections = [MBDirection.Forward, MBDirection.Forward]

    function updateMotion() {
        // Stop all motors 
        pins.digitalWritePin(DigitalPin.P12, 0)
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)

        if (moving == true) {
            if (motorDirections[MBMotor.Left] == MBDirection.Forward) {
                pins.analogWritePin(AnalogPin.P13, motorSpeeds[MBMotor.Left])
                pins.digitalWritePin(DigitalPin.P12, 0)
            } else {
                pins.analogWritePin(AnalogPin.P12, motorSpeeds[MBMotor.Left])
                pins.digitalWritePin(DigitalPin.P13, 0)
            }

            if (motorDirections[MBMotor.Right] == MBDirection.Forward) {
                pins.analogWritePin(AnalogPin.P15, motorSpeeds[MBMotor.Right])
                pins.digitalWritePin(DigitalPin.P16, 0)
            } else {
                pins.analogWritePin(AnalogPin.P16, motorSpeeds[MBMotor.Right])
                pins.digitalWritePin(DigitalPin.P15, 0)
            }
        }
        // Pause a bit before possibly re-enabling
        //basic.pause(100)
    }


    //% block="set left motor to $leftSpeed and right to $rightSpeed"
    //% leftSpeed.min=0 leftSpeed.max=1023 leftSpeed.defl=200
    //% rightSpeed.min=0 rightSpeed.max=1023 rightSpeed.defl=200
    export function setMotorSpeeds(leftSpeed: number, rightSpeed: number) {
        motorSpeeds = [leftSpeed, rightSpeed]
        updateMotion()
    }

    //% block="set $motor to $speed"
    //% speed.min=0 speed.max=1023 speed.defl=200
    export function setMotorSpeed(motor: MBMotor, speed: number) {
        motorSpeeds[motor] = speed
        updateMotion()
    }


    //% block="set motor $motor to $direction"
    //% motor.defl=Motor.LeftMotor
    //% direction.defl=MBDirection.Forward
    export function setMotorDirection(motor: MBMotor, direction: MBDirection): void {
        motorDirections[motor] = direction
        updateMotion()
    }

    /** 
     * Move motors
     * @param onOrOff if true, move forward and backward otherwise
     */
    //% block="move $onOrOff"
    //% onOrOff.shadow=toggleOnOff
    //% onOrOff.defl=true
    export function move(onOrOff: boolean): void {
        moving = onOrOff
        updateMotion()
    }
}
// Set initial state and values
led.enable(false)
motorcontrol.move(false)



