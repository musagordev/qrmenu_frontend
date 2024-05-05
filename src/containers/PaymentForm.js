import React, { useState, useContext } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { Form,Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import { createPaymentIntent } from '../apis';
import AuthContext from '../contexts/AuthContext';

const PaymentForm = ({amount, items, onDone, color}) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const auth = useContext(AuthContext);
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      setLoading(true);
      const json = await createPaymentIntent({
        payment_method: paymentMethod,
        amount,
        place: params.id,
        table: params.table,
        detail: items
      }, auth.token);

      if (json?.success) {
        toast(`Your order #${json.order} is processing`, {type: "success"});
        onDone();
        setLoading(false);
      } else if (json?.error) {
        toast(json.error, {type: "error"});
        setLoading(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <Button variant='standard' style={{backgroundColor: color}} className='mt-4' block type='submit' disabled={loading}>
        {loading ? "Processing..." : "Pay"}
      </Button>
    </Form>
  );
};

const stripePromise = loadStripe('pk_test_51P3HMyDzO7V1oBUxHfBRhnzajHWLtZsX3kKQOMnkMI7zBSFnNVkz4q6Ud8MKcUABswf1rTHJMwYMyJb9cCAzrGmE00J3Ilvhh7');

const StripeContext = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...props} />
  </Elements>
);

export default StripeContext;