import React from "react";

function News() {
    return (
        <>
            <div className="banner1">
                <div className="row py-5">
                    <img src="./img/banner3.jpg" className="img-fluid" />
                </div>
            </div>

            <div className="news">
                <div className="container py-3">
                    <div className="row py-3">
                        <div className="col-lg-8 m-auto text-center">
                            <h1>TIN TỨC</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <img src="./img/new1.jpg" className="img-fluid mb-3" alt="News 1" />
                            <h5>Huawei thúc đẩy thương mại hóa 5.5G</h5>
                            <p>Huawei dần biến 5.5G thành hiện thực khi giới thiệu hệ sinh thái mới và hợp tác với 6 nhà mạng
                                toàn cầu để triển khai.</p>
                        </div>
                        <div className="col-lg-4">
                            <img src="./img/new2.png" className="img-fluid mb-3" alt="News 2" />
                            <h5>TShop tung nhiều ưu đãi cho sĩ tử trong mùa thi</h5>
                            <p>Sĩ tử cũng có thể nhập mã "FPTSHOP" trực tiếp trên ứng dụng Be để giảm ngay 20% cước phí, tối đa
                                50.000 đồng. Chương trình này áp dụng tại điểm tiếp sức của FPT Shop thuộc khu vực TP HCM.</p>
                        </div>
                        <div className="col-lg-4">
                            <img src="./img/new3.jpg" className="img-fluid mb-3" alt="News 3" />
                            <h5>Vai trò hệ thống camera trong số hóa nhà máy sản xuất</h5>
                            <p>Ngoài chức năng an ninh, hệ thống camera giám sát thông minh có thể hỗ trợ quản lý nhân sự, kiểm
                                soát vận hành dây chuyền, thiết bị và sản phẩm tại nhà máy.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default News;