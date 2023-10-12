import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage, SignUp } from "./routes";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
