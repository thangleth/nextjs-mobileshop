'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '@/redux/slices/cartslice';
import { useMemo } from 'react';

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart?.items) || [];
    const dispatch = useDispatch();
    const itemCount = useMemo(() => cartItems.reduce((count, item) => count + item.quantity, 0), [cartItems]);
    const total = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);
    return (
        <>
            <div className="container">
                <h1>Giỏ hàng</h1>
                <div className="cart">
                    <div className="products">
                        {cartItems.map((item) => (
                            <div className="product" key={item._id}>
                                <img className='img-fluid mx-100' src={`http://localhost:3003/img/${item.image}`} />
                                <div className="product-info">
                                    <h3 className="product-name">{item.name}</h3>
                                    <h4 className="product-price">${item.price.toLocaleString()}</h4>
                                    {/* <h4 className="product-offer">50%</h4> */}
                                    <p className="product-quantity" />Qnt: <input min="1" type="number" value={item.quantity}
                                        onChange={(e) => dispatch(updateCartItemQuantity({ _id: item._id, quantity: parseInt(e.target.value) }))} />
                                    <p className="product-remove">
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                        <button className="btn text-white" onClick={() => dispatch(removeFromCart(item._id))}>Xóa</button>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-total p-2">
                        <p>
                            <span>Tổng đơn hàng</span>
                            <span>${total}</span>
                        </p>
                        <p>
                            <span>Số lượng sản phẩm</span>
                            <span>{itemCount}</span>
                        </p>
                        <a href="#" className='mb-4'>Thanh toán</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;