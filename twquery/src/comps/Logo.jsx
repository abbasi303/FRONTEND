import React, { useContext } from "react";
import { DarkContext, LangContext } from "../context";

const Logo = () => {
  const { dark } = useContext(DarkContext);
  const { eng } = useContext(LangContext);
  
  const bgcolor = dark ? "#f0f0f010" : "#20202010";
  const txtcolor = dark ? "#f0f0f0" : "#202020";
  const fgcolor = dark ? "#202020" : "#f0f0f0";

  const logotext = eng ? "React Query example" : "React Query példa";

  return (
    <div>
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        className="logo ml-4 mt-0.5"
        width="200" height="40"
      >
        <rect width="200" height="40" fill={bgcolor} />
        <ellipse cx="95" cy="20" rx="60" ry="15" fill={fgcolor}/>
        <text x="100" y="25" fontSize="14" textAnchor="middle" fill={txtcolor}>{logotext}</text>
      </svg>
    </div>
  )
}
export default Logo