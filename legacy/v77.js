const program = {
 main: `(ƒ=(x,z)=>eval(program[x]))("environment")`,
 environment: `ƒ("if",{a:"isClient",b:"client",c:"serviceWorker"})`,
 if: `ƒ(z.a)?ƒ(z.b):ƒ(z.c)`,
 client: `console.log("do client")`,
 isClient: `self instanceof (self.Window??class{})`,
 serviceWorker: `console.log("do serviceWorker")`
}
eval(program.main)
