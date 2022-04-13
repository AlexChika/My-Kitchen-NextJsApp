import Link from "next/link";
import styled from "styled-components";
export default function Navigation() {
  return (
    <Nav>
      <Link href="/search">
        <a>search</a>
      </Link>
      <Link href="/settings">
        <a>settings</a>
      </Link>
      <Link href="/home">
        <a>whaatever</a>
      </Link>
    </Nav>
  );
}

const Nav = styled.nav`
  /* position: fixed; */
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 2px solid pink;
  padding: 7px 10px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 3px;
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
`;
