// Типизация функции с несколькими параметрами
// Напишите функцию `calculateTotal`, 
// которая принимает три параметра:  
// `price` (число)  
// `quantity` (число)  
// `discount` (число, по умолчанию равен 0)
// Функция должна возвращать общую стоимость товаров с учетом скидки. 
// Если скидка не указана, она считается равной нулю.

function calculateTotal(price: number, quantity: number, discount: number = 0): number {
  const total = price * quantity
  const totalWithDiscount = total - (total * (discount / 100))
  return totalWithDiscount
}

console.log(calculateTotal(100, 2))
console.log(calculateTotal(100, 2, 10))



// Создайте переменную id, которая может быть либо строкой, либо числом.
// Напишите функцию displayId, которая принимает эту переменную и выводит сообщение, 
// содержащее значение ID. Если id — строка, выведите её в верхнем регистре. 
// Если id — число, умножьте его на 10 перед выводом.

let id: string|number = '123abc'

function displayId(id: string|number): void {
  if (typeof id === 'string') {
    console.log(id.toUpperCase())
  } else {
    console.log(id * 10)
  }
}

displayId(id)

id = 100
displayId(id)



// Создайте массив объектов `orders`, 
// где каждый объект описывает заказ и содержит следующие свойства:  
// `orderId` (строка)  
// `amount` (число)  
// `status` (строка, может принимать значения "pending", "shipped" или "delivered")
// Напишите функцию `filterOrdersByStatus`, которая принимает этот массив и строку `status`, 
// и возвращает массив заказов, соответствующих указанному статусу.

interface Order {
  orderId: string,
  amount: number,
  status: 'pending' | 'shipped' | 'delivered'
}

const orders: Order[] = [
  {orderId:'001', amount: 100, status: 'pending'},
  {orderId:'002', amount: 150, status: 'shipped'},
  {orderId:'003', amount: 170, status: 'delivered'},
  {orderId:'004', amount: 190, status: 'pending'},
  {orderId:'005', amount: 210, status: 'shipped'}
]

function filterOrdersByStatus(orders: Order[], status: Order['status']): Order[]{
  return orders.filter(order => order.status === status)
}

console.log('Pending orders:', filterOrdersByStatus(orders, 'pending'))
console.log('Shipped orders:', filterOrdersByStatus(orders, 'shipped'))
console.log('Delivered orders:', filterOrdersByStatus(orders, 'delivered'))



// Создайте кортеж `productInfo`, который содержит:  
// название товара (строка)  
// его цену (число)  
// количество на складе (число)
// Напишите функцию `updateStock`, которая принимает объект `inventory` 
// (где ключ — это название товара, а значение — количество на складе) и кортеж `productInfo`. 
// Функция должна прибавить изменение количества из кортежа к текущему значению в inventory 
// (если товара ещё нет, добавить его с этим количеством) и вернуть обновлённый объект.

interface Inventory {
  [name: string]: number
}

type ProductInfo = [string, number, number]
const productInfo: ProductInfo = ['Apple', 5, 10]

function updateStock(inventory: Inventory, productInfo: ProductInfo):Inventory {
  const [name, price, quantity] = productInfo

  if (inventory[name] !== undefined) {
    inventory[name] += quantity
  }else{
    inventory[name] = quantity
  }
  return inventory
}

let inventory: Inventory = {
  'Banana': 15
}

inventory =updateStock(inventory, productInfo)
console.log(inventory)
