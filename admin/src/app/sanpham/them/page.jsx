'use client';
import { useRef, useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function AddProduct() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch('http://localhost:3003/category');
            const data = await res.json();
            setCategories(data);
        };
        getCategories();
    }, []);

    const handleSubmit = async (values, { setSubmitting }) => {
        const data = new FormData();
        data.append('name', values.name);
        data.append('price', values.price);
        data.append('description', values.description);
        data.append('categoryId', values.categoryId);

        if (values.image) {
            data.append('image', values.image);
        }

        const res = await fetch('http://localhost:3003/addproduct', {
            method: 'POST',
            body: data,
        });

        const result = await res.json();
        setSubmitting(false);

        if (result.error) {
            alert(result.error);
        } else {
            alert(result.message);
            router.push('/sanpham');
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Vui lòng nhập tên sản phẩm'),
        price: Yup.number().required('Vui lòng nhập giá sản phẩm').positive('Giá phải là số dương'),
        description: Yup.string().required('Vui lòng nhập mô tả sản phẩm'),
        categoryId: Yup.string().required('Vui lòng chọn danh mục'),
        image: Yup.mixed().required('Ảnh là bắt buộc')
    });

    return (
        <Formik
            initialValues={{ name: '', price: '', description: '', categoryId: '', image: null }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ setFieldValue, isSubmitting }) => (
                <Form className="m-3" encType="multipart/form-data">
                    <h2>Thêm sản phẩm</h2>
                    <div className="form-group my-2">
                        <label className='form-label'>Tên sản phẩm</label>
                        <Field type="text" name="name" className="form-control" />
                        <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>
                    <div className="form-group my-2">
                        <label className='form-label'>Giá</label>
                        <Field type="number" name="price" className="form-control" />
                        <ErrorMessage name="price" component="div" className="text-danger" />
                    </div>
                    <div className="form-group my-2">
                        <label className='form-label'>Mô tả</label>
                        <Field as="textarea" name="description" className="form-control" />
                        <ErrorMessage name="description" component="div" className="text-danger" />
                    </div>
                    <div className="form-group my-2">
                        <label className='form-label'>Hình ảnh</label>
                        <input
                            name="image"
                            type="file"
                            className="form-control"
                            onChange={(event) => {
                                if (event.currentTarget.files.length > 0) {
                                    setFieldValue('image', event.currentTarget.files[0]);
                                }
                            }}
                        />
                        <ErrorMessage name="image" component="small" className="text-danger" />
                    </div>
                    <div className="form-group my-2">
                        <label className='form-label'>Danh mục</label>
                        <Field as="select" name="categoryId" className='form-control'>
                            <option value="">Chọn danh mục</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="categoryId" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-dark my-3" disabled={isSubmitting}>
                        {isSubmitting ? 'Đang xử lý...' : 'Thêm sản phẩm'}
                    </button>
                </Form>
            )}
        </Formik>
    );
}
