import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/images/Deliveroo-Logo.png";

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
    <>
      <header>
        <div className="container">
          <img src={logo} alt="logo Deliveroo" />
        </div>
      </header>
      <section className="hero">
        <div className="container">
          <div className="restaurant-infos">
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img src={data.restaurant.picture} alt="photo de tartine" />
        </div>
      </section>
      <main>
        <div className="container">
          <section className="col-left">
            {data.categories.map((typeOfMeal) => {
              if (typeOfMeal.meals.length !== 0) {
                return (
                  <div key={typeOfMeal.name}>
                    <h2>{typeOfMeal.name}</h2>
                    <div>
                      {typeOfMeal.meals.map((meals) => {
                        // console.log(meals.title);

                        return (
                          <div className="categories">
                            <div className="meal">
                              <h3>{meals.title}</h3>
                              <p className="meal-desrciption">
                                {meals.description}
                              </p>
                              <div className="price-popular">
                                <p>{meals.price} €</p>
                                {meals.popular && (
                                  <p className="popular">Populaire</p>
                                )}
                              </div>
                            </div>
                            <div className="img-meals">
                              {meals.picture && (
                                <img src={meals.picture} alt={meals.title} />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </section>
          <section className="col-right"></section>
        </div>
      </main>
    </>
  );
}

export default App;
