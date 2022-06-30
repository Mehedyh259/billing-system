import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'


const DeleteBillModal = ({ deleteBill, setDeleteBill, refetch }) => {
    const navigate = useNavigate();

    const handleDeleteUser = async () => {

        try {
            const { data } = await axios.delete(`https://billing-system-1542.herokuapp.com/api/delete-billing/${deleteBill._id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            if (data.deletedCount) {
                toast.success("Bill Deleted Successfully..!");
                refetch();
                setDeleteBill(null);
            }

        } catch (error) {
            const status = error.response.status;
            if (status === 401 || status === 403) {
                navigate('/login');
                toast.error(error.response?.data?.message);
                localStorage.removeItem('accessToken');
                setDeleteBill(null);
            }
        }

    }


    return (
        <>
            <input type="checkbox" id="deletebill-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative p-5">
                    <label onClick={() => setDeleteBill(null)} htmlFor="deletebill-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold my-10">Do you really want to delete bill</h3>
                    <button onClick={handleDeleteUser} className="btn btn-md btn-error text-white">delete bill</button>
                </div>
            </div>
        </>
    );
};

export default DeleteBillModal;