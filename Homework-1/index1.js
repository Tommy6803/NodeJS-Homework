const colors = require("colors");

let primeCount = 1;

let [primeStart, primeEnd] = process.argv.slice(2)
const colorsPallete = [colors.red, colors.yellow, colors.green]

if (!primeStart || !primeEnd) {
    console.log(colors.red('ошибка'));
} else {
    if (primeStart < 2) {
        primeStart = 2;
    }

    for (let i = primeStart; i <= primeEnd; i++) {
        let isPrime = true

        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isPrime = false;
            }
        }

        if (isPrime) {
            console.log(colorsPallete[primeCount % 3](i))
            primeCount++;
        }
    }

    if (!primeCount) {
        console.log(colors.red('ошибка'));
    }
}