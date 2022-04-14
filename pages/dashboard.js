import styled from "styled-components";
import Navigation from "../components/Navigation";
export default function Dashboard() {
  return (
    <div>
      <Navigation current={"dashboard"} />
    </div>
  );
}
const DashboardWrap = styled.main``;
