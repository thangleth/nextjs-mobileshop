"use client";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartslice";
import { useState } from "react";
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function DetailPage({ params }) {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    console.log(cart);
    const { data: product, error, isLoading } = useSWR(`http://localhost:3003/productdetail/${params.id}`, fetcher,
        {
            refreshInterval: 6000,
        }
    );

    if (error) return <div>Lỗi load dữ liệu.</div>;
    if (isLoading) return <div>Đang tải</div>;

    return (
        // <div className="container mt-3">
        //     <div className="row">
        //         <div className="col-6 px-4">
        //             <img className="img-fluid" src={`http://localhost:3003/img/${product.image}`} />
        //         </div>
        //         <div className="col-6">
        //             <h3>Chi tiết sản phẩm</h3>
        //             <h4>{product.name}</h4>
        //             <p>Giá khởi điểm: {product.price}</p>
        //             <input className="form-control w-25" min="1" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        //             <button className="btn btn-primary my-2" onClick={() => dispatch(addToCart({ item: product, quantity: quantity }))}>
        //                 Thêm vào giỏ hàng
        //             </button>
        //             <h4>Mô tả: </h4>
        //             <p>{product.description}</p>
        //         </div>
        //     </div>
        // </div>
        <>
            <section className="container detail my-5 pt-1">
                <div className="row mt-5">
                    <div className="col-lg-5 col-md-12 col-12">
                        <img className="img-fluid" src={`http://localhost:3003/img/${product.image}`} />

                        {/* <div className="small-img-group">
                            <div className="small-img-col">
                                <img src="img/iphone11.webp" width="100%" alt="" />
                            </div>
                            <div className="small-img-col">
                                <img src="img/iphone11.webp" width="100%" alt="" />
                            </div>
                            <div className="small-img-col">
                                <img src="img/iphone11.webp" width="100%" alt="" />
                            </div>
                            <div className="small-img-col">
                                <img src="img/iphone11.webp" width="100%" alt="" />
                            </div>
                        </div> */}
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                        <h6>Home / Iphone</h6>
                        <h3>{product.name}</h3>
                        <h2>${product.price}</h2>
                        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                        <button className="btn0 mb-5" onClick={() => dispatch(addToCart({ item: product, quantity: quantity }))}>Thêm giỏ hàng</button>
                        <p>ƯU ĐÃI THANH TOÁN</p>
                        <ul>
                            <li>Thanh toán qua VNPAY giảm thêm tới 200.000đ</li>
                            <li>Giảm 1% tối đa 100.000đ khi thanh toán qua Zalopay</li>
                            <li>Giảm 50% tối đa 700k khi mở thẻ tín dụng Vpbank trên SenID</li>
                            <li>Giảm 20% tối đa 500k khi mở thẻ tín dụng TPBank EVO</li>
                            <li>Mở thẻ tín dụng VIB - Nhận Voucher 600.000đ</li>
                            <li>Giảm 5% không giới hạn khuyến mãi qua Homepaylater</li>
                        </ul>
                        <p>ƯU ĐÃI ĐI KÈM</p>
                        <li>Thu cũ đổi mới lên đời điện thoại Android & Máy tính bảng, tiết kiệm tới 20 triệu đồng</li>
                        <li>Ưu đãi tặng Sim Mobifone Hera & Key bản quyền Office 365 A3 khi mua điện thoại tại Hoàng Hà Mobile
                        </li>
                        <li>Giảm thêm 100.000đ cho tất cả các sản phẩm màn hình khi mua kèm Laptop, MacBook, Máy tính bảng và
                            Điện thoại.</li>
                    </div>
                </div>
            </section>

            <section className="relate-product">
                <div className="container py-3">
                    <div className="row py-5">
                        <div className="col-lg-5 m-auto text-center">
                            <h1>SẢN PHẨM LIÊN QUAN</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 text-center">
                            <div className="card border-0 bg-light mb-2">
                                <div className="card-body">
                                    <img src="./img/iphone11.webp" alt="" className="img-fluid" />
                                </div>
                            </div>
                            <h6>Iphone 11</h6>
                            <p>$99</p>
                            <button className="btn0">Thêm giỏ hàng</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};