import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Router from "next/router";
import styled from "styled-components";
import { findMeals, findMeal } from "../utils/fetchers";
import Modal from "../components/Modal";
import { RotatingLines } from "react-loader-spinner";
export default function KitchenDashboard() {
  const [searchword, setSearchword] = useState("");
  const [load, setLoad] = useState(false);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState({
    isError: false,
    isLoading: false,
    isFetched: false,
    notFound: false,
  });
  const [searchValue, setSearchValue] = useState("");
  const [mealsarr, setMealsarr] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("status")) {
      Router.push("/");
    } else {
      setLoad(true);
      setTimeout(() => {
        // setModal(true);
      }, 120000);
    }
  }, []);
  // const [accent, setAccent] = useState({
  //   color1: "tomato",
  //   color2: "rgb(17, 227, 241)",
  // });
  // useEffect(() => {
  //   if (localStorage.getItem("accent")) {
  //     setAccent(JSON.parse(localStorage.getItem("accent")));
  //   }
  // }, []);
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchword(searchValue);
    setStatus({
      ...status,
      isFetched: false,
    });
    setMealsarr([]);
    if (!searchValue || searchValue.trim() === "") {
      setSearchValue("Enter Meal or Click shuffle");
      return;
    }
    if (searchValue.split(" ").length > 1) {
      setSearchValue("Enter one word");
      return;
    }
    setStatus({
      isError: false,
      isLoading: true,
      isFetched: false,
      notFound: false,
    });
    const { meals, isError } = await findMeals(searchValue);
    if (isError === true) {
      setStatus({
        isError: true,
        isLoading: false,
        isFetched: false,
        notFound: false,
      });
      return;
    }
    if (meals.meals === null) {
      setStatus({
        isError: false,
        isLoading: false,
        isFetched: false,
        notFound: true,
      });
      return;
    }
    setMealsarr(meals.meals);
    console.log(mealsarr);
    setStatus({
      isError: false,
      isLoading: false,
      isFetched: true,
      notFound: false,
    });
  };
  const handleRandom = () => {
    console.log("I was hit");
  };
  const handleSingleMeal = () => {
    console.log("I am single meal");
  };
  return (
    <>
      {load ? (
        <Main>
          <Modal modal={modal} setModal={setModal} />
          <form aria-roledescription="search meal form" onSubmit={handleSearch}>
            <article className="input_bar">
              <div className="input_con">
                <input
                  type="text"
                  name="text"
                  id=""
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search Meal By Name"
                />
                <button type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
              <button className="btn_ran" onClick={handleRandom} type="button">
                <i className="bi bi-shuffle"></i>
              </button>
            </article>
          </form>
          <section className="body_section">
            {status.isError && (
              <div className="containers error">
                <Image
                  width="80px"
                  height="80px"
                  src="/error.png"
                  alt="error icon"
                />
                <h4>An Error Occured </h4>
                <h4>Please Try Again</h4>
              </div>
            )}
            {/*  */}
            {status.notFound && (
              <div className="containers notfound">
                <h1>Sorry!!!</h1>
                <div>
                  <Image
                    width="80px"
                    height="80px"
                    src="/notfound.png"
                    alt="404 error icon"
                  />
                  <h4>We Searched Everywhere</h4>
                  <h4>
                    We Couldn't Find{" "}
                    <span className="searchword">{`"${searchword.toUpperCase()}"`}</span>
                  </h4>
                </div>
                <div>
                  <p>
                    please try using keywords, <br /> few first letters <br />{" "}
                    or a major ingredient
                  </p>
                </div>
              </div>
            )}
            {/*  */}
            {status.isLoading && (
              <div className="containers loading">
                <RotatingLines
                  width="90"
                  strokeWidth="2"
                  animationDuration="1"
                  strokeColor="pink"
                />
                <h4>One Moment...</h4>
              </div>
            )}
            {/*  */}
            {status.isFetched && (
              <div className="containers fetched">
                <h2>Search Results For {searchword.toUpperCase()}</h2>
                <div className="meal_grid_con">
                  {mealsarr.map((meal) => (
                    <div
                      onClick={handleSingleMeal}
                      key={meal.idMeal}
                      className="meal_card"
                    >
                      <Image
                        layout="fill"
                        placeholder="blurDataURL"
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                      />
                      <p>{meal.strMeal}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </Main>
      ) : (
        ""
      )}
    </>
  );
}
const Main = styled.main`
  padding: 20px 10px 10px 10px;
  width: 100%;
  min-height: 100vh;
  .input_bar {
    margin: 0 auto;
    min-width: 260px;
    max-width: 425px;
    display: flex;
    input,
    button {
      padding: 6px 0;
      border: none;
      outline: none;
      background: transparent;
      color: white;
      font-size: 16px;
    }
    .input_con {
      flex: 0.85;
      display: flex;
      border-radius: 20px;
      overflow: hidden;
      border: 2px solid pink;
      padding: 5px;
      input {
        flex: 0.7;
      }
      button {
        flex: 0.3;
        width: 100%;
        border-left: 2px solid white;
        color: pink;
      }
    }
    .btn_ran {
      flex: 0.15;
      width: 100%;
      margin-left: 7px;
      border: 2px solid pink;
      background-color: pink;
      border-radius: 10px;
    }
  }
  /* ............end of form / input_bar styles........... */
  .body_section {
    margin: 0 auto;
    margin-top: 30px;
    min-height: 80vh;
    max-width: 768px;
    /* border: 2px solid red; */
  }
  .containers {
    min-height: 80vh;
  }
  .containers.fetched {
    h2 {
      text-align: center;
      font-style: italic;
      font-family: "Lobster", cursive;
      margin-bottom: 15px;
    }
    .meal_card {
      border: 2px solid white;
      position: relative;
    }
    .meal_grid_con {
      /* border: 2px solid blue; */
      display: grid;
      place-content: center;
      grid-template-columns: repeat(auto-fill, 140px);
      grid-auto-rows: 140px;
      gap: 1em;
    }
  }
  /* ..........end of containers.fetched styling.......... */
  .containers.error,
  .containers.notfound,
  .containers.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .containers.error,
  .containers.loading {
    justify-content: center;
  }
  .containers.notfound {
    justify-content: space-around;
  }
  .searchword {
    color: pink;
  }
  @media screen and (min-width: 321px) {
    .input_con {
      input {
        flex: 0.8;
      }
      button {
        flex: 0.2;
      }
    }
  }
  background: rgb(26, 26, 39);
  color: white;
`;

// const style = {
//   theme:{
//     dark:{},
//     light:{}
//   },
//   accent:{
//     colors:{

//     },
//   }
// }
//  .c-accent1 {
//     color: ${(props) => (props.accent ? props.accent.color1 : "")};
//   }
//   .c-accent2 {
//     color: ${(props) => (props.accent ? props.accent.color2 : "")};
//   }
