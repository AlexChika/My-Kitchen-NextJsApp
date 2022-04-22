import styled from "styled-components";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
export default function Settings() {
  const [load, setLoad] = useState(false);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("status")) {
      Router.push("/");
    } else {
      setLoad(true);
    }
  }, []);
  const defaultStyle = {
    theme: "dark",
    accent: {
      col1: "tomato",
      col2: "skyblue",
    },
  };
  const [style, setStyle] = useState(defaultStyle);
  const HandleSettings = (e) => {
    e.preventDefault();
    e.target.reset();
    setModal(true);
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
          content={`https://mykitchen.vercel.app/settings`}
          property="og:url"
        />
        <title>My Kitchen | Search For Meals | Search For Recipees|</title>
      </Header>
      {load ? (
        <SettingCon>
          <Modal modal={modal} setModal={setModal}>
            <div className="modal">
              <div>
                <h2>Sorry!!!</h2>
                <h2>This Functionality was disabled</h2>
              </div>
            </div>
          </Modal>
          <form className="bg" onSubmit={HandleSettings}>
            <h2 className="mb-20 c-accent1">Customize Your App&apos;s Theme</h2>
            <div className="input-con mb-10 bg-p">
              <h3>Themes</h3>
              <div className="input">
                <label className="thlab" htmlFor="light">
                  <p>Light Theme</p>
                  <span className="light"></span>
                </label>
                <input
                  onChange={(e) =>
                    setStyle({ ...style, theme: e.target.value })
                  }
                  required
                  value="light"
                  type="radio"
                  name="theme"
                  id="light"
                />
              </div>
              {/* .......    //  ........ */}
              <div className="input">
                <label className="thlab" htmlFor="dark">
                  <p>Dark Theme</p>
                  <span className="dark"></span>
                </label>
                <input
                  onChange={(e) =>
                    setStyle({ ...style, theme: e.target.value })
                  }
                  required
                  type="radio"
                  name="theme"
                  id="dark"
                  value="dark"
                />
              </div>
            </div>
            {/* .........   ..........  */}
            <div className="input-con mb-10 bg-p">
              <div>
                <h3>Accent Colors</h3>
                {/*....... //..... */}
                <div className="input">
                  <label className="acclab" htmlFor="tb">
                    <p>Tomato and Blue</p>
                    <div>
                      <span className="tb"></span>
                      <span className="tb"></span>
                    </div>
                  </label>
                  <input
                    onChange={(e) =>
                      setStyle({
                        ...style,
                        accent: {
                          col1: "tomato",
                          col2: "skyblue",
                        },
                      })
                    }
                    value="TB"
                    required
                    type="radio"
                    name="accent"
                    id="tb"
                  />
                </div>
                {/*....... //..... */}
                <div className="input">
                  <label className="acclab" htmlFor="pc">
                    <p>Pink and Chocolate</p>
                    <div>
                      <span className="pc"></span>
                      <span className="pc"></span>
                    </div>
                  </label>
                  <input
                    onChange={(e) =>
                      setStyle({
                        ...style,
                        accent: {
                          col1: "pink",
                          col2: "chocolate",
                        },
                      })
                    }
                    value="PC"
                    required
                    type="radio"
                    name="accent"
                    id="pc"
                  />
                </div>
                {/*....... //..... */}
                <div className="input">
                  <label className="acclab" htmlFor="gv">
                    <p>Gold and Violet</p>
                    <div>
                      <span className="gv"></span>
                      <span className="gv"></span>
                    </div>
                  </label>
                  <input
                    onChange={(e) =>
                      setStyle({
                        ...style,
                        accent: {
                          col1: "gold",
                          col2: "violet",
                        },
                      })
                    }
                    value="GV"
                    required
                    type="radio"
                    name="accent"
                    id="gv"
                  />
                </div>
              </div>
              <p></p>
            </div>
            <div className="input-con bg-p">
              <input className="bg" type="submit" value="Customise" />
            </div>
          </form>
          <Navigation current={"settings"} />
        </SettingCon>
      ) : (
        <div></div>
      )}
    </>
  );
}
const SettingCon = styled.div`
  min-height: 90vh;
  max-width: 768px;
  display: grid;
  place-items: center;
  margin: 0 auto;
  color: white;
  font-family: "Dancing Script", cursive;
  .modal {
    height: 25vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  form {
    margin: 0 auto;
    margin-bottom: 30px;
    text-align: center;
    padding: 30px;
    width: 97%;
    max-width: 600px;
    h3,
    h2 {
      text-align: center;
      font-family: "Dancing Script", cursive;
    }
    p {
      font-style: italic;
    }
    .input-con {
      padding: 10px;
      display: flex;
      flex-direction: column;
      input[type="submit"] {
        padding: 10px;
        border: 2px solid white;
        border-radius: 10px;
        color: inherit;
      }
    }
    .input {
      display: flex;
      align-items: center;
      width: 100%;
      margin: 0 auto;
      margin-bottom: 10px;
      padding: 10px 0;
      justify-content: space-between;
      input[type="radio"] {
        transform: scale(1.5);
      }
      .thlab {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 0.9;
        span {
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .light {
          background: white;
        }
        .dark {
          background: black;
          box-shadow: inset 1px 1px 1px gray;
        }
      }
    }
  }
  .acclab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 0.9;
    span {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin: 0 3px;
    }
    .tb:first-of-type {
      background: tomato;
    }
    .tb:last-of-type {
      background: rgb(17, 227, 241);
    }
    .pc:first-of-type {
      background: pink;
    }
    .pc:last-of-type {
      background: chocolate;
    }
    .gv:first-of-type {
      background: gold;
    }
    .gv:last-of-type {
      background: violet;
    }
  }
  @media screen and (max-width: 340px) {
    .thlab,
    .acclab {
      flex-direction: column;
    }
  }
`;
