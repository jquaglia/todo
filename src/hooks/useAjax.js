import { useState, useEffect } from 'react';
import axios from 'axios';

const useAjax = (url) => {

  const [list, setList] = useState([]);

  const _axiosAddItem = async item => {
    const request = await axios({
      method: 'post',
      url: url,
      data: item,
    });

    // setList([...list, request.data]);
    _axiosGetItems();
    return request;
  };

  const _axiosGetItems = async item => {
    try {
      const request = await axios({
        method: 'get',
        url: url,
      });
      // console.log(request);
      const results = await request.data.results;
      // console.log(results);
      // console.log('B', list);
      setList([...list, results]);
      // console.log('T', list);
    }
    catch (e) {
      console.log(e);
    }
  };

  useEffect(_axiosGetItems, []);

  const _toggleComplete = async id => {
    const item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      const url = `${url}/${id}`;
      const request = await axios({
        method: 'put',
        url: url,
        data: {
          complete: !item.complete,
        },
      });

      setList(list.map(listItem => listItem._id === item._id ? request : listItem));
      // _axiosGetItems();
      // return request;
    }
  };

  return [
    list,
    _axiosAddItem,
    _axiosGetItems,
    _toggleComplete,
  ];
};

export default useAjax;