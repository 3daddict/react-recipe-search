import { useEffect, useState } from "react";
import Carousel from "./Carousel";

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
    }
  }
  
  return (
    <div>
      <Carousel
        carouselTitle="Veggie"
        carouselData={veggie}
      />
    </div>
  )
}
