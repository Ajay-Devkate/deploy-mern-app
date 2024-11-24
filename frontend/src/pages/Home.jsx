import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    fetchProducts(); 
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    handleSuccess("user logged out!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "https://deploy-mern-app-api-gilt.vercel.app/products";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const result = await response.json();
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div>
      <h1>{loggedInUser}</h1>

      <button onClick={handleLogout}>Logout</button>

      <div>
        {products &&
          products.map((item, idx) => (
            <ul key={idx}>
              <span>
                {item.name} : {item.price}
              </span>
            </ul>
          ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;
