import { useContext } from 'react';
import { AuthContext } from '../../context/settings/AuthProvider.js';
import jwt from 'jsonwebtoken';
import { If } from '../if/If.js';


function Auth({ capability, children }) {

  let context = useContext(AuthContext);
  
  const isAuthorized = (capability) => {
    let userData = jwt.decode(context.token);
    if (userData) {
      return userData.capabilities.includes(capability) ? true : false;
    }
    return false;
  };

  return (
    <>
      <If condition={isAuthorized(capability)}>
        {children}
      </If>
      <If condition={!isAuthorized(capability)}>
        <h3>Not Authorized!!!</h3>
      </If>
    </>
  );
}

export default Auth;