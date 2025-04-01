super()

if (match.previousArm) {
 match.previousArm.removeView()
 delete match.previousArm
}

match.arm.distributeViewEnd()