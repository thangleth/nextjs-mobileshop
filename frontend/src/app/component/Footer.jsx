import React from 'react';

const Footer = () => {
    return (
        <footer className="text-white">
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-3">
                        <p> <b>LIÊN HỆ</b></p>
                        <p>Phường Tân Chánh Hiệp, Quận 12</p>
                        <p>Điện thoại : 0987654321</p>
                        <p>Email: TShop&#64;gmail.com</p>
                        <p>Zalo: 0987654321</p>
                    </div>
                    <div className="col-md-3">
                        <p> <b>GIAO HÀNG</b></p>
                        <p>Điện thoại</p>
                        <p>Laptop</p>
                        <p>Ipad</p>
                        <p>Macbook</p>
                    </div>
                    <div className="col-md-3">
                        <p><b>HỖ TRỢ NHANH</b></p>
                        <p>Tư vấn thủ tục: 0987654321</p>
                        <p>Tư vấn nhận tài sản: 0123456789</p>
                        <p>Tư vấn thanh toán : 09274615389</p>
                        <p>Tư vấn vận chuyển: 017380183910</p>
                    </div>
                    <div className="col-md-3">
                        <p> <b>THEO DÕI TShop</b></p>
                        <p className="fs-3"><i className="bi bi-facebook"></i> <i className="bi bi-instagram"></i> <i
                            className="bi bi-twitter"></i> <i className="bi bi-tiktok"></i></p>
                        <img src="https://elise.vn/media/wysiwyg/bocongthuong.png" width="200px" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
