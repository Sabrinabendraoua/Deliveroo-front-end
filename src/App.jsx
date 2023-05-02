import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
//mon composant se monte et se render, je définis un state
function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //on ne peut pas rendre un composant asynchrone, dc je crée une foonction fetchData, qui pourra être asynchrone
  useEffect(() => {
    const fetchData = async () => {
      try {
        // je fais une requête
        const response = await axios.get(
          "https://site--deliveroo-backend--tx5c9k6kvmfr.code.run/"
        );
        // console.log(response.data);
        //je stocke le résultat ds data
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData(); // j'appel ma fonction
  }, []);

  return isLoading ? (
    <p>Loading....</p>
  ) : (
    //    <div>
    //     <h1>{data.restaurant.name}</h1>
    //    <p>{data.restaurant.description}</p>
    //    <img src={data.restaurant.picture} alt="photo de tartine" />
    //  </div>
    <main>
      {data.categories.map((typeOfMeal) => {
        if (typeOfMeal.meals.length !== 0) {
          return (
            <div>
              <h2 key={typeOfMeal.meals.id}>{typeOfMeal.name}</h2>
              <section>
                {typeOfMeal.meals.map((meals) => {
                  // console.log(meals.title);

                  return (
                    <div className="categories">
                      <div className="meal">
                        <h3>{meals.title}</h3>
                        <p>{meals.description}</p>
                        <p>{meals.price} €</p>
                        {meals.popular && <p>Populaire</p>}
                      </div>
                      <div className="img-meals">
                        <img src={meals.picture} alt={meals.title} />
                      </div>
                    </div>
                  );
                })}
              </section>
            </div>
          );
        } else {
          return null;
        }
      })}
    </main>
  );
}

export default App;