import { Navbar } from 'react-bootstrap';
import Login from '../auth/Login.js';

export default function Header() {

  return (
    <header>
      <Navbar bg="primary justify-content-between" variant="dark">
        <Navbar.Brand>
          Home
        </Navbar.Brand>
        <Login />
      </Navbar>
    </header>
  );
}