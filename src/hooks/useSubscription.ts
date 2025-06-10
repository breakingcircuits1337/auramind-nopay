import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from '../config/stripe';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export function useSubscription() {
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async (priceId: string) => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: window.location.origin + '/success',
          cancelUrl: window.location.origin + '/pricing',
        }),
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createCheckoutSession,
  };
}