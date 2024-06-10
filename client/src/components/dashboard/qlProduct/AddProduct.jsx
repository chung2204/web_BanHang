import React, { useState, useEffect } from 'react';
import api from "../../../api";
import ic_add from '../../../assets/icon/ic_add.svg';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    const [previewListImages, setPreviewListImages] = useState([]);
    useEffect(() => {
        api.get('/brand')
            .then(response => {
                setBrands(response.data);
            })
            .catch(error => {
                console.error('Error fetching brands:', error);
            });

        api.get('/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        prices: '',
        quantity: '',
        brands_id: '',
        product_categories_id: '',
        details: [{ name: '', description: '' }],
        galeries: [{ thumbnail: null, description: '' }]
    });
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleDetailChange = (index, e) => {
        const { name, value } = e.target;
        const newDetails = product.details.map((detail, i) => (
            i === index ? { ...detail, [name]: value } : detail
        ));
        setProduct((prevProduct) => ({
            ...prevProduct,
            details: newDetails,
        }));
    };

    const addDetail = () => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            details: [...prevProduct.details, { name: '', description: '' }],
        }));
    };

    const removeDetail = (index) => {
        const newDetails = product.details.filter((_, i) => i !== index);
        setProduct((prevProduct) => ({
            ...prevProduct,
            details: newDetails,
        }));
    };

    const handleGaleryChange = (index, e) => {
        const { name, value, files } = e.target;
        const newGaleries = product.galeries.map((galery, i) => (
            i === index ? { ...galery, [name]: files ? files[0] : value } : galery
        ));

        setProduct((prevProduct) => ({
            ...prevProduct,
            galeries: newGaleries,
        }));
        if (name === 'thumbnail' && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                // setPreviewListImages((prevPreviewListImages) => [
                //     ...prevPreviewListImages,
                //     reader.result,
                // ]);
                setPreviewListImages((prevPreviewListImages) => {
                    const newPreviewImages = [...prevPreviewListImages];
                    newPreviewImages[index] = reader.result;
                    return newPreviewImages;
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const addGalery = () => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            galeries: [...prevProduct.galeries, { thumbnail: null, description: '' }],
        }));
    };

    const removeGalery = (index) => {
        const newGaleries = product.galeries.filter((_, i) => i !== index);
        setProduct((prevProduct) => ({
            ...prevProduct,
            galeries: newGaleries,
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        const { name, value, files } = e.target;
        if (name === 'image' && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('prices', product.prices);
        formData.append('quantity', product.quantity);
        formData.append('brands_id', product.brands_id);
        formData.append('product_categories_id', product.product_categories_id);
        if (image) {
            formData.append('image', image);
        }
        product.details.forEach((detail, index) => {
            formData.append(`details[${index}][name]`, detail.name);
            formData.append(`details[${index}][description]`, detail.description);
        });
        product.galeries.forEach((galery, index) => {
            formData.append(`galeries[${index}][thumbnail]`, galery.thumbnail);
            formData.append(`galeries[${index}][description]`, galery.description);
        });
        console.log('Request data:', Object.fromEntries(formData.entries()));
        api.post('/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log('Product created:', product);
                setProduct({
                    name: '',
                    description: '',
                    prices: '',
                    quantity: '',
                    brands_id: '',
                    product_categories_id: '',
                    details: [{ name: '', description: '' }],
                    galeries: [{ thumbnail: null, description: '' }],
                });
                setImage(null);
                navigate('/admin/showProduct');

            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    setErrors(error.response.data.errors);
                    toast.error(`Sản phẩm đã tồn tại`);
                } else {
                    toast.error(`Sản phẩm đã tồn tại`);
                }
            });
    };

    return (
        <>
            <div className="title">
                <span>Thêm sản phẩm</span>

                <Link className="link-add" to="/admin/showProduct">
                    Quay lại</Link>
            </div>
            <form onSubmit={handleSubmit} className='form-addProduct'>
                <div className='form-left'>
                    <h3>Sản phẩm</h3>
                    <div>
                        <label>Tên sản phẩm</label> <br />
                        <input className='name' type="text" name="name" value={product.name} onChange={handleChange} required />

                    </div>
                    <div>
                        <label>Mô tả</label> <br />
                        <textarea className='description' name="description" value={product.description} onChange={handleChange} required />

                    </div>
                    <div className='col-lab'>
                        <div>
                            <label>Giá tiền</label> <br />
                            <input type="number" name="prices" value={product.prices} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Số lượng</label> <br />
                            <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='col-lab'>
                        <div>
                            <label>Thương hiệu :</label> &nbsp;
                            <select name="brands_id" required value={product.brands_id} onChange={handleChange}>
                                <option value="" selected>Chọn thương hiệu</option>
                                {brands.map(brand => (
                                    <option key={brand.brands_id} value={brand.brands_id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Danh mục : </label> &nbsp;
                            <select name="product_categories_id" required value={product.product_categories_id} onChange={handleChange}>
                                <option value="" selected>Chọn danh mục</option>
                                {categories.map(brand => (
                                    <option key={brand.product_categories_id} value={brand.product_categories_id}>{brand.category_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>Ảnh sản phẩm</label> <br />
                        <input type="file" name="image" onChange={handleImageChange} required />

                    </div>
                    <div className='title'>
                        <h3>Chi tiết sản phẩm</h3>
                        <button className='btn-addDetails' type="button" onClick={addDetail}> <img src={ic_add} alt="" style={{ width: '18px' }} /> Add Detail</button>
                    </div>
                    {product.details.map((detail, index) => (
                        <div key={index} className='details-product'>
                            <input type="text" name="name" placeholder="Thông số" value={detail.name} onChange={(e) => handleDetailChange(index, e)} required /> &nbsp;

                            <textarea name="description" rows="4" cols="50" placeholder="Mô tả" value={detail.description} onChange={(e) => handleDetailChange(index, e)} required />&nbsp;

                            <button type="button" className='btn-delete' onClick={() => removeDetail(index)}>xóa</button>
                        </div>
                    ))}

                    <div className='btn-submit'>
                        <button type="submit">Thêm sản phẩm</button>
                    </div>
                </div>
                <div className='form-right'>
                    <div className='show-img'>
                        {previewImage && (
                            <img src={previewImage} alt="Preview" />
                        )}
                        <div className='list-img'>
                            {previewListImages.map((src, index) => (
                                <img key={index} src={src} alt={`Preview ${index}`} width="200" />
                            ))}
                        </div>

                    </div>
                    <div className='title'>
                        <h3>Thêm ảnh</h3>
                        <button type="button" onClick={addGalery}> <img src={ic_add} alt="" style={{ width: '18px' }} />Thêm ảnh</button>
                    </div>
                    {product.galeries.map((galery, index) => (
                        <div key={index} className='galery'>
                            <input type="file" name="thumbnail" onChange={(e) => handleGaleryChange(index, e)} required />
                            <div className='details-product'>
                                <textarea name="description" required style={{ width: '80%' }} placeholder="Alt " value={galery.description} onChange={(e) => handleGaleryChange(index, e)} />

                                <button type="button" className='btn-delete' onClick={() => removeGalery(index)}>Xoá</button>
                            </div>
                        </div>
                    ))}

                </div>
            </form>
        </>
    );
};

export default AddProduct;
