'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../component/ProductCard';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption, setSortOption] = useState('asc');

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch('http://localhost:3003/products');
            const newProducts = await res.json();
            setProducts(newProducts);
        }
        async function fetchCategories() {
            const res = await fetch('http://localhost:3003/category');
            const categoryData = await res.json();
            setCategories(categoryData);
        }
        fetchProducts();
        fetchCategories()
    }, []);

    const handleSort = (products) => {
        return [...products].sort((a, b) => {
            if (sortOption === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
    }

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    }
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }

    const filteredProducts = products.filter(product =>
        selectedCategory === 'all' || product.category === selectedCategory
    );

    const sortedAndFilteredProducts = handleSort(filteredProducts);

    return (
        <div className="container my-3">
            <div>
                <div className=" d-flex justify-content-between mx-1 ">
                    <div className="p-1 w-auto">
                        <h5 className="text-success">DANH SÁCH SẢN PHẨM</h5>
                    </div>
                    <div>
                        <label htmlFor="category">Category: </label>
                        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="all">All Categories</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <select className="form-select w-auto" onChange={handleSortChange}>
                        <option value="asc">Giá tăng dần</option>
                        <option value="desc">Giá giảm dần</option>
                    </select>
                </div>
                <div className="row ">
                    <ProductCard data={sortedAndFilteredProducts} />
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}
