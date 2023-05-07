import { createEntry } from '../crud';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useContext } from 'react';
import { LangContext } from "../context";


const Modal = ({setOpenModal}) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const queryClient = useQueryClient();
  const { eng } = useContext(LangContext);


  const mutation = useMutation({
    mutationFn: createEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lista']})
    },
  });

  const onClose = () => {
    console.log('closed')
    setOpenModal(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const uid = crypto.randomUUID();
    const newtitle = title;
    const newtext = text;
    const input = {
        id: uid,
        title: newtitle,
        text: newtext,
        active: 1
    }
    console.log(input)
    mutation.mutate(input);
     onClose();
  };

  const titletext = eng ? 'Title' : 'Cím';
  const texttext = eng ? 'Text' : 'Szöveg';

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                  {titletext}
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter title"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
                  {texttext}
                </label>
                <input
                  type="text"
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter text"
                />
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Submit
              </button>
              <button
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
