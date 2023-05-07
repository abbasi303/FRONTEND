import { useContext, useEffect } from "react";
import { DarkContext } from "../context";
import {  getPaginated } from '../crud';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

const numPerPage = 4;


const ScrolledCont = () => {
  const { dark } = useContext(DarkContext);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const fetchNotes = async (pageParam) => {
    const pdata = await getPaginated(pageParam, numPerPage);
    console.log(pdata)
    return pdata;
  }

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['infinite','lista'],
    queryFn: ({ pageParam = 1 }) => fetchNotes(pageParam),
    getNextPageParam: prevData => prevData.nextPage,

  });  // the queryKey must be different than that of useQuery in the Navbar component!

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();      
    }
    console.log('fetching')
  }, [inView, fetchNextPage, hasNextPage]);

  const textcontainercolor = dark ? "bg-slate-800" : "bg-slate-100";
  const textcontainerstyle = "textcontainer h-full p-24 " + textcontainercolor;
  const textcolor = dark ? "text-slate-100 bg-slate-700" : "text-slate-900 bg-slate-200";
  const textstyle = textcolor 
      + " textstyle text-justify p-2 rounded flex justify-items-start";
  const titlestyle = " w-1/4 px-1 font-semibold"

  // if(isFetchingNextPage) {
  if(isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }

  console.log(data)

  return (
    <div className={textcontainerstyle}>

      {
      // instead of 'data.map((item) => (' the obscure structure provided by useInfiniteQuery
      // needs to be processed
      
       data.pages.flatMap(data => data.lista).map((item) => (
        <div key={item.id}>
          <div className={textstyle} >
            <div className={titlestyle}>
              {item.title}
            </div>
            <div className="w-3/4 px-2">
              {item.text} {inView}
            </div>
            {/* <div ref={ref}>{`inview: ${inView}.`}</div> */}
          </div>
          <div className="separator h-4"></div>
        </div>
      ))}
      <div ref={ref}>
        <h4 className="text-slate-500">{`Header inside viewport (value of inVue): ${inView}.`}</h4>  
      </div>
    </div>
  )
}
export default ScrolledCont