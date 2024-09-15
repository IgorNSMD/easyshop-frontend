import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'

const load = async () => {
    return await loadStripe('pk_test_51PyeE8GrU4qih9yF3KuteywuL5hsSvCn0bdk6lu25S3qXHzsNksdVC3wOVcU6h01JTtPWI7sDPVpXqvBZSuGmaeN00HtCm08K6')
}

const ConfirmOrder = () => {

    const [loader, setLoader] = useState(true)
    const [stripe, setStripe] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (!stripe) {
            return
        }
        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')
        if (!clientSecret) {
            return
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch(paymentIntent.status){
                case "succeeded":
                    setMessage('succeeded')
                    break
                    case "processing":
                    setMessage('processing')
                    break
                    case "requires_payment_method":
                    setMessage('failed')
                    break
                    default:
                    setMessage('failed')

            }
        })
    },[stripe])

    const get_load = async () => {
        const tempStripe = await load()
        setStripe(tempStripe)
    }
    
    useEffect(() => {
        get_load()
    },[])


    return (
        <div>
            Confirm order.....
        </div>
    );
};

export default ConfirmOrder;