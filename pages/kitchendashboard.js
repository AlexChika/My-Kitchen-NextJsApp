import { useState, useEffect, useRef } from "react";
import Router from "next/router";
export default function KitchenDashboard() {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("status")) {
      Router.push("/");
    } else {
      setLoad(true);
    }
  }, []);
  return <>{load ? <h1>Hello from DashBoard</h1> : ""} </>;
}
