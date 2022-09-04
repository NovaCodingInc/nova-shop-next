import React, { useState } from "react";
type userDataType = {
  isLoggedIn: boolean;
  email: string;
};
type userContextType = {
  userData: userDataType;
  setUserData: React.Dispatch<React.SetStateAction<userDataType>>;
};
export const userContext = React.createContext<userContextType>({
  userData: {isLoggedIn : false , email : ""},
  setUserData: "" as any,
});

function UserContextWrapper({ children }: any) {
  const initialState = {
    isLoggedIn: false,
    email: "",
  };
  const [userData, setUserData] = useState<userDataType>(initialState);

  return (
    <userContext.Provider value={{ userData, setUserData }}>
      {children}
    </userContext.Provider>
  );
}
export default UserContextWrapper;
