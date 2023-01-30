import { useEffect, useState } from "react";
import Carousel from "./Carousel";

export default function Dessert() {
  const [dessert, setDessert] = useState([]);

  useEffect(() => {
    getDessert();
  },[]);

  const getDessert = async () => {
    const check = localStorage.getItem('dessert');
    // If the data is in local storage, use that data
    if (check) {
      setDessert(JSON.parse(check));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=9&tags=dessert`);
      const data = await api.json();
      // Save the data to local storage
      localStorage.setItem('dessert', JSON.stringify(data.recipes));
      // Update the state with the data from the API
      setDessert(data.recipes);
    }
  }
  
  return (
    <div>
      <Carousel
        carouselTitle="Dessert"
        carouselData={dessert}
      />
    </div>
  )
}
