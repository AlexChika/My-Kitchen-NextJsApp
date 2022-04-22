import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import Navigation from "../../components/Navigation";
import { useState, useEffect, useRef, useReducer } from "react";
import { reducer } from "../../utils/reducers";
import Modal from "../../components/Modal";
export function getdate() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cal = new Date();
  const date = cal.getDate();
  let hour = cal.getHours();
  let sub;
  if (date === 1 || date === 21 || date === 31) {
    sub = "st";
  } else if (date === 2 || date === 22) {
    sub = "nd";
  } else if (date === 3 || date === 23) {
    sub = "rd";
  } else {
    sub = "th";
  }
  let am;
  if (hour > 12) {
    hour = hour - 12;
    am = "pm";
  } else {
    am = "am";
  }
  return `${days[cal.getDay()]} ${date + sub} ${
    months[cal.getMonth()]
  } ${hour}:${cal.getMinutes()}${am}`;
}
export default function Dashboard() {
  useEffect(() => {
    if (!localStorage.getItem("status")) {
      router.push("/");
    }
  }, []);
  const router = useRouter();
  // .................. States For Shopping List ..................
  // reducer state for managing shoping lists
  const [state, dispatch] = useReducer(reducer, { lists: [] });
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
  // ..................... States For Meal Of The Day......................
  const mealCon = useRef(null);
  const [modalInput, setmodalInput] = useState({
    break: { time: "", meridian: "" },
    lunch: { time: "", meridian: "" },
    dinner: { time: "", meridian: "" },
  });
  const [mealTime, setMealTime] = useState({
    break: "7am",
    lunch: "1pm",
    dinner: "5pm",
  });
  const [cooked, setCooked] = useState({
    break: false,
    lunch: false,
    dinner: false,
    day: "",
  });
  const [todayMeal, setTodayMeal] = useState(null);
  const [date, setDate] = useState("");
  // ..................... States For timetable......................
  const tableValue = {
    mBreak: "cinnamon sugar and oatmeal, tangerine, yogurt. 280 cal",
    mLunch:
      "Turkey Sandwich on wheat bread, Grapes, carrots, nutri grain. 703 cal",
    mDinner: "Baked catfish, home made fries. 390 cal",
    tBreak: "cereal, 2% milk, banana. 260 cal",
    tLunch:
      "White Rice, Nigerian stew, turkey, apple, sweet corn, sun chips. 834 cal",
    tDinner: "Beans and plantains. 350 cal",
    wBreak: "Boiled eggs, home made hash browns. 250 cal",
    wLunch: "Grilled chicken salad, soup, pomegranate. 645 cal",
    wDinner: "Baked Tilapia, mixed vegetables, mango. 590 cal",
    thBreak: "Cereal, 2% milk, banana. 260 cal",
    thLunch: "spaghetti, chicken, grapes, carrots, nutri grain. 580 cal",
    thDinner: "Peppered chicken, fried rice. 687 cal",
    fBreak: "cinnamon sugar oatmeal, tangerine, yoghurt. 280 cal",
    fLunch:
      "Turkey sandwich on wheat bread, Grapes, carrots, nutri grain. 703 cal",
    fDinner: "noodles, chicken. 485 cal",
    sBreak: "Boiled eggs, home made hash browns. 248 cal",
    sLunch: "Pounded yam, okra, stew, turkey. 338 cal",
    sDinner:
      "White Rice, Nigerian stew, Chicken, apple, corn lays chips. 834 cal",
    suBreak: "Pancakes / Bread, Eggs and Sausage",
    suLunch: "Shrimp fried Rice and salad with chicken",
    suDinner:
      "Boiled / Fried / Grilled semi ripe plantain, tomato sauce and grilled / fried fish",
  };
  const [modal, setModal] = useState(false);
  // ..................... States For favourites......................
  const [favourites, setFavourites] = useState([]);
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
  // .................. functions for Meal of the Day.....................
  const timeOfDay = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const cal = new Date();
    let hour = cal.getHours();
    return { day: days[cal.getDay()], hour: hour };
  };
  const cookedHandler = (e) => {
    const name = e.currentTarget.dataset.name;
    if (name === "break") {
      const newCook = { ...cooked, break: true, day: timeOfDay().day };
      setCooked(newCook);
      localStorage.setItem("cooked", JSON.stringify(newCook));
    }
    if (name === "lunch") {
      const newCook = { ...cooked, lunch: true, day: timeOfDay().day };
      setCooked(newCook);
      localStorage.setItem("cooked", JSON.stringify(newCook));
    }
    if (name === "dinner") {
      const newCook = { ...cooked, dinner: true, day: timeOfDay().day };
      setCooked(newCook);
      localStorage.setItem("cooked", JSON.stringify(newCook));
    }
  };
  const mealofTheDay = () => {
    const table = JSON.parse(localStorage.getItem("table"));
    if (timeOfDay().hour < 12) {
      showMeal(0);
    }
    if (timeOfDay().hour >= 12 && timeOfDay().hour < 18) {
      showMeal(1);
    }
    if (timeOfDay().hour >= 18) {
      showMeal(2);
    }
    if (!table) return;
    if (timeOfDay().day === "Mon") {
      const { mBreak, mLunch, mDinner } = table;
      let meal = {
        break: { meal: mBreak },
        lunch: { meal: mLunch },
        dinner: { meal: mDinner },
      };
      setTodayMeal(meal);
    }
    if (timeOfDay().day === "Tue") {
      const { tBreak, tLunch, tDinner } = table;
      let meal = {
        break: { meal: tBreak },
        lunch: { meal: tLunch },
        dinner: { meal: tDinner },
      };
      setTodayMeal(meal);
    }
    if (timeOfDay().day === "Wed") {
      const { wBreak, wLunch, wDinner } = table;
      let meal = {
        break: { meal: wBreak },
        lunch: { meal: wLunch },
        dinner: { meal: wDinner },
      };
      setTodayMeal(meal);
    }
    if (timeOfDay().day === "Thu") {
      const { thBreak, thLunch, thDinner } = table;
      let meal = {
        break: { meal: thBreak },
        lunch: { meal: thLunch },
        dinner: { meal: thDinner },
      };
      setTodayMeal(meal);
    }
    if (timeOfDay().day === "Fri") {
      const { fBreak, fLunch, fDinner } = table;
      let meal = {
        break: { meal: fBreak },
        lunch: { meal: fLunch },
        dinner: { meal: fDinner },
      };
      setTodayMeal(meal);
    }
    if (timeOfDay().day === "Sat") {
      const { sBreak, sLunch, sDinner } = table;
      let meal = {
        break: { meal: sBreak },
        lunch: { meal: sLunch },
        dinner: { meal: sDinner },
      };
      setTodayMeal(meal);
    }
    if (timeOfDay().day === "Sun") {
      const { suBreak, suLunch, suDinner } = table;
      let meal = {
        break: { meal: suBreak },
        lunch: { meal: suLunch },
        dinner: { meal: suDinner },
      };
      setTodayMeal(meal);
    }
  };
  useEffect(() => {
    const meal = mealCon.current.querySelectorAll(".meal");
    meal.forEach((meal, index) => {
      meal.style.left = `${index * 100}%`;
    });
    const cooked = JSON.parse(localStorage.getItem("cooked")) || {
      break: false,
      lunch: false,
      dinner: false,
      day: "",
    };
    setCooked(cooked);
    const mealTime = JSON.parse(localStorage.getItem("mealTime")) || {
      break: "7am",
      lunch: "1pm",
      dinner: "5pm",
    };
    setMealTime(mealTime);
  }, []);
  useEffect(() => {
    mealofTheDay();
    const cooked = JSON.parse(localStorage.getItem("cooked"));
    if (cooked) {
      if (timeOfDay().day !== cooked.day) {
        setCooked({ break: false, lunch: false, dinner: false, day: "" });
        localStorage.setItem(
          "cooked",
          JSON.stringify({ break: false, lunch: false, dinner: false, day: "" })
        );
      }
    }
  }, [date]);
  useEffect(() => {
    setInterval(() => {
      setDate(getdate());
    }, 6000);
  }, []);
  const showMeal = (no) => {
    const meal = mealCon.current.querySelectorAll(".meal");
    meal.forEach((meal) => {
      meal.style.transform = `translateX(-${no * 100}%)`;
    });
  };
  // .............. functions for my favourites.............
  const handleOpenFavorite = (id, name) => {
    router.push(`/search/${name + "=" + id}`);
  };
  const handleRemoveFavorite = (id) => {
    const favourite = favourites.filter((fav) => fav.id !== id);
    localStorage.setItem("favourites", JSON.stringify(favourite));
    setFavourites(favourite);
  };
  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(favourites);
  }, []);
  // ................. functions for timetable...............
  const dom = (id) => {
    return document.querySelector(`[data-name = ${id}]`);
  };
  const handleTableInputs = (e) => {
    e.preventDefault();
    let tableData = {
      mBreak: dom("mBreak").textContent || "add Meal +",
      mLunch: dom("mLunch").textContent || "add Meal +",
      mDinner: dom("mDinner").textContent || "add Meal +",
      tBreak: dom("tBreak").textContent || "add Meal +",
      tLunch: dom("tLunch").textContent || "add Meal +",
      tDinner: dom("tDinner").textContent || "add Meal +",
      wBreak: dom("wBreak").textContent || "add Meal +",
      wLunch: dom("wLunch").textContent || "add Meal +",
      wDinner: dom("wDinner").textContent || "add Meal +",
      thBreak: dom("thBreak").textContent || "add Meal +",
      thLunch: dom("thLunch").textContent || "add Meal +",
      thDinner: dom("thDinner").textContent || "add Meal +",
      fBreak: dom("fBreak").textContent || "add Meal +",
      fLunch: dom("fLunch").textContent || "add Meal +",
      fDinner: dom("fDinner").textContent || "add Meal +",
      sBreak: dom("sBreak").textContent || "add Meal +",
      sLunch: dom("sLunch").textContent || "add Meal +",
      sDinner: dom("sDinner").textContent || "add Meal +",
      suBreak: dom("suBreak").textContent || "add Meal +",
      suLunch: dom("suLunch").textContent || "add Meal +",
      suDinner: dom("suDinner").textContent || "add Meal +",
      time: { ...mealTime },
    };
    localStorage.setItem("table", JSON.stringify(tableData));
    renderTable(tableData);
    mealofTheDay();
  };
  const handleModalInputs = (e) => {
    e.preventDefault();
    const mealTime = {
      break: modalInput.break.time + modalInput.break.meridian,
      lunch: modalInput.lunch.time + modalInput.lunch.meridian,
      dinner: modalInput.dinner.time + modalInput.dinner.meridian,
    };
    localStorage.setItem("mealTime", JSON.stringify(mealTime));
    e.target.reset();
    setMealTime(mealTime);
  };
  const renderTable = (table) => {
    const inputs = [...document.querySelectorAll(".inputs")];
    inputs.forEach((input, index) => {
      let dataname = input.dataset.name;
      let { [dataname]: name } = table;
      input.textContent = name;
      if (index === 0) {
        input.focus();
      }
    });
  };
  useEffect(() => {
    const table = JSON.parse(localStorage.getItem("table")) || {
      ...tableValue,
      time: mealTime,
    };
    localStorage.setItem("table", JSON.stringify(table));
    renderTable(table);
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
          <span className="flex_center">{state.lists.length}</span>
        </button>
        <div className="heading_con">
          <h1>Your own Kitchen</h1>
          <div className="heading flex_center">
            <p>Cook Better, Live Better</p>
            <div className="iconwrap">
              <i className="fi fi-sr-pot"></i>
              <i className="fi fi-sr-utensils"></i>
            </div>
          </div>
        </div>
      </header>
      <Main className="mt-20">
        <div className="heading mb-20">
          <h2>Today&apos;s Meal</h2>
          <p>{date}</p>
        </div>
        <article className="today_meal flex_col_center">
          <div ref={mealCon} className="meal_con">
            {
              <div className="meal">
                <div className=" meal_header mt-10 flex_center">
                  <div className="head flex_col_center">
                    <i className="fi fi-sr-pot"></i>
                    <p>{"Breakfast"}</p>
                  </div>
                  <div className="head flex_col_center">
                    <i className="bi bi-alarm-fill"></i>
                    <p> Meal for {mealTime.break}</p>
                  </div>
                  <div className="head flex_col_center">
                    <button data-name="break" onClick={cookedHandler}>
                      {cooked.break ? (
                        <i
                          style={{ color: "#B4FF9F" }}
                          className="bi bi-toggle-on"
                        ></i>
                      ) : (
                        <i
                          style={{ color: "skyblue" }}
                          className="bi bi-toggle-off"
                        ></i>
                      )}
                    </button>
                    <p>{"Cooked?"}</p>
                  </div>
                </div>
                <div className="main_meal">
                  <h3 className="mb-10 mt-20">
                    {todayMeal && todayMeal.break.meal}
                  </h3>
                </div>
              </div>
            }
            {
              <div className="meal">
                <div className=" meal_header mt-10 flex_center">
                  <div className="head flex_col_center">
                    <i className="fi fi-sr-pot"></i>
                    <p>{"Lunch"}</p>
                  </div>
                  <div className="head flex_col_center">
                    <i className="bi bi-alarm-fill"></i>
                    <p>Meal for {mealTime.lunch}</p>
                  </div>
                  <div className="head flex_col_center">
                    <button data-name="lunch" onClick={cookedHandler}>
                      {cooked.lunch ? (
                        <i
                          style={{ color: "#B4FF9F" }}
                          className="bi bi-toggle-on"
                        ></i>
                      ) : (
                        <i
                          style={{ color: "skyblue" }}
                          className="bi bi-toggle-off"
                        ></i>
                      )}
                    </button>
                    <p>{"Cooked?"}</p>
                  </div>
                </div>
                <div className="main_meal">
                  <h3 className="mb-10 mt-20">
                    {todayMeal && todayMeal.lunch.meal}
                  </h3>
                </div>
              </div>
            }
            {
              <div className="meal">
                <div className=" meal_header mt-10 flex_center">
                  <div className="head flex_col_center">
                    <i className="fi fi-sr-pot"></i>
                    <p>{"Dinner"}</p>
                  </div>
                  <div className="head flex_col_center">
                    <i className="bi bi-alarm-fill"></i>
                    <p>{mealTime.dinner}</p>
                  </div>
                  <div className="head flex_col_center">
                    <button data-name="dinner" onClick={cookedHandler}>
                      {cooked.dinner ? (
                        <i
                          style={{ color: "#B4FF9F" }}
                          className="bi bi-toggle-on"
                        ></i>
                      ) : (
                        <i
                          style={{ color: "skyblue" }}
                          className="bi bi-toggle-off"
                        ></i>
                      )}
                    </button>
                    <p>{"Cooked?"}</p>
                  </div>
                </div>
                <div className="main_meal">
                  <h3 className="mb-10 mt-20">
                    {todayMeal && todayMeal.dinner.meal}
                  </h3>
                </div>
              </div>
            }
          </div>
          <div className="meal_btns flex_center">
            <button onClick={() => showMeal(0)}>Breakfast</button>
            <button onClick={() => showMeal(1)}>Lunch</button>
            <button onClick={() => showMeal(2)}>Dinner</button>
          </div>
        </article>
        <article className="favorites mt-30">
          <h2>
            My Favourites{" "}
            <i style={{ color: "pink" }} className="bi bi-heart-fill"></i>
          </h2>
          {favourites.length < 1 ? (
            <div className="no_favourites flex_center mt-20">
              <h3>You Have No Favorites</h3>
            </div>
          ) : (
            <div className="favorite_con">
              {favourites.map((favourite) => (
                <figure key={favourite.id} className="favourite_card_con">
                  <button
                    onClick={() => handleRemoveFavorite(favourite.id)}
                    className="delete"
                  >
                    <i
                      style={{ userSelect: "none" }}
                      className="bi bi-trash-fill"
                    ></i>
                  </button>
                  <div
                    onClick={() =>
                      handleOpenFavorite(favourite.id, favourite.name)
                    }
                    style={{ cursor: "pointer" }}
                    className="favourite_card"
                  >
                    <div className="card_info">
                      <h3>{favourite.name}</h3>
                      <div>
                        <ul>
                          {favourite.ing.slice(0, 5).map((ing, index) => (
                            <li key={index}>{ing}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="card_img">
                      <p className="date">{favourite.date}</p>
                      <Image
                        layout="fill"
                        placeholder="blurDataURL"
                        alt={favourite.name}
                        src={favourite.img}
                      />
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          )}
        </article>
        <article className="timetables mt-30 mb-30">
          <Modal absolute={true} modal={modal} setModal={setModal}>
            <form className="modal" onSubmit={handleModalInputs}>
              <h4 className="mb-10">BreakFast Time</h4>
              <div className="form_control flex_center">
                <label htmlFor="breakfast">BreakFast</label>
                <select
                  onChange={(e) =>
                    setmodalInput({
                      ...modalInput,
                      break: { ...modalInput.break, time: e.target.value },
                    })
                  }
                  required
                  name="breakfast"
                  id="breakfast"
                >
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <label htmlFor="b-am">
                  AM
                  <input
                    onChange={(e) =>
                      setmodalInput({
                        ...modalInput,
                        break: {
                          ...modalInput.break,
                          meridian: e.target.value,
                        },
                      })
                    }
                    required
                    value="am"
                    type="radio"
                    name="break"
                    id="b-am"
                  />
                </label>
                <label htmlFor="b-pm">
                  PM
                  <input
                    onChange={(e) =>
                      setmodalInput({
                        ...modalInput,
                        break: {
                          ...modalInput.break,
                          meridian: e.target.value,
                        },
                      })
                    }
                    required
                    value="pm"
                    type="radio"
                    name="break"
                    id="b-pm"
                  />
                </label>
              </div>
              <h4 className="mt-10">Lunch Time</h4>
              <div className="form_control flex_center">
                <label htmlFor="lunch">Lunch</label>
                <select
                  onChange={(e) =>
                    setmodalInput({
                      ...modalInput,
                      lunch: { ...modalInput.lunch, time: e.target.value },
                    })
                  }
                  required
                  name="lunch"
                  id="lunch"
                >
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <label htmlFor="l-am">
                  AM
                  <input
                    onChange={(e) =>
                      setmodalInput({
                        ...modalInput,
                        lunch: {
                          ...modalInput.lunch,
                          meridian: e.target.value,
                        },
                      })
                    }
                    required
                    value="am"
                    type="radio"
                    name="lunch"
                    id="l-am"
                  />
                </label>
                <label htmlFor="l-pm">
                  PM
                  <input
                    onChange={(e) =>
                      setmodalInput({
                        ...modalInput,
                        lunch: {
                          ...modalInput.lunch,
                          meridian: e.target.value,
                        },
                      })
                    }
                    required
                    value="pm"
                    type="radio"
                    name="lunch"
                    id="l-pm"
                  />
                </label>
              </div>
              <h4 className="mt-10">Dinner Time</h4>
              <div className="form_control flex_center">
                <label htmlFor="dinner">Dinner</label>
                <select
                  onChange={(e) =>
                    setmodalInput({
                      ...modalInput,
                      dinner: { ...modalInput.dinner, time: e.target.value },
                    })
                  }
                  required
                  name="dinner"
                  id="dinner"
                >
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <label htmlFor="d-am">
                  AM
                  <input
                    onChange={(e) =>
                      setmodalInput({
                        ...modalInput,
                        dinner: {
                          ...modalInput.dinner,
                          meridian: e.target.value,
                        },
                      })
                    }
                    required
                    value="am"
                    type="radio"
                    name="dinner"
                    id="d-am"
                  />
                </label>
                <label htmlFor="d-pm">
                  PM
                  <input
                    onChange={(e) =>
                      setmodalInput({
                        ...modalInput,
                        dinner: {
                          ...modalInput.dinner,
                          meridian: e.target.value,
                        },
                      })
                    }
                    required
                    value="pm"
                    type="radio"
                    name="dinner"
                    id="d-pm"
                  />
                </label>
              </div>
              <button className="form_btn fullwh mt-20">Set Time</button>
            </form>
          </Modal>
          <h2 className="mb-10">My Weekly Meals</h2>
          <div className="tableControls">
            <button className="fullwh" onClick={() => setModal(true)}>
              <span>Table settings </span>
              <i className="bi bi-gear-fill"></i>
            </button>
          </div>
          <div className="table_con">
            <form onSubmit={handleTableInputs}>
              <Figure>
                <div className="one">
                  <p>BreakFast</p>
                  <span>Monday</span>
                  <div
                    className="inputs"
                    data-name="mBreak"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="two">
                  <p>Lunch</p>
                  <div
                    className="inputs"
                    data-name="mLunch"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="three">
                  <p>Dinner</p>
                  <div
                    className="inputs"
                    data-name="mDinner"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="four">
                  <span>Tuesday</span>
                  <div
                    className="inputs"
                    data-name="tBreak"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="five">
                  <div
                    className="inputs"
                    data-name="tLunch"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="six">
                  <div
                    className="inputs"
                    data-name="tDinner"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="seven">
                  <span>Wednesday</span>
                  <div
                    className="inputs"
                    data-name="wBreak"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="eight">
                  <div
                    className="inputs"
                    data-name="wLunch"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="nine">
                  <div
                    className="inputs"
                    data-name="wDinner"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="ten">
                  <span>Thursday</span>
                  <div
                    className="inputs"
                    data-name="thBreak"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="eleven">
                  <div
                    className="inputs"
                    data-name="thLunch"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="twelve">
                  <div
                    className="inputs"
                    data-name="thDinner"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="thirteen">
                  <span>Friday</span>
                  <div
                    className="inputs"
                    data-name="fBreak"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="fourteen">
                  <div
                    className="inputs"
                    data-name="fLunch"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="fifteen">
                  <div
                    className="inputs"
                    data-name="fDinner"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="sixteen">
                  <span>Saturday</span>
                  <div
                    className="inputs"
                    data-name="sBreak"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="seventeen">
                  <div
                    className="inputs"
                    data-name="sLunch"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="eighteen">
                  <div
                    className="inputs"
                    data-name="sDinner"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="nineteen">
                  <span>Sunday</span>
                  <div
                    className="inputs"
                    data-name="suBreak"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="twenty">
                  <div
                    className="inputs"
                    data-name="suLunch"
                    contentEditable="true"
                  ></div>
                </div>
                <div className="twenty_one">
                  <div
                    className="inputs"
                    data-name="suDinner"
                    contentEditable="true"
                  ></div>
                </div>
              </Figure>
              <button className="table_btn fullwh" type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </article>
        <h2 className="footer">Your own Kitchen</h2>
      </Main>
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
              onInput={(e) => setShopingItem(e.target.value)}
              type="text"
              placeholder="Add an item"
            />
            <button type="submit" className="enter">
              <span className="blinker">{edit ? "Edit" : "Add +"}</span>
            </button>
          </form>
          <div className="todo-con">
            <div className="list">
              {state.lists
                .slice()
                .reverse()
                .map((item) => (
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
      <Navigation current={"dashboard"} />
    </DashboardWrap>
  );
}

const Figure = styled.figure`
  width: calc(100% - 30px);
  margin-left: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
  .one,
  .two,
  .three,
  .four,
  .seven,
  .ten,
  .thirteen,
  .sixteen,
  .nineteen {
    position: relative;
    overflow: visible;
  }
  .one p,
  .two p,
  .three p {
    content: "";
    position: absolute;
    height: 30px;
    width: 100%;
    top: -30px;
    font-size: 16px;
    border: 1px solid grey;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: pink;
  }
  .one span,
  .four span,
  .seven span,
  .ten span,
  .thirteen span,
  .sixteen span,
  .nineteen span {
    position: absolute;
    content: "";
    width: 30px;
    height: 100%;
    left: -30px;
    font-size: 16px;
    border: 1px solid grey;
    background-color: pink;
    writing-mode: vertical-lr;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > div {
    border: 1px solid grey;
    max-width: 280px;
    text-align: center;
    .inputs {
      font-size: 14px;
      padding: 5px;
      word-wrap: break-word;
      word-break: break-all;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }
`;
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
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  color: white;
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
        font-size: 30px;
        font-family: "Lobster", cursive;
        color: pink;
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
    left: 0px;
    top: 10px;
    animation: open 3s linear infinite;
    width: min-content;
    font-size: 30px;
    margin-left: 10px;
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
const Main = styled.main`
  padding-bottom: 50px;
  .heading {
    text-align: center;
    p {
      font-size: 14px;
    }
  }
  .modal {
    .select {
      overflow: auto;
    }
    text-align: center;
    h4 {
      padding: 5px 0px;
    }
    .form_control {
      justify-content: space-between;
    }
    .form_btn {
      border: 2px solid pink;
      border-radius: 10px;
      padding: 5px;
      font-size: 20px;
      font-family: "Lobster", cursive;
    }
  }
  /* end of heading styles */
  .today_meal {
    width: 97%;
    margin: 0 auto;
    min-height: 25vh;
    display: flex;
    box-shadow: 1px 1px 5px grey;
    transition: all 0.3s linear;
    .meal_con {
      min-height: 25vh;
      width: 100%;
      border-bottom: 1px solid white;
      position: relative;
      transition: all 0.3s linear;
      overflow: hidden;
    }
    .meal {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      transition: all 0.3s linear;
    }
    .meal_header {
      justify-content: space-around;
      font-size: 14px;
      button {
        font-size: 20px;
      }
    }
    .main_meal {
      text-align: center;
      h3 {
        font-style: italic;
        color: pink;
      }
    }
    .meal_btns {
      height: 5vh;
      width: 100%;
      color: pink;
      justify-content: space-around;
    }
  }
  /* end of today meal styling  */
  .favorites {
    h2 {
      text-align: center;
    }
    .no_favourites {
      box-shadow: 1px 1px 1px grey;
      height: 15vh;
      justify-content: center;
    }
    .favorite_con {
      max-height: 55vh;
      width: 97%;
      margin: 0 auto;
      margin-top: 10px;
      display: grid;
      grid-template-columns: minmax(1fr, 280px);
      grid-auto-rows: auto;
      justify-content: center;
      column-gap: 1em;
      row-gap: 1em;
      overflow-x: auto;
    }
    .favourite_card_con {
      position: relative;
      > button {
        position: absolute;
        text-shadow: 2px 2px 2px black;
        z-index: 9;
        color: pink;
        font-size: 20px;
        top: 3px;
        right: 5px;
      }
    }
    .favourite_card {
      display: flex;
      flex-direction: column;
      border: 1px solid pink;
      > div {
        width: 100%;
      }
      .card_img {
        object-fit: center;
        position: relative;
        p {
          position: absolute;
          text-shadow: 2px 2px 2px black;
          z-index: 9;
          opacity: 0.7;
          font-size: 20px;
          width: 100%;
          text-align: center;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .card_info {
        h3 {
          padding: 10px 0;
          color: pink;
          text-align: center;
        }
        ul {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        li {
          border: 1px solid #ededed;
          border-radius: 5px;
          display: inline-block;
          background-color: #fff;
          color: black;
          font-size: 12px;
          font-weight: bold;
          padding: 5px;
          margin-bottom: 5px;
        }
      }
    }
  }
  /* end of favourites styling */
  .timetables {
    h2 {
      text-align: center;
    }
    .tableControls {
      width: 80%;
      text-align: center;
      margin: 0 auto;
      button {
        justify-content: center;
        border: 2px solid pink;
        border-radius: 10px;
        padding: 5px;
        font-size: 20px;
        span {
          font-family: "Lobster", cursive;
          font-style: italic;
        }
      }
    }
    .table_con {
      margin-top: 45px;
    }
    .table_btn {
      border: 1px solid white;
      border-top: none;
      color: pink;
      height: 40px;
      border-radius: 5px;
      animation: bounce 1s linear infinite;
    }
    @keyframes bounce {
      0% {
        color: white;
      }
      50% {
        color: pink;
      }
      100% {
        color: white;
      }
    }
  }
  /* end of timetables styling */
  .footer {
    font-family: "Lobster", cursive;
    color: pink;
    text-align: center;
    padding-bottom: 25px;
  }
  @media screen and (min-width: 320px) {
    .favorites {
      .favourite_card {
        display: flex;
        flex-direction: row;
      }
    }
  }
  @media screen and (min-width: 690px) {
    .favorites {
      .favorite_con {
        grid-template-columns: repeat(auto-fit, minmax(280px, 300px));
      }
    }
  }
`;
