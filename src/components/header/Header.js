import { Navbar, InputGroup, FormControl, Form, Button } from 'react-bootstrap';

export default function Header(props) {
  return (
    <header>
      <Navbar bg="primary justify-content-between" variant="dark">
        {/* <Container> */}
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        {/* </Container> */}
        {/* <Container> */}
        <Form inline>
          <InputGroup>
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup>
            {/* </Form>
            <Form inline> */}
            <FormControl type="text" placeholder="Password" className=" mr-sm-2" />
          </InputGroup>
          <InputGroup>
            <Button type="submit" variant="dark">Login</Button>
          </InputGroup>
          <InputGroup>
            <Button className="logout" type="submit" variant="danger">Log Out</Button>
          </InputGroup>
        </Form>
        {/* </Container> */}
      </Navbar>
    </header>
  );
}