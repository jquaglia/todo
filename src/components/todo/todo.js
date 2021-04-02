import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import axios from 'axios';
import useAjax from '../../hooks/useAjax.js';
import SettingsProvider from '../../context/settings/Settings.js';
// import { Navbar } from 'react-bootstrap';
import Header from '../header/Header.js';
// import { SettingsContext } from '../../context/settings/Settings.js';
// import { useContext } from 'react';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

export default function ToDo() {

  // const context = useContext(SettingsContext);

  const [response, request] = useAjax();
  // eslint-disable-next-line
  const [data, setData] = useState();
  const [list, setList] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   request({ url: 'https://api-js401.herokuapp.com/api/v1/todo' });
  // }, []);

  useEffect(() => {
    setData(response);
  }, [response]);

  // useEffect(() => {
  //   request({ url: 'https://api-js401.herokuapp.com/api/v1/todo', method: 'Get' });
  //   setData(response);
  // }, [response, request, setData]);

  useEffect(() => {
    document.title = `To Do List: (${list.filter(item => !item.complete).length})`;
  }, [list]);

  const _addItem = (item) => {
    let options = {
      url: todoAPI,
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      data: item,
    };
    request(options);
  };

  const _toggleComplete = id => {
    const item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      const url = `${todoAPI}/${id}`;
      const options = {
        url: url,
        method: 'put',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        data: {
          complete: !item.complete,
        },
      };
      request(options);
    }
  };

  const _deleteItem = id => {
    const url = `${todoAPI}/${id}`;
    const options = {
      url: url,
      method: 'delete',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    };
    request(options);
  };

  // const _getItems = item => {
  //   const options = {
  //     url: todoAPI,
  //     method: 'get',
  //     mode: 'cors',
  //     headers: { 'Content-Type': 'application/json' },
  //     data: item,
  //   };
  //   // const results = request.data.results;
  //   // setList(results);
  //   request(options);
  // };

  const _axiosGetItems = async item => {
    const request = await axios({
      method: 'get',
      url: todoAPI,
    });

    const results = request.data.results;
    setList(results);
  };

  useEffect(_axiosGetItems, [_toggleComplete, _deleteItem]);

  return (
    <>
      <SettingsProvider>
        {/* <header>
          <Navbar style={{ color: 'white' }} bg='primary' variant='dark' className='headerOne'>Home</Navbar>
        </header> */}
        <Header />
        <main>
          <h2>
            To Do List Manager ({list.filter(item => !item.complete).length})
          </h2>
          <section className="todo">
            <div>
              <TodoForm addItem={/*addItem*/_addItem} />
            </div>
            <div>
              <TodoList
                list={list}
                handleComplete={_toggleComplete}
                handleDelete={_deleteItem}
              />
            </div>
          </section>
        </main>
      </SettingsProvider>
    </>
  );
}
