import React from "react";
import { Header } from "./Header";

export const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
