import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';


export default function Popular() {
  // useState is a React hook that allows us to use state in functional components
  // The first argument is the state variable
  // The second is a function to update the state
  const [popular, setPopular] = useState([]);

  // useEffect is a React hook that runs a function when the component is mounted
  // The second argument is an array of dependencies.
  //If the array is empty, the function will only run once when the component is mounted
  useEffect(() => {
    getPolular();
  },[]);

  const getPolular = async () => {
    const check = localStorage.getItem('popular');
    // If the data is in local storage, use that data
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=9`);
      const data = await api.json();
      // Save the data to local storage
      localStorage.setItem('popular', JSON.stringify(data.recipes));
      // Update the state with the data from the API
      setPopular(data.recipes);
      console.log('RECIPES: ', data.recipes);
    }
  }


  return (
    <div>
      <Wrapper>
        <h3>Popular Recipes</h3>
        <Splide options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '5rem'
          }}>
        {/* map through the popular array and return a div for each recipe */}
        {popular.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Card>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Gradiant />
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