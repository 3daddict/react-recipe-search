import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import GridItems from '../components/GridItems';


function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();

  const getSearched = async (term) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=${term}`);
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);

  };

  useEffect(() => {
    getSearched(params.term);
  },[params.term]);

  return (
    <GridItems
      gridItems={searchedRecipes}
    />
  )
}

export default Searched
