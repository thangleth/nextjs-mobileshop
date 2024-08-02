'use client';
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

export default function AddCategory() {
    const router = useRouter();
    const message = useRef('');
    const error = useRef('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const res = await fetch('http://localhost:3003/addCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        const result = await res.json();
        if (result.error) {
            error.current = result.error;
        } else {
            message.current = result.message;
            router.push('/danhmuc');
        }
    }
    return (
        <>
            <div className="m-3">
                <h2>Thêm danh mục</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group my-2">
                        <label className="form-label">Tên danh mục</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register('name', { required: 'Vui lòng nhập tên danh mục' })}
                        />
                        {errors.name && <div className="text-danger">{errors.name.message}</div>}
                    </div>
                    <button type="submit" className="btn btn-dark my-3">Thêm danh mục</button>
                </form>
                {message.current && <div className="alert alert-success mt-3">{message.current}</div>}
                {error.current && <div className="alert alert-danger mt-3">{error.current}</div>}
            </div>
        </>

    );
}