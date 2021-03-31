import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import axios from 'axios';
// import useAjax from '../../hooks/useAjax.js';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

export default function ToDo() {

  const [list, setList] = useState([]);
  // const [list, _axiosAddItem, _axiosGetItems, _toggleComplete] = useAjax(todoAPI);
  // const [_axiosAddItem, _axiosGetItems, _toggleComplete] = useAjax(todoAPI);

  useEffect(() => {
    document.title = `To Do List: (${list.filter(item => !item.complete).length})`;
  }, [list]);

  const _axiosAddItem = async item => {
    const request = await axios({
      method: 'post',
      url: todoAPI,
      data: item,
    });
    // console.log(request);
    _axiosGetItems();
    return request;
  };

  const _axiosGetItems = async item => {
    const request = await axios({
      method: 'get',
      url: todoAPI,
    });
    // console.log(request);
    const results = request.data.results;
    setList(results);
  };

  const _toggleComplete = async id => {
    const item = list.filter(i => i._id === id)[0] || {};
    
    if (item._id) {
      const url = `${todoAPI}/${id}`;
      const request = await axios({
        method: 'put',
        url: url,
        data: {
          complete: !item.complete,
        },
      });
      // console.log(request);
      _axiosGetItems();
      return request;
    }
  };
  
  const _axiosDeleteItem = async id => {
    const url = `${todoAPI}/${id}`;
    let request = await axios({
      method: 'delete',
      url: url,
    });
    _axiosGetItems();
    return request;
  };
  
  useEffect(_axiosGetItems, []);
  
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
            <TodoForm addItem={/*addItem*/_axiosAddItem} />
          </div>
          <div>
            <TodoList
              list={list}
              handleComplete={_toggleComplete}
              handleDelete={_axiosDeleteItem}
            />
          </div>
        </section>
      </main>
    </>
  );
}
