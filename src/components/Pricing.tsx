import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X, CreditCard, Calendar } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { STRIPE_CONFIG } from '../config/stripe';

interface PricingPlanProps {
  name: string;
  price: { monthly: string; yearly: string };
  description: string;
  features: Array<{ text: string; included: boolean }>;
  popular?: boolean;
  buttonText: string;
  index: number;
  productId: string;
}

const pricingPlans: PricingPlanProps[] = [
  {
    name: "Basic",
    price: { 
      monthly: `$${STRIPE_CONFIG.PRICES.BASIC.MONTHLY}`, 
      yearly: `$${STRIPE_CONFIG.PRICES.BASIC.YEARLY}` 
    },
    description: "Essential assistance for everyday tasks and basic organization.",
    features: [
      { text: "Basic voice interaction", included: true },
      { text: "Simple scheduling assistance", included: true },
      { text: "Standard notification management", included: true },
      { text: "Basic smart home integration", included: true },
      { text: "Limited personalization", included: true },
      { text: "Standard response times", included: true },
      { text: "Proactive assistance", included: false },
      { text: "Deep personalization", included: false },
      { text: "Advanced well-being features", included: false }
    ],
    buttonText: "Start Free Trial",
    productId: "basic_tier",
    index: 0
  },
  {
    name: "Premium",
    price: { 
      monthly: `$${STRIPE_CONFIG.PRICES.PREMIUM.MONTHLY}`, 
      yearly: `$${STRIPE_CONFIG.PRICES.PREMIUM.YEARLY}` 
    },
    description: "Unlock the full potential with advanced AI and personalization.",
    features: [
      { text: "Everything in Basic", included: true },
      { text: "Full voice interaction capabilities", included: true },
      { text: "Intelligent proactive assistance", included: true },
      { text: "Deep personalization engine", included: true },
      { text: "Advanced smart home control", included: true },
      { text: "Enhanced well-being features", included: true },
      { text: "Priority response times", included: true },
      { text: "Unlimited integrations", included: true },
      { text: "Ad-free experience", included: true }
    ],
    popular: true,
    buttonText: "Start Free Trial",
    productId: "premium_tier",
    index: 1
  }
];

const PricingPlan: React.FC<PricingPlanProps> = ({ 
  name, 
  price, 
  description, 
  features, 
  popular, 
  buttonText,
  productId,
  index
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { loading, createCheckoutSession } = useSubscription();

  const handleSubscribe = async () => {
    try {
      const priceId = billingCycle === 'monthly' 
        ? STRIPE_CONFIG.PRODUCTS[productId === 'basic_tier' ? 'BASIC' : 'PREMIUM'].MONTHLY
        : STRIPE_CONFIG.PRODUCTS[productId === 'basic_tier' ? 'BASIC' : 'PREMIUM'].YEARLY;
      
      await createCheckoutSession(priceId);
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden border ${
        popular 
          ? 'border-primary-300 dark:border-primary-700 shadow-lg' 
          : 'border-gray-200 dark:border-gray-700 shadow-sm'
      }`}
    >
      {popular && (
        <div className="bg-primary-600 dark:bg-primary-700 text-white text-center py-1.5 text-sm font-semibold">
          Most Popular
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <CreditCard size={16} />
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Calendar size={16} />
              Yearly
              <span className="text-xs text-success-500">Save 25%</span>
            </button>
          </div>
          
          <div className="flex items-baseline">
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {billingCycle === 'monthly' ? price.monthly : price.yearly}
            </span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">
              /{billingCycle === 'monthly' ? 'month' : 'year'}
            </span>
          </div>
          
          {billingCycle === 'monthly' && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              First month: {name === "Basic" ? "Free" : "$5.55"}
            </p>
          )}
        </div>
        
        <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
        
        <ul className="mt-6 space-y-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                feature.included 
                  ? 'text-success-500 dark:text-success-400' 
                  : 'text-gray-400 dark:text-gray-600'
              }`}>
                {feature.included ? <Check size={16} /> : <X size={16} />}
              </span>
              <span className={`ml-3 text-sm ${
                feature.included 
                  ? 'text-gray-700 dark:text-gray-300' 
                  : 'text-gray-400 dark:text-gray-600'
              }`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        
        <div className="mt-8">
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className={`block w-full px-4 py-2.5 text-sm font-semibold text-center rounded-md ${
              popular
                ? 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
            } transition-colors`}
          >
            {loading ? 'Processing...' : buttonText}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Pricing: React.FC = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Start with a free trial and upgrade anytime. No credit card required to start.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingPlan 
              key={index}
              {...plan}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            All plans include a 30-day money-back guarantee.
            <br className="hidden md:block" />
            Enterprise solutions with custom features are available upon request.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;