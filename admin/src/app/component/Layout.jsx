"use client"; // Đánh dấu file này là một client component

import Link from "next/link";
import { useEffect } from "react";

const Layout = ({ children }) => {
    useEffect(() => {
        const sidebarToggle = document.querySelector("#sidebar-toggle");
        const themeToggle = document.querySelector(".theme-toggle");

        const toggleSidebar = () => {
            document.querySelector("#sidebar").classList.toggle("collapsed");
        };

        const toggleTheme = () => {
            toggleLocalStorage();
            toggleRootClass();
        };

        const toggleRootClass = () => {
            const current = document.documentElement.getAttribute('data-bs-theme');
            const inverted = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-bs-theme', inverted);
        };

        const toggleLocalStorage = () => {
            if (isLight()) {
                localStorage.removeItem("light");
            } else {
                localStorage.setItem("light", "set");
            }
        };

        const isLight = () => {
            return localStorage.getItem("light");
        };

        if (isLight()) {
            toggleRootClass();
        }

        if (sidebarToggle) {
            sidebarToggle.addEventListener("click", toggleSidebar);
        }

        if (themeToggle) {
            themeToggle.addEventListener("click", toggleTheme);
        }

        // Cleanup function
        return () => {
            if (sidebarToggle) {
                sidebarToggle.removeEventListener("click", toggleSidebar);
            }
            if (themeToggle) {
                themeToggle.removeEventListener("click", toggleTheme);
            }
        };
    }, []);

    return (
        <div className="wrapper">
            <aside id="sidebar" className="js-sidebar">
                <div className="h-100">
                    <div className="sidebar-logo">
                        <Link href="/">TShop</Link>
                    </div>
                    <ul className="sidebar-nav">
                        <li className="sidebar-header">Admin</li>
                        <li className="sidebar-item">
                            <Link href="/" className="sidebar-link">
                                <i className="fa-solid fa-list pe-2"></i>
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                    <ul className="sidebar-nav">
                        <li className="sidebar-item">
                            <Link href="/sanpham" className="sidebar-link">
                                <i className="fa-solid fa-list pe-2"></i>
                                Product
                            </Link>
                        </li>
                    </ul>
                    <ul className="sidebar-nav">
                        <li className="sidebar-item">
                            <Link href="/danhmuc" className="sidebar-link">
                                <i className="fa-solid fa-list pe-2"></i>
                                Category
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="main">
                <nav className="navbar navbar-expand px-3 border-bottom">
                    <button className="btn" id="sidebar-toggle" type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse navbar">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a href="#" data-bs-toggle="dropdown" className="nav-icon pe-md-0">
                                    {/* <img src="image/profile.jpg" className="avatar img-fluid rounded" /> */}
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <a href="#" className="dropdown-item">Profile</a>
                                    <a href="#" className="dropdown-item">Setting</a>
                                    <a href="#" className="dropdown-item">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main className="content px-3 py-2">
                    <div className="container-fluid">
                        {children}
                    </div>
                </main>
                <a href="#" className="theme-toggle">
                    <i className="fa-regular fa-moon"></i>
                    <i className="fa-regular fa-sun"></i>
                </a>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row text-muted">
                            <div className="col-6 text-start">
                                <p className="mb-0">
                                    <a href="#" className="text-muted">
                                        <strong>TShop</strong>
                                    </a>
                                </p>
                            </div>
                            <div className="col-6 text-end">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        <a href="#" className="text-muted">Contact</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#" className="text-muted">About Us</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#" className="text-muted">Terms</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#" className="text-muted">Booking</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
