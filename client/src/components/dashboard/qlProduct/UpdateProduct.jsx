import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from "../../../api";
import ic_add from '../../../assets/icon/ic_add.svg';
import { toast } from 'react-toastify';
const UpdateProduct = () => {
    const { id } = useParams();
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const urlImage = process.env.REACT_APP_API_BASE_URL + "/";
    const [previewImages, setPreviewImages] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        prices: '',
        quantity: '',
        brands_id: '',
        product_categories_id: '',
        details: [{ name: '', description: '' }],
        galeries: [{ thumbnail: null, description: '' }],
    });

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
        if (id) {
            api.get(`/product/${id}`).then((response) => {
                setProduct(response.data);
                const productData = response.data;
                const img = urlImage + productData.image;
                const initialPreviewImages = productData.galeries.map(galery => urlImage + galery.thumbnail);
                const listImg = productData.galeries.map(galery => galery.thumbnail);
                setPreviewImages(initialPreviewImages);
                setPreviewImage(img);

            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleDetailChange = (index, e) => {
        const { name, value } = e.target;
        const newDetails = [...product.details];
        newDetails[index][name] = value;
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
            newGaleries[index][name] = files[0];

            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages((prevPreviewImages) => {
                    const newPreviewImages = [...prevPreviewImages];
                    newPreviewImages[index] = reader.result;
                    return newPreviewImages;
                });

            };
            reader.readAsDataURL(file);
        } else {
            newGaleries[index][name] = value;
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
    const [img, setImage] = useState(null);
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
        if (img) {
            const requestData = {
                name: product.name,
                description: product.description,
                prices: product.prices,
                quantity: product.quantity,
                brands_id: product.brands_id,
                product_categories_id: product.product_categories_id,
                details: product.details,
                galeries: product.galeries,
                image: img
            };
            api.post(`/updateproduct/${id}`, requestData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    navigate('/admin/showProduct');
                }).catch((error) => {
                    toast.error('Lỗi cập nhật sản phẩm');
                });
        } else {
            const requestData = {
                name: product.name,
                description: product.description,
                prices: product.prices,
                quantity: product.quantity,
                brands_id: product.brands_id,
                product_categories_id: product.product_categories_id,
                details: product.details,
                galeries: product.galeries
            };
            api.post(`/updateproduct/${id}`, requestData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    navigate('/admin/showProduct');
                }).catch((error) => {
                    toast.error('Lỗi cập nhật sản phẩm');
                });
        }

    };
    const handleSubmit2 = (e) => {
        e.preventDefault();
        const formData2 = new FormData();
        formData2.append('products_id', id);
        product.galeries.forEach((galery, index) => {
            formData2.append(`galeries[${index}][thumbnail]`, galery.thumbnail);
            formData2.append(`galeries[${index}][description]`, galery.description);
        });
        console.log('Request data:', Object.fromEntries(formData2.entries()));
        api.post('/galery', formData2, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log('galery created:');
                toast.success('Lưu thành công danh sách ảnh');

            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    toast.error(' Lỗi lưu danh sách ảnh');
                } else {
                    toast.error(' Lỗi lưu danh sách ảnh');
                    console.error('There was an error creating the product!', error);
                }
            });
    };
    return (
        <>
            <div className="title">
                <span>Sửa sản phẩm</span>

                <Link className="link-add" to="/admin/showProduct">
                    Quay lại</Link>
            </div>
            <div className='form-addProduct'>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className='form-left'>
                    <div>
                        <label>Tên sản phẩm</label>
                        <input className='name' required type="text" name="name" value={product.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Mô tả</label>
                        <textarea className='description' required name="description" value={product.description} onChange={handleChange}></textarea>
                    </div>
                    <div className='col-lab'>
                        <div>
                            <label>Giá</label>
                            <input type="number" name="prices" required value={product.prices} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Số lượng</label>
                            <input type="number" name="quantity" required value={product.quantity} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='col-lab'>
                        <div>
                            <label>Thương hiệu</label> &nbsp;
                            <select name="brands_id" required value={product.brands_id} onChange={handleChange}>

                                {brands.map(brand => (
                                    <option key={brand.brands_id} value={brand.brands_id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Danh mục</label>&nbsp;
                            <select name="product_categories_id" required value={product.product_categories_id} onChange={handleChange}>
                                {categories.map(brand => (
                                    <option key={brand.product_categories_id} value={brand.product_categories_id}>{brand.category_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* <div>
                        <label>Ảnh sản phẩm</label> <br />
                        <input type="file" name="image" onChange={handleImageChange} />
                    </div> */}
                    <div>
                        <div className='title'>
                            <h3>Chi tiết sản phẩm</h3>
                            <button className='btn-addDetails' type="button" onClick={addDetail}> <img src={ic_add} alt="" style={{ width: '18px' }} /> Add Detail</button>
                        </div>
                        {product.details.map((detail, index) => (
                            <div key={index} className='details-product'>
                                <input type="text" placeholder="Thông số" required name="name" value={detail.name} onChange={(e) => handleDetailChange(index, e)} /> &nbsp;
                                <textarea name="description" required rows="4" cols="50" placeholder="Mô tả" value={detail.description} onChange={(e) => handleDetailChange(index, e)} />&nbsp;
                                <button type="button" className='btn-delete' onClick={() => removeDetail(index)}>xóa</button>
                            </div>
                        ))}
                    </div>

                    <div className='btn-submit'>
                        <button type="submit">Sửa sản phẩm</button>
                    </div>
                </form>
                <form onSubmit={handleSubmit2} className='form-right'>
                    <div className='show-img'>
                        {previewImage && (
                            <img src={previewImage} alt="Preview" />
                        )}
                        <div className='list-img'>
                            {product.galeries.map((src, index) => (
                                previewImages[index] && <img src={typeof previewImages[index] === 'string' ? previewImages[index] : URL.createObjectURL(previewImages[index])} alt={`Preview ${index}`} width="200" />
                            ))}
                        </div>
                    </div>
                    <div className='title'>
                        <h3>Thêm ảnh</h3>
                        <button type="button" onClick={addGalery}> <img src={ic_add} alt="" style={{ width: '18px' }} />Thêm ảnh</button>
                    </div>
                    {product.galeries.map((galery, index) => (
                        <div key={index} className='galery'>
                            <input type="file" name="thumbnail" required onChange={(e) => handleGaleryChange(index, e)} />
                            <div className='details-product'>
                                <textarea name="description" required style={{ width: '80%' }} placeholder="Alt" value={galery.description} onChange={(e) => handleGaleryChange(index, e)} />
                                <button type="button" className='btn-delete' onClick={() => removeGalery(index)}>xoá</button>
                            </div>
                        </div>
                    ))}
                    <div className='btn-submit'>
                        <button type="submit">Lưu danh sách ảnh</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateProduct;
