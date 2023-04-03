export const setGuidAction = (guid, orderVisit, orderNumber) => {
  return {
    type: "SET_GUID",
    guid,
    orderVisit,
    orderNumber,
  };
};

export const setOrderStatusAction = (orderStatus) => {
  return {
    type: "SET_ORDER_STATUS",
    orderStatus,
  };
};
