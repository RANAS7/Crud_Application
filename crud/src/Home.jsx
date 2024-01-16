import axios from "axios";
import React, { useEffect, useState } from "react";

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
    <div className=" flex flex-row gap-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="gap-3 bg-slate-400 w-48 text-center rounded-lg m-3"
        >
          <div className=" flex flex-col items-center p-3">
            <h3>{product.Product_Name}</h3>
            <p>{product.Price}</p>
            <p>{product.Description}</p>
            <img
              src={`http://localhost:8080/images/${product.Product_Image}`}
              alt={product.Product_Name}
              className="mt-2 w-24 h-24"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
