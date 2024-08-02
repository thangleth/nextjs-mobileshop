'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";

export default function Users() {
    const [data, setData] = useState([]);

    const fetchUsers = async () => {
        const res = await fetch("http://localhost:3003/users", {
            cache: 'no-store'
        });
        const newData = await res.json();
        setData(newData);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteProduct = async (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
            const res = await fetch(`http://localhost:3003/deleteproduct/${id}`, {
                method: 'DELETE',
            });
            const result = await res.json();
            if (result.message) {
                fetchProducts();
            }
        }
    };
    return (
        <div className="m-3">
            <h2>Quản lý người dùng</h2>
            <Link className="btn btn-dark mb-3" href="/sanpham/them" >Thêm người dùng</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Email</th>
                        <th>Ảnh đại diện</th>
                        <th>SĐT</th>
                        <th>Địa chỉ</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.email}</td>
                            <td>
                                <img src={`http://localhost:3003/img/${user.image}`} width='100px' />
                            </td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>
                                <Link className="btn btn-primary mx-2" href={`/sanpham/sua/${user._id}`}>Sửa</Link>
                                <button className="btn btn-danger" onClick={() => deleteProduct(user._id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};