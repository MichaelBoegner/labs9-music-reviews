import React from 'react';
import { Modal, NavItem } from 'react-materialize';
const LogInModal = () => (
  <Modal
    className="login"
    header="Modal Header"
    trigger={<NavItem>Log In</NavItem>}
  />
);
export default LogInModal;
