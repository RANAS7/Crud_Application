import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Forms/Login";
import SignUp from "./Forms/SignUp";
import AddProduct from "./Forms/AddProduct";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/addProduct" element={<AddProduct />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
