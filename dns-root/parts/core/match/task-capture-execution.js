super()

if (part.previousArm) {
 part.previousArm.endTask()
 delete part.previousArm
}

part.arm.captureTaskExecution()