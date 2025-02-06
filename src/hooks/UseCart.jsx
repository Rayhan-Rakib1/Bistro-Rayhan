import React from 'react';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';

const UseCart = () => {
    //    ten stack query
    const axiosSecure = useAxios();
    const {user} = UseAuth();
    const {refetch,data: cart = []} = useQuery({
        queryKey : ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`)
            return res.data;
        }
    })
    return [cart, refetch];
};

export default UseCart;