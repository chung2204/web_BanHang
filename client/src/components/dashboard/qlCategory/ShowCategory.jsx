import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import api from "../../../api";
import { toast } from 'react-toastify';
import ic_search from "../../../assets/icon/ic_search.svg";
import ic_edit from "../../../assets/icon/ic_edit.svg";
import ic_delete from "../../../assets/icon/ic_delete.svg";
const ShowCategory = () => {
    const [categories, setCategories] = useState([]);
    const [addcategories, setaddCategories] = useState("");
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setPerPage] = useState(2);
    const [editingCategory, setEditingCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [abc, setabc] = useState('true');
    const [formAdd, setFormAdd] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, [searchTerm]);
    const fetchCategories = () => {
        api.get('/categories', {
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
        if (window.confirm(`Bạn có chắc muốn xoá danh mục ${categoryName}?`)) {
            api.delete(`/categories/${id}`)
                .then(() => {
                    // Chỉ cập nhật state nếu xóa thành công
                    setCategories(prevCategories => prevCategories.filter(category => category.product_categories_id !== id));
                    setError(''); // Clear any previous error
                    toast.success(`Xoá danh mục ${categoryName} thành công`);
                })
                .catch(error => {
                    console.error('Error deleting category:', error);
                    if (error.response && error.response.data && error.response.data.error) {
                        setError(error.response.data.error);
                        toast.error(`Lỗi: ${error.response.data.error}`);
                    } else {
                        setError('Lỗi xoá danh mục');
                        toast.error('Lỗi xoá danh mục');
                    }
                });
        }
    };
    const addCategory = async (e) => {
        e.preventDefault();
        api.post('/categories', { category_name: addcategories })
            .then(response => {
                setCategories([...categories, response.data]);
                setaddCategories('');
                toast.success('Thêm danh mục thành công');
                setFormAdd(false)
            })
            .catch(error => {
                console.error('Error adding category:', error);
                toast.error('Danh mục đã tồn tại');
            });
    };
    const handleSelectChange = (event) => {
        setPerPage(event.target.value);
    };
    const startEditing = (category) => {
        setEditingCategory(category);
        setNewCategoryName(category.category_name);
        setError('');
        setabc(category.category_name);
    };

    const cancelEditing = () => {
        setEditingCategory(null);
        setNewCategoryName('');
        setabc('true')
    };

    const saveCategory = () => {
        api.put(`/categories/${editingCategory.product_categories_id}`, { category_name: newCategoryName })
            .then(() => {
                fetchCategories();
                cancelEditing();
                toast.success('Cập nhật danh mục thành công');
            })
            .catch(error => {
                console.error('Error updating category:', error);
                toast.error('Tên danh mục đã tồn tại');
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
    };
    return (
        <>
            {formAdd &&
                <div className="form-addcate">
                    <form className="form" onSubmit={addCategory}>
                        <h3>Thêm danh mục</h3>
                        <div className="row-form">
                            <label>
                                <input
                                    className="input"
                                    type="text"
                                    value={addcategories}
                                    onChange={(e) => setaddCategories(e.target.value)}
                                    required maxLength={100}
                                />
                                <span>Tên danh mục</span>
                            </label>
                        </div>
                        <div className="row-formbtn">
                            <button className="submit" type="submit">Thêm danh mục</button>
                            <button className="submit" onClick={toggleFormAdd} style={{ backgroundColor: "#fb838a" }}>Huỷ</button>
                        </div>
                    </form>
                </div>
            }
            <div className="title">
                <span>Danh mục</span>

                <button onClick={toggleFormAdd} className="link-add">
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                        className="component-iconify MuiBox-root css-1t9pz9x iconify iconify--eva" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2"></path>
                    </svg>
                    Thêm danh mục</button>
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
                            <th> Tên danh mục</th>
                            <th style={{ textAlign: 'center' }}>Tổng số sản phẩm</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((category, index) => (
                            <tr key={category.product_categories_id}>
                                <th className="col-1" style={{ width: '100px' }}>{stt + index + 1}</th>
                                <td style={{ width: '250px' }}>
                                    {abc === 'true' ?
                                        category.category_name :
                                        <>
                                            {abc === category.category_name ?
                                                < input className="inp-update" type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
                                                : category.category_name
                                            }
                                        </>
                                    }
                                </td>
                                <td style={{ width: '250px', textAlign: 'center' }}>{category.products_count}</td>
                                <th className="act-form">
                                    <div className="btn-update">
                                        {abc === 'true' ?
                                            <>
                                                <button onClick={() => startEditing(category)}><img src={ic_edit} alt="" /></button>
                                                <span>&nbsp;&nbsp;/&nbsp;</span>
                                            </> :
                                            <>
                                                {abc === category.category_name ?
                                                    <>
                                                        <button style={{ backgroundColor: '#7fff96' }} onClick={saveCategory}>Lưu</button>
                                                        <span>&nbsp;&nbsp;/&nbsp;</span>
                                                        <button style={{ backgroundColor: '#ff7f7f' }} onClick={cancelEditing}>Hủy</button>
                                                        <span>&nbsp;&nbsp;/&nbsp;</span>

                                                    </>
                                                    : <>
                                                        <button onClick={() => startEditing(category)}><img src={ic_edit} alt="" /></button>
                                                        <span>&nbsp;&nbsp;/&nbsp;</span>
                                                    </>
                                                }
                                            </>

                                        }
                                    </div>

                                    <button onClick={() => deleteUser(category.product_categories_id, category.category_name)}><img src={ic_delete} alt="" /></button>
                                </th>
                            </tr>
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
export default ShowCategory;