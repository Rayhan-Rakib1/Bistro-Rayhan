import React from 'react';
import UseAuth from './UseAuth';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const UseAdmin = () => {
    const {user} = UseAuth();
    const axiosSecure = useAxios();
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, "admin"],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default UseAdmin;