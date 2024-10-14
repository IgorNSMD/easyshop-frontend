import React, { useState } from 'react';
import { PaymentElement,LinkAuthenticationElement,useStripe,useElements } from '@stripe/react-stripe-js' 

const CheckoutForm = ({orderId}) => {
    const baseURL = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL_SERVER
    : process.env.REACT_APP_BASE_URL_LOCAL

    localStorage.setItem('orderId',orderId)
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const paymentElementOptions = {
        layout: 'tabs' // Corregido: 'loyout' → 'layout'
    }

    const submit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        setIsLoading(true)
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${baseURL}/order/confirm`
            } 
        })
        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage(error.message)
        } else {
            setMessage('An Unexpected error occured')
        }
        setIsLoading(false)
    }


    return (
        <form onSubmit={submit} id='payment-form'>
            <LinkAuthenticationElement id='link-authentication-element'/>
            <PaymentElement id='payment-element' options={paymentElementOptions} />

            <button disabled={isLoading || !stripe || !elements} id='submit' className='px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'>
                <span id='button-text'>
                    {
                        isLoading ? <div>Loading...</div> : "Pay Now"
                    }
                </span> 
            </button>
               {message && <div>{message}</div>}
        </form>
    );
};

export default CheckoutForm;