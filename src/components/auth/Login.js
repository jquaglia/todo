import { useContext } from 'react';
import { AuthContext } from '../../context/settings/AuthProvider.js';
import useForm from '../../hooks/useForm.js';
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import { If } from '../if/If.js';

function Login() {

  let context = useContext(AuthContext);
  // eslint-disable-next-line
  let [values, handleInputChange, handleSubmit] = useForm(handleLogin);

  function handleLogin(userDetails) {
    context.login(userDetails.username, userDetails.password);
  }

  // display a form to login or display a button to logout
  return (
    <>
      <Form inline onSubmit={handleSubmit}>
        <If condition={!context.token}>
          <InputGroup>
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="username"
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup>
            <FormControl type="text"
              placeholder="Password"
              className=" mr-sm-2"
              name="password"
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup>
            <Button
              type="submit"
              variant="dark"
            >Login</Button>
          </InputGroup>
        </If>
        <If condition={context.token}>
          <InputGroup>
            <Button
              className="logout"
              type="submit"
              variant="danger"
              onClick={context.logout}
            >Log Out</Button>
          </InputGroup>
        </If>
      </Form>
    </>
  );
}

export default Login;