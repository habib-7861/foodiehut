import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import {toast} from "react-toastify"
const List = ({url}) => {

  const [List,setList] = useState([]);
  const fetchList = async ()=> {
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success) {
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }
  
  const removeFood = async(foodId) => {
    // try{
         const response = await axios.post(`${url}/api/food/remove`,{id: foodId});
         await fetchList();
      if(response.data.success) {
        toast.success(response.data.message);
        // fetchList();
      }
      else{
        toast.error("Error")
      }
    // }catch(error){
    //   console.log(error)
    // }
  }

  useEffect(()=>{
    fetchList();
  },[]);  
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Catagory</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {List?.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List


