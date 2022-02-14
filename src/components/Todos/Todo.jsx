import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeTodo, deleteTodo } from "../../redux/features/todos";
import { CloseButton, Col, ListGroupItem, Row, Spinner } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();

  const deleting = useSelector((state) => state.todos.deleting);
  const checking = useSelector((state) => state.todos.checking);

  const handleCompleteTodo = (id, completed) => {
    dispatch(completeTodo(id, completed));
  };
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const spinner = (
    <Spinner
      animation="grow"
      size="sm"
      variant={deleting ? "danger" : "warning"}
    />
  );

  return (
    <ListGroupItem>
      {deleting === todo.id || checking === todo.id ? (
        <div className="text-center">
          {spinner} {spinner} {spinner}
        </div>
      ) : (
        <Row className="justify-content-between">
          <Col xl="auto">
            <CloseButton onClick={() => handleDeleteTodo(todo.id)} />
          </Col>
          <Col xl={10}>
            <div>{todo.title}</div>
          </Col>
          <Col xl="auto">
            <FormCheckInput
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCompleteTodo(todo.id, todo.completed)}
            />
          </Col>
        </Row>
      )}
    </ListGroupItem>
  );
};

export default Todo;
