import React from "react";
import Link from "next/link";

function Carousel() {
    return (
        <>
            <div className="carousel">
                <div className="container py-3">
                    <div className="row">
                        <div className="col-md-9 m-0 p-0">
                            <div id="carouselExample" className="carousel slide">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="./img/slide1.jpg" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="./img/slide2.png" className="d-block w-100" alt="..." />
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-3 m-0">
                            <img src="./img/banner1.png" className="img-fluid" alt="Banner 1" />
                            <img src="./img/banner2.png" className="img-fluid" alt="Banner 2" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="icon">
                <div className="container py-3">
                    <div className="row pt-5">
                        <div className="col-lg-7 m-auto">
                            <div className="row text-center">
                                <div className="col-lg-3">
                                    <Link href={'/products?category=Phone'}><img src="./img/logoIP.png" className="img-fluid" /></Link>
                                    <h6>Điện thoại</h6>
                                </div>
                                <div className="col-lg-3">
                                    <Link href={'/products?category=Tablet'}><img src="./img/logoIpad.png" className="img-fluid" /></Link>
                                    <h6>Tablet</h6>
                                </div>
                                <div className="col-lg-3">
                                    <Link href={'/products?category=Laptop'}><img src="./img/logoMac.png" className="img-fluid" /></Link>
                                    <h6>Laptop</h6>
                                </div>
                                <div className="col-lg-3">
                                    <Link href={'/products?category=Smartwatch'}><img src="./img/logoApW.png" className="img-fluid" /></Link>
                                    <h6>Đồng hồ thông minh</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carousel;