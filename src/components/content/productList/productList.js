import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  setProducts,
} from "../../../redux/features/productSlice";
import Header from "../../header/header";
import DotIcon from "../../../assets/images/icons/icon_dots.png";
import "./productList.css";
import { useNavigate } from "react-router-dom";
import SideBar from "../../sidebar/sidebar";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          "https://gist.githubusercontent.com/jeyasurya373/6b8434e5950e686a103a633df2d8d865/raw/e3e354e108a15daa796571d7603c4583b5a0f3b3/sample.json"
        );
        const storedProducts =
          JSON.parse(localStorage.getItem("products")) || [];
        dispatch(setProducts([...response.data, ...storedProducts]));
      } catch (error) {
        console.log(error);
      }
    }

    if (!products.length) {
      fetchProducts();
    }
  }, []);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEdit = (productId) => {
    const product = products.find((p) => p.id === productId);
    navigate(`/edit/${productId}`, { product });
  };

  const handleAdd = () => {
    navigate("/add");
  };

  const filteredProducts = products.filter((product) => {
    const productNameMatch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch = product.category
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return productNameMatch || categoryMatch;
  });

  const handleDotIconClick = (clickedProductId) => {
    setShowActions((prev) => {
      if (prev === clickedProductId) {
        return null;
      }
      return clickedProductId;
    });
  };

  return (
    <div>
      <Header />
      <div className="productSidebarWrapper">
        <SideBar />
        <div className="productWrapper">
          <div className="productHeadingWrap">
            <h2>Product List</h2>
            <p className="dirct">E-commerce / Product List</p>
          </div>
          <div className="tableWrapper">
            <div className="inputAddWrapper">
              <input
                type="text"
                placeholder="Search by Product Name or Category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleAdd}>Add Product</button>
            </div>
            <table className="productList">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.productName} className="productItem">
                    <td>
                      <img
                        src={
                          (product.variation &&
                            product.variation.length &&
                            product.variation[0].productImage) ||
                          (product.variants &&
                            product.variants.length &&
                            product.variants[0].productImage)
                        }
                        alt={product.productName}
                        width="50"
                        height="50"
                      />
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.category}</td>
                    <td>
                      {(product.variation &&
                        product.variation.length &&
                        product.variation[0].price) ||
                        (product.variants &&
                          product.variants.length &&
                          product.variants[0].price)}
                    </td>
                    <td>
                      {(product.variation &&
                        product.variation.length &&
                        product.variation[0].stock) ||
                        (product.variants &&
                          product.variants.length &&
                          product.variants[0].stock)}
                    </td>
                    <td>
                      {product.status ||
                      (product.variants &&
                        product.variants.length &&
                        product.variants[0].stock > 0) ? (
                        <p>In Stock</p>
                      ) : (
                        <p>Out of Stock</p>
                      )}
                    </td>
                    <td>
                      <img
                        src={DotIcon}
                        className="dot-icon"
                        alt="dot-icon"
                        onClick={() => {
                          handleDotIconClick(product.id);
                        }}
                      />
                      {showActions === product.id && (
                        <div className="actions-popup">
                          <button onClick={() => handleEdit(product.id)}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(product.id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
