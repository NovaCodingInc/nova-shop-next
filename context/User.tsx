import React, { useState } from "react";
export const userContext = React.createContext<any>({});

function UserContextWrapper({ children }: any) {
  const initialState = {
    isLoggedIn: false,
    email: "",
  };
  const [userData, setUserData] = useState(initialState);

  return <userContext.Provider value={{userData , setUserData}}>{children}</userContext.Provider>
}
export default UserContextWrapper;
