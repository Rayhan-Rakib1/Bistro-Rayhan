import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='mx-auto text-center md:w-4/12 my-8'>
            <p className='text-yellow-600 mb-4'>---{subHeading}---</p>
            <h1 className='text-4xl uppercase border-y-4 py-4'>{heading}</h1>
        </div>
    );
};

export default SectionTitle;