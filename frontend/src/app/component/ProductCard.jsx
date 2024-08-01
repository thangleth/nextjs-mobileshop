import React from "react";
import Link from "next/link";

function ProductCard(props) {
    return (
        <>
            {props.data.map((product) => {
                const { _id, name, image, price } = product;
                return (
                    <div key={_id} className="col-lg-3 text-center">
                        <div className="card border-0 bg-light mb-3">
                            <Link href={`/sanphamchitiet/${_id}`} className="mt-2" >
                                <div className="card-body">
                                    <img src={`http://localhost:3003/img/${image}`} className="img-fluid" />
                                </div>
                            </Link>
                            <h6>{name}</h6>
                            <p>${price}</p>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ProductCard;