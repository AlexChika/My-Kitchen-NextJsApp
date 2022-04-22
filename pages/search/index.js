import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { findMeals } from "../../utils/fetchers";
import Modal from "../../components/Modal";
import { RotatingLines } from "react-loader-spinner";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import { getdate } from "../dashboard/index";
export default function Search() {
  const router = useRouter();
  const [searchword, setSearchword] = useState("");
  const [load, setLoad] = useState(false);
  const [modal, setModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mealsarr, setMealsarr] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [status, setStatus] = useState({
    isError: false,
    isLoading: false,
    isFetched: false,
    notFound: false,
  });
  useEffect(() => {
    if (!localStorage.getItem("status")) {
      router.push("/");
    } else {
      setLoad(true);
    }
  }, []);
  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(favourites);
  }, []);
  const handleShowList = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle("show");
  };
  const handleAddToFavourites = (meal) => {
    const getIngr = (ing, meal) => {
      let ingr = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[ing + i] !== null) {
          if (meal[ing + i].trim().length > 0) {
            ingr.push(meal[ing + i]);
          } else {
            break;
          }
        } else {
          break;
        }
      }
      return ingr;
    };
    const name = meal.strMeal;
    const img = meal.strMealThumb;
    const ing = getIngr("strIngredient", meal);
    const id = meal.idMeal;
    const inList = [...favourites].find((favourite) => favourite.id === id);
    if (inList) return;
    const favourite = [
      ...favourites,
      {
        date: getdate(),
        name,
        ing,
        img,
        id,
      },
    ];
    setFavourites(favourite);
    localStorage.setItem("favourites", JSON.stringify(favourite));
  };
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
    if (searchValue.trim().split(" ").length > 1) {
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
  return (
    <>
      <Header>
        <meta
          name="description"
          content="mykitchen.vercel.app | Search For Meals., see cooking tutorials on youtube, find kitchen recipees of all kinds off food, save favorites and make cooking timetables and diet planing"
        />
        <meta
          content="My Kitchen | Search For Meals| Search For Recipees|"
          property="og:title"
        />
        <meta
          content="mykitchen.vercel.app | Search For Meals., see cooking tutorials on youtube, find kitchen recipees of all kinds off food, save favorites and make cooking timetables and diet planing"
          property="og:description"
        />
        <meta content="article" property="og:type" />
        <meta
          content={`https://mykitchen.vercel.app/search`}
          property="og:url"
        />
        <title>My Kitchen | Search For Meals | Search For Recipees|</title>
      </Header>
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
            {/* ................. */}
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
                    We Couldn&apos;t Find{" "}
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
            {/* .................. */}
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
            {/* ...................... */}
            {status.isFetched && (
              <div className="containers fetched">
                <h2>Search Results For {searchword.toUpperCase()}</h2>
                <div className="meal_grid_con">
                  {mealsarr.map((meal) => (
                    <div className="meal_con" key={meal.idMeal}>
                      <div className="tasks flex_center">
                        <button onClick={handleShowList} className="tasks_btn">
                          <i className="bi bi-three-dots"></i>
                        </button>
                        <div className={`tasks_list`}>
                          <button
                            onClick={(e) => {
                              e.target.parentElement.classList.toggle("show");
                              handleAddToFavourites(meal);
                            }}
                          >
                            Add To Favourites
                          </button>
                        </div>
                      </div>
                      <a href={`/search/${meal.strMeal + "=" + meal.idMeal}`}>
                        <div className="meal_card">
                          <Image
                            layout="fill"
                            placeholder="blurDataURL"
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                          />
                          <div className="meal_title">
                            <h4>{meal.strMeal}</h4>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
          <Navigation current={"search"} />
        </Main>
      ) : (
        ""
      )}
    </>
  );
}
const Main = styled.main`
  padding: 2.5% 2.5% 0px 2.5%;
  width: 100%;
  min-height: 100vh;
  .flex_center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button,
  input {
    border: none;
    outline: none;
    background: transparent;
  }
  .input_bar {
    height: calc(8vh-6px);
    margin: 0 auto;
    min-width: 260px;
    max-width: 425px;
    display: flex;
    input,
    button {
      padding: 6px 0;
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
    margin-top: 2.5%;
    min-height: 80vh;
    max-width: 768px;
    overflow-x: auto;
    margin-bottom: 50px;
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
    .meal_grid_con {
      display: grid;
      place-content: center;
      grid-template-columns: repeat(auto-fill, 250px);
      grid-auto-rows: 250px;
      gap: 1em;
      row-gap: 3em;
    }
    .meal_con {
      position: relative;
    }
    .meal_card {
      border: 2px solid white;
      position: relative;
      min-height: 100%;
    }
    .meal_title {
      height: 40px;
      width: 100%;
      position: absolute;
      bottom: 0%;
      transform: translateY(125%);
      text-align: center;
      color: white;
      z-index: 90;
    }

    .tasks {
      position: absolute;
      z-index: 90;
      top: 0;
      right: 0px;
      width: 50px;
      flex-direction: column;
      .tasks_btn {
        width: 100%;
        height: 100%;
        i {
          font-size: 30px;
          color: white;
          text-shadow: 1px 1px 3px black;
        }
      }
      .tasks_list {
        position: relative;
        width: 200%;
        left: -50%;
        padding: 10px 0px;
        transition: all 0.3s linear;
        height: 0;
        overflow: hidden;
        visibility: collapse;
        button {
          font-size: 11px;
          width: 100%;
          height: 2.5em;
          color: white;
          margin-bottom: 10px;
          background: pink;
          padding: 5px 0px;
          border-radius: 15px;
          box-shadow: 2px 2px 3px grey;
        }
      }
      .tasks_list.show {
        height: 50px;
        visibility: visible;
      }
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
  @media screen and (min-width: 340px) {
    .containers.fetched {
      .meal_grid_con {
        grid-template-columns: repeat(auto-fill, 150px);
        grid-auto-rows: 150px;
      }
    }
  }
  @media screen and (min-width: 370px) {
    .containers.fetched {
      .meal_grid_con {
        grid-template-columns: repeat(auto-fill, 165px);
        grid-auto-rows: 165px;
      }
    }
  }
  @media screen and (min-width: 400px) {
    .containers.fetched {
      .meal_grid_con {
        grid-template-columns: repeat(auto-fill, 180px);
        grid-auto-rows: 180px;
      }
    }
  }
  @media screen and (min-width: 440px) {
    .containers.fetched {
      .meal_grid_con {
        grid-template-columns: repeat(auto-fill, 200px);
        grid-auto-rows: 200px;
      }
    }
  }
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
