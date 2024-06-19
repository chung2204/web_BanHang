import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import api from "../../../api";
import { toast } from 'react-toastify';
import ic_search from "../../../assets/icon/ic_search.svg";
import ic_edit from "../../../assets/icon/ic_edit.svg";
import ic_delete from "../../../assets/icon/ic_delete.svg";
const ShowBrand = () => {
    const [categories, setCategories] = useState([]);
    const [addcategories, setaddCategories] = useState({ name: "", address: "" });
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setPerPage] = useState(5);

    const [newCategoryName, setNewCategoryName] = useState({ brands_id: "", name: "", address: "" });
    const [inpUpdate, setinpUpdate] = useState(true);
    const [formAdd, setFormAdd] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, [searchTerm]);
    const fetchCategories = () => {
        api.get('/brand', {
            params: { search: searchTerm }
        })
            .then(response => {
                setCategories(response.data);
                setError('');
            })
            .catch(error => {
                console.error(error);
                setError('Error fetching category. Please try again.');
            });
    };

    const deleteUser = (id, categoryName) => {
        if (window.confirm(`Bạn có chắc muốn xoá thương hiệu ${categoryName}?`)) {
            api.delete(`/brand/${id}`)
                .then(() => {
                    // Chỉ cập nhật state nếu xóa thành công
                    setCategories(prevCategories => prevCategories.filter(category => category.brands_id !== id));
                    setError(''); // Clear any previous error
                    toast.success(`Xoá thương hiệu ${categoryName} thành công`);
                })
                .catch(error => {
                    console.error('Error deleting category:', error);
                    if (error.response && error.response.data && error.response.data.error) {
                        setError(error.response.data.error);
                        toast.error(`Lỗi: ${error.response.data.error}`);
                    } else {
                        setError('Lỗi xoá thương hiệu');
                        toast.error('Lỗi xoá thương hiệu');
                    }
                });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setaddCategories({ ...addcategories, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        api.post('/brand', addcategories)
            .then(response => {
                setCategories([...categories, response.data]);
                setaddCategories('');
                toast.success('Thêm thương hiệu thành công');
                setFormAdd(false)
            })
            .catch(error => {
                console.error('Error adding category:', error);
                toast.error('Thương hiệu đã tồn tại');
            });
    };

    const handleSelectChange = (event) => {
        setPerPage(event.target.value);
    };

    const startEditing = (category) => {
        setNewCategoryName({
            brands_id: category.brands_id,
            name: category.name,
            address: category.address
        });
        setError('');
        setinpUpdate(category.name);
    };
    const handleChange2 = (e) => {
        setNewCategoryName({ ...newCategoryName, [e.target.name]: e.target.value });
    };
    const cancelEditing = () => {
        setNewCategoryName('');
        setinpUpdate(true)
    };

    const saveCategory = () => {
        api.put(`/brand/${newCategoryName.brands_id}`, {
            name: newCategoryName.name,
            address: newCategoryName.address
        })
            .then(() => {
                fetchCategories();
                cancelEditing();
                toast.success('Cập nhật thành công');
            })
            .catch(error => {
                console.error('Error updating category:', error);
                toast.error('Cập nhật thất bại');
            });
    };
    const toggleFormAdd = () => {
        setFormAdd(prevFormAdd => !prevFormAdd);
        setaddCategories('');
    };
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = categories.slice(indexOfFirstUser, indexOfLastUser);
    const [stt, setStt] = useState(0);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setStt((pageNumber - 1) * usersPerPage);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    return (
        <>
            {formAdd &&
                <div className="form-addcate" >
                    <form className="form" onSubmit={handleSubmit}>
                        <h3>Thêm xuất xứ</h3>
                        <div className="row-form">
                            <label>
                                <input
                                    className="input"
                                    name="name"
                                    type="text"
                                    value={categories.name}
                                    onChange={handleChange}
                                    required maxLength={100}
                                />
                                <span>Loại</span>
                            </label>
                        </div>
                        <div className="row-form">
                            <label>
                                <input
                                    className="input"
                                    name="address"
                                    type="text"
                                    value={categories.address}
                                    onChange={handleChange}
                                    required maxLength={100}
                                />
                                <span>Địa chỉ</span>
                            </label>
                        </div>
                        <div className="row-formbtn">
                            <button className="submit" type="submit">Thêm xuất xứ</button>
                            <button className="submit" onClick={toggleFormAdd} style={{ backgroundColor: "#fb838a" }}>Huỷ</button>
                        </div>
                    </form>
                </div>
            }
            <div className="title">
                <span>xuất xứ</span>

                <button onClick={toggleFormAdd} className="link-add">
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                        className="component-iconify MuiBox-root css-1t9pz9x iconify iconify--eva" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2"></path>
                    </svg>
                    Thêm xuất xứ</button>
            </div>
            <div className="content">
                <div className="content-top">
                    <div className="search">
                        <img src={ic_search} alt="" />
                        <input
                            type="text"
                            placeholder="Search ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="perpage">
                        Hiển thị &nbsp;
                        <select value={usersPerPage} onChange={handleSelectChange}>
                            <option defaultValue={5}>5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="col-1">STT</th>
                            <th> Loại</th>
                            <th> Địa chỉ</th>
                            <th style={{ textAlign: 'center' }}>Tổng số sản phẩm</th>
                            <th style={{ textAlign: 'center' }}>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((category, index) => (
                            <>
                                <tr key={category.brands_id}>
                                    <th className="col-1" style={{ width: '100px' }}>{stt + index + 1}</th>
                                    {inpUpdate === true ?
                                        <>
                                            <td style={{ width: '280px' }}>{category.name}</td>
                                            <td style={{ maxWidth: '430px' }}>{category.address}</td>
                                        </> :
                                        <>
                                            {inpUpdate === category.name ?
                                                <>
                                                    <td style={{ width: '280px' }}> < input className="inp-update" name="name" type="text" value={newCategoryName.name} onChange={handleChange2} /></td>
                                                    <td> < input style={{ width: "370px" }} className="inp-update" name="address" type="text" value={newCategoryName.address} onChange={handleChange2} /></td>
                                                </>

                                                : <>
                                                    <td>{category.name}</td>
                                                    <td>{category.address}</td>
                                                </>
                                            }
                                        </>
                                    }
                                    <td style={{ width: '250px', textAlign: 'center' }}>{category.products_count}</td>
                                    <th className="act-form">
                                        <div className="btn-update">
                                            {inpUpdate === true ?
                                                <>
                                                    <button onClick={() => startEditing(category)}><img src={ic_edit} alt="" /></button>
                                                    <span>&nbsp;&nbsp;/&nbsp;</span>
                                                </> :
                                                <> {inpUpdate === category.name ?
                                                    <>
                                                        <button style={{ backgroundColor: '#7fff96' }} onClick={saveCategory}>Lưu</button>
                                                        <span>&nbsp;&nbsp;/&nbsp;</span>
                                                        <button style={{ backgroundColor: '#ff7f7f' }} onClick={cancelEditing}>Hủy</button>
                                                        <span>&nbsp;&nbsp;/&nbsp;</span>
                                                    </> : <>
                                                        <button onClick={() => startEditing(category)}><img src={ic_edit} alt="" /></button>
                                                        <span>&nbsp;&nbsp;/&nbsp;</span>
                                                    </>
                                                }</>
                                            }
                                        </div>

                                        <button onClick={() => deleteUser(category.brands_id, category.name)}><img src={ic_delete} alt="" /></button>
                                    </th>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    usersPerPage={usersPerPage}
                    totalUsers={categories.length} // Tổng số người dùng sau khi lọc
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div >

        </>
    );
};
const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
export default ShowBrand;