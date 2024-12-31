import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';


const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();
    
    const verifyPayment = async() => {
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){
            navigate("/myorders");
        }
        else{
            navigate("/")
        }
    }

    useEffect(() =>{
        verifyPayment();
    },[])

    
  return (
    <div className='verify'>
        <div className="spinner">

        </div>
      
    </div>
  )
}

export default Verify




// // Gpt
// import React, { useContext, useEffect, useState } from 'react';
// import './Verify.css';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';

// const Verify = () => {
//   const [searchParams] = useSearchParams();
//   const success = searchParams.get('success');
//   const orderId = searchParams.get('orderId');
//   const { url } = useContext(StoreContext);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true); // Added loading state

//   const verifyPayment = async () => {
//     try {
//       const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
//       if (response.data.success) {
//         navigate("/myorders");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Error verifying payment:", error);
//       navigate("/");
//     } finally {
//       setLoading(false); // Stop the spinner after the process
//     }
//   };

//   useEffect(() => {
//     verifyPayment();
//   }, [url]); // Added `url` as a dependency


//   return (
//     <div className='verify'>
//       {loading && ( // Show the spinner only when loading
//         <div className="spinner">
//           <div className="loader"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Verify;

