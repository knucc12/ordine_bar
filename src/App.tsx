import { useState } from 'react'
import CheckoutForm from './components/CheckoutForm'
import MenuBar from './components/MenuBar'
import Order from './components/Order'
import { menu, type OrderItem } from './data/menu'
import type { Checkout } from './data/types'
import { formatPrice } from './utils/formatPrice'
import { orderTotal } from './utils/orderTotal'

const MAX_QUANTITY = 5

function App() {
  const [order, setOrder] = useState<OrderItem[]>([])
  const [confirmation, setConfirmation] = useState('')

  function handleAdd(id: number) {
    setConfirmation('')
    const existing = order.find((item) => item.productId === id)
    if (!existing) {
      setOrder([...order, { productId: id, quantity: 1 }])
      return
    }
    if (existing.quantity >= MAX_QUANTITY) return
    setOrder(
      order.map((item) =>
        item.productId === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }

  function handleDecrease(id: number) {
    setConfirmation('')
    setOrder(
      order
        .map((item) =>
          item.productId === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function handleConfirm(checkout: Checkout) {
    setConfirmation(
      `Ordine per ${checkout.name} (${checkout.schoolClass}), ritiro a ${checkout.pickup}, ${checkout.payment}: ${formatPrice(orderTotal(order, menu))}`,
    )
    setOrder([])
  }

  return (
    <>
    <div className="mx-auto flex w-full max-w-md flex-col gap-10 px-6 py-12">
      <h1 className="text-center text-4xl font-bold">Il bar della scuola</h1>
      <MenuBar products={menu} order={order} maxQuantity={MAX_QUANTITY} onAdd={handleAdd} />
      <Order
        products={menu}
        order={order}
        maxQuantity={MAX_QUANTITY}
        onIncrease={handleAdd}
        onDecrease={handleDecrease}
      />
      <CheckoutForm orderEmpty={order.length === 0} onSubmit={handleConfirm} />
      {confirmation && <p className="font-bold text-green-700">{confirmation}</p>}
    </div>
    </>
  )
}

export default App