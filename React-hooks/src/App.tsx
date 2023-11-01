import "./App.css";
import Todolist from "./Components/Todolist";
import { TodoProvider } from "./context/TodoContex";

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <Todolist />
      </div>
    </TodoProvider>
  );
}

export default App;
