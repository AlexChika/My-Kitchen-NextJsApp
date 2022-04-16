export const reducer = (state, action) => {
  if (action.type === "ON_LOAD") {
    const lists = JSON.parse(localStorage.getItem("lists")) || [];
    return { ...state, lists };
  }
  if (action.type === "INVALID_INPUT") {
    return { ...state };
  }
  if (action.type === "EDIT") {
    const { id, item } = action.payload;
    const lists = [...state.lists].filter((items) => {
      if (items.id === id) {
        items.item = item;
      }
      return items;
    });
    localStorage.setItem("lists", JSON.stringify(lists));
    return { ...state, lists };
  }
  if (action.type === "VALID_INPUT") {
    console.log(action.payload);
    const lists = [...state.lists, action.payload];
    localStorage.setItem("lists", JSON.stringify(lists));
    return { ...state, lists };
  }
  if (action.type === "DELETE_ITEM") {
    const id = action.payload;
    let lists = [...state.lists];
    lists = lists.filter((item) => item.id !== id);
    localStorage.setItem("lists", JSON.stringify(lists));
    return { ...state, lists };
  }
  if (action.type === "CLEAR") {
    let lists = [];
    localStorage.setItem("lists", JSON.stringify(lists));
    return { ...state, lists };
  }
  if (action.type === "DONE") {
    const id = action.payload;
    let lists = [...state.lists];
    lists = lists.filter((item) => {
      if (item.id === id) {
        item.done = true;
      }
      return item;
    });
    localStorage.setItem("lists", JSON.stringify(lists));
    return { ...state, lists };
  }
  return state;
};
