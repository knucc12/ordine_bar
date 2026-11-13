import type { OrderItem, Product } from '../data/menu'

export function orderTotal(order: OrderItem[], menu: Product[]): number {
  return order.reduce((sum, item) => {
    const product = menu.find((p) => p.id === item.productId)
    return product ? sum + product.price * item.quantity : sum
  }, 0)
}