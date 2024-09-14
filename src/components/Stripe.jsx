import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js' 
import { Elements } from '@stripe/react-stripe-js' 
import axios from 'axios';

import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_51PyeE8GrU4qih9yF3KuteywuL5hsSvCn0bdk6lu25S3qXHzsNksdVC3wOVcU6h01JTtPWI7sDPVpXqvBZSuGmaeN00HtCm08K6')

const Stripe = ({ price, orderId }) => {
    const [clientSecret, setClientSecret] = useState('')
    const apperance = {
        theme: 'stripe'
    }
    const options = {
        apperance,
        clientSecret
    }

    return (
        <div className='mt-4'>
            {
                clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                ) : <button className='px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'>Start Payment</button>
            }
        </div>
    );
}; 

export default Stripe;