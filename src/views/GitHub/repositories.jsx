import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

// const repoStyle = { 
//   width: '30%',
//   // display: 'flex',
// };

// const layoutStyle = { 
//   display: 'flex',
// };

export default ({repos, selected, handleClick}) => {
  return (
    <List>
      {repos.map((repo) => (
        <ListItem
          key={repo.id}
          button
          dense={false}
          onClick={(e) => handleClick(e, repo.id, repo.name)}
          selected={repo.name === selected}
          component="div"
        >
          <ListItemText primary={repo.name} />
        </ListItem>
      ))}
    </List>
  );
};

export const RepositoryLoader = () => (
  <SkeletonTheme color="#202020" highlightColor="#444">
    <List>
      {Array(3).fill().map((item, index) => (
          <ListItem button dense={false} key={index} component="div">
            <ListItemText primary={<Skeleton width={270} />} />
          </ListItem>
        ))}
    </List>
  </SkeletonTheme>
);
