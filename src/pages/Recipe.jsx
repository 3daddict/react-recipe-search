import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

function Recipe() {
  const [details, setDetails] = useState({});
  let params = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`);
      const detailData = await data.json();
      setDetails(detailData);
    };
    
    fetchDetails();
  },[params.id]);

  // Find all the periods in the instructions with no spces and replace them with a period and a new line
  const instructions = details.instructions ? details.instructions.replace(/\.(?=[^\s])/g, '.</br>') : '';

  return (
    <div>
      <Header>{details.title}</Header>
      <Wrapper>
        <LeftColumn>
          <img src={details.image} alt={details.title} />
        </LeftColumn>
        <RightColumn>
          <h4>Ingredients</h4>
          <ul>
            {details.extendedIngredients && details.extendedIngredients.map((item) => (
              <li key={item.id}>{item.original}</li>
            ))}
          </ul>
        </RightColumn>
      </Wrapper>
      <Info>
        <h5>Instructions</h5>
        <Instructions dangerouslySetInnerHTML={{__html: instructions}}></Instructions>
        <h5>Summary</h5>
        <Summary dangerouslySetInnerHTML={{__html: details.summary}}></Summary>
      </Info>
    </div>
  )
}

const Header = styled.h2`
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 2rem;

    @media (max-width: 767px) {
      font-size: 2rem;
    }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const LeftColumn = styled.div`
  width: 50%;

  img {
    width: 100%;
    border-radius: 8px;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const RightColumn = styled.div`
  width: 50%;
  padding-left: 1rem;

  h4 {
    font-size: 1.2rem;
  }

  ul {
    font-size: 0.8rem;
    padding-left: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 767px) {
    width: 100%;
    padding-left: 0;
    h4 {
      margin-top: 2rem;
    }
  }
`;


const Info = styled.div`
  margin-bottom: 2rem;
  h5 {
    font-size: 1.2rem;
    margin: 2rem 0 1rem 0;
  }
`

const Instructions = styled.p`
  margin-bottom: 2rem;
`

const Summary = styled.p`
  font-size: 0.8rem;
`

export default Recipe
