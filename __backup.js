import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import AddBillModal from '../components/AddBillModal';
import DeleteBillModal from '../components/DeleteBillModal';
import Loading from '../components/Loading';
import UpdateBillModal from '../components/UpdateBillModal';

const Bills = ({ setTotal }) => {

    // for counting how many page will be there
    const [pageCount, setPageCount] = useState(0);
    // this if for current page number
    const [pageNumber, setPageNumber] = useState(0);
    // this is for product limit default is 7
    const [billLimit, setBillLimit] = useState(10);

    const [deleteBill, setDeleteBill] = useState(null)
    const [billInfo, setBillInfo] = useState(null);
    const [addModal, setAddModal] = useState(false)
    const [filterData, setFilterData] = useState([]);
    const [search, setSearch] = useState('');

    const getData = async () => {
        const { data } = await axios.get('https://billing-system-1542.herokuapp.com/api/billing-list');
        return data;
    }

    const { data, isLoading, refetch } = useQuery('bills', async () => getData());

    useEffect(() => {
        if (data) {
            const total = data.reduce((sum, { paid_amount }) => sum + Number(paid_amount), 0);
            setTotal(total)
            // counting page
            const totalPages = Math.ceil(data.length / billLimit);
            setPageCount(totalPages);
        }
    }, [data])



    const filterSearch = (event) => {
        const value = event.target.value;
        setSearch(value)
        if (value !== '') {
            const filter = data.filter(obj => Object.keys(obj).some(key => String(obj[key]).toLowerCase().includes(value.toLowerCase())))
            setFilterData(filter);
        }
    }

    if (isLoading) {
        return <Loading />
    }



    return (
        <div className='mx-5 md:mx-12 my-10'>
            <div className='flex justify-between items-center my-3 p-2 bg-base-200 rounded'>
                <div className="flex items-center">
                    <h1 className="text-xl mr-2">Billings</h1>
                    <input onChange={filterSearch} type="text" placeholder="Search.." class="input input-bordered input-md w-full max-w-md" />

                </div>
                {pageCount}
                <label onClick={() => setAddModal(true)} htmlFor="addbill-modal" className="btn btn-sm">Add New Bill</label>
            </div>
            <div className="overflow-x-auto my-2">
                <table className="table w-full border-collapse border">

                    <thead>
                        <tr>
                            <th className='border border-slate-300'>Billing Id</th>
                            <th className='border border-slate-300'>Full Name</th>
                            <th className='border border-slate-300'>Email</th>
                            <th className='border border-slate-300'>Phone</th>
                            <th className='border border-slate-300'>Paid Amount</th>
                            <th className='border border-slate-300'>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            search.length > 0 ? filterData?.map((dt, index) => {
                                return <tr key={index}>
                                    <td className='border border-slate-300'>{dt._id}</td>
                                    <td className='border border-slate-300'>{dt.full_name}</td>
                                    <td className='border border-slate-300'>{dt.email}</td>
                                    <td className='border border-slate-300'>{dt.phone}</td>
                                    <td className='border border-slate-300'>{dt.paid_amount}</td>
                                    <td className='border border-slate-300'>
                                        <label onClick={() => setBillInfo(dt)} htmlFor='updatebill-modal' className='btn btn-xs'>edit</label> |
                                        <label onClick={() => setDeleteBill(dt)} htmlFor='deletebill-modal' className='btn btn-xs'> delete</label>
                                    </td>
                                </tr>
                            }) :
                                data?.map((dt, index) => {
                                    return <tr key={index}>
                                        <td className='border border-slate-300'>{dt._id}</td>
                                        <td className='border border-slate-300'>{dt.full_name}</td>
                                        <td className='border border-slate-300'>{dt.email}</td>
                                        <td className='border border-slate-300'>{dt.phone}</td>
                                        <td className='border border-slate-300'>{dt.paid_amount}</td>
                                        <td className='border border-slate-300'>
                                            <label onClick={() => setBillInfo(dt)} htmlFor='updatebill-modal' className='btn btn-xs'>edit</label> | <label onClick={() => setDeleteBill(dt)} htmlFor='deletebill-modal' className='btn btn-xs'> delete</label>
                                        </td>
                                    </tr>
                                })
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex items-center">


                <p className="text-lg">Pages: </p>
                <div class="btn-group">
                    {
                        [...Array(pageCount).keys()].map(number => <button key={number} onClick={() => setPageNumber(number)}
                            className={pageNumber === number ? 'btn-active btn' : 'btn'}>

                            {number + 1}
                        </button>)
                    }

                </div>


            </div>
            {
                addModal && <AddBillModal setAddModal={setAddModal} refetch={refetch} />
            }
            {
                billInfo && <UpdateBillModal setBillInfo={setBillInfo} billInfo={billInfo} refetch={refetch} />
            }
            {
                deleteBill && <DeleteBillModal setDeleteBill={setDeleteBill} deleteBill={deleteBill} refetch={refetch} />
            }
        </div>
    );
};

export default Bills;