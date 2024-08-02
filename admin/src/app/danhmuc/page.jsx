'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";

export default function Categories() {
    const [data, setData] = useState([]);

    const fetchCategories = async () => {
        const res = await fetch("http://localhost:3003/category", {
            cache: 'no-store'
        });
        const newData = await res.json();
        setData(newData)
    }
    useEffect(() => {
        fetchCategories();
    }, []);

    const deleteCategory = async (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
            const res = await fetch(`http://localhost:3003/deleteCategory/${id}`, {
                method: 'DELETE',
            });
            const result = await res.json();
            if (result.message) {
                fetchCategories();
            }
        }
    };
    return (
        <div className="m-3">
            <h2>Quản lý danh mục</h2>
            <Link className="btn btn-dark mb-3" href="/danhmuc/them" >Thêm danh mục</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên danh mục</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((category, index) => (
                        <tr key={category._id}>
                            <td>{index + 1}</td>
                            <td>{category.name}</td>
                            <td>
                                <Link className="btn btn-primary mx-2" href={`/danhmuc/sua/${category._id}`}>Sửa</Link>
                                <button className="btn btn-danger" onClick={() => deleteCategory(category._id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};