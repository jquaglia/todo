import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import axios from 'axios';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

export default function ToDo() {

  const [list, setList] = useState([]);

  useEffect(() => {
    document.title = `To Do List: (${list.filter(item => !item.complete).length})`;
  }, [list]);

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    item.variant = 'danger';
    setList([...list, item]);
  };

  const _axiosAddItem = async (item) => {
    
  }

  const _axiosGetItems = async (item) => {
    const request = await axios({
      method: 'get',
      url: todoAPI,
    });
    // console.log(request);
    const results = request.data.results;
    setList(results);
  };

  useEffect(_axiosGetItems, []);

  const toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      if (item.variant === 'danger') {
        item.variant = 'success';
      } else if (item.variant === 'success') {
        item.variant = 'danger';
      }

      item.complete = !item.complete;
      setList(list.map(listItem => listItem._id === item._id ? item : listItem));
    }

  };

  // const _getTodoItems = () => {
  //   let list2 = [
  //     { _id: 1, complete: false, variant: 'danger', text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
  //     { _id: 2, complete: false, variant: 'danger', text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
  //     { _id: 3, complete: false, variant: 'danger', text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
  //     { _id: 4, complete: true, variant: 'success', text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
  //     { _id: 5, complete: false, variant: 'danger', text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
  //   ];
  //   setList(list2);
  // };

  // useEffect(_getTodoItems, []);

  return (
    <>
      <header>
      </header>
      <main>
        <h2>
          To Do List Manager ({list.filter(item => !item.complete).length})
        </h2>
        <section className="todo">
          <div>
            <TodoForm addItem={addItem} />
          </div>
          <div>
            <TodoList
              list={list}
              handleComplete={toggleComplete}
            />
          </div>
        </section>
      </main>
    </>
  );
}
