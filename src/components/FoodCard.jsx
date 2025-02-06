import React from 'react';
import UseAuth from '../hooks/UseAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxios from '../hooks/useAxios';
import UseCart from '../hooks/UseCart';

const FoodCard = ({ item }) => {
    const { user } = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxios();
    const [, refetch] = UseCart();

    const { name, image, price, recipe, _id } = item;

    const handleAddToCart = () => {
        if (user && user.email) {
            console.log(user.email);

            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image, 
                price
            }

            axiosSecure.post('/carts', cartItem)
            .then(res => {
                console.log(res.data);
                if(res.data.insertedId){
                    Swal.fire({
                        icon: "success",
                        title: `${name} added to the cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });  
                    //   refetch cart to update the cart items count
                      refetch();
                }
            })
            

        }
        else {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login !"
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/login', {from: location})
                }
              });
        }
    }

    return (
        <div className="card  bg-base-300 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <p>Price: ${price}</p>
                <div className="card-actions justify-end">
                    <button onClick={ handleAddToCart} className='btn btn-outline border-0 text-black border-orange-400 bg-slate-100 border-b-4'>Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;