import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

export default function Veggie() {

  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  },[]);

  const getVeggie = async () => {
    const check = localStorage.getItem('veggie');
    // If the data is in local storage, use that data
    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=9&tags=vegetarian`);
      const data = await api.json();
      // Save the data to local storage
      localStorage.setItem('veggie', JSON.stringify(data.recipes));
      // Update the state with the data from the API
      setVeggie(data.recipes);
      console.log('RECIPES: ', data.recipes);
    }
  }
  
  return (
    <div>

      <Wrapper>
        <h3>Veggie Recipes</h3>
        <Splide options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '5rem'
          }}>
        {veggie.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Card>
              <Link to={'/recipe/' + recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradiant />
                </Link>
              </Card>
            </SplideSlide>
          );
        })}
                      
        </Splide>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    border-radius: 0.5rem;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: #FFF;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Gradiant = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`