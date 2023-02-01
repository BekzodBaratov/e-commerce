export function realPrice(price: number, discountPercentage: number) {
  return Math.floor((price * (100 - discountPercentage)) / 100)
}
