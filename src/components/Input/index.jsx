import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../redux/features/todos";

const Input = () => {
  const [title, setTitle] = useState("");

  const adding = useSelector((state) => state.todos.adding);

  const dispatch = useDispatch();

  const handleInputText = (e) => {
    setTitle(e.target.value);
  };
  const handleAddTodo = () => {
    dispatch(addTodo(title));
    setTitle("");
  };

  return (
    <div className="todoAdd">
      <Container className="p-0 mt-5 mb-4">
        <Row className="justify-content-between p-0 flex-nowrap">
          <Col xl={9}>
            <FormControl
              placeholder="Type..."
              value={title}
              onChange={handleInputText}
            />
          </Col>
          <Col xl={"auto"}>
            <Button
              className="px-4"
              disabled={adding || !title}
              onClick={handleAddTodo}
            >
              {adding ? (
                <Spinner size="sm" animation="border" variant="light" />
              ) : (
                "Add"
              )}
            </Button>
          </Col>
        </Row>
      </Container>
      <hr className="mb-4" />
    </div>
  );
};

export default Input;
