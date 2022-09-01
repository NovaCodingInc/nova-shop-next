import React, { useReducer } from "react";

const initialState: any = [];
function reducer(state: any, action: any) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.payload.id,
          title: action.payload.title,
          count: action.payload.count,
          price: action.payload.price,
          image: action.payload.image,
        },
      ];

    case "ADD_ALL":
      return action.payload;

    case "UPDATE":
      return state.map((item: any) => {
        if (item.id === action.payload.id) {
          return { ...item, count: action.payload.count };
        } else {
          return item;
        }
      });

    default:
      return state;
  }
}
export const basketContext = React.createContext<any>({});
function BasketContextWrapper({ children }: any) {
  const [basketData, dispatch] = useReducer(reducer, initialState);

  return (
    <basketContext.Provider value={{ basketData, dispatch }}>
      {children}
    </basketContext.Provider>
  );
}

export default BasketContextWrapper;
