import { cast, element, Castable } from '@bitr/castable'

class Product extends Castable {
  @cast name: string
  @cast price: number
  @cast tax: number
}

class OrderList extends Castable {
  @cast @element(Product) orders: Product[] // <--- 配列の要素型を指定
  @cast(Date) dueDate: Date // <--- Date型に対しては@cast(Date)とする
}
