import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GridItems from '../components/GridItems';

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&cuisine=${name}`);
    const recipes = await data.json();
    setCuisine(recipes.results);

  };

  // useEffect is a hook that runs when the component is mounted
  // and when the component is updated (when the state changes)
  // the second argument is an array of dependencies that will trigger the useEffect to run again
  useEffect(() => {
    // when the component is mounted, call the getCuisine function and pass the type from the url
    getCuisine(params.type);
  },[params.type])
  return (
    <GridItems
      gridItems={cuisine}
    />
  )
}

export default Cuisine
