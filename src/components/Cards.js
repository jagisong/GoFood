import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

export default function Cards(props) {
  let dispatch = useDispatchCart();
  const { foodItems, options } = props;
  let priceOption = Object.keys(options);
  // console.log(props);
  let data = useCart();
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItems._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItems._id, price: finalPrice, qty: qty })
        return
      }
      else {
        await dispatch({ type: "ADD", id: foodItems._id, name: foodItems.name, price: finalPrice, qty: qty, size: size })
        return
      }
    }
    await dispatch({ type: "ADD", id: foodItems._id, name: foodItems.name, price: finalPrice, qty: qty, size: size })
    // console.log(data);
  }
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, []);
  return (
    <div className="card-container">
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={foodItems.imgSrc}
          className="card-img-top"
          alt="..."

        />
        <div className="card-body">
          <h5 className="card-title">{foodItems.name}</h5>
          <div className="w-100 ">
            <select name="" id="" className="mx-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select name="" id="" className="mx-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {
                priceOption.map((data) => {
                  return <option key={data} value={data}>
                    {data}
                  </option>
                })
              }
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
