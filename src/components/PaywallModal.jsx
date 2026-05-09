import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

export default function PaywallModal({ opp, onClose }) {
  const { user, login, subscribe } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: tokenResponse => {
      login({ name: "Trader", token: tokenResponse.access_token });
      handlePayment(); // Auto trigger payment after login
    },
    onError: () => console.log('Login Failed'),
  });

  const handlePayment = () => {
    if (!user) {
      handleGoogleLogin();
      return;
    }
    
    // Trigger Razorpay
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use Environment Variable
      amount: "3000", // ₹30 in paise
      currency: "INR",
      name: "Mandiarb Premium",
      description: "Monthly Subscription",
      handler: function (response) {
        // Payment success
        subscribe();
        onClose();
        navigate('/analytics', { state: { opp } });
      },
      prefill: {
        name: user.name,
      },
      theme: {
        color: "#475b4c" // primary color
      }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-fade-in border border-outline-variant/30">
        <button onClick={onClose} className="absolute top-4 right-4 text-outline hover:text-on-surface bg-surface-container rounded-full p-1 z-10">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
        
        <div className="bg-primary-container p-6 text-center border-b border-primary/20">
          <span className="material-symbols-outlined text-[48px] text-primary mb-2">lock</span>
          <h2 className="font-headline-md text-on-primary-container">Premium Opportunity Locked</h2>
          <p className="font-body-sm text-primary mt-1">Unlock this highly profitable arbitrage trade.</p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Option 1: Subscribe */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-primary/30 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-headline-sm text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                Monthly Pass
              </h3>
              <span className="font-headline-sm text-primary">₹30<span className="text-xs font-normal">/mo</span></span>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-4">Unlimited access to all arbitrage deals across India. No ads, ever.</p>
            <button 
              onClick={handlePayment} 
              className="w-full py-3 bg-primary text-on-primary rounded-lg font-bold shadow hover:opacity-90 active:scale-95 transition-all flex justify-center items-center gap-2"
            >
              {user ? "Pay via Razorpay" : "Login & Subscribe"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
