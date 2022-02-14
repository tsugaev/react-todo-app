const initialState = {
  items: [],
  loading: false,
  checking: false,
  deleting: false,
  adding: false,
  error: null,
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "todos/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "todos/fetch/fulfilled":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case "todos/fetch/rejected": {
      return {
        ...state,
        error: action.payload
      }
    }
    case "todos/complete/pending":
      return {
        ...state,
        checking: action.payload,
      };
    case "todos/complete/fulfilled":
      return {
        ...state,
        items: state.items.map((todo) => {
          if (todo.id === action.payload) {
            todo.completed = !todo.completed;
          }
          return todo;
        }),
        checking: false,
      };
    case "todos/complete/rejected": {
      return {
        ...state,
        error: action.payload
      }
    }
    case "todos/delete/pending":
      return {
        ...state,
        deleting: action.payload,
      };
    case "todos/delete/fulfilled":
      return {
        ...state,
        items: state.items.filter((todo) => todo.id !== action.payload),
        adding: false,
      };
    case "todos/delete/rejected": {
      return {
        ...state,
        error: action.payload
      }
    }
    case "todos/add/pending":
      return {
        ...state,
        adding: true,
      };
    case "todos/add/fulfilled":
      return {
        ...state,
        items: [action.payload, ...state.items],
        adding: false,
      };
    case "todos/add/rejected": {
      return {
        ...state,
        error: action.payload
      }
    }
    default:
      return state;
  }
};

export const fetchTodos = () => {
  return async (dispatch) => {
    dispatch({ type: "todos/fetch/pending" });

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const todos = await response.json();

      dispatch({ type: "todos/fetch/fulfilled", payload: todos });
    } catch (e) {
      dispatch({ type: "todos/fetch/rejected", payload: e.toString() });
    }
  };
};

export const completeTodo = (id, completed) => {
  return async (dispatch) => {
    dispatch({ type: "todos/complete/pending", payload: id });

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            completed: !completed,
          }),
        }
      );
      if (response.status === 200) {
        dispatch({ type: "todos/complete/fulfilled", payload: id });
      }
    } catch (e) {
      dispatch({ type: "todos/complete/rejected", payload: e.toString() });
    }
  };
};

export const deleteTodo = (id) => {
  return async (dispatch) => {
    dispatch({ type: "todos/delete/pending", payload: id });

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        dispatch({ type: "todos/delete/fulfilled", payload: id });
      }
    } catch (e) {
      dispatch({ type: "todos/delete/rejected", payload: e.toString() });
    }
  };
};

export const addTodo = (title) => {
  return async (dispatch) => {
    dispatch({ type: "todos/add/pending" });
    try {
      const todo = {
        title,
        completed: false,
      };
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todo),
        }
      );

      const addedTodo = await response.json();

      dispatch({ type: "todos/add/fulfilled", payload: addedTodo });
    } catch (e) {
      console.log(e.toString());
      dispatch({ type: "todos/add/rejected", payload: e.toString() });
    }
  };
};

export default todosReducer;
