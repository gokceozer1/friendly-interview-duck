import React, { Component } from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import Questions from "./pages/Questions"
import Articles from "./pages/Articles"
import Contact from "./pages/Contact"
import Article from "./pages/Article"
import Question from "./pages/Question"
import { Route, Routes } from "react-router-dom"


class App extends Component {
  render() {
    return (
      <div className="App ">
        <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/questions/:id" element={<Question />} />
              <Route path="/articles/:id" element={<Article />} /> 
            </Routes>
          </div>
      </div>
    );
  }
}

export default App;