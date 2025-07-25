import NavBar from "./components/NavBar";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";
import { MdOutlineEventNote } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // const handleEdit = () => {};
  const handleDelete = (e, id) => {
    console.log(e, id);
    // let index=todos.findIndex(item=>{
    //   return item.id===id;
    // })
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
    console.log(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <div className="bg-blue-300 h-screen">
        <div>
          <NavBar />
        </div>
        <div className="flex justify-center flex-col items-center">
          <div className="flex justify-center w-full">
            <div className="flex flex-col justify-center bg-white w-[50%] rounded-xl p-4">
              <h1 className="mb-4 text-center text-xl font-semibold">
                
                <span>ToDo List</span>
                
              </h1>

              <div className="input flex space-x-2 justify-center  bg-gray-100 rounded-full ">
                <input
                  type="text"
                  placeholder="Add your task"
                  className=" rounded-full px-2 py-1 flex-grow focus:outline-none bg-gray-100 placeholder:text-gray-500"
                  onChange={handleChange}
                  value={todo}
                />
                <button
                  onClick={handleAdd}
                  className="bg-green-600 hover:bg-blue-600 text-white px-4 rounded-full "
                >
                  <MdAddCircleOutline />
                </button>
              </div>
              <div className="w-[100%] flex justify-center py-3 text-green-600">
                <h3>Your ToDos</h3>
              </div>
              <div className="todos">
                {todos.length === 0 && <div>No Todos to display !</div>}
                {todos.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="item flex justify-between  rounded-full items-center pl-2 px-1 h-8 bg-gray-100 group my-2 relative"
                    >
                      <input
                        name={item.id}
                        onChange={handleCheckbox}
                        type="checkbox"
                        checked={item.isCompleted}
                        value={item.isCompleted}
                      />
                      <div
                        className={
                          item.isCompleted
                            ? "font-semibold line-through fixed ml-5"
                            : "font-semibold fixed ml-5"
                        }
                      >
                        {item.todo}
                      </div>
                      <div className="buttons space-x-2 transition duration-300 ease-in-out">
                        {/* <button
                          onClick={handleEdit}
                          className="hidden group-hover:inline-block bg-green-600 rounded-full px-2 text-white text-sm border border-green-600 py-0.5 "
                        >
                          Edit
                        </button> */}
                        <button
                          onClick={(e) => {
                            handleDelete(e, item.id);
                          }}
                          className="hidden group-hover:inline-block bg-green-600 rounded-full px-2 text-white text-sm border border-green-600 py-0.5 "
                        >
                         <MdDelete />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
