import React, { useEffect, useState } from 'react';
import UseAxiosPublic from './UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useMenu = () => {
    const axiosPublic = UseAxiosPublic();

    //  const [menu, setMenu] = useState([]);
    //  const [loading, setLoading] = useState(true);
    
    //     useEffect(() => {
    //         fetch('https://bistro-boss-server-psi-sand.vercel.app/menu')
    //         .then(res => res.json())
    //         .then(data =>{
    //             setMenu(data)
    //             setLoading(false);
    //         })
    //     }, [])

    const {data: menu = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async() => {
            const result = await axiosPublic.get('/menu');
            return result.data;
        }
    })

    return [menu, loading,  refetch];
};

export default useMenu;