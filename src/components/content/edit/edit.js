import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../../redux/features/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../header/header";
import { useFormik } from "formik";
import * as Yup from "yup";
import SideBar from "../../sidebar/sidebar";

const EditProduct = ({ match }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const product = products.find((p) => {
    if (p.id === id) {
      return p;
    }
  });
  const formik = useFormik({
    initialValues: {
      name: product?.productName || "",
      price: (product && product.variation[0].price) || "",
      description: product?.description || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      price: Yup.number()
        .required("Price is required")
        .typeError("Price must be a number"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      let data = {
        ...values,
        productName: values.name,
        variation: [{ ...values, price: values.price }],
      };
      dispatch(updateProduct({ id: id, data: data }));
      navigate("/");
    },
  });

  return (
    <div>
      <Header />
      <div className="productSidebarWrapper">
        <SideBar />
        <div className="addProductWrap">
          <div className="toggleWrapper">
            <h2 className="productHeading">Edit Product</h2>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="productForm"
            style={{ height: "75vh" }}
          >
            <div className="productFormWrapper">
              <h3 className="productItemHeading">Basic Info</h3>
              <div className="form-group" style={{ paddingTop: "50px" }}>
                <label htmlFor="name" style={{ marginBottom: "10px" }}>
                  <span className="important">*</span>Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                <div className="error-icon">
                  {formik.touched.name && formik.errors.name && (
                    <div className="error">{formik.errors.name}</div>
                  )}
                </div>
              </div>
              <div className="form-group" style={{ paddingTop: "50px" }}>
                <label htmlFor="price" style={{ marginBottom: "10px" }}>
                  <span className="important">*</span>Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                />
                <div className="error-icon">
                  {formik.touched.price && formik.errors.price && (
                    <div className="error">{formik.errors.price}</div>
                  )}
                </div>
              </div>
              <div className="form-group" style={{ paddingTop: "50px" }}>
                <label htmlFor="description" style={{ marginBottom: "10px" }}>
                  <span className="important">*</span>Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  style={{
                    height: "60px",
                    padding: "10px",
                  }}
                ></textarea>
                <div className="error-icon">
                  {formik.touched.description && formik.errors.description && (
                    <div className="error">{formik.errors.description}</div>
                  )}
                </div>
              </div>
              <button type="submit" className="productBtn">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
