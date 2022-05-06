import React from "react";
import CreateBlog from "./create";

import BlogView from "./show";
import BlogEdit from "./edit";
import SearchPage from "./pages/searchpage";

import HomePage from "./pages/HomePage";

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signin from "./signup";
function App() {
  return (
    <Router>
      
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route path="/signin/" element={<Signin/>}/>
        <Route path="/Create/" element={<CreateBlog/>}/>
        <Route path="/show/:id" element={<BlogView/>}/>
        <Route path="/EditBlog/:id" element={<BlogEdit/>}/>

        <Route path="/Search/" element={<SearchPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
