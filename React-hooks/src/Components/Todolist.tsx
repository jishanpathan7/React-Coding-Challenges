import { useState } from "react";
import { useTodoContext } from "../context/TodoContex";

function Todolist() {
  const { state, dispatch } = useTodoContext();
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (input.trim() !== "") {
      if (editId !== null) {
        dispatch({
          type: "UPDATE_TODO",
          payload: { id: editId, text: input },
        });
        setEditId(null);
      } else {
        dispatch({
          type: "ADD_TODO",
          payload: { id: Date.now(), text: input },
        });
      }
      setInput("");
    }
  };

  const handleDelteTodo = (id: null | undefined) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  const handleEditTodo = (todo: any) => {
    setEditId(todo.id);
    setInput(todo.text);
  };

  return (
    <div>
      <div className="inputContainer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="inputField"
        />
        <button onClick={handleAddTodo}>
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul className="todoList">
        {state.todos.map((todo: { id: null | undefined; text: string }) => (
          <>
            <li key={todo.id}>{todo.text}</li>
            <div className="buttonContainer">
              <button onClick={() => handleDelteTodo(todo.id)}>Delete</button>
              <button onClick={() => handleEditTodo(todo)}>Edit</button>
            </div>
          </>
        ))}
      </ul>
    </div>
  );
}

export default Todolist;
