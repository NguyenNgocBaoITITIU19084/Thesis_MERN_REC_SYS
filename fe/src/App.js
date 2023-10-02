import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage } from "./routes";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
