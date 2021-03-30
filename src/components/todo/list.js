import React from 'react';

// class TodoList extends React.Component {
export default function TodoList(props) {
  // render() {
    return (
      <ul>
        {props.list.map(item => (
          <li
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => props.handleComplete(item._id)}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    );
  // }
}

// export default TodoList;
