import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/content/login/login";
import ProductList from "./components/content/productList/productList";
import AddProduct from "./components/content/add Product/addProduct";
import EditProduct from "./components/content/edit/edit";
import SignUp from "./components/content/signup/signup";
import PrivateRoute from "./components/content/routes/privateRoute";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" exact element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
