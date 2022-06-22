import React, { Component } from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"


class App extends Component {
  render() {
    return (
      <div className="App ">
        <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/questions" element={<Questions />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/questions/:id/edit" element={<QuestionEdit />} />
              <Route path="/questions/:id" element={<Question />} />
              <Route path="/articles/:id" element={<Article />} />
              <Route path="/articles/:id/edit" element={<ArticleEdit />} />  */}
            </Routes>
          </div>
      </div>
    );
  }
}

export default App;