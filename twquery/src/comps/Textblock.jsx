import React, {useContext} from "react";
import { faker } from '@faker-js/faker';
import { DarkContext } from "../context";
import { fetchData } from '../crud';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Textblock = () => {

  const { dark } = useContext(DarkContext);

  const queryClient = useQueryClient();
  const { data, status, isLoading } = useQuery({
    queryKey: ['lista'],
    queryFn: fetchData,
    refetchOnWindowFocus: true,
    staleTime: 1000,
    cacheTime: 600000,
  });

  const textcontainercolor = dark ? "bg-slate-800" : "bg-slate-100";
  const textcontainerstyle = "textcontainer h-full p-24 " + textcontainercolor;
  const textcolor = dark ? "text-slate-100 bg-slate-700" : "text-slate-900 bg-slate-200";
  const textstyle = textcolor 
      + " textstyle text-justify p-2 rounded flex justify-items-start";
  const titlestyle = " w-1/4 px-1 font-semibold"

  if(isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }
  // console.log(data)  // [[Prototype]]: Array(0)

  return (
    <div className={textcontainerstyle}>

      {data.map((item) => (
        <div key={item.id}>
          <div className={textstyle} >
            <div className={titlestyle}>
              {item.title}
            </div>
            <div className="w-3/4 px-2">
              {item.text}
            </div>
          </div>
          <div className="separator h-4"></div>
        </div>
      ))}
      
      
    </div>
  )
}
export default Textblock