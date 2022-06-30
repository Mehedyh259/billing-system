
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'


const UpdateBillModal = ({ billInfo, setBillInfo, refetch }) => {

    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = async (data) => {

        try {
            const bill = {
                full_name: data.name,
                phone: data.phone,
                email: data.email,
                paid_amount: data.amount
            }
            const { data: response } = await axios.put(`https://billing-system-1542.herokuapp.com/api/update-billing/${billInfo._id}`, bill, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            if (response.modifiedCount) {
                toast.success('bill updated successfully')
                refetch();
                setBillInfo(false)
            }

        } catch (error) {
            const status = error.response.status;
            if (status === 401 || status === 403) {
                navigate('/login');
                toast.error(error.response?.data?.message);
                localStorage.removeItem('accessToken');
                setBillInfo(false);
            }
        }

    }

    return (
        <>
            <input type="checkbox" id="updatebill-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label onClick={() => setBillInfo(null)} htmlFor="updatebill-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-xl">Update Bill</h3>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* email input */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Name is Required'
                                    }
                                }
                                )}
                                defaultValue={billInfo.full_name}
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full max-w-md"
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
                        {/* email input */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                                        message: 'Valid Email is needed'
                                    }
                                }
                                )}
                                defaultValue={billInfo.email}
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-md"
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        {/* phone input */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                                {...register("phone", {
                                    required: {
                                        value: true,
                                        message: 'phone is Required'
                                    },
                                    minLength: {
                                        value: 11,
                                        message: "Must be 11 characters or longer"
                                    }
                                }
                                )}
                                defaultValue={billInfo.phone}
                                type="number"
                                placeholder="Your phone"
                                className="input input-bordered w-full max-w-md"
                            />
                            <label className="label">
                                {errors.phone?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                                {errors.phone?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                            </label>
                        </div>
                        {/* amount input */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Bill Amount</span>
                            </label>
                            <input
                                {...register("amount", {
                                    required: {
                                        value: true,
                                        message: 'Paid amount is Required'
                                    }
                                }
                                )}
                                defaultValue={billInfo.paid_amount}
                                type="number"
                                min={0}
                                step="any"
                                placeholder="Your Bill amount"
                                className="input input-bordered w-full max-w-md"
                            />
                            <label className="label">
                                {errors.amount?.type === 'required' && <span className="label-text-alt text-red-500">{errors.amount.message}</span>}
                            </label>
                        </div>

                        <input type="submit" value={'Update Bill'} className='btn btn-primary text-white w-full max-w-md mt-3' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateBillModal;