import { useEffect, useState } from "react";
import Carousel from "./Carousel";

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
    }
  }

  return (
    <div>
      <Carousel
        carouselTitle="Popular"
        carouselData={popular}
      />
    </div>
  )
}

