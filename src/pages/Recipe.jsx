import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

function Recipe() {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');

  let params = useParams();

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`);
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  },[params.id]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>
          Instructions
        </Button>
        <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>
          Ingredients
        </Button>
        {activeTab === 'instructions' && (
          <div>
            <p dangerouslySetInnerHTML={{__html: details.instructions}}></p>
            <p dangerouslySetInnerHTML={{__html: details.summary}}></p>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <ul>
          {details.extendedIngredients && details.extendedIngredients.map((item) => (
            <li key={item.id}>{item.original}</li>
          ))}
        </ul>
        )}
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
  }

  ul {
    margin-top: 2rem;
  }

  li {
    font-size: 1.2 rem;
    line-height: 2.5rem;
  }
`

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #FFF;
  border: 2px solid black;
  font-weight: 600;
`

const Info = styled.div`
  margin-left: 10rem;
`

export default Recipe
