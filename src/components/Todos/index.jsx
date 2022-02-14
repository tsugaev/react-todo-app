import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../redux/features/todos";
import Todo from "./Todo";
import { ListGroup, Spinner } from "react-bootstrap";

const Todos = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.todos.loading);
  const todos = useSelector((state) => state.todos.items);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <ListGroup>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        todos.map((todo) => {
          return <Todo todo={todo} key={todo.id} />;
        })
      )}
    </ListGroup>
  );
};

export default Todos;
