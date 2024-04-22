'use client'
import { Switch } from "@headlessui/react";
import { ChangeEvent, useState } from "react";

export default function Home() {

  const [listTodo, setListTodo] = useState({
    id: 0,
    done: false,
    todo: '',
  })

  const [store, setStore] = useState<any[]>([])
  const [editText, setEditText] = useState<number | null>(null)

  const handleToggleActive = (id: number) => {
    setStore((prev) => prev.map((item) => item.id === id ? { ...item, done: !item.done } : item))
  }

  const handleTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setListTodo({ ...listTodo, todo: e.target.value });
  }

  const handleAddToStories = () => {
    if(listTodo.todo.trim() !== "") {
      if (editText !== null) {
        setStore((prev) => prev.map((item) => item.id === editText ? { ...item, todo: listTodo.todo, done: false} : item))
        setEditText(null)
      } else {
        setStore([...store, { ...listTodo, id: Math.floor(Math.random() *  100000) + 1 }]);
      }
      setListTodo({ id: 0, done: false, todo: "" });
    }
  }

  console.log(store)

  const handleEdit = (id: number) => {
    const itemToEdit = store.find((item) => item.id === id)
    if (itemToEdit) {
      setEditText(id)
      setListTodo({ ...listTodo, todo: itemToEdit.todo, done: itemToEdit.done  })
    }
  }

  const handleRemove = (id: number) => {
    setStore((prevStories) => prevStories.filter((item) => item.id !== id));
  };

  const toggleSwitch = (item: any) => {
    return (
      <div>
        <Switch
          checked={item.done}
          onChange={() => handleToggleActive(item.id)}
          className={`${item.done ? 'bg-teal-900' : 'bg-blue-700'}
          relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${item.done ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>)
  }


  return (
    <main className="flex min-h-screen max-w-80 mx-auto pt-32">
      <div className="p-2 bg-white rounded-md max-h-96">  
        <h1 className="uppercase text-3xl font-extrabold">Todo App</h1>
        <div className="flex space-x-6"> 
          <input type="text" onChange={handleTodo} value={listTodo.todo} className="bg-slate-400 p-2 text-white placeholder:text-black placeholder:opacity-20 rounded" placeholder="Enter your todos..."/>
          <button onClick={handleAddToStories} className="p-3 bg-amber-300 border border-teal-800 rounded-lg">Add</button>
        </div>
        <div className="block space-y-5 mt-5">

          {store.map((item: any) => (
            <div key={item.id}>{item.done === false &&
              <div className="flex space-x-5 items-center justify-center">
                <div>
                  {toggleSwitch(item)}
                </div>
                <p className="p-2">{item.todo}</p>
                <button onClick={() => handleEdit(item.id)}> 🖊️</button>
                <button onClick={() => handleRemove(item.id)} > 🧽</button>
              </div>
            }</div>
          ))}
        </div>
        {
          store.length >= 1 &&  <h2 className="uppercase text-xl font-extrabold">Done</h2>
        }
       
        {store.map((item: any) => (
          <div key={item.id}>{item.done === true &&
            <div className="flex space-x-5 items-center justify-center">
              <div>
                {toggleSwitch(item)}
              </div>
              <p className="rounded-xl bg-black text-white p-1">{item.todo}</p>
              <button onClick={() => handleEdit(item.id)}> 🖊️</button>
                <button onClick={() => handleRemove(item.id)} > 🧽</button>
            </div>
          }</div>
        ))}</div>

    </main>
  );
}
