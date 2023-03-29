import React from 'react';
import "./Cart.css"
const Cart = ({cart}) => {
    //  const cart = props.cart // Option 1
    // const {cart} = props// option 2
     let totalPrice = 0;
     let totalShipping = 0;
     let quantity = 0;
    for(const product of cart){
        if(product.quantity == 0){
           product.quantity = 1;
        }
        // product.quantity = product.quantity || 1;
        totalPrice+= product.price * product.quantity;
        totalShipping+= product.shipping;
        quantity = quantity + product.quantity;
    }
    const tax = totalPrice*7/100;
    const grandTotal = totalPrice + totalShipping + tax;
    return (
        <div className='cart'>
             <h3>Product summary</h3>
             <p>Select item: {quantity}</p> 
             <p>Total Price: {totalPrice}</p>
             <p>Total Shipping:{totalShipping}</p>
             <p>Tax:{tax.toFixed(2)}</p>
             <h5>Grand Total:{grandTotal}</h5>
        </div>
    );
};

export default Cart;