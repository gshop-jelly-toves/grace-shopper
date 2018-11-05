export const priceCentsToString = total => {
  let cartTotalStr = ['$', ...total.toString().split('')]

  cartTotalStr.splice(
    cartTotalStr.length-2, 0,
    cartTotalStr.length > 3
      ? '.' : '0.'
  ).join('')

  return cartTotalStr
}
