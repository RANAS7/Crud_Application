import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [images, setImages] = useState([]);

  const [values, setValues] = useState({
    productName: "",
    price: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "productImg" && files.length > 0) {
      const newImages = Array.from(files);
      setImages((prevImages) => [...prevImages, ...newImages]); // Append new images to existing ones
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("Sending data", values, images);
      const formData = new FormData();
      formData.append("productName", values.productName);
      formData.append("price", values.price);
      formData.append("description", values.description);
      images.forEach((image, index) => {
        formData.append("productImg", image);
      });
      const res = await axios.post(
        "http://localhost:8080/addProduct",
        formData
      );

      if (res.data.message === "Product added successfully") {
        console.log("Product is Successfully submitted");
        alert("Product stored successfully");
        navigate("/");
      } else {
        console.log("Product Submission failed");
      }
    } catch (err) {
      console.log(err);
      alert("The form is can not submit");
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById("productImg");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-400 h-screen">
      <div className="p-3 bg-white w-[28rem] rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="text-center">
          <div className="mb-3 flex flex-row gap-3 items-center">
            <label htmlFor="productName">Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Enter your Produt Name"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 flex flex-row gap-3 items-center">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              placeholder="Enter your prics"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 flex flex-row gap-3 items-center">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              placeholder="Enter your Name"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="box-decoration">
            <label
              htmlFor="image-upload-input"
              className="image-upload-label"
            ></label>
            <div style={{ cursor: "pointer" }}>
              <div className="flex flex-row gap-2 items-start">
                {images.map((Image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(Image)}
                    alt={`upload-${index}`}
                    className="img-display-after w-32 h-32 flex mb-3"
                  />
                ))}
              </div>
              <img
                src="./../upload.jpg"
                onClick={handleClick}
                alt="upload"
                className="img-display-before"
              />

              <input
                id="productImg"
                type="file"
                accept="image/*"
                name="productImg"
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success bg-slate-400 text-black"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
