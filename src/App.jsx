import "./App.css";
import { useAtom } from "jotai";
import { todosAtom } from "./store/jotai/todoItems";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useAtom(todosAtom);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [todo, setTodo] = useState("");

  const action = selectedTodo ? "Update" : "Add";

  const addTodo = (e) => {
    e.preventDefault();
    if (todo === "") return;

    if (action === "Update") {
      const _todos = todos.map((item) => {
        if (item.id === selectedTodo.id) {
          return { ...item, name: todo };
        }
        return item;
      });
      setTodos(_todos);
      setSelectedTodo(null);
      setTodo("");
      return;
    }

    setTodos([...todos, { id: todos.length + 1, name: todo }]);
    setTodo("");
  };

  const editTodo = (id) => (e) => {
    e.preventDefault();
    const _selectedTodo = todos.find((item) => item.id === id);
    setSelectedTodo(_selectedTodo);
    setTodo(_selectedTodo.name);
  };

  const deleteTodo = (id) => (e) => {
    e.preventDefault();
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <>
      <form>
        <input
          type="text"
          name="title"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button onClick={addTodo}>{action} todo</button>
      </form>
      {todos.map((item) => (
        <div key={item.id}>
          {item.name}{" "}
          <div className="actions">
            <button onClick={editTodo(item.id)}>Edit</button>
            <button onClick={deleteTodo(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
