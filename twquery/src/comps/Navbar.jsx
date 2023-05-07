import  { useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient, focusManager } from '@tanstack/react-query';

import Navitem from "./Navitem";
import Logo from './Logo';
import Switch from "./Switch";
import LangSwitch from "./LangSwitch";
import Modal from "./Modal";
import { DarkContext, LangContext } from "../context";
import { createFake, fetchData, deleteData, getPage } from '../crud';



const Navbar = ( {count, setCount} ) => {

  const [openModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();

  const { status, data, isFetching, error } = useQuery({
    // isFetching: queryFn fgv. fut, vagy nem // queryFn is running or not
    queryKey: ['lista'],
    queryFn: fetchData,
    // queryFn: async () => await getPage(1,5), // ha lapozunk // first page, 5 items
    retry: 10, // default: 3
    cacheTime: 600000, // default: 300000 = 5 minutes
  });

  const mutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lista']})
    },
  });

  const randommutation = useMutation({
    mutationFn: createFake,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lista']})
    },
  });

  const { dark } = useContext(DarkContext);
  const { eng } = useContext(LangContext);

  useEffect(() => {
    console.log("count has been changed in the dependency array.")
    focusManager.setFocused(true); // window focus -> refetch
    console.log(status, data)
  },[count]); 

  const handleDelLast = () => {
    fetchData().then((arr) => {
      const id = arr[arr.length-1].id;
      mutation.mutate(id);
      console.log(id)
    })
    
  };
  const handleRandomCreate = () => {
    randommutation.mutate();
  };
  const handleModal= () => setOpenModal(true);
  const handleClick = () => {
    setCount(count+1)
  };

  const buttonstyle = "h-8 px-4 m-2 text-sm transition-colors duration-150 rounded-sm  "
  const buttontext = eng ? 'Reload' : 'Újratölt';
  const menuitem1 = eng ? 'New/Edit' : 'Új/Szerkeszt';
  const menuitem2 = eng ? 'New/with Faker' : 'Új/Fakerrel';
  const menuitem3 = eng ? 'Delete last' : 'Törli az utolsót';
  const buttoncolor = dark ? "bg-slate-700 text-slate-100 hover:bg-slate-600 active:bg-slate-800" : "bg-slate-200 text-slate-800 hover:bg-slate-300 active:bg-slate-400";
  const navbarcolor = dark ? "bg-slate-900" : "bg-slate-100";
  const navbarclass = navbarcolor + " navbar fixed top-0 left-0 right-0 flex {navbarcolor} w-full shadow-lg justify-between";
  const buttonclass = buttonstyle + buttoncolor;
  return (
    <div className={navbarclass}>
      <Logo />
      <Switch />
      <LangSwitch />
      <button className={buttonclass} onClick={handleClick}>{buttontext}</button>

      <div className="navitemcontainer flex">
        <Navitem menuitem={menuitem1} handleFunc={handleModal}/>
        <Navitem menuitem={menuitem2}  handleFunc={handleRandomCreate}/>
        <Navitem menuitem={menuitem3}  handleFunc={handleDelLast}/>
      </div>
      { openModal &&
        <Modal setOpenModal = {setOpenModal} />
      }
    </div>
  )
}
export default Navbar