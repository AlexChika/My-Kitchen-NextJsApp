import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
export default function Navigation({ current }) {
  const handleLogOut = () => {
    // handle some stuff here
    Router.push("/");
  };
  return (
    <Nav className="bg">
      <Link href="/search">
        <div className={`${current === "search" ? "color" : ""}`}>
          <span>
            <i className="bi bi-search"></i>
          </span>
          <span>Search</span>
        </div>
      </Link>
      <Link href="/dashboard">
        <div className={`${current === "dashboard" ? "color" : ""}`}>
          <span>
            <i className="bi bi-house-heart"></i>
          </span>
          <span>Dashboard</span>
        </div>
      </Link>
      <Link href="/settings">
        <div className={`${current === "settings" ? "color" : ""}`}>
          <span>
            <i className="bi bi-gear"></i>
          </span>
          <span>Settings</span>
        </div>
      </Link>
      <button
        className={`${current === "logout" ? "color" : ""}`}
        onClick={handleLogOut}
      >
        <span>
          <i className="bi bi-box-arrow-right"></i>
        </span>
        <span>Logout</span>
      </button>
    </Nav>
  );
}

const Nav = styled.nav`
  height: calc(8vh);
  padding: 10px;
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  max-width: 768px;
  z-index: 100;
  color: white;
  ::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.7);
    opacity: 0.1;
    z-index: 100;
  }
  button,
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 22%;
    i {
      font-size: 20px;
    }
    span {
      font-size: 11px;
    }
  }
  button {
    background: transparent;
    border: none;
    outline: none;
    color: inherit;
  }
  .color {
    color: pink;
  }
`;
