export const ShoppingCartReducer = (state, action) => {
  const newdata = JSON.parse(JSON.stringify(state));

  const id = action.payload;

  const index = state.products.findIndex((item) => {
    return item.id === id;
  });

  switch (action.type) {
    case "ADD":
      newdata.products[index].num++;
      break;
    case "DECREASE":
      if (state.products[index].num <= 1) {
        newdata.products.splice(index, 1);
      } else {
        newdata.products[index].num--;
      }
      break;
    default:
      return state;
  }

  newdata.total = newdata.products.reduce((total, product) => {
    return total + product.num * product.price;
  }, 0);

  return newdata;
};
