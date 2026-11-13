import type { OrderItem, Product } from '../data/menu'
import { formatPrice } from '../utils/formatPrice'
import { orderTotal } from '../utils/orderTotal'

type OrderProps = {
  products: Product[]
  order: OrderItem[]
  maxQuantity: number
  onIncrease: (id: number) => void
  onDecrease: (id: number) => void
}

const stepButton =
  'flex size-9 items-center justify-center rounded-full bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40'

function Order({ products, order, maxQuantity, onIncrease, onDecrease }: OrderProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Il tuo ordine</h2>

      {order.length === 0 ? (
        <p className="opacity-60">Nessun prodotto: scegli dal menu.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {order.map((item) => {
            const product = products.find((p) => p.id === item.productId)
            if (!product) return null
            return (
              <div key={item.productId} className="flex items-center gap-3">
                <p className="flex-1 font-bold">{product.name}</p>
                <div className="flex items-center gap-3">
                  <button
                    aria-label={`Togli ${product.name}`}
                    className={stepButton}
                    onClick={() => onDecrease(item.productId)}
                  >
                    −
                  </button>
                  <span className="w-4 text-center">{item.quantity}</span>
                  <button
                    aria-label={`Aggiungi ${product.name}`}
                    className={stepButton}
                    onClick={() => onIncrease(item.productId)}
                    disabled={item.quantity >= maxQuantity}
                  >
                    +
                  </button>
                </div>
                <p className="w-20 text-right">{formatPrice(product.price * item.quantity)}</p>
              </div>
            )
          })}
        </div>
      )}

      <p className="border-t border-gray-300 pt-3 text-right text-2xl font-bold">
        Totale: {formatPrice(orderTotal(order, products))}
      </p>
    </section>
  )
}

export default Order