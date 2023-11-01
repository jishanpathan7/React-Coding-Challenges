import React, { createContext, useContext, useReducer, ReactNode } from "react";

const TodoContext = createContext<any | null>(null);

export interface Todo {
  id: number;
  text: string;
}
type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'UPDATE_TODO'; payload: Todo };


const initialState = {
  todos: [] as Todo[],
};

const todoReducer = (state: { todos: Todo[] }, action: Action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { todos: [...state.todos, action.payload] };

    case "REMOVE_TODO":
      return {
        todos: state.todos.filter((todo: Todo) => todo.id !== action.payload),
      };
      case 'UPDATE_TODO':
        return {
          todos: state.todos.map(todo =>
            todo.id === action.payload.id ? action.payload : todo
          ),
        };
    default:
      return state;
  }
};

const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export { TodoProvider, useTodoContext };
