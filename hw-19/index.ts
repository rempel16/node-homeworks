// Задание 1
// Напишите стрелочную функцию `sumEvenNumbers`, 
// которая принимает массив чисел и возвращает сумму всех четных чисел.

const sumEvenNumbers = (numbers: number[]):number => {
  let sum = 0
  for (const num of numbers) {
    if (num % 2 === 0) {
      sum += num
    }
  }
  return sum
}
const numbersArr = [10,23,30,49,55,63,74,81,90]
console.log(sumEvenNumbers(numbersArr))


// Задание 2
// Определите интерфейс `StringToBooleanFunction` для функции, 
// которая принимает строку и возвращает `boolean` (например, проверяет, является ли строка пустой). 
// Реализуйте такую функцию.

interface StringToBooleanFunction {
  (str: string): boolean
}

const isEmptyStr: StringToBooleanFunction = (str) => {
  return str.length === 0
}

console.log(isEmptyStr(""))
console.log(isEmptyStr("Hi"))


// Задание 3
// Создайте тип `CompareStrings` для функции, 
// принимающей две строки и возвращающей `boolean` (например, для проверки равенства строк). 
// Напишите функцию, соответствующую этому типу.

type CompareStrings = {
  (srt1: string, str2: string): boolean
}

const compareFunction: CompareStrings = (str1, str2) => {
  return str1 === str2
}

console.log(compareFunction('Cat', 'Dog'))
console.log(compareFunction('Fox', 'Fox'))


// Задание 4
// Напишите обобщенную функцию `getLastElement`, 
// которая принимает массив любого типа и возвращает последний элемент этого массива.

function getLastElement<T>(element: T[]) {
  return element[element.length - 1]
}

const citiesArr = ['Rome', 'Kiev', 'Ulm', 'Madrid', 'Paris']

console.log(getLastElement(citiesArr))


// Задание 5
// Создайте обобщенную функцию `makeTriple`, 
// которая принимает три аргумента одного типа и возвращает массив из этих трёх элементов.

function makeTriple<T>(a:T, b:T, c:T): T[] {
  return [a, b, c]
}

console.log(makeTriple('bear', 'dear', 'rabbit'))