import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Row from "./components/Row";
import requests from "./api/requests";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />

      <Row
        category="NETFLIX ORIGINALS"
        id="NO"
        requestURL={requests.NETFLIX_ORIGINALS}
        large
      />
      <Row category="Trending Now" id="TN" requestURL={requests.TRENDING} />
      <Row
        category="Top Rated"
        id="TR"
        requestURL={requests.TOP_RATED_MOVIES}
      />
      <Row
        category="Action Movies"
        id="AM"
        requestURL={requests.ACTION_MOVIES}
      />
      <Row
        category="Comedy Movies"
        id="CM"
        requestURL={requests.COMEDY_MOVIES}
      />

      <Footer />
    </div>
  );
}

export default App;
