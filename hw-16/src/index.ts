// Напишите функцию `greetUser`, 
// которая принимает имя пользователя (строка) 
// и выводит приветственное сообщение в консоль: `"Привет, <name>!"`. 
// Используйте строгую типизацию.

function greetUser(name: string): void {
  console.log(`Привет, ${name}!`)
}

greetUser("Martina")

// Типизация функции с объектом в качестве параметра
// Создайте интерфейс `Person`, 
// который описывает человека с полями `name`, `age`, и `city`.
// Напишите функцию `printPersonInfo`, 
// которая принимает объект типа `Person` и выводит информацию о человеке в формате: 
// `"Имя: <name>, Возраст: <age>, Город: <city>"`

interface Person {
  name: string,
  age: number,
  city: string
}

function printPersonInfo(person: Person): void {
  console.log(`Имя: ${person.name}, Возраст: ${person.age}, Город: ${person.city}`)
}

const person1: Person = { name: "John", age: 25, city: "New York"}
printPersonInfo(person1)

// Простая типизация для числового параметра
// Напишите функцию `squareNumber`, 
// которая принимает число и возвращает его квадрат. 
// Используйте строгую типизацию.

function squareNumber(num: number): number {
  return num * num
}

console.log(squareNumber(7))

// Типизация функции с boolean
// Напишите функцию `isEven`, которая принимает число и возвращает `true`, 
// если число четное, и `false`, если нечетное. 
// Используйте строгую типизацию.

function isEven(num: number):boolean {
  return num % 2 === 0
}

console.log(isEven(9))
console.log(isEven(10))

// Создайте интерфейс `Student`, 
// который описывает студента с полями `name` (строка) и `grade` (число).
// Напишите функцию `printStudentInfo`, 
// которая принимает объект типа `Student` и выводит информацию о студенте в формате: 
// `"Студент: <name>, Оценка: <grade>"`.

interface Student {
  name: string
  grade: number
}

function printStudentInfo(student: Student): void {
  console.log(`Student: ${student.name}, Grade: ${student.grade}`)
}

const student1: Student = {name: "Kate", grade: 100}
printStudentInfo(student1)

// Напишите функцию `logMessage`, 
// которая принимает строку и выводит её в консоль без возвращаемого значения. 
// Используйте тип `void`.

function logMessage(message: string):void {
  console.log(message)
}

logMessage('Happy New Year!' )