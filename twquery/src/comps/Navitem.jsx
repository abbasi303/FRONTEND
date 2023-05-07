import React, { useContext } from "react";
import { DarkContext } from "../context";
import Modal from "./Modal";

const Navitem = ( {menuitem, handleFunc} ) => {

  const { dark } = useContext(DarkContext);
  
  const itemcolor = dark ? "text-slate-100" : "text-slate-900";
  const itemstyle = " text-base menuitem p-2 mr-2 hover:underline hover:decoration-2 hover:underline-offset-8";
  const itemtext = itemcolor + itemstyle;
  return (
    <div className={itemtext} onClick={handleFunc}>
      {menuitem}
      {/* <Modal /> */}
    </div>
  )
}
export default Navitem