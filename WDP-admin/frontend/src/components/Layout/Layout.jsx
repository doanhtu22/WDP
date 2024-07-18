import React from "react";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import ScrollUpButton from "../Scrollup/Scrollup";
const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ScrollUpButton />
    </>
  );
};

export default DefaultLayout;
