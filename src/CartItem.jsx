import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Since cost is stored as a string like "$15", strip the "$" and parse it as a number
    const parseCost = (cost) => parseFloat(cost.replace('$', ''));

    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            return total + parseCost(item.cost) * item.quantity;
        }, 0).toFixed(2);
    };

    const calculateTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const calculateItemSubtotal = (item) => {
        return (parseCost(item.cost) * item.quantity).toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping();
    };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cartItems.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button
                                    className="cart-item-button cart-item-button-dec"
                                    onClick={() => handleDecrement(item)}
                                >
                                    -
                                </button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button
                                    className="cart-item-button cart-item-button-inc"
                                    onClick={() => handleIncrement(item)}
                                >
                                    +
                                </button>
                            </div>
                            <div className="cart-item-subtotal">
                                Subtotal: ${calculateItemSubtotal(item)}
                            </div>
                            <button
                                className="cart-item-delete"
                                onClick={() => handleRemove(item)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {cartItems.length === 0 && (
                <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
            )}
            <div style={{ marginTop: '20px' }}>
                <h3>Total Items: {calculateTotalItems()}</h3>
            </div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
                    Continue Shopping
                </button>
                <br />
                <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default CartItem;
