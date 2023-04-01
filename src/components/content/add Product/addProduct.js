import { useState } from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/features/productSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../header/header";
import SideBar from "../../sidebar/sidebar";
import "./addProduct.css";

const initialValues = {
  productName: "",
  description: "",
  category: "",
  tags: "",
  variants: [{ variantName: "", price: "", stock: "", image: null }],
};

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Please enter product name"),
  description: Yup.string().required("Please enter product description"),
  category: Yup.string().required("Please enter product category"),
  tags: Yup.string().required("Please enter product tag"),
  variants: Yup.array()
    .of(
      Yup.object().shape({
        variantName: Yup.string().required("Please enter variant name"),
        price: Yup.number().required("please enter price"),
        stock: Yup.number().required("please enter stock"),
        image: Yup.mixed().required("please add image"),
      })
    )
    .min(1, "At least one variant is required"),
});

function AddProduct() {
  const [activeTab, setActiveTab] = useState("general");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/jeyasurya373/6b8434e5950e686a103a633df2d8d865/raw/e3e354e108a15daa796571d7603c4583b5a0f3b3/sample.json",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: JSON.stringify(values),
          mode: "no-cors",
        }
      );
      setSubmitting(false);
      dispatch(addProduct(values));
      const existingProducts =
        JSON.parse(localStorage.getItem("products")) || [];
      const updatedProducts = [...existingProducts, values];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="productSidebarWrapper">
        <SideBar />
        <div className="addProductWrap">
          <h2 className="productHeading">Add New Product</h2>
          <ul className="toggleWrapper">
            <li className="toggleItem">
              <button
                className={`toggleItem ${
                  activeTab === "general" ? "active" : ""
                }`}
                onClick={() => setActiveTab("general")}
              >
                General
              </button>
            </li>
            <li className="toggleItem">
              <button
                className={`toggleItem ${
                  activeTab === "variants" ? "active" : ""
                }`}
                onClick={() => setActiveTab("variants")}
              >
                Variants
              </button>
            </li>
          </ul>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form className="productForm">
                {activeTab === "general" && (
                  <div className="productFormWrapper">
                    <h3 className="productItemHeading">Basic Info</h3>
                    <div className="ProductformItem">
                      <div className="form-group">
                        <label htmlFor="productName">
                          <span className="important">*</span>Product Name
                        </label>
                        <Field
                          type="text"
                          name="productName"
                          className="form-control"
                        />
                        <div className="error-icon">
                          <ErrorMessage
                            name="productName"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="description">
                          <span className="important">*</span>Description
                        </label>
                        <Field
                          component="textarea"
                          name="description"
                          className="form-control"
                        />
                        <div className="error-icon">
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>
                    <h3 className="productItemHeading">Organization</h3>
                    <div className="form-group">
                      <label htmlFor="category">
                        <span className="important">*</span>Category
                      </label>
                      <Field
                        type="text"
                        name="category"
                        className="form-control"
                      />
                      <div className="error-icon">
                        <ErrorMessage
                          name="category"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="tags">
                        <span className="important">*</span>Tags
                      </label>
                      <Field type="text" name="tags" className="form-control" />
                      <div className="error-icon">
                        <ErrorMessage
                          name="tags"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="productBtn"
                      disabled={isSubmitting}
                    >
                      Save
                    </button>
                  </div>
                )}
                {activeTab === "variants" && (
                  <div className="productFormWrapper">
                    <h3>Variants</h3>
                    <FieldArray name="variants">
                      {(arrayHelpers) => (
                        <div>
                          {values.variants.map((variant, index) => (
                            <div key={index}>
                              <h4>Variant {index + 1}</h4>
                              <div className="form-group">
                                <label
                                  htmlFor={`variants.${index}.variantName`}
                                >
                                  <span className="important">*</span>
                                  Variant Name
                                </label>
                                <Field
                                  type="text"
                                  name={`variants.${index}.variantName`}
                                  className="form-control"
                                />
                                <div className="error-icon">
                                  <ErrorMessage
                                    name={`variants.${index}.variantName`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor={`variants.${index}.price`}>
                                  <span className="important">*</span>
                                  Price
                                </label>
                                <Field
                                  type="number"
                                  name={`variants.${index}.price`}
                                  className="form-control"
                                />
                                <div className="error-icon">
                                  <ErrorMessage
                                    name={`variants.${index}.price`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor={`variants.${index}.stock`}>
                                  <span className="important">*</span>
                                  Stock
                                </label>
                                <Field
                                  type="number"
                                  name={`variants.${index}.stock`}
                                  className="form-control"
                                />
                                <div>
                                  <div className="error-icon">
                                    <ErrorMessage
                                      name={`variants.${index}.stock`}
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor={`variants.${index}.image`}>
                                  <span className="important">*</span>
                                  Image
                                </label>
                                <input
                                  type="file"
                                  name={`variants.${index}.image`}
                                  onChange={(event) => {
                                    arrayHelpers.replace(index, {
                                      ...variant,
                                      image: event.currentTarget.files[0],
                                    });
                                  }}
                                />
                                <div className="error-icon">
                                  <ErrorMessage
                                    name={`variants.${index}.image`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                                {variant.image && (
                                  <img
                                    src={URL.createObjectURL(variant.image)}
                                    alt=""
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      objectFit: "cover",
                                      borderRadius: "50%",
                                      position: "absolute",
                                      right: "30px",
                                      bottom: "75px",
                                    }}
                                  />
                                )}
                              </div>
                              <button
                                type="button"
                                className="btn btn-danger mr-2"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Remove
                              </button>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={() =>
                                  arrayHelpers.insert(index + 1, {
                                    variantName: "",
                                    price: "",
                                    stock: "",
                                    image: null,
                                  })
                                }
                              >
                                Add
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </FieldArray>
                    <button
                      type="submit"
                      className="productBtn"
                      disabled={isSubmitting}
                    >
                      Save
                    </button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
