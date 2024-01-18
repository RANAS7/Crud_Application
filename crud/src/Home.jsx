import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getProducts")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className=" block md:flex flex-row gap-3">
      {products.map((product) => (
        <div
          key={product.ID}
          className="gap-3 block md:flex bg-slate-400 w-48 text-center rounded-lg "
        >
          <div className="block md:flex flex-col items-center p-3">
            <h3>{product.Product_Name}</h3>
            <p>{product.Price}</p>
            <p>{product.Description}</p>
            <div className=" flex flex-wrap gap-1">
              {product.Product_Image.split(",").map((image, index) => (
                <Link to="/addProduct">
                  <img
                    src={`http://localhost:8080/images/${image}`}
                    alt={`${product.Product_Name}-${index}`}
                    className="m-1 w-full h-24 rounded-lg"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
