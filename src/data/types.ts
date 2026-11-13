export type Pickup = 'ricreazione' | 'pranzo'

export type Payment = 'contanti' | 'carta'

export type Checkout = {
  name: string
  schoolClass: string
  pickup: Pickup
  payment: Payment
  notes: string
}