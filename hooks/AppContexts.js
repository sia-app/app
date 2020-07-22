import * as React from "react";
//Context to allow access to reset function
export const ResetContext = React.createContext();
//Context to allow authentication function access
export const AuthContext = React.createContext();
//Context to share main data state
export const DataContext = React.createContext({
  UD: null,
  updateStorage: () => {},
});