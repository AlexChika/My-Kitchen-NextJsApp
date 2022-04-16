import styled from "styled-components";
import Navigation from "../../components/Navigation";
import { useState, useEffect, useRef, useReducer } from "react";
import { reducer } from "../../utils/reducers";
export default function Dashboard() {
  // reducer state for managing shoping lists
  const [state, dispatch] = useReducer(reducer, { lists: [] });
  // state for name of user
  const [name, setName] = useState("mcluckey1@gmail.com");
  // Alerter element
  const alerter = useRef(null);
  // state for inputing shopping Items values
  const [shopingItem, setShopingItem] = useState("");
  // state for checking editting shopping list values
  const [edit, setEdit] = useState(false);
  // state for setting itemId to manipulate delete nad edit
  const [id, setId] = useState("");
  // state for handling openimg of shopping cart container
  const [openShop, setOpenShop] = useState(false);
  // ........functions for shopping list category............
  function alerts(text, color) {
    alerter.current.classList.add(color);
    alerter.current.textContent = text;
    setTimeout(() => {
      alerter.current.classList.remove(color);
      alerter.current.textContent = "";
    }, 2000);
  }
  // edtting the shoping list
  const handleEditShoppingList = (item) => {
    setEdit(true);
    setShopingItem(item.item);
    setId(item.id);
  };
  // deleting the items from shopping list
  const handleDeleteShoppingList = (id) => {
    dispatch({ type: "DELETE_ITEM", payload: id });
    alerts("Item removed successfully", "success");
  };
  // setting the shooping item to done
  const handleDoneShoppingList = (id) => {
    dispatch({ type: "DONE", payload: id });
    alerts("Nice One", "success");
  };
  const handleClearShoppingList = () => {
    dispatch({ type: "CLEAR" });
  };
  const handleSubmitShopingItem = (e) => {
    e.preventDefault();
    if (!shopingItem) {
      dispatch({ type: "INVALID_INPUT" });
      alerts("Please enter an item", "danger");
      return;
    } else {
      if (edit) {
        dispatch({ type: "EDIT", payload: { id, item: shopingItem } });
        alerts("Item edited succesfully", "success");
        setShopingItem("");
        setEdit(false);
        return;
      } else {
        dispatch({
          type: "VALID_INPUT",
          payload: {
            item: shopingItem,
            id: new Date().getTime().toString(),
            done: false,
          },
        });
        alerts("Item added succesfully", "success");
        setShopingItem("");
        return;
      }
    }
  };
  // effect for shopping list lifecycle
  useEffect(() => {
    dispatch({ type: "ON_LOAD" });
  }, []);
  return (
    <DashboardWrap>
      <header>
        <button
          onClick={() => setOpenShop(!openShop)}
          className="flex_col_center"
        >
          <i className="bi bi-cart-check-fill"></i>
          <small> Shopping</small>
          <span className="flex_center">0</span>
        </button>
        <div className="heading_con">
          <h1>{name || "Owner"}</h1>
          <div className="heading flex_center">
            <p>Cook Better, Live Better</p>
            <div className="iconwrap">
              <i className="fi fi-sr-pot"></i>
              <i className="fi fi-sr-utensils"></i>
            </div>
          </div>
        </div>
      </header>
      <section className={`shopping_cart bg ${openShop ? "open" : ""} `}>
        <div className="heading">
          <h1>{state.lists.length > 0 ? "Shopping Items" : "No Items Here"}</h1>
          <button onClick={() => setOpenShop(!openShop)}>
            <i className="bi bi-x-circle"></i>
          </button>
        </div>
        <div className="shopping_body">
          <p className="alert" ref={alerter}></p>
          <form
            onSubmit={handleSubmitShopingItem}
            className="shopping_form mt-20"
          >
            <input
              value={shopingItem}
              onChange={(e) => setShopingItem(e.target.value)}
              type="text"
              placeholder="Add an item"
            />
            <button type="submit" className="enter">
              <span className="blinker">{edit ? "Edit" : "Add +"}</span>
            </button>
          </form>
          <div className="todo-con">
            <div className="list">
              {state.lists.map((item) => (
                <article key={item.id}>
                  <p>
                    {item.item}{" "}
                    <span>
                      {item.done ? (
                        <i className="bi bi-check-circle-fill"></i>
                      ) : (
                        ""
                      )}
                    </span>
                  </p>
                  <div className="btn-con">
                    <button
                      onClick={() => handleDoneShoppingList(item.id)}
                      className="done"
                    >
                      <i className="bi bi-check-all"></i>
                    </button>
                    <button
                      onClick={() => handleEditShoppingList(item)}
                      className="edit"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteShoppingList(item.id)}
                      className="del"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <button onClick={handleClearShoppingList} className="clear">
              Clear All
            </button>
          </div>
        </div>
      </section>
      <section></section>

      <Navigation current={"dashboard"} />
    </DashboardWrap>
  );
}
const DashboardWrap = styled.main`
  /* .........general classes.........  */
  .flex_center {
    display: flex;
    align-items: center;
  }
  .flex_col_center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .fullwh {
    width: 100%;
    height: 100%;
  }
  .textcenter {
    text-align: center;
  }
  .mt-10 {
    margin-top: 10px;
  }
  .mt-20 {
    margin-top: 20px;
  }
  .mt-30 {
    margin-top: 30px;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
  .mb-30 {
    margin-bottom: 30px;
  }
  button,
  input {
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    color: inherit;
  }
  /* .........general styles............ */
  color: white;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  position: relative;
  /* .........styling by sections......... */
  /* styles for header section */
  header {
    margin-top: 10px;
    padding: 0px 10px;
    button {
      float: right;
      margin-top: 10px;
      position: relative;
      i {
        font-size: 15px;
        user-select: none;
      }
      span {
        position: absolute;
        justify-content: center;
        top: -7px;
        right: 2px;
        min-width: 15px;
        max-width: 45px;
        height: 15px;
        font-size: 11px;
        border-radius: 50%;
        background-color: pink;
        color: white;
        padding: 2px;
        font-weight: 600;
        user-select: none;
      }
    }
    .heading_con {
      width: 100%;
      max-width: 280px;
      margin: 0 auto;
      text-align: center;
      .heading {
        justify-content: center;
        p,
        i {
          font-size: 12px;
          font-style: italic;
        }
        p,
        .iconwrap {
          margin: 0 3px;
        }
      }
      h1 {
        font-size: 20px;
      }
    }
  }
  /* styles for Shooping Cart Section */
  .shopping_cart {
    position: fixed;
    top: 0;
    z-index: 10;
    height: 92vh;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    -webkit-transform: translateX(100%);
    -ms-transform: translateX(100%);
    transform: translateX(100%);
    -webkit-transition: all 0.3s linear;
    transition: all 0.5s linear;
    visibility: hidden;
    padding: 5px;
    overflow-x: auto;
  }
  .open {
    transform: translateX(0%);
    visibility: visible;
  }
  .shopping_cart .heading {
    padding: 10px 0;
    text-align: center;
    position: relative;
  }
  .shopping_cart .heading button {
    position: absolute;
    left: 20px;
    top: 10px;
    animation: open 3s linear infinite;
    width: min-content;
    font-size: 30px;
    margin-left: 20px;
  }
  .shopping_form {
    display: flex;
    border: 2px solid white;
    border-radius: 10px;
  }
  .shopping_form input {
    flex: 0.8;
    color: white;
    padding: 10px;
  }
  .shopping_form input::placeholder {
    color: white;
  }
  .shopping_form button {
    color: white;
    flex: 0.2;
    padding: 10px;
    border-left: 2px solid;
  }
  .shopping_form button span {
    animation: bounce 1s linear infinite;
  }
  .todo-con {
    margin-top: 1em;
  }
  .list {
    padding: 0.5em;
  }
  .list article {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
  }
  .list article p {
    word-wrap: break-word;
    word-break: break-all;
    margin: 2px;
    flex: 0.75;
  }
  .list article p span {
    font-size: 18px;
  }
  .list article:nth-of-type(even) p span {
    color: pink;
  }
  .list article:nth-of-type(odd) p span {
    color: white;
  }
  .list article .btn-con {
    flex: 0.25;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .list article .btn-con button:nth-of-type(1) {
    color: greenyellow;
  }
  .list article .btn-con button:nth-of-type(2) {
    color: pink;
  }
  .list article .btn-con button:nth-of-type(3) {
    color: tomato;
  }
  .todo-con > button {
    cursor: pointer;
    display: block;
    letter-spacing: 0.3em;
    margin: 0 auto;
    text-align: center;
    color: tomato;
  }
  .alert {
    text-align: center;
    padding: 0.5em 0;
  }
  .success {
    color: rgb(70, 117, 0);
    background-color: rgb(210, 247, 210);
  }
  .danger {
    color: rgb(255, 38, 0);
    background-color: rgb(231, 178, 168);
  }
  @keyframes bounce {
    0% {
      color: white;
    }
    50% {
      color: rgb(30, 242, 176);
    }
    100% {
      color: white;
    }
  }
  @keyframes open {
    20%,
    100% {
      transform: rotate(360deg);
    }
  }
  @media screen and (min-width: 350px) {
    .list article p {
      flex: 0.8;
    }
    .list article .btn-con {
      flex: 0.2;
    }
  }
  @media screen and (min-width: 576px) {
    .list article p {
      flex: 0.85;
    }
    .list article .btn-con {
      flex: 0.15;
    }
  }
  @media screen and (min-width: 768px) {
    .cart-con {
      width: 50%;
    }
  }
  @media screen and (min-width: 1000px) {
    .cart-con {
      width: 30%;
    }
  }
  @media screen and (min-width: 576px) {
    .cart-con {
      width: 60%;
    }
  }
`;
