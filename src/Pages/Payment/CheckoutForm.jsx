import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { FaMoneyBill } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';
import UseCart from '../../hooks/UseCart';
import UseAuth from '../../hooks/UseAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxios();
    const { user } = UseAuth();
    const [cart, refetch] = UseCart();
    const  navigate = useNavigate();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                    console.log(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message)
        }
        else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        //payment confirm 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error', confirmError);
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                 
                setTransactionId(paymentIntent.id);

                // now save the payment in the database 
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert . 
                    cartIds: cart.map(item => item._id),
                    menuIds: cart.map(item => item.menuId),
                    status: 'pending'

                }
                const res = await axiosSecure.post('/payments', payment);
                console.log('payment save', res.data);
                refetch();
                if(res.data?.result?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "thanks for your payment",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/dashboard/history')
                }
            }
        }

    }




    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn mt-8 btn-lg text-xl bg-orange-400  hover:bg-orange-500' type="submit" disabled={!stripe || !clientSecret}>
                <FaMoneyBill></FaMoneyBill> Pay
            </button>
            <p className='text-red-500'>{error}</p>
            {
                transactionId && <p className='text-green-500'>Your transaction id: {transactionId}</p>
            }
        </form>
    );
};

export default CheckoutForm;