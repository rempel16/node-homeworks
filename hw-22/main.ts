function capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function reverseString(str: string): string {
    return str.split('').reverse().join('')
}

console.log(capitalize('hello world'))
console.log(reverseString('hello world'))

namespace Finance {
    export class LoanCalculator {
        constructor(
            public principal: number,
            public annualRate: number,
            public months: number
        ) {}

        calculateMonthlyPayment(): number {
            const monthlyRate = this.annualRate / 12 / 100
            return this.principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -this.months))
        }
    }

    export class TaxCalculator {
        constructor(public income: number, public taxRate: number) {}

        calculateTax(): number {
            return this.income * this.taxRate / 100
        }
    }
}

const loan = new Finance.LoanCalculator(100000, 12, 12)
console.log('Monthly Loan Payment:', loan.calculateMonthlyPayment().toFixed(2))

const tax = new Finance.TaxCalculator(50000, 13)
console.log('Income Tax:', tax.calculateTax().toFixed(2))

namespace UserManagement {
    export namespace Admin {
        export class AdminUser {
            constructor(
                public name: string,
                public email: string,
                public isSuperAdmin = false
            ) {}

            grantSuperAdmin() {
                this.isSuperAdmin = true
            }

            revokeSuperAdmin() {
                this.isSuperAdmin = false
            }
        }
    }
}

const admin = new UserManagement.Admin.AdminUser('Alex', 'alex@mail.com')
console.log('Admin before:', admin)
admin.grantSuperAdmin()
console.log('Admin after granting super admin:', admin)
admin.revokeSuperAdmin()
console.log('Admin after revoking super admin:', admin)

function generateFibonacci(limit: number): number[] {
    const result: number[] = [];
    let a = 0, b = 1
    while (a <= limit) {
        result.push(a),
        [a, b] = [b, a + b]
    }
    return result
}

function generatePrimeNumbers(limit: number): number[] {
    const primes: number[] = []
    for (let i = 2; i <= limit; i++) {
        let isPrime = true;
        for (let j = 2; j * j <= i; j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) primes.push(i)
    }
    return primes;
}

console.log('Fibonacci up to 50:', generateFibonacci(50))
console.log('Primes up to 50:', generatePrimeNumbers(50))