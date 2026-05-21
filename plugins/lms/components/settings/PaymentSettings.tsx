'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, DollarSign, Shield } from 'lucide-react';

interface PaymentSettingsProps {
  onDirty: (dirty: boolean, data: any) => void;
  searchQuery?: string;
}

export default function PaymentSettings({ onDirty, searchQuery }: PaymentSettingsProps) {
  const [loading, setLoading] = useState(true);
  const [baseSettings, setBaseSettings] = useState<any>(null);
  const [settings, setSettings] = useState({
    stripePublicKey: '',
    stripeSecretKey: '',
    currency: 'USD',
    enableCoursePricing: true,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings?group=payment');
      const json = await res.json();
      if (json.success) {
        setBaseSettings(json.data);
        setSettings(prev => ({ ...prev, ...json.data }));
      }
    } catch (err) {
      console.error('Failed to fetch settings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (baseSettings) {
      const isDirty = JSON.stringify(baseSettings) !== JSON.stringify(settings);
      onDirty(isDirty, settings);
    }
  }, [settings, baseSettings, onDirty]);

  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          part.toLowerCase() === searchQuery.toLowerCase() 
            ? <mark key={i} className="bg-yellow-200 text-zinc-900 rounded-px px-0.5">{part}</mark> 
            : part
        ))}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="text-zinc-500 font-medium text-sm">Loading Payment Settings...</p>
      </div>
    );
  }

  return (
    <div className="pb-20 animate-in fade-in duration-300">
      <div className="mb-8 border-b border-zinc-200 pb-4">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Payment Settings</h1>
        <p className="text-xs text-zinc-500 font-medium">Manage how you accept payments for your courses.</p>
      </div>

      <div className="space-y-12">
        {/* Stripe Configuration Section */}
        <section className="space-y-1 border-t border-zinc-200 pt-8">
          <h3 className="text-sm font-bold text-zinc-800 flex items-center gap-2 mb-6">
            <Shield className="w-4 h-4 text-blue-500" />
            {highlightText('Stripe Configuration')}
          </h3>
          
          <div className="space-y-0 divide-y divide-zinc-100">
            <div className="flex flex-col md:flex-row md:items-center py-4 gap-4">
              <label className="text-sm font-semibold text-zinc-700 w-full md:w-64">
                {highlightText('Stripe Public Key')}
              </label>
              <div className="flex-1">
                <input 
                  type="text"
                  className="w-full max-w-lg bg-white border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono"
                  value={settings.stripePublicKey}
                  onChange={e => setSettings({...settings, stripePublicKey: e.target.value})}
                  placeholder="pk_test_..."
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center py-4 gap-4">
              <label className="text-sm font-semibold text-zinc-700 w-full md:w-64">
                {highlightText('Stripe Secret Key')}
              </label>
              <div className="flex-1">
                <input 
                  type="password"
                  className="w-full max-w-lg bg-white border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono"
                  value={settings.stripeSecretKey}
                  onChange={e => setSettings({...settings, stripeSecretKey: e.target.value})}
                  placeholder="sk_test_..."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Payment Method UI Preview (Amazon Style) */}
        <section className="space-y-1 border-t border-zinc-200 pt-8">
          <h3 className="text-sm font-bold text-zinc-800 flex items-center gap-2 mb-6">
            <DollarSign className="w-4 h-4 text-orange-500" />
            {highlightText('Payment Method Configuration')}
          </h3>
          
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm max-w-2xl">
            <div className="p-6 border-b border-zinc-100 bg-zinc-50/30">
               <h4 className="text-lg font-bold text-zinc-900">Payment method</h4>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Available Balance */}
              <div className="space-y-4">
                <h5 className="font-bold text-zinc-900">Your available balance</h5>
                <div className="flex items-start gap-4 p-2">
                  <input type="radio" name="paymentMethod" className="mt-1 w-4 h-4 accent-orange-600" disabled />
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-zinc-800">Amazon Pay Balance ₹0.00 Unavailable</p>
                    <div className="flex gap-2 text-blue-600 text-[11px] font-medium bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                      <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">i</div>
                      <span>Insufficient balance. <button className="underline hover:text-blue-800">Add money & get rewarded</button></span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 pl-8">
                  <span className="text-zinc-400 text-xl font-light">+</span>
                  <input 
                    type="text" 
                    placeholder="Enter Code" 
                    className="border border-zinc-300 rounded-lg px-4 py-1.5 text-sm w-48 focus:ring-1 focus:ring-orange-500 outline-none"
                  />
                  <button className="px-4 py-1.5 bg-white border border-zinc-300 rounded-full text-sm font-medium hover:bg-zinc-50 transition-colors">Apply</button>
                </div>
              </div>

              {/* Another Payment Method */}
              <div className="space-y-6 pt-4 border-t border-zinc-100">
                <h5 className="font-bold text-zinc-900">Another payment method</h5>
                
                {/* Credit/Debit Card */}
                <div className="flex items-start gap-4">
                  <input type="radio" name="paymentMethod" className="mt-1 w-4 h-4 accent-orange-600" />
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-zinc-800">Credit or debit card</p>
                    <div className="flex gap-2 opacity-80">
                       <CardIcon brand="visa" />
                       <CardIcon brand="mastercard" />
                       <CardIcon brand="amex" />
                       <CardIcon brand="rupay" />
                    </div>
                  </div>
                </div>

                {/* Net Banking */}
                <div className="flex items-start gap-4">
                  <input type="radio" name="paymentMethod" className="mt-1 w-4 h-4 accent-orange-600" />
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-zinc-800">Net Banking</p>
                    <select className="bg-zinc-50 border border-zinc-300 rounded-lg px-4 py-1.5 text-sm w-64 outline-none focus:ring-1 focus:ring-orange-500">
                       <option>Choose an Option</option>
                       <optgroup label="Popular Banks">
                         <option>Airtel Payments Bank</option>
                         <option>Axis Bank</option>
                         <option>HDFC Bank</option>
                         <option>ICICI Bank</option>
                         <option>Kotak Bank</option>
                         <option>State Bank of India</option>
                       </optgroup>
                       <optgroup label="Other Banks">
                         <option>Allahabad Bank</option>
                         <option>Andhra Bank</option>
                         <option>Bank of India</option>
                         <option>Bank of Maharashtra</option>
                         <option>Canara Bank</option>
                         <option>Catholic Syrian Bank</option>
                         <option>Central Bank of India</option>
                         <option>City Union Bank</option>
                         <option>Corporation Bank</option>
                         <option>Dena Bank</option>
                         <option>Federal Bank</option>
                         <option>IDBI Bank</option>
                         <option>Indian Bank</option>
                         <option>IndusInd Bank</option>
                         <option>Karnataka Bank</option>
                         <option>Punjab National Bank</option>
                         <option>Union Bank of India</option>
                         <option>Yes Bank</option>
                       </optgroup>
                    </select>
                  </div>
                </div>

                {/* Scan & Pay */}
                <div className="flex items-start gap-4">
                  <input type="radio" name="paymentMethod" className="mt-1 w-4 h-4 accent-orange-600" />
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-zinc-800 flex items-center gap-1.5">
                       Scan and Pay with <span className="text-indigo-600 font-black italic">UPI</span>
                    </p>
                    <div className="flex gap-2 text-zinc-600 text-[11px] font-medium bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                      <div className="w-4 h-4 bg-zinc-400 rounded-full flex items-center justify-center text-white text-[10px] font-bold">i</div>
                      <span>You will need to Scan the QR code on the payment page to complete the payment.</span>
                    </div>
                  </div>
                </div>

                {/* EMI */}
                <div className="flex items-start gap-4">
                  <input type="radio" name="paymentMethod" className="mt-1 w-4 h-4 accent-orange-600" />
                  <p className="text-sm font-bold text-zinc-800">EMI</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-zinc-50/50 border-t border-zinc-100 flex justify-end">
               <button className="bg-orange-400 hover:bg-orange-500 text-zinc-900 font-bold px-8 py-2 rounded-lg shadow-sm transition-all text-sm">
                  Continue
               </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function CardIcon({ brand }: { brand: string }) {
  const colors: Record<string, string> = {
    visa: 'text-blue-800 bg-blue-50',
    mastercard: 'text-red-600 bg-red-50',
    amex: 'text-cyan-600 bg-cyan-50',
    rupay: 'text-indigo-600 bg-indigo-50'
  };
  
  return (
    <div className={`w-10 h-6 rounded border border-zinc-200 flex items-center justify-center text-[8px] font-black uppercase tracking-tighter shadow-sm ${colors[brand] || 'bg-white'}`}>
      {brand}
    </div>
  );
}
