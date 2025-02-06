import React from 'react';
import UseAuth from '../../hooks/UseAuth';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const {user} = UseAuth();
    console.log(user.email);
    const axiosSecure = useAxios();

    const {data: payments = []} = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res =  await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    })
    return (
        <div>
            <h1 className='text-2xl '>Total Payments: {payments.length}</h1>

            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>NO.</th>
        <th>Price</th>
        <th>Transaction ID</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {payments.map((payment, index) => <tr key={payment._id}>
        <th>{index+1}</th>
        <td>{payment.price}</td>
        <td>{payment.transactionId}</td>
        <td>{payment.status}</td>
      </tr>)}
      
    </tbody>
  </table>
</div>
            </div>
        </div>
    );
};

export default PaymentHistory;