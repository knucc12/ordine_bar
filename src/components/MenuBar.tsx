import { categories, type OrderItem, type Product } from '../data/menu'
import { formatPrice } from '../utils/formatPrice'

type MenuBarProps = {
  products: Product[]
  order: OrderItem[]
  maxQuantity: number
  onAdd: (id: number) => void
}

function MenuBar({ products, order, maxQuantity, onAdd }: MenuBarProps) {
  return (
    <div className="flex flex-col gap-8">
      {categories.map((category) => (
        <section key={category.id} className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold">{category.title}</h2>
          {products
            .filter((product) => product.category === category.id)
            .map((product) => {
              const inOrder = order.find((item) => item.productId === product.id)
              const full = inOrder !== undefined && inOrder.quantity >= maxQuantity
              return (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-gray-300 px-4 py-3"
                >
                  <div className="flex flex-col">
                    <p className="font-bold">{product.name}</p>
                    <p className="opacity-60">{formatPrice(product.price)}</p>
                  </div>
                  <button
                    onClick={() => onAdd(product.id)}
                    disabled={full}
                    className="shrink-0 rounded-full bg-blue-500 px-5 py-2.5 text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Aggiungi
                  </button>
                </div>
              )
            })}
        </section>
      ))}
    </div>
  )
}

export default MenuBar