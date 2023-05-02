import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/images/Deliveroo-Logo.png";

//mon composant se monte et se render, je définis un state
function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [addMealname, setAddMealname] = useState([0]);
  const [addMealprice, setAddMealprice] = useState([0]);
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
                    <div className="meals-container">
                      {typeOfMeal.meals.map((meals) => {
                        // console.log(meals.title);

                        return (
                          <article
                            key={meals.id}
                            onClick={() => {
                              const addMealnameCopy = [...addMealname];
                              const addMealpriceCopy = [...addMealprice];
                              addMealnameCopy.push(0);
                              addMealpriceCopy.push(0);
                              setAddMealname(addMealnameCopy);
                              setAddMealprice(addMealpriceCopy);
                            }}
                          >
                            <div>
                              <h3>{meals.title}</h3>
                              <p className="meal-desrciption">
                                {meals.description}
                              </p>
                              <div className="price-popular">
                                <p>{meals.price} €</p>
                                {meals.popular && (
                                  <p className="popular">
                                    <i class="fa-solid fa-star"></i>
                                    Populaire
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              {meals.picture && (
                                <img src={meals.picture} alt={meals.title} />
                              )}
                            </div>
                          </article>
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
          <section className="col-right">
            <div className="basket">
              <button className="button-basket">Valider mon panier</button>
            </div>
            <div className="add-meal">
              <div className="quantity">
                <button
                  onClick={() => {
                    if (counter > 0) {
                      setCounter(counter - 1);
                    }
                  }}
                >
                  -
                </button>
                <p>{counter}</p>
                <button
                  onClick={() => {
                    setCounter(counter + 1);
                  }}
                >
                  +
                </button>
              </div>
              <div className="name-meal">
                <p>Brunch authentique 1 personne</p>
              </div>
              <div className="price-meal">
                <p>25,00 €</p>
              </div>
            </div>
            <div className="sub-total">
              <p>Sous-total</p>
              <p>25,00 €</p>
            </div>
            <div className="delivered">
              <p>Frais de livraison</p>
              <p>2,50 €</p>
            </div>
            <div className="total">
              <p>Total</p>
              <p>27,50 €</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
