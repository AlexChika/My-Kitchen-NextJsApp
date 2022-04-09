import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { findMeal } from "../../../utils/fetchers";
import Image from "next/image";
import styled from "styled-components";
import { BallTriangle } from "react-loader-spinner";
const Index = () => {
  const [load, setLoad] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [instruction, setInstruction] = useState(false);
  const [mealInfo, setMealInfo] = useState([{ strMeal: "I am Testing" }]);
  const [status, setStatus] = useState({
    isError: false,
    isLoading: false,
    isFetched: false,
  });
  const getIngr = (ing) => {
    let ingr = [];
    let meal = mealInfo[0];
    for (let i = 1; i <= 20; i++) {
      if (meal[ing + i]) {
        ingr.push(meal[ing + i]);
      } else {
        break;
      }
    }
    return ingr;
  };
  const getId = (link) => link.split("=")[1];
  const router = useRouter();
  useEffect(() => {
    const route = router && router.query["meal"];
    if (route) {
      if (!route.includes("=")) {
        router.push("/kitchendashboard");
      } else {
        setLoad(true);
      }
    }
  }, [router]);
  const getMeal = async () => {
    const id = router?.query?.meal?.split("=")[1];
    if (id) {
      setStatus({ isError: false, isFetched: false, isLoading: true });
      const { meal, isError } = await findMeal(id);
      console.log(meal);
      if (isError || meal.meals === null) {
        setStatus({ isFetched: false, isLoading: false, isError: true });
        return;
      }
      if (meal) {
        setMealInfo(meal.meals);
        setStatus({ isError: false, isLoading: false, isFetched: true });
        return;
      }
    }
  };
  useEffect(() => {
    getMeal();
  }, [router]);
  return (
    <>
      {load ? (
        <Main>
          {status.isError && (
            <div className="containers error">
              <Image
                width="80px"
                height="80px"
                src="/error.png"
                alt="error icon"
              />
              <h4>An Error Occured </h4>
              <h5>Please Try Again</h5>
            </div>
          )}
          {status.isLoading && (
            <div className="containers loading">
              <BallTriangle
                heigth="100"
                width="100"
                color="pink"
                ariaLabel="loading-indicator"
              />{" "}
              <br />
              <h4>One Moment...</h4>
            </div>
          )}
          {status.isFetched && (
            <Section className="container fetched">
              <h1 className="heading">{mealInfo[0].strMeal}</h1>
              <div className="image">
                <Image
                  layout="fill"
                  priority
                  placeholder="blurDataURL"
                  src={mealInfo[0].strMealThumb}
                  alt={mealInfo[0].strMeal}
                />
              </div>
              <div className="category">
                <h4>
                  <p>Category : </p>
                  <span>{mealInfo[0].strCategory || "None"}</span>{" "}
                  <button>
                    <i className="bi bi-search"></i>
                  </button>
                </h4>
                <h4>
                  <p>Area : </p>
                  <span>{mealInfo[0].strArea || "None"}</span>{" "}
                  <button>
                    <i className="bi bi-search"></i>
                  </button>
                </h4>
                <h4>
                  <p>Tags: </p>
                  <span>
                    {showAll
                      ? mealInfo[0].strTags
                        ? mealInfo[0].strTags
                            .split(",")
                            .map((tag, index) => <p key={index}>{tag}</p>)
                        : "None"
                      : mealInfo[0].strTags
                      ? mealInfo[0].strTags.substr(0, 10) + ".."
                      : "None"}
                    <button
                      style={{ color: "pink" }}
                      onClick={() => setShowAll(!showAll)}
                    >
                      {showAll ? (
                        <i className="bi bi-caret-down"></i>
                      ) : (
                        <i className="bi bi-caret-up"></i>
                      )}
                    </button>
                  </span>
                  <button>
                    <i className="bi bi-search"></i>
                  </button>
                </h4>
              </div>
              <div className="instructions">
                <h2>Cooking Instructions</h2>
                <h5 className={instruction ? "justify" : "center"}>
                  {instruction
                    ? mealInfo[0].strInstructions
                        .split(".")
                        .map((ins, index) => (
                          <p key={index}>
                            {" "}
                            <span>{index + 1}..</span>
                            {ins}
                          </p>
                        ))
                    : mealInfo[0].strInstructions}
                </h5>
                <div className="buttons_con">
                  <h4>Show Instructions As</h4>
                  <button onClick={() => setInstruction(true)}>
                    <span>List </span>
                    <i className="bi bi-list-ol"></i>
                  </button>
                  <button onClick={() => setInstruction(false)}>
                    <span>Paragraph </span>
                    <i className="bi bi-text-center"></i>
                  </button>
                </div>
              </div>
              <div className="ingredients">
                <h2>Ingredients</h2>
                <article className="table">
                  <div className="column">
                    <h4>Ingredient</h4>
                    {getIngr("strIngredient").map((ing, index) => (
                      <p key={index}>{ing}</p>
                    ))}
                  </div>
                  <div className="column">
                    <h4>Amount</h4>
                    {getIngr("strMeasure").map((ing, index) => (
                      <p key={index}>{ing}</p>
                    ))}
                  </div>
                </article>
              </div>
              <div className="youtube">
                <h2>Watch On Youtube</h2>
                {mealInfo[0].strYoutube ? (
                  <article>
                    <figure className="youtube_con">
                      <iframe
                        src={`https://www.youtube.com/embed/${getId(
                          mealInfo[0].strYoutube
                        )}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </figure>
                  </article>
                ) : (
                  <article>
                    <div className="youtube_con noyoutube_con">
                      <div className="notfound">
                        <h1>Ooops!!!</h1>
                        <h4>We Couldn&apos;t Find A Youtube Video</h4>
                        <div className="image_con">
                          <Image
                            width="100px"
                            height="100px"
                            src="/errortv.png"
                            alt="404 error icon"
                          />
                        </div>
                      </div>
                    </div>
                    <p>
                      Youtube video is not availaible... pls Search on Google
                    </p>
                  </article>
                )}
              </div>
              <div className="google">
                <h2>Search On Google</h2>
                <div>
                  <Script
                    async
                    src="https://cse.google.com/cse.js?cx=dbabda20325129ce0"
                  ></Script>
                  <div
                    id="google"
                    enableAutoComplete="true"
                    className="gcse-searchbox"
                  ></div>
                </div>
                <div className="google_results">
                  <div className="gcse-searchresults"></div>
                </div>
              </div>
              <div className="related"></div>
              <section className="search results"></section>
            </Section>
          )}
        </Main>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Index;
const Main = styled.main`
  color: white;
  button {
    background: none;
    outline: none;
    border: none;
  }
  .containers.error,
  .containers.loading {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const Section = styled.section`
  padding: 30px 5px;
  max-width: 768px;
  margin: 0 auto;
  .heading {
    text-align: center;
    padding-bottom: 10px;
    width: max-content;
    max-width: 280px;
    margin: 0 auto;
    border-bottom: 2px dashed pink;
  }
  .image {
    height: 60vh;
    max-width: 600px;
    position: relative;
    object-fit: center;
    margin: 0 auto;
    margin-top: 20px;
  }
  .category {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    h4 {
      display: flex;
      width: 11em;
      justify-content: space-between;
      margin-bottom: 15px;
      border: 2px solid white;
      padding: 5px;
      span {
        word-break: break-all;
      }
    }
    h4 * {
      width: max-content;
    }
    button {
      background: none;
      border: none;
      outline: none;
      color: pink;
    }
  }
  .instructions {
    margin-top: 20px;
    text-align: center;
    h2 {
      width: max-content;
      margin: 0 auto;
      margin-bottom: 10px;
      color: pink;
      border-bottom: 2px solid white;
    }

    .justify {
      text-align: justify;
      padding: 10px;
    }
    .center {
      text-align: center;
    }
    h5 {
      font-weight: 300;
    }
    .buttons_con {
      margin-top: 10px;
      button {
        padding: 5px 7px;
        color: white;
        text-align: center;
        width: 8em;
        border: 2px solid pink;
        margin: 3px;
      }
    }
  }
  .ingredients {
    margin-top: 20px;
    h2 {
      text-align: center;
    }
    .table {
      margin-top: 10px;
      border: 2px solid white;
      display: flex;
      .column {
        width: 50%;
        padding: 5px;
        h4 {
          text-align: center;
          width: max-content;
          border-bottom: 1px solid white;
          margin: 0 auto;
        }
      }
      .column :first-of-type {
        border-right: 1px solid white;
      }
      .column :last-of-type {
        border-left: 1px solid white;
      }
    }
  }
  .youtube {
    text-align: center;
    margin-top: 20px;
    .youtube_con {
      margin-top: 10px;
      position: relative;
      padding-bottom: 60%;
      width: 100%;
      iframe {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
    .noyoutube_con {
      position: relative;
      border: 1px solid white;
    }
    .notfound {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    label {
      color: gray;
    }
  }
  .google {
    margin-top: 20px;
    text-align: center;
  }
  @media screen and (min-width: 546px) {
    .category {
      display: flex;
      flex-direction: row;
    }
  }
`;
/*
Filter by Category
www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
Filter by Area
www.themealdb.com/api/json/v1/1/filter.php?a=Canadian
list all by area
www.themealdb.com/api/json/v1/1/list.php?a=list
*/
