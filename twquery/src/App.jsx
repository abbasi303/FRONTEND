import { useState } from 'react'
import { DarkContextProvider, LangContextProvider } from './context';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Navbar from './comps/Navbar';
import Textblock from './comps/Textblock';
import ScrolledCont from './comps/ScrolledCont'; // this is to be activated with the InfiniteQuery

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
      <DarkContextProvider>
        <LangContextProvider>
          <div className="App">          
            <Navbar count={count} setCount={setCount}/>
            <Textblock />
            {/* <ScrolledCont /> */}
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </LangContextProvider>  
      </DarkContextProvider>
    </QueryClientProvider>
  )
}

export default App
