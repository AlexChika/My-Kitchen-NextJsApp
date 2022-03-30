import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
export default function Home() {
  const [deviceWidth, setWidth] = useState("");
  const [pageCount, setPageCount] = useState(1);
  useEffect(() => {
    setWidth(window.innerWidth);
  });
  return (
    <>
      <LandingWrap page={pageCount} bg={deviceWidth}>
        <div className="brand_name">
          <i className="fi fi-sr-utensils"></i>
          <h2>My Kitchen</h2>
          <i className="fi fi-sr-pot"></i>
        </div>
        {/* ......end of brand name */}
        <div className="arrow_btn_con">
          <button className="next">
            <i className="bi bi-caret-right-fill"></i>
          </button>
          <button className="prev">
            <i className="bi bi-caret-left-fill"></i>
          </button>
        </div>
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
            <div className="progress_con">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <button className="next_btn">
              Next <i className="bi bi-caret-right"></i>
            </button>
          </div>
        </main>
      </LandingWrap>
    </>
  );
}
const LandingWrap = styled.main`
  position: relative;
  width: 100vw;
  max-width: 1440px;
  min-height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.6);
  background-image: ${(props) =>
    props.bg > 546 ? "url(/bgdesktop.jpg)" : "url(/bgmobile.jpg)"};
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),
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
    .progress_con {
      display: flex;
      justify-content: center;
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
  .arrow_btn_con {
    button {
      position: absolute;
      border: none;
      outline: none;
      font-size: 50px;
      color: rgba(255, 255, 255, 0);
      top: 50%;
      z-index: 2;
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
    h1,
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
        animation: rotation 0.5s linear 2s;
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
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    99% {
      transform: rotate(180deg);
    }
  }
  @keyframes blink {
    40%,
    60% {
      color: white;
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
// border: 2px solid red;

/* 
    .home_vid_bg {
    width: 100%;
    height: 50vh;
    margin: 0 auto;
    position: relative;
    video {
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
  }
   <figure
            className="home_vid_bg"
            aria-roledescription="video container"
          >
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
   */
