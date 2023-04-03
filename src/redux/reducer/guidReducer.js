var initialState = {
  guid: null,
  orderVisit: null,
  orderNumber: null,
  orderStatus: 0,
};

const reducer = (state = initialState, action) => {
  console.log("action : ", action.guid);

  switch (action.type) {
    case "SET_GUID":
      return {
        ...state,
        guid: action.guid,
        orderVisit: action.orderVisit,
        orderNumber: action.orderNumber,
      };
    case "SET_ORDER_STATUS":
      return {
        ...state,
        orderStatus: action.orderStatus,
      };

    default:
      return state;
  }
};
export default reducer;
