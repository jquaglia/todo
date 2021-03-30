import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function TodoForm(props) {

  const [listItem, setList] = useState(['stuff']);

  const handleInputChange = e => {
    setList({ item: { ...listItem.item, [e.target.name]: e.target.value } });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(listItem.item);
    const item = {};
    setList({ item });
  };

  return (
    <>
      <h3>Add To Do Item</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Label>
          <span>To Do Item</span>
          <Form.Control
            name="text"
            placeholder="Add To Do List Item"
            onChange={handleInputChange}
          />
        </Form.Label>
        <Form.Label>
          <span>Assigned To</span>
          <Form.Control type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
        </Form.Label>
        <Form.Label>
          <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
        </Form.Label>
        <Button variant="primary" type="submit">Add Item</Button>
      </Form>
    </>
  );
}
