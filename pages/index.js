import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import Modal from "../components/Modal";
import Router from "next/router";
import Header from "../components/Header";
export default function Landing() {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("status")) {
      // Router.push("/kitchendashboard");
    } else {
      setLoad(true);
    }
  }, []);
  const [deviceWidth, setWidth] = useState("");
  const [pageCount, setPageCount] = useState(1);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  const handlePrevPage = () => {
    if (pageCount === 1) {
      return;
    }
    setPageCount(pageCount - 1);
  };
  const handleNextPage = () => {
    if (pageCount === 3) {
      return;
    }
    setPageCount(pageCount + 1);
  };
  return (
    <>
      {load ? (
        <LandingPageLayout page={pageCount}>
          <Header>
            <meta
              name="description"
              content="mykitchen.vercel.app | Search For Meals., see cooking tutorials on youtube, find kitchen recipees of all kinds off food, save favorites and make cooking timetables and diet planing"
            />
            <meta
              content=" My Kitchen | Your Only Step To Becoming A Chef| Search Food
              Recipes, Watch Video Tutorials, Browse All Kinds of Meals, See
              Cooking Instruction , Save Favourites And make Meal Timetables/ Calender and many more"
              property="og:title"
            />
            <meta
              content="mykitchen.vercel.app | Search For Meals., see cooking tutorials on youtube, find kitchen recipees of all kinds off food, save favorites and make cooking timetables and diet planing"
              property="og:description"
            />
            <meta content={`https://mykitchen.vercel.app/`} property="og:url" />
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5656452972473632"
              crossOrigin="anonymous"
            ></script>
            <title>
              My Kitchen | Your Only Step To Becoming A Chef| Search Food
              Recipes, Watch Video Tutorials, Browse All Kinds of Meals, See
              Cooking Instruction , Save Favourites And make Meal Timetables/
              Calender and many more
            </title>
          </Header>
          <div className="arrow_btn_con">
            <button onClick={handleNextPage} className="next">
              <i className="bi bi-caret-right-fill"></i>
            </button>
            <button onClick={handlePrevPage} className="prev">
              <i className="bi bi-caret-left-fill"></i>
            </button>
          </div>
          <div className="progress_con">
            <span></span>
            <span></span>
            <span></span>
          </div>

          {pageCount === 1 && (
            <FirstPage
              pageCount={pageCount}
              handleNextPage={handleNextPage}
              deviceWidth={deviceWidth}
            />
          )}
          {pageCount === 2 && (
            <SecondPage
              pageCount={pageCount}
              handleNextPage={handleNextPage}
              deviceWidth={deviceWidth}
            />
          )}
          {pageCount === 3 && (
            <ThirdPage pageCount={pageCount} deviceWidth={deviceWidth} />
          )}
        </LandingPageLayout>
      ) : (
        ""
      )}{" "}
    </>
  );
}
const FirstPage = ({ pageCount, deviceWidth, handleNextPage }) => {
  return (
    <FirstPageLayout page={pageCount} bg={deviceWidth}>
      <div className="brand_name">
        <i className="fi fi-sr-utensils"></i>
        <h2>My Kitchen</h2>
        <i className="fi fi-sr-pot"></i>
      </div>
      {/* ......end of brand name */}
      <main>
        <div className="middle_text_con">
          <h1>
            Thank You For Choosing Kitchen <i className="fi fi-sr-heart"></i>
          </h1>
          <ul>
            <li>
              <i className="fi fi-sr-star"></i> {"   "} Watch Video Tutorials
            </li>
            <li>
              <i className="fi fi-sr-star"></i> {"   "} Become An Instant Chef
            </li>
            <li>
              <i className="fi fi-sr-star"></i> {"   "} Prepare Your Favorite
              Meal
            </li>
          </ul>
          <p>Your Only Step To Becoming A Chef </p>
        </div>
        <div className="brand_offers_con">
          <section className="brand_balls">
            <div className="brand_balls_first">
              <article>
                <figure className="img_con">
                  <Image
                    alt="mykitchen icons"
                    width="80px"
                    height="80px"
                    src="/ball-1.jpg"
                  />
                </figure>
                <p>Find Meals</p>
              </article>
              {/* ...... */}
              <article>
                <figure className="img_con">
                  <Image
                    alt="mykitchen icons"
                    width="80px"
                    height="80px"
                    src="/ball-2.jpg"
                  />
                </figure>
                <p>See Tutorials</p>
              </article>
              {/* ....... */}
              <article>
                <figure className="img_con">
                  <Image
                    alt="mykitchen icons"
                    width="80px"
                    height="80px"
                    src="/ball-3.jpg"
                  />
                </figure>
                <p>Save Favourites</p>
              </article>
            </div>
            <div className="brand_balls_second">
              <article>
                <figure className="img_con">
                  <Image
                    alt="mykitchen icons"
                    width="80px"
                    height="80px"
                    src="/ball-4.jpg"
                  />
                </figure>
                <p>View Recipes</p>
              </article>
              {/* ........ */}
              <article>
                <figure className="img_con">
                  <Image
                    alt="mykitchen icons"
                    width="80px"
                    height="80px"
                    src="/ball-5.jpg"
                  />
                </figure>
                <p>Make TimeTable</p>
              </article>
              {/* ......... */}
              <article>
                <figure className="img_con">
                  <Image
                    alt="mykitchen icons"
                    width="80px"
                    height="80px"
                    src="/ball-6.jpg"
                  />
                </figure>
                <p>Easy Personalize</p>
              </article>
            </div>
          </section>
        </div>
        <div className="footer_con">
          <button onClick={handleNextPage} className="next_btn">
            Next <i className="bi bi-caret-right"></i>
          </button>
        </div>
      </main>
    </FirstPageLayout>
  );
};
const SecondPage = ({ pageCount, deviceWidth, handleNextPage }) => {
  return (
    <SecondPageLayout page={pageCount} bg={deviceWidth}>
      {deviceWidth ? (
        <figure className="home_vid_bg" aria-roledescription="video container">
          {deviceWidth > 546 ? (
            <video width="1400px" autoPlay muted loop id="myVideo">
              <source src={"/vidbgdesktop.mp4"} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          ) : (
            <video width="546px" autoPlay muted loop id="myVideo">
              <source src={"/vidbgmobile.mp4"} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          )}
        </figure>
      ) : (
        ""
      )}
      {/* .......end of video baground */}
      <section className="sec_page_con">
        <div className="sizer">
          <div className="brand_name">
            <i className="fi fi-sr-utensils"></i>
            <h2>My Kitchen</h2>
            <i className="fi fi-sr-pot"></i>
          </div>
          <div className="sec_page_heading">
            <h2>What You Get With Kitchen</h2>
            <p>
              we provide easy to navigate environment, convenient and powerful
              search, embeded youtube tutorials , recipees and easily
              customizable tables{" "}
            </p>
          </div>
          <div className="sec_page_service_con">
            <h2>All Services</h2>
            <section>
              <article className="cards-outer">
                <div className="card-inner">
                  <h3>Search Meals</h3>
                  <p>
                    With Your Powerful Search Box, You can search for any
                    meal/dish just by typing in the name of your desired meal
                    and hit enter. Select from the tiles to see your meal.
                  </p>
                </div>
              </article>
              <article className="cards-outer">
                <div className="card-inner">
                  <h3>Embeded Videos</h3>
                  <p>
                    Kitchen also provides embedded Youtube Videos for easy and
                    quick learning, time saving and instant mastering.
                  </p>
                </div>
              </article>
              <article className="cards-outer">
                <div className="card-inner">
                  <h3>Synccronize</h3>
                  <p>
                    Save Your Favorites, Manage your meal timetable across
                    multiple devices. All You have To do is signUp with your
                    email and boom... enjoy
                  </p>
                </div>
              </article>
              <article className="cards-outer">
                <div className="card-inner">
                  <h3>TimeTables</h3>
                  <p>
                    You can customize and make multiple diets routine for you or
                    them: make cooking rooster with our timetables and never
                    repeat a meal...ever
                  </p>
                </div>
              </article>
              <article className="cards-outer">
                <div className="card-inner">
                  <h3>Google Search</h3>
                  <p>
                    Search For more info on dishes, recipees, cooking methods
                    and etc right from withing kitchen. You never have to leave.
                  </p>
                </div>
              </article>
            </section>
          </div>
          <div className="footer_con">
            <button onClick={handleNextPage} className="next_btn">
              Next <i className="bi bi-caret-right"></i>
            </button>
          </div>
        </div>
      </section>
    </SecondPageLayout>
  );
};
const ThirdPage = ({ pageCount, deviceWidth }) => {
  const [login, setLogin] = useState(false);
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState("");
  const error = useRef(null);
  const handleSigninSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "status",
      JSON.stringify({ email: null, local: true })
    );
    Router.push("/search");
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "status",
      JSON.stringify({ email: null, local: true })
    );
    Router.push("/search");
  };
  const continueWithoutLogin = (e) => {
    localStorage.setItem(
      "status",
      JSON.stringify({ email: null, local: true })
    );
    Router.push("/search");
  };
  return (
    <ThirdPageLayout login={login} page={pageCount} bg={deviceWidth}>
      <section className="login_signup_sec">
        <Modal modal={modal} setModal={setModal}>
          <div className="login_modal_text">
            <h2
              style={{
                textAlign: "center",
                padding: "10px",
              }}
            >
              Are You Sure???
            </h2>
            <p>Your Data wont be synced across multiple Devices </p>
            <ul>
              <li>Your TimeTables</li>
              <li>Your Saved Favourites</li>
              <li>Your Progress</li>
            </ul>
            <p>Would be lost on another Device</p>
            <h4>Continue Anyways?</h4>
            <div className="input_con">
              <input
                onClick={continueWithoutLogin}
                type="button"
                value="Continue To Kitchen"
              />
            </div>
          </div>
        </Modal>
        <div className="brand_name">
          <i className="fi fi-sr-utensils"></i>
          <h2>My Kitchen</h2>
          <i className="fi fi-sr-pot"></i>
        </div>
        <div className="nav">
          <button onClick={() => setLogin(true)}>Login</button>
          <p>Or</p>
          <button onClick={() => setLogin(false)}>SignUp</button>
        </div>
        {login && (
          <div className="login_sec">
            <div className="heading">
              <h1>Welcome Back</h1>
              <p>Please Enter Your Email To Continue</p>
            </div>
            <form className="form" onSubmit={handleSigninSubmit}>
              <div className="input_con">
                <i className="bi bi-envelope-fill"></i>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter A Valid Email"
                />
                <p ref={error}></p>
              </div>
              <div className="input_con">
                <i className="bi bi-house-door-fill"></i>
                <input type="submit" value="Login" />
              </div>
            </form>
            <div className="footer_con">
              <p>
                No account? click{" "}
                <button onClick={() => setLogin(false)}>Here</button> to
                register{" "}
              </p>
              <p>Or</p>
              <p>Continue without SignIn?</p>
              <p>
                Click <button onClick={() => setModal(true)}>Here</button>
              </p>
            </div>
          </div>
        )}
        {!login && (
          <div className="signup_sec">
            <div className="heading">
              <h1>Welcome To Kitchen</h1>
              <p>Your Only Step To Becoming A Chef </p>
              <p>Enter An Email To Register Instantly</p>
            </div>
            <form className="form" onSubmit={handleSignupSubmit}>
              <div className="input_con">
                <i className="bi bi-envelope-fill"></i>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter A Valid Email"
                />
              </div>
              <div className="input_con">
                <i className="bi bi-house-door-fill"></i>
                <input type="submit" value="SignUp" />
              </div>
            </form>
            <div className="footer_con">
              <p>
                Already Registerd? click{" "}
                <button onClick={() => setLogin(true)}>Here</button> to Login{" "}
              </p>
              <p>Or</p>
              <p>Continue without SignIn?</p>
              <p>
                Click <button onClick={() => setModal(true)}>Here</button>
              </p>
            </div>
          </div>
        )}
        <div className="input_con">
          <i className="bi bi-house-door-fill"></i>
          <input
            onClick={() => setModal(true)}
            type="button"
            value="Continue Without SignIn"
          />
        </div>
      </section>
    </ThirdPageLayout>
  );
};
const LandingPageLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: black;
  transition: all 0.3s linear;
  .login_modal_text {
    text-align: center;
    p,
    ul {
      font-weight: 100 !important;
    }
    ul {
      padding: 10px;
      width: max-content;
      margin: 0 auto;
    }
    h4 {
      padding: 5px;
    }
  }
  /* ..............end of login_modal_text............. */
  .arrow_btn_con {
    button {
      position: fixed;
      border: none;
      outline: none;
      font-size: 50px;
      color: rgba(255, 255, 255, 0);
      top: 50%;
      z-index: 4;
      background: none;
      animation: blink 5s linear infinite;
    }
    button:first-of-type {
      right: 5px;
    }
    button:last-of-type {
      left: 5px;
    }
  }
  /* ..............end of arrow btn styles......... */
  .progress_con {
    position: fixed;
    z-index: 4;
    display: flex;
    justify-content: center;
    top: 83%;
    left: 50%;
    transform: translateX(-50%);
    span {
      width: 13px;
      height: 13px;
      border-radius: 50%;
      border: 2px solid white;
      margin: 0 3px;
    }
    span:nth-of-type(1) {
      background-color: ${(props) => (props.page === 1 ? "pink" : "")};
    }
    span:nth-of-type(2) {
      background-color: ${(props) => (props.page === 2 ? "pink" : "")};
    }
    span:nth-of-type(3) {
      background-color: ${(props) => (props.page === 3 ? "pink" : "")};
    }
  }
  /* ..................... end of progress styling.................... */
  @keyframes blink {
    40%,
    60% {
      color: white;
    }
  }

  @media screen and (max-width: 546px) {
    .login_modal_text {
      h2 {
        font-size: 20px;
      }
    }
  }
  @media screen and (min-width: 769px) {
    .arrow_btn_con {
      button:first-of-type {
        right: 10%;
      }
      button:last-of-type {
        left: 10%;
      }
    }
  }
  @media screen and (min-width: 1001px) {
    .arrow_btn_con {
      button:first-of-type {
        right: 15%;
      }
      button:last-of-type {
        left: 15%;
      }
    }
  }
`;
const FirstPageLayout = styled.main`
  animation: opacity 1s linear;
  transition: all 0.3s linear;
  margin: 0 auto;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.7);
  background-image: ${(props) =>
    props.bg > 546 ? "url(/bgdesktop.jpg)" : "url(/bgmobile.jpg)"};
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)),
    ${(props) =>
      props.bg > 546 ? "url(/bgdesktop.jpg)" : "url(/bgmobile.jpg)"};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-top: 20px;
  /* ......end of container styles........ */
  main {
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  /* ..............end of main parent styling............. */
  .footer_con {
    .next_btn {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      margin: 0 auto;
      margin-top: 20px;
      border: 2px solid pink;
      background-color: transparent;
      width: 90%;
      padding: 10px;
      border-radius: 25px;
      margin-top: 20px;
      font-size: 20px;
      i {
        margin-bottom: -3px;
      }
    }
  }
  /* .............end of footer_con  styles ................. */

  .brand_name {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 2px solid pink;
    padding: 7px 10px;
    margin: 0 auto;
    border-radius: 30px;
    width: 280px;
    transition: all 0.25s linear;
    h2,
    i {
      font-size: 30px;
      color: white;
      text-align: center;
      text-shadow: 2px 2px 15px black, 5px 5px 0px pink;
      font-family: "Lobster", cursive;
      transition: all 0.25s linear;
    }
  }
  .brand_name:hover,
  brand_name:focus {
    border: 2px solid white;
    h2,
    i {
      color: pink;
      text-shadow: 2px 2px 15px black, 5px 5px 0px white;
    }
  }
  /* .............end of brand name styles................... */
  .middle_text_con {
    border-bottom: 2px dotted pink;
    color: white;
    text-align: center;
    width: max-content;
    margin: 0 auto;
    h1 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    ul {
      margin-bottom: 10px;
      list-style: none;
    }
    p {
      color: pink;
      text-shadow: 1px 1px 1px black;
      margin-bottom: 10px;
    }
  }
  /* .............end of midlle text con styles............. */
  .brand_offers_con {
    margin-top: 10px;
    article {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .brand_balls {
      > div {
        display: flex;
        justify-content: space-around;
        margin-bottom: 45px;
        width: 100%;
      }
      article {
        position: relative;
      }
      .img_con {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 2px solid white;
        object-fit: cover;
        animation: rotation 1s linear 2s;
        img {
          border-radius: 50%;
        }
      }
      p {
        position: absolute;
        bottom: -50%;
        color: white;
        left: 50%;
        text-align: center;
        transform: translateX(-50%);
        font-family: "Dancing Script", cursive;
        font-weight: 400;
      }
    }
  }
  /* .........end of brand offers div styles............. */
  @keyframes opacity {
    0% {
      opacity: 0;
    }
    99% {
      opacity: 1;
    }
  }
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    99% {
      transform: rotate(360deg);
    }
  }
  @media screen and (min-width: 769px) {
    main {
      max-width: 768px;
      margin: 0 auto;
    }
    .arrow_btn_con {
      button:first-of-type {
        right: 10%;
      }
      button:last-of-type {
        left: 10%;
      }
    }
  }
  @media screen and (min-width: 1001px) {
    .arrow_btn_con {
      button:first-of-type {
        right: 15%;
      }
      button:last-of-type {
        left: 15%;
      }
    }
  }
`;
const SecondPageLayout = styled.main`
  animation: opacity 1s linear;
  transition: all 0.3s linear;

  width: 100%;
  min-height: 100vh;
  .home_vid_bg {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    position: fixed;
    video {
      object-fit: cover;
      position: absolute;
      /* z-index: -1; */
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
  }
  /* ............end of video background styles */
  .sec_page_con {
    padding: 20px 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    min-height: 100vh;
    position: absolute;
  }
  /*  ....... end of page container styles ....... */
  .brand_name {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 2px solid pink;
    padding: 7px 10px;
    margin: 0 auto;
    border-radius: 30px;
    width: 280px;
    transition: all 0.25s linear;
    h2,
    i {
      font-size: 30px;
      color: white;
      text-align: center;
      text-shadow: 2px 2px 15px black, 5px 5px 0px pink;
      font-family: "Lobster", cursive;
      transition: all 0.25s linear;
    }
  }
  .brand_name:hover,
  brand_name:focus {
    border: 2px solid white;
    h2,
    i {
      color: pink;
      text-shadow: 2px 2px 15px black, 5px 5px 0px white;
    }
  }
  /* ............. end of brand name styles ........... */
  .sec_page_heading {
    text-align: center;
    h2 {
      color: pink;
      text-shadow: 1px 1px white;
      margin: 10px 0;
    }
    p {
      color: white;
      font-size: 15px;
    }
  }
  /* ............. end of sec_page_heading ........... */
  .sec_page_service_con {
    text-align: center;
    h2 {
      font-family: "Dancing Script", cursive;
      margin: 20px 0, 10px 0;
      color: white;
      padding-bottom: 3px;
      border-bottom: 2px solid rgb(9, 247, 247);
      width: max-content;
      margin: 0 auto;
    }
    section {
      width: 100%;
      margin: 120px 0;
      article {
        margin: -80px 0;
        color: white;
        font-size: 14px;
        width: 45%;
        height: 200px;
        padding: 5px;
        position: relative;
        div {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
        }
      }
      .cards-outer:nth-child(even) {
        margin-left: auto;
      }
      .cards-outer:nth-child(even):before {
        content: "";
        position: absolute;
        left: -11.1%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: yellow;
      }
      .cards-outer:nth-child(even):after {
        content: "";
        position: absolute;
        left: -8%;
        top: 50%;
        transform: translateY(-50%) translateX(-25%);
        width: 10%;
        height: 2px;
        background: white;
        z-index: -1;
      }
      /* ........ */
      .cards-outer:nth-child(odd):before {
        content: "";
        position: absolute;
        right: -11.1%;
        top: 50%;
        transform: translateY(-50%) translateX(50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      .cards-outer:nth-child(odd):after {
        content: "";
        position: absolute;
        right: -8%;
        top: 50%;
        transform: translateY(-50%) translateX(25%);
        width: 10%;
        height: 2px;
        background: white;
        z-index: -1;
      }
      /* ........ */
      .cards-outer:nth-child(1),
      .cards-outer:nth-child(1):before {
        background: rgba(255, 99, 71, 0.7);
        border: 2px solid tomato;
      }
      .cards-outer:nth-child(2),
      .cards-outer:nth-child(2):before {
        background: rgba(9, 247, 247, 0.7);
        border: 2px solid rgb(9, 247, 247);
      }
      .cards-outer:nth-child(3),
      .cards-outer:nth-child(3):before {
        background: rgba(128, 128, 128, 0.7);
        border: 2px solid gray;
      }
      .cards-outer:nth-child(4),
      .cards-outer:nth-child(4):before {
        background: rgba(255, 215, 0, 0.7);
        border: 2px solid gold;
      }
      .cards-outer:nth-child(5),
      .cards-outer:nth-child(5):before {
        background: rgba(10, 253, 10, 0.7);
        border: 2px solid rgb(10, 253, 10);
      }
      /* ......... */
      .cards-outer:nth-child(odd) .card-inner:before {
        content: "";
        position: absolute;
        right: -11.1%;
        top: 0;
        height: 100%;
        border: 1px dashed white;
        z-index: -1;
      }
    }
  }
  /* ............. end of sec_page_service_con ........... */
  .footer_con {
    .next_btn {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      margin: 0 auto;
      margin-top: 20px;
      border: 2px solid pink;
      background-color: transparent;
      width: 90%;
      padding: 10px;
      border-radius: 25px;
      margin-top: 20px;
      font-size: 20px;
      i {
        margin-bottom: -3px;
      }
    }
  }
  /* ........ end of footer con styles.........../... */
  @keyframes opacity {
    0% {
      opacity: 0;
    }
    99% {
      opacity: 1;
    }
  }
  @media screen and (min-width: 546px) {
    .sec_page_service_con {
      section {
        article {
          padding: 10px;
        }
        .cards-outer:nth-child(even):before {
          width: 20px;
          height: 20px;
        }
        .cards-outer:nth-child(odd):before {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  @media screen and (min-width: 769px) {
    .sizer {
      max-width: 768px;
      margin: 0 auto;
    }
  }
`;
const ThirdPageLayout = styled.main`
  animation: opacity 1s linear;
  transition: all 0.3s linear;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  .login_signup_sec {
    padding-top: 20px;
    max-width: 768px;
    margin: 0 auto;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    background-image: url(/loginbg.jpg);
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)),
      url(/loginbg.jpg);
    border: 2px dashed white;
  }
  /* .....end of signUp......section.. */
  .brand_name {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 2px solid pink;
    padding: 7px 10px;
    margin: 0 auto;
    border-radius: 30px;
    width: 280px;
    transition: all 0.25s linear;
    h2,
    i {
      font-size: 30px;
      color: white;
      text-align: center;
      text-shadow: 2px 2px 15px black, 5px 5px 0px pink;
      font-family: "Lobster", cursive;
      transition: all 0.25s linear;
    }
  }
  .brand_name:hover,
  brand_name:focus {
    border: 2px solid white;
    h2,
    i {
      color: pink;
      text-shadow: 2px 2px 15px black, 5px 5px 0px white;
    }
  }
  /* .....end of brand name */
  .nav {
    width: 280px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    button {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: none;
      outline: none;
      padding: 10px 20px;
    }
    button:first-of-type {
      border-bottom: ${(props) => (props.login ? "2px solid" : "")};
    }
    button:last-of-type {
      border-bottom: ${(props) => (props.login ? "" : "2px solid")};
    }
  }
  /* .....end of nav...... */
  .input_con {
    display: flex;
    align-items: center;
    width: 70%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    margin: 0 auto;
    padding: 0 10px;
    /* margin-top: 40px; */
    input {
      color: white;
      border-radius: 20px;
      padding: 10px;
      background: transparent;
      outline: none;
      border: none;
      width: 100%;
      height: 100%;
    }
    input::placeholder {
      color: white;
      text-align: center;
    }
  }
  /*  */
  .heading {
    text-align: center;
    margin-top: 30px;
    font-style: italic;
    p {
      font-size: 14px;
    }
  }
  /* ......end of heading....... */
  .form {
    width: 280px;
    margin: 0 auto;
    margin-top: 30px;
    .input_con {
      display: flex;
      align-items: center;
      width: 70%;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      margin: 0 auto;
      padding: 0 10px;
      margin-bottom: 10px;
      input {
        color: white;
        border-radius: 20px;
        padding: 10px;
        background: transparent;
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
      }
      input::placeholder {
        color: white;
        text-align: center;
      }
    }
    .input_con:last-of-type {
      border: 2px solid pink;
    }
  }
  .footer_con {
    margin: 0 auto;
    margin-top: 30px;
    text-align: center;
    p {
      margin-bottom: 10px;
    }
    button {
      border: none;
      outline: none;
      background: transparent;
      color: pink;
      font-size: 18px;
    }
  }
  /* .........end of form.......... */
  .signup_sec,
  .login_sec {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  /*............................... end of login section styles ...........................*/

  @keyframes opacity {
    0% {
      opacity: 0;
    }
    99% {
      opacity: 1;
    }
  }
`;
