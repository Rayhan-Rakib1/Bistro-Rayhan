import React from 'react';
import MenuItem from './MenuItem';
import Cover from './Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, coverImg }) => {
    return (
        <div className='mt-16 mb-18'>
             {
                title && coverImg ? (
                    <Cover img={coverImg} title={title}></Cover>
                ) : (
                    <p className="text-center text-gray-500">No cover available</p>
                )
            }
            <div className='grid md:grid-cols-2 gap-5 mt-16'>
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className='flex flex-col items-center mt-10'>
            <Link to={`/order/${title}`}>
            <button className='btn btn-outline border-0 text-black border-b-4'>Order now</button></Link>
            </div>
        </div>
    );
};

export default MenuCategory;