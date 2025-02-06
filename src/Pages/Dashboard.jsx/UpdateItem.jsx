import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import useAxios from '../../hooks/useAxios';
import { FaUtensils } from 'react-icons/fa';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { register, handleSubmit, reset } = useForm();

    const {name, recipe, price, category, _id} = useLoaderData();
 
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = useAxios();

    const onSubmit = async (data) => {
        console.log(data);

        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            // 
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            if (menuRes.data.modifiedCount > 0) {
                // show  success pop up
                // reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} updated to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            console.log(menuRes.data);
        }

        console.log('with image url', res.data);
    }
    return (
        <div>
            <SectionTitle heading={'update an item'} subHeading={'refresh info'}></SectionTitle>

            <div className=''>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Recipe Name*</span>
                            </div>
                            <input  {...register("name", { required: true })} type="text" 
                            defaultValue={name} placeholder="Recipe name" className="input input-bordered w-full" />
                        </label>
                    </div>
                    {/* -------------------------- */}
                    <div className='flex justify-between items-center my-5 gap-5'>
                        {/* category */}
                        <div className='w-full'>
                            <div className="label">
                                <span className="label-text">Category</span>
                            </div>
                            <select defaultValue={category} {...register('category', { required: true })} className="select select-bordered w-full ">

                                <option disabled value={'default'}>select a category</option>
                                <option value='salad'>Salad</option>
                                <option value='pizza'>Pizza</option>
                                <option value='soup'>Soup</option>
                                <option value='dessert'>Dessert</option>
                                <option value='drinks'>Drinks</option>
                            </select>
                        </div>
                        {/* price */}
                        <div className='w-full'>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Price</span>
                                </div>
                                <input defaultValue={price}  {...register("price", { required: true })} type="text" placeholder="price" className="input input-bordered w-full" />
                            </label>
                        </div>

                    </div>
                    {/* recipe details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe details</span>
                        </div>
                        <textarea defaultValue={recipe} {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Recipe details"></textarea>

                    </label>

                    <div className='form-control w-full my-6'>
                        <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className='btn bg-orange-500 text-white hover:bg-orange-600'> Update menu items<FaUtensils></FaUtensils></button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;