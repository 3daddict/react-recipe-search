import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const SearchHistory = ({ input }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // If the input is empty, don't add it to the search history
    if (input.length === 0) return;

    setSearchHistory((prevSearchHistory) => [input, ...prevSearchHistory].slice(0, 5));
  }, [input]);

  return (
    <List>
      <h3>Recent Searches</h3>
      {searchHistory.map((query, index) => (
        <LinkAnchor key={index} to={'/searched/' + query}>
          <ListItem active={location.pathname === `/searched/${query}`}>{query}</ListItem>
        </LinkAnchor>
      ))}
    </List>
  );
};

const List = styled.ul`
  padding: 0;
  margin: 1rem;

  h3 {
    margin-left: -1rem;
  }
`;

const LinkAnchor = styled(Link)`
  text-decoration: none;
`;

const ListItem = styled.li`
  color: ${({ active }) => active ? '#1C2331' : '#9B9B9B'};
  font-weight: ${({ active }) => active ? 'bold' : 'normal'};
  cursor: ${({ active }) => active ? 'default' : 'pointer'};
  
  &:hover {
    color: #1C2331;
  }
`;

export default SearchHistory;
