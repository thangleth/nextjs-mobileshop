import React from "react";
import ProductCard from "./component/ProductCard";
import Carousel from "./component/Carousel.jsx";
import News from "./component/News";

export default async function Home() {
  const res = await fetch("http://localhost:3003/products", {
    cache: "no-store",
  });
  const data = await res.json();
  return (
    <>
      <Carousel />
      <div className="hot-product">
        <div className="container py-3">
          <div className="row py-5">
            <div className="col-lg-5 m-auto text-center">
              <h1>NỔI BẬT</h1>
            </div>
          </div>
          <div className="row">

            <div className="row">
              <div className="col-lg-6 text-center m-auto">
                <button className="btn0">Xem Thêm</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="banner">
        <div className="container text-white py-5">
          <div className="row py-5">
            <div className="col-lg-6 px-5">
              <h1 className="font-weight-bold py-3">Ra mắt Iphone mới</h1>
              <h6>Đặt sớm nhận ngay giảm 10%</h6>
              <button className="btn0 mt-3">Mua ngay</button>
            </div>
          </div>
        </div>
      </div>

      <div className="shop">
        <div className="container py-3">
          <div className="row py-5">
            <div className="col-lg-5 m-auto text-center">
              <h1>TẤT CẢ SẢN PHẨM</h1>
            </div>
          </div>
          <div className="row">
            <ProductCard data={data} />
          </div>
        </div>
      </div>
      <News />
    </>
  );
}

