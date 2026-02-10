// Задание 1
// Обработка цепочки промисов с `async/await`
// Создайте несколько функций, которые возвращают промисы с разным временем выполнения.
// Напишите функцию, которая вызывает эти промисы поочерёдно, используя `await`, 
// и обрабатывает результаты каждой операции.
// Убедитесь, что цепочка промисов выполняется последовательно.

function promise1(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Результат 1'), 1000)
  })
}

function promise2(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Результат 2'), 2000)
  })
}

function promise3(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Результат 3'), 500)
  })
}

async function  runSequential() {
  const res1 = await promise1()
  console.log(res1)

  const res2 = await promise2()
  console.log(res2)

  const res3 = await promise3()
  console.log(res3)
}

runSequential()


// Задание 2
// Асинхронная обработка данных из массива
// Напишите функцию, которая принимает массив строк.
// Каждая строка будет асинхронно обрабатываться 
// (например, преобразовываться в верхний регистр с задержкой).
// Используйте `Promise.all` для выполнения всех операций параллельно и вывода всех результатов.

function processString(str: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(str.toUpperCase()), 1000)
  })
}

async function processArray(arr: string[]) {
  const promises = arr.map(processString)
  const results = await Promise.all(promises)
  console.log(results)
}

processArray(['hello', 'beautiful', 'world'])


// Задание 3
// Обработка ошибки в параллельных промисах
// Напишите функцию, которая вызывает три промиса параллельно с помощью `Promise.all`.
// Один из промисов должен намеренно завершиться с ошибкой через `reject`. 
// Обработайте эту ошибку с использованием `try/catch` 
// и выведите соответствующее сообщение.

function okPromise(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve('OK'), 1000)
  })
}

function errorPromise(): Promise<string> {
  return new Promise((_, reject) => {
    setTimeout(() => reject('Mistake in promise'), 1500)
  })
}

async function  runParallelWithError() {
  try {
    const results = await Promise.all([
      okPromise(),
      errorPromise(),
      okPromise()
    ])
    console.log(results)
  } catch (error) {
    console.log('Catch error:, error')
  }
}

runParallelWithError()


// Задание 4
// Асинхронная функция с динамическим временем выполнения
// Напишите асинхронную функцию, которая принимает массив чисел.
// Для каждого числа создайте промис, 
// который будет завершаться через количество миллисекунд, равное значению числа.
// Используйте `Promise.all` для ожидания завершения всех промисов 
// и вывода результатов в консоль.

function wait(ms: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ms), ms)
  })
}

async function runDynamic(arr: number[]) {
  const promises = arr.map(wait)
  const results = await Promise.all(promises)
  console.log(results)
}

runDynamic([500, 1500, 2000])