import "./App.css";
import { useState } from "react";
import { tabs } from "./Data/tabs.jsx";

function App() {
  let [todolist, setTodolist] = useState([]);
  let [activeTabs, setactiveTabs] = useState(0);
  let [activeContent, setActiveContent] = useState(tabs[0]);
  



  let changeData=(index)=>{
    setactiveTabs(index)
    setActiveContent(tabs[index])
  }
  let saveToDoList = (event) => {
    let toname = event.target.toname.value;
    if (!todolist.includes(toname)) {
      let finalDolist = [...todolist, toname];
      setTodolist(finalDolist);
    } else {
      alert("Todo name already exists!");
    }

    event.preventDefault();
  };

  let list = todolist.map((value, index) => {
    return (
      <ToDoListItems
        value={value}
        key={index}
        indexNumber={index}
        todolist={todolist}
        setTodolist={setTodolist}
      />
    );
  });

  return (
    <div className="App">
      <div className="tabsOuter">
        <h1 style={{ textAlign: "left" }}>
          REACT PROJECT
        </h1>
        <ul>
          {/* {console.log(tabs)} */}
          {tabs.map((tabsItems, index) => {
            return (
              <li>
                <button onClick={()=>changeData(index)} className={activeTabs===index?"activeButton":""} key={index}>{tabsItems.title}</button>
              </li>
            )
          })}
        </ul>
        {activeContent !== undefined ? 
        <p>
          {activeContent.description}
        </p>
        :
        ""}
      </div>
      <h1>Todo List</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" name="toname" />
        <button>Save</button>
      </form>

      <div className="outerDiv">
        <ul>{list}</ul>
      </div>
    </div>
  );
}

export default App;

function ToDoListItems({ value, indexNumber, todolist, setTodolist }) {
  let [status, setStatus] = useState(false);
  let deleteNow = () => {
    let finalData = todolist.filter((v, i) => i !== indexNumber);
    setTodolist(finalData);
  };

  return (
    <li
      className={status ? "completetodo" : ""}
      onClick={() => setStatus(!status)}
    >
      {indexNumber + 1}. {value} <span onClick={deleteNow}>&times;</span>
    </li>
  );
}
