import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
//mon composant se monte et se render, je définis un state
function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // je fais une requête
      const response = await axios.get(
        "https://site--deliveroo-backend--tx5c9k6kvmfr.code.run/"
      );
      console.log(response.data);
      //je stocke le résultat ds data
      setData(response.data);
      setIsLoading(false);
    };
    fetchData(); // j'appel ma fonction
  }, []);

  return data ? (
    data.categories.map((typeOfMeal) => {
      console.log(typeOfMeal.meals);
      return (
        <main>
          <h2 key={typeOfMeal.meals.id}>{typeOfMeal.name}</h2>
          <section>
            {typeOfMeal.meals.map((meals) => {
              return (
                <div className="categories">
                  <div className="meal">
                    <h3>{meals.title}</h3>
                    <p>{meals.description}</p>
                    <p>{meals.price}</p>
                  </div>
                  <div>
                    <img src={meals.picture} />
                  </div>
                </div>
              );
            })}
          </section>
        </main>
      );
    })
  ) : (
    <p>Loading....</p>
  );
}

export default App;
