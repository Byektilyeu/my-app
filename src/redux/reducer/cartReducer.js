import {
  GET_NUMBER_CART,
  ADD_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  DELETE_CART,
} from "../actions/CartActions";

const initProduct = {
  numberCart: 0,
  alertState: false,
  Carts: [],
};

function reducer(state = initProduct, action) {
  switch (action.type) {
    case GET_NUMBER_CART:
      return {
        ...state,
      };
    case ADD_CART:
      if (state.numberCart == 0) {
        let cart = {
          id: action.payload.menuIdent,
          quantity: 1,
          name: action.payload.name,
          image: action.payload.comment,
          price: action.payload.priceOrderMenu,
        };
        state.Carts.push(cart);
        console.log("jjj", state);
      } else {
        let check = false;
        state.Carts.map((item, key) => {
          if (item.id == action.payload.menuIdent) {
            state.Carts[key].quantity++;
            check = true;
            console.log("hhh", state);
          }
        });
        if (!check) {
          let _cart = {
            id: action.payload.menuIdent,
            quantity: 1,
            name: action.payload.name,
            image: action.payload.comment,
            price: action.payload.priceOrderMenu,
          };
          state.Carts.push(_cart);
          console.log("fff", state);
        }
      }
      return {
        ...state,
        numberCart: state.numberCart + 1,
        alertState: true,
      };

    case INCREASE_QUANTITY:
      state.numberCart++;
      state.Carts[action.payload].quantity++;

      return {
        ...state,
      };

    case DECREASE_QUANTITY:
      let quantity = state.Carts[action.payload].quantity;
      console.log("ppppppppppppppppppppp", quantity);
      console.log("ppppppppppppppppppppp1", state.numberCart);
      console.log(
        "ppppppppppppppppppppp2",
        state.Carts[action.payload].quantity
      );
      if (quantity > 1) {
        console.log(
          "iiiiiiiiiiiiiiiiiiiiiii",
          state.Carts[action.payload].quantity
        );
        state.numberCart--;
        state.Carts[action.payload].quantity--;
      }
      console.log(
        "iiiiiiiiiiiiiiiiiiiiiii",
        state.Carts[action.payload].quantity
      );

      console.log("hha", state.Carts);
      return {
        ...state,
      };

    case DELETE_CART:
      let quantity_ = state.Carts[action.payload].quantity;
      console.log("carts", quantity_);
      return {
        ...state,
        numberCart: state.numberCart - quantity_,
        Carts: state.Carts.filter((item) => {
          return item.id != state.Carts[action.payload].id;
        }),
      };
    default:
      return state;
  }
}

export default reducer;
