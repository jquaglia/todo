import React from 'react';
import { Toast, Badge } from 'react-bootstrap';

export default function TodoList(props) {

  const styles = {
    pill: { cursor: 'pointer' },
  };

  return (
    <>
      {props.list.map(item => (
        <Toast key={item._id} onClose={() => props.handleDelete(item._id)}>
          <Toast.Header>

            <Badge
              pill
              style={styles.pill}
              variant={item.complete ? 'danger' : 'success'}
              // className={`complete-${item.complete.toString()}`}
              onClick={() => props.handleComplete(item._id)}
            // key={item._id}
            >
              {!item.complete ? 'Pending' : 'Complete'}
            </Badge>
            <strong className="mr-auto">{item.assignee}</strong>
            {/* <span onClick={() => props.handleComplete(item._id)}> */}
            {/* {item.text} */}
            {/* </span> */}
          </Toast.Header>
          <Toast.Body>
            {item.text}
            difficulty:{item.difficulty}
          </Toast.Body>
        </Toast>
      ))}
    </>
  );
}
