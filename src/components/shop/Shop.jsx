import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css";
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        fetch("products.json")
        .then(res => res.json())
        .then(data =>setProducts (data))
    },[]);
    useEffect(()=>{
        const storedCart = getShoppingCart();
        const saveCart = [];
        // step 1: get the id of addProduct product
        for(const id in storedCart){
            // step 2: get product from products using id
            const addProduct = products.find(product => product.id === id);
            if(addProduct){
                // step 3: add quantity
                const quantity = storedCart[id]
                addProduct.quantity = quantity
                // step 4:  add the added product to the save cart
                saveCart.push(addProduct)
            }
        }
        // set the cart
        setCart(saveCart)
        
    },[products]);
    
    const handleAddToCart = (product)=>{
        const newCart = [...cart, product];
        setCart(newCart)
        addToDb(product.id)
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
           {
            products.map(product => <Product
              product = {product}
              key = {product.id}
              handleAddToCart = {handleAddToCart}
            >

            </Product>)
           }
            </div>
            <div className="cart-container">
              <Cart cart = {cart}>
              </Cart>
            </div>
            
        </div>
    );
};

export default Shop;