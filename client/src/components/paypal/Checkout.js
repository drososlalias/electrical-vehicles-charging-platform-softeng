import React , { useState } from "react";
import PayPal from "./Paypal";

function Checkout() {
    const [checkout,setCheckOut] = useState(false);
    return(
        <div className='container-paypal'>
            {checkout ? (
                <PayPal/>
            ) : (
            <button className='btn-paypal' onClick={() => {setCheckOut(true);}}>
                Checkout
            </button>)}
        </div>
    );
}

export default Checkout;