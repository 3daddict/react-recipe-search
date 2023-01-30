import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import Category from "./components/Category";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdOutlineFoodBank } from "react-icons/md";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <LeftColumn>
            <Nav>
              <MdOutlineFoodBank />
              <Logo to={"/"}>Recipito</Logo>
            </Nav>
            <Description>
              Hungry for something delicious?
              <span>
                &nbsp;Tell us what your craving and we'll find the perfect
                recipe for you! Just type in a keyword and let the magic happen.
              </span>
            </Description>
            <Search />
            <Category />
          </LeftColumn>
          <RightColumn>
            <Pages />
          </RightColumn>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #1c2331;
  padding: 0 2rem;

  @media (max-width: 767px) {
    flex-direction: column;
    padding: 0 1rem;
  }
`;

const LeftColumn = styled.div`
  width: 35%;
  margin-top: 2rem;
  padding-right: 2rem;

  @media (max-width: 767px) {
    width: 100%;
    padding-right: 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    font-size: 4rem;
    margin-left: -0.6rem;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-family: "Lobster", cursive;
  font-size: 3rem;
  color: #1c2331;
`;

const Description = styled.p`
  span {
    @media (max-width: 767px) {
      display: none;
    }
  }
`;

const RightColumn = styled.div`
  width: 65%;
  padding-left: 2rem;
  margin-top: 4rem;

  @media (max-width: 767px) {
    width: 100%;
    height: 50%;
    padding-left: 0;
    margin-top: 1rem;
  }
`;

export default App;
