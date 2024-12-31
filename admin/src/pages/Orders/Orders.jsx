// import React from 'react'
// import './Orders.css'
// import { useState } from 'react'
// import {toast} from 'react-toastify'
// import axios from 'axios'
// import { useEffect } from 'react'
// import {assets} from '../../assets/assets';
// const Orders = ({url}) => {

//   const [orders,setOrders] = useState([]);

//   const fetchAllOrders = async () =>{
//     const response = await axios.get(url+"/api/order/list");
//     if(response.data.success) {
//       setOrders(response.data.data)
//       console.log(response.data.data); 
//     }
//     else{
//       toast.error("Error")
//     }
//   }
//   useEffect(()=>{
//     fetchAllOrders()
//   },[])
//   return (
//     <div className='order add'>
//       <h3>Order Page</h3>
//       <div className="order-list">
//         {orders.map((order,index)=>{
//           <div className="order-item">
//             <img src={assets.parcel_icon} alt="" />
//             <div>
//               <p className="order-item-food">
//                 {order.items.map((item,index)=>{
//                   if(index === order.items.length - 1){
//                     return item.name+ " x " + item.quantity
//                   }
//                   else{
//                     return item.name+ " x " + item.quantity + ", "
//                   }
//                 })}
//               </p>
//             </div>
//           </div>
//         })}
//       </div>
//     </div>
//   )
// }

// export default Orders

//Gpt
import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Network error");
      console.error("Error:", error);
    }
  };
  const statusHandler = async (event, orderId) => {
    try {
      const newStatus = event.target.value;
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: newStatus,
      });

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Status updated successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Network error while updating status");
    }
  };


  useEffect(() => {
    fetchAllOrders();
  }, [url]); // Optional: URL dependency if it can change

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div className="order-item" key={order._id || index}>
              <img src={assets.parcel_icon} alt="Parcel icon" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status || "Food Processing"}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;

