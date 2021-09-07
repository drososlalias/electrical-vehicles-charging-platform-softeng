import React, {useEffect, useRef} from 'react';
import {Redirect} from "react-router-dom";

 const PayPal =  () =>{
    const paypal = useRef();
    useEffect(()=>{
            window.paypal.Buttons({cost: 400}).render('body');
    } ,[])

    return (
        <div >
            <div ref={paypal}/>
        </div>
    )
}
export default PayPal;
