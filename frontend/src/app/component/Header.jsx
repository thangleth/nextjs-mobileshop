"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const Header = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.reduce((count, item) => count + Number(item.quantity), 0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <a className="navbar-brand" href="#">Tshop</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" href={'/'}>Trang chủ</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" href={'/gioithieu'}>Giới thiệu</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" href={'/sanpham'}>Sản phẩm</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" href={'/lienhe'}>Liên hệ</Link>
                        </li>
                        <form action='/timkiem' className="d-flex">
                            <input className="px-2 search" name="keyword" type="search" placeholder="Search" />
                            <button className="btn0" type="submit">Search</button>
                        </form>
                    </ul>

                    <div className="position-relative">
                        <Link className="shopping-cart-icon " href={'/giohang'}><i className="fas fa-shopping-cart position-relative" style={{ fontSize: '1.5rem' }}></i></Link>
                        <span id="amount-cart" className="text-white position-absolute top-0 start-75 translate-middle bg-success px-2 rounded-circle">
                            {cartCount}
                        </span>
                    </div>
                    <div id="account" class="d-flex justify-content-center align-items-center rounded-circle bg-black bg-opacity-10  mx-2 px-2 py-1">
                        <Link href={isLoggedIn ? '/info' : '/dangnhap'}>
                            <i class={isLoggedIn ? "bi bi-person fs-5  fw-bolder text-dark" : "bi bi-box-arrow-in-right fs-5  fw-bolder text-dark"} />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Header;
