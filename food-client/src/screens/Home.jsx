import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";
import { useEffect, useState } from "react";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    console.log("API DATA",response);
    setFoodItem(response[0] || []);
    setFoodCat(response[1] || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <Carousal />
      <div className="container">
  {foodCat && foodCat.length > 0 ? (
    foodCat.map((data) => {
      return (
        <div key={data._id}>
          <div className="fs-3 m-3">
            {data.CategoryName}
          </div>

          <hr />

          <div className="row">
            {foodItem &&
              foodItem
                .filter(
                  (item) =>
                    item.CategoryName === data.CategoryName
                )
                .map((filterItems) => {
                  return (
                    <div
                      key={filterItems._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card item={filterItems} />
                    </div>
                  );
                })}
          </div>
        </div>
      );
    })
  ) : (
    <div className="text-center fs-4">Loading...</div>
  )}
</div>

      
        

      <Footer />
    </>
  );
}