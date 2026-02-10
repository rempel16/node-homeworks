// Задание 1
// Абстрактный класс Animal
// Создайте абстрактный класс `Animal` с абстрактным методом `makeSound()`.
// Затем создайте классы `Dog` и `Cat`, которые наследуют `Animal` 
// и реализуют метод `makeSound()` по-своему (`Dog` должен возвращать "Bark", а `Cat` — "Meow").
// Создайте массив типа `Animal[]`, включающий объекты `Dog` и `Cat`,
// и вызовите метод `makeSound()` для каждого элемента массива.

abstract class  Animal {
  abstract makeSound(): string
} 

class Dog extends Animal {
  makeSound() {
    return 'Bark'
  }
}

class Cat extends Animal {
  makeSound(): string {
    return 'Meow'
  }
}

const animals: Animal[] = [
  new Cat(),
  new Dog()
]

for (const animal of animals) {
  console.log(animal.makeSound())
}



// Задание 2
// Абстрактный класс Shape с цветом
// Создайте абстрактный класс `ColoredShape`, 
// который наследует `Shape` (из задания 4 на уроке) 
// и добавляет абстрактное поле `color`.
// Реализуйте классы `ColoredCircle` и `ColoredRectangle`, 
// которые наследуют `ColoredShape`, задают `color` 
// и реализуют метод `calculateArea()`.
// Выведите площадь и цвет для каждого объекта.

abstract class Shape {
  abstract calculateArea(): number
}

abstract class  ColoredShape extends Shape {
  abstract color: string
}

class  ColoredCircle extends ColoredShape {
  color: string

  constructor(public radius: number, color: string) {
    super()
    this.color = color
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius
  }
}


class  ColoredRectangle extends ColoredShape {
  color: string

  constructor(public width: number, public height: number, color: string) {
    super()
    this.color = color
  }

  calculateArea(): number {
    return this.width * this.height
  }
}

const shapes: ColoredShape[] = [
  new ColoredCircle(5, 'red'),
  new ColoredRectangle(4, 6, 'blue')
]

for (const shape of shapes) {
  console.log(`Color: ${shape.color}, Area: ${shape.calculateArea()}`)

}




// Задание 3
// Абстрактный класс Appliance
// Создайте абстрактный класс `Appliance` с абстрактными методами `turnOn()` и `turnOff()`.
// Затем создайте классы `WashingMachine` и `Refrigerator`, 
// которые наследуют `Appliance` и реализуют методы `turnOn()` и `turnOff()`, 
// выводя соответствующие сообщения.
// Создайте массив типа `Appliance[]`, 
// добавьте в него объекты `WashingMachine` и `Refrigerator`, 
// и вызовите методы `turnOn()` и `turnOff()` для каждого элемента.

abstract class Appliance {
  abstract turnOn(): void
  abstract turnOff(): void
}

class WashingMachine extends Appliance {
  turnOn(): void {
    console.log('Washing machine is turn on')
  }
  turnOff(): void {
    console.log('Washing machine is turn off')
  }
}


class Refrigerator extends Appliance {
  turnOn(): void {
    console.log('Refrigerator is turned on')
  }

  turnOff(): void {
    console.log('Refrigerator is turned off')
  }
}

const appliances: Appliance [] = [
  new WashingMachine(),
  new Refrigerator()
]

for (const appliance of appliances) {
  appliance.turnOn()
  appliance.turnOff()
}


// Задание 4
// Абстрактный класс Account
// Создайте абстрактный класс `Account` с абстрактными методами `deposit(amount: number)` 
// и `withdraw(amount: number)`.
// Реализуйте классы `SavingsAccount` и `CheckingAccount`, 
// которые наследуют `Account`.
// В классе `SavingsAccount` добавьте логику для начисления процентов на остаток.
// В классе `CheckingAccount` реализуйте снятие средств с учетом комиссии. 
// Проверьте работу методов на объектах обоих классов.

abstract class Account {

  abstract deposit(amount: number): number
  abstract withdraw(amount: number): number

  constructor( protected balance: number =0 ) {}
}

class SavingsAccount extends Account {
  deposit(amount: number): number {
    this.balance += amount
    this.balance += this.balance * 0.05
    return this.balance
  }

  withdraw(amount: number): number {
    if (amount > this.balance) {
      console.log('Недостаточно средств')
      return this.balance
    }

    this.balance -= amount
    return this.balance
  }
}


class CheckingAccount extends Account {
  private fee: number = 1

  deposit(amount: number): number {
    this.balance += amount
    return this.balance
  }

  withdraw(amount: number): number {
    const total = amount + this.fee
    if (total > this.balance) {
      console.log('Недостаточно средств')
      return this.balance
    }
    this.balance -= total
    return this.balance
  }
}

const s = new SavingsAccount(1000)
const c = new CheckingAccount(2000)

console.log(s.deposit(500))
console.log(s.withdraw(100))

console.log(c.withdraw(700))
console.log(c.deposit(300))




// Задание 5
// Абстрактный класс Media
// Создайте абстрактный класс `Media` с абстрактным методом `play()`.
// Затем создайте классы `Audio` и `Video`, которые наследуют `Media` 
// и реализуют метод `play()` по-своему (например, `Audio` выводит "Playing audio", 
// а `Video` — "Playing video").
// Создайте массив типа `Media[]`, включающий объекты `Audio` и `Video`, 
// и вызовите метод `play()` для каждого элемента массива.


abstract class Media {
  abstract play():void
}

class Audio extends Media {
  play():void {
    console.log('Playing audio')
  }
}

class Video extends Media {
  play():void {
    console.log('Playing video')
  }
}

const media: Media[] = [
  new Audio(),
  new Video()
]

for(const m of media) {
  m.play()
}









