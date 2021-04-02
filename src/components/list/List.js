import React, { useContext } from 'react';
import { Toast, Badge } from 'react-bootstrap';
import { SettingsContext } from '../../context/settings/Settings.js';
import PaginationStation from '../pagination/Pagination.js';


export default function TodoList(props) {

  const context = useContext(SettingsContext);

  const styles = {
    pill: { cursor: 'pointer' },
  };

  const sortedList = props.list.sort((first, second) => {
    if (second.difficulty > first.difficulty) { return 1; }
    else if (first.difficulty > second.difficulty) { return -1; }
    else { return 0; }
  });

  const filteredList = sortedList.filter(item => !item.complete);
  const filteredTrueList = sortedList.filter(item => item.complete);
  const oneListToRuleThemAll = [...filteredList, ...filteredTrueList];

  const numberOfPages = Math.ceil(oneListToRuleThemAll.length / context.itemsPerPage);

  const indexOfLastPost = context.currentPage * context.itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - context.itemsPerPage;
  const currentPosts = oneListToRuleThemAll.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => context.updateCurrentPage(pageNumber);

  const active = context.currentPage;

  return (
    <>
      {currentPosts.map(item => (
        <Toast key={item._id} onClose={() => props.handleDelete(item._id)}>
          <Toast.Header>
            <Badge
              pill
              style={styles.pill}
              variant={item.complete ? 'danger' : 'success'}
              onClick={() => props.handleComplete(item._id)}
            >
              {!item.complete ? 'Pending' : 'Complete'}
            </Badge>
            <strong className="mr-auto">{item.assignee}</strong>
          </Toast.Header>
          <Toast.Body>
            <p>
              {item.text}
            </p>
            difficulty:{item.difficulty}
          </Toast.Body>
        </Toast>
      ))}
      <PaginationStation
        active={active}
        numberOfPages={numberOfPages}
        paginate={paginate}
      />
    </>
  );
}
