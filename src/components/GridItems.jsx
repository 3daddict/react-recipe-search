import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function GridItems({gridItems}) {
  return (
    <Grid>
      {gridItems.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={`/recipe/${item.id}`}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        )
      })}
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 1rem;
  }

  img:hover {
    filter: brightness(0.8);
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
    color: #1c2331;
    text-decoration: none;
  }

  h4:hover {
    color: #f7b731;
  }
`


export default GridItems
