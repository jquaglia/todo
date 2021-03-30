import React from 'react';
import { useState, useEffect } from 'react';

// class TodoForm extends React.Component {
export default function TodoForm(props) {

  const [listItem, setList] = useState(['stuff']);
  // const [show, setShow] = useState(false);
  // constructor(props) {
  //   super(props);
  //   this.state = { item: {} };
  // }

  const handleInputChange = e => {

    setList({ item: { ...listItem.item, [e.target.name]: e.target.value } });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(listItem.item);
    const item = {};
    setList({ item });
    // console.log('LIST', list);
  };

  // render() {
  return (
    <>
      <h3>Add Item</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>To Do Item</span>
          <input
            name="text"
            placeholder="Add To Do List Item"
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Difficulty Rating</span>
          <input defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
        </label>
        <label>
          <span>Assigned To</span>
          <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
        </label>
        <button>Add Item</button>
      </form>
    </>
  );
  // }
}

// export default TodoForm;
