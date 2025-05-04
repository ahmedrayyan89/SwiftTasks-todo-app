import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { motion } from 'framer-motion';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleDelete = (e, id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const handleEdit = (e, id) => {
    const t = todos.find(i => i.id === id);
    setTodo(t.todo);
    setTodos(todos.filter(item => item.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-[90%] sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-2/5">
        <h1 className='font-bold text-center text-xl mb-4'>SwiftTasks - All your tasks, one unified space</h1>
        <div className="addtodo mb-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input 
            onChange={handleChange} 
            onKeyDown={handleKeyPress} 
            value={todo} 
            type="text" 
            placeholder="Enter your task..."
            className="w-full rounded-lg px-5 py-2 border focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button 
            onClick={handleAdd} 
            className='bg-purple-500 hover:bg-purple-700 cursor-pointer font-bold text-white rounded-lg py-2 px-4 transition duration-300'>
            Add
          </button>
        </div>

        <div className='h-[1px] bg-black opacity-10 w-full mb-4'></div>

        <h2 className="text-lg font-bold mb-3">Your Todos</h2>
        <div className="todos space-y-3 max-h-[40vh] overflow-y-auto pr-2">
          {todos.length === 0 && <div className='text-center text-gray-600'>No Todos to display</div>}
          {todos.map(item => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3 }} 
              className="todo flex justify-between items-center bg-white rounded-lg p-3 shadow hover:shadow-lg transition">
              <div className='flex items-center gap-4'>
                <input 
                  onChange={handleCheckbox} 
                  type="checkbox" 
                  checked={item.isCompleted} 
                  name={item.id} 
                  className='cursor-pointer h-5 w-5 accent-purple-600'
                />
                <div 
                  onClick={() => {
                    const updated = todos.map(todo =>
                      todo.id === item.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
                    );
                    setTodos(updated);
                  }} 
                  className={`cursor-pointer ${item.isCompleted ? "line-through text-gray-400" : ""}`}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex gap-2">
                <button 
                  onClick={(e) => handleEdit(e, item.id)} 
                  className='bg-blue-400 hover:bg-blue-600 text-white rounded-full p-2'>
                  <FaEdit />
                </button>
                <button 
                  onClick={(e) => handleDelete(e, item.id)} 
                  className='bg-red-400 hover:bg-red-600 text-white rounded-full p-2'>
                  <MdDelete />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;





