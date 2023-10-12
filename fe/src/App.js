import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage, SignUp, Home } from "./routes";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
