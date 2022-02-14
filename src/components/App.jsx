import Todos from "./Todos";
import { Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import Input from "./Input";

function App() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <>
            <Header />
            <Input />
            <Todos />
          </>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
