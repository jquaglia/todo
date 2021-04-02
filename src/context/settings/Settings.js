import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {

  let [currentPage, setCurrentPage] = useState(1);
  let [displayCompleted, setDisplayCompleted] = useState(true);
  let [itemsPerPage, setItemsPerPage] = useState(5);
  let [sortBy, setSortBy] = useState('difficulty');

  const state = {
    currentPage,
    displayCompleted,
    itemsPerPage,
    sortBy,
    updateSort: setSortBy,
    updateItemsPerPage: setItemsPerPage,
    updateDisplayCompleted: setDisplayCompleted,
    updateCurrentPage: setCurrentPage,
  };

  return (
    // eslint-disable-next-line
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;