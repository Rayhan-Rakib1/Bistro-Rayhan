import React from 'react';
import './HomePage.css';
import bistroImg from '../../assets/home/chef-service.jpg'

const BistroBoss = () => {
    return (
        <section className="bistro-boss h-full bg-fixed" style={{
            backgroundImage: {bistroImg},
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className="flex flex-col items-center pb-20 py-10 px-6 w-10/12 md:w-6/12 bg-white bg-opacity-90 mx-auto rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="uppercase text-2xl font-bold mb-4">Bistro Boss</h1>
                    <p className="text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dignissimos quos minus earum non neque doloribus, nobis, fugiat laboriosam, sunt possimus! Nostrum, fuga. Culpa ex ipsum, non at nobis saepe!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default BistroBoss;
