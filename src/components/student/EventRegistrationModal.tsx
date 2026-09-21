'use client';

import React, { useState, useEffect } from 'react';
import { EventItem, RegistrationRecord } from '@/types';
import { useEvent } from '@/context/EventContext';
import {
  X,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  Ticket,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  User,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  Lock,
  Download,
  AlertCircle,
  Sparkles,
  Smartphone,
  Check,
  Printer,
} from 'lucide-react';

interface EventRegistrationModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (registration: RegistrationRecord) => void;
}

export const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  event,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { currentUser, registerForEvent, addToast } = useEvent();

  // Multi-step flow: 'details' -> 'payment' (if paid) -> 'confirmed'
  const [currentStep, setCurrentStep] = useState<'details' | 'payment' | 'confirmed'>('details');

  // Attendee Form State
  const [fullName, setFullName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [rollNumber, setRollNumber] = useState(currentUser.studentIdNumber || 'RUIA-2026-CS105');
  const [department, setDepartment] = useState('Computer Science & IT');
  const [phone, setPhone] = useState('+91 98201 44556');
  const [dietary, setDietary] = useState<'veg' | 'jain' | 'non-veg'>('veg');
  const [teamName, setTeamName] = useState('');
  const [agreeRules, setAgreeRules] = useState(true);

  // Payment Form State (for paid events)
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('GPay');
  const [cardNumber, setCardNumber] = useState('4532 8921 7734 9012');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('842');
  const [cardName, setCardName] = useState(currentUser.name || '');
  const [bankName, setBankName] = useState('State Bank of India');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  // Confirmed Registration Record
  const [confirmedRegistration, setConfirmedRegistration] = useState<RegistrationRecord | null>(null);

  useEffect(() => {
    if (isOpen && event) {
      setCurrentStep('details');
      setConfirmedRegistration(null);
      setIsProcessingPayment(false);
      setProcessingStatus('');
      setFullName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setRollNumber(currentUser.studentIdNumber || 'RUIA-2026-CS105');
      setCardName(currentUser.name || '');
    }
  }, [isOpen, event?.id, currentUser]);

  if (!isOpen || !event) return null;

  const isPaid = event.price > 0;

  // Validation
  const handleProceedFromDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !rollNumber.trim() || !phone.trim()) {
      addToast('Missing Information', 'Please fill in all required participant fields.', 'warning');
      return;
    }

    if (!agreeRules) {
      addToast('Declaration Required', 'Please accept the campus event conduct declaration.', 'warning');
      return;
    }

    if (isPaid) {
      setCurrentStep('payment');
    } else {
      executeRegistration('free', undefined);
    }
  };

  // Complete Registration & Payment
  const executeRegistration = (method: string, txnRef?: string) => {
    const result = registerForEvent(event.id, {
      studentIdNumber: rollNumber,
      studentName: fullName,
      studentEmail: email,
      department,
      phone,
      dietaryPreference: dietary,
      teamName: event.isHackathon ? teamName : undefined,
      paymentMethod: method,
      transactionRef: txnRef,
    });

    if (result.success && result.registration) {
      setConfirmedRegistration(result.registration);
      setCurrentStep('confirmed');
      if (onSuccess) onSuccess(result.registration);
    }
  };

  // Handle Mock Payment Submission
  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setProcessingStatus('Initiating secure gateway transaction...');

    setTimeout(() => {
      setProcessingStatus('Contacting SBI Campus Gateway...');
    }, 600);

    setTimeout(() => {
      setProcessingStatus('Verifying payment confirmation & generating receipt...');
    }, 1200);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const generatedTxn = `TXN-RUIA-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
      executeRegistration(paymentMethod.toUpperCase(), generatedTxn);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-6 flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
                {event.category}
              </span>
              <span className="text-xs text-slate-500">
                Ramnarain Ruia Autonomous College
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {currentStep === 'details' && 'Student Event Registration'}
              {currentStep === 'payment' && 'Event Fee Payment'}
              {currentStep === 'confirmed' && 'Registration Confirmed!'}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-1">{event.title}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-2.5 bg-slate-100/60 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span
              className={`font-semibold flex items-center gap-1.5 ${
                currentStep === 'details' ? 'text-blue-700' : 'text-slate-500'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                1
              </span>
              Attendee Details
            </span>

            <span className="text-slate-300">→</span>

            <span
              className={`font-semibold flex items-center gap-1.5 ${
                currentStep === 'payment'
                  ? 'text-blue-700'
                  : currentStep === 'confirmed'
                  ? 'text-emerald-700'
                  : 'text-slate-400'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  currentStep === 'payment'
                    ? 'bg-blue-600 text-white'
                    : currentStep === 'confirmed'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                2
              </span>
              {isPaid ? 'Payment & Fee' : 'Confirmation'}
            </span>

            <span className="text-slate-300">→</span>

            <span
              className={`font-semibold flex items-center gap-1.5 ${
                currentStep === 'confirmed' ? 'text-emerald-700' : 'text-slate-400'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  currentStep === 'confirmed'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                3
              </span>
              QR Pass
            </span>
          </div>

          <div className="text-right">
            <span className="font-bold text-xs text-slate-900">
              {isPaid ? `Fee: ₹${event.price}` : 'Free Entry'}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* STEP 1: ATTENDEE DETAILS */}
          {currentStep === 'details' && (
            <form onSubmit={handleProceedFromDetails} className="space-y-4">
              {/* Event Quick Info Banner */}
              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl flex items-center justify-between text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>
                    {new Date(event.startDate).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span className="truncate max-w-[200px]">{event.venueName}</span>
                </div>
                <div className="font-bold text-blue-900">
                  {isPaid ? `₹${event.price}` : 'Free'}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* College Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    College Email ID <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@ruiacollege.edu"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Ruia Roll Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ruia Roll No. / Student ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="e.g. RUIA-2026-CS105"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 uppercase"
                  />
                </div>

                {/* Department / Stream */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Academic Department <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="Computer Science & IT">B.Sc. / M.Sc. Computer Science & IT</option>
                    <option value="Biotechnology & Life Sciences">B.Sc. Biotechnology & Life Sciences</option>
                    <option value="Chemistry & Bio-analytical">B.Sc. / M.Sc. Chemistry</option>
                    <option value="Physics & Electronics">B.Sc. Physics & Electronics</option>
                    <option value="Commerce & Management">B.Com / BMS / BAF</option>
                    <option value="Arts & Mass Communication">B.A. Economics / Mass Communication</option>
                    <option value="Inter-Collegiate Delegate">Other / Inter-Collegiate Delegate</option>
                  </select>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp / Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98201 44556"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Dietary Preference */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Refreshment Dietary Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['veg', 'jain', 'non-veg'] as const).map((pref) => (
                      <button
                        type="button"
                        key={pref}
                        onClick={() => setDietary(pref)}
                        className={`py-1.5 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          dietary === pref
                            ? 'bg-blue-50 border-blue-600 text-blue-700 font-semibold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {pref === 'veg' && 'Vegetarian'}
                        {pref === 'jain' && 'Jain'}
                        {pref === 'non-veg' && 'Regular'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hackathon Team Name (if applicable) */}
              {event.isHackathon && (
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Team Name (Optional if participating solo)
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Ruia CodeCrafters"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Solo registrants can match with teammates in the Hackathon Hub after registering.
                  </p>
                </div>
              )}

              {/* Terms & Code of Conduct */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={agreeRules}
                    onChange={(e) => setAgreeRules(e.target.checked)}
                    className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    I confirm that I am a bonafide Ruia student / registered delegate and agree to adhere to Ramnarain Ruia Autonomous College campus code of conduct.
                  </span>
                </label>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{isPaid ? `Proceed to Payment (₹${event.price})` : 'Confirm Free Registration'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT GATEWAY (FOR PAID EVENTS) */}
          {currentStep === 'payment' && (
            <form onSubmit={handleProcessPayment} className="space-y-5">
              {/* Payment Summary Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Event Delegate Registration Fee</span>
                  <span className="font-mono font-medium">₹{event.price}.00</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Campus Amenities & Kit Charges</span>
                  <span className="text-emerald-700 font-medium">₹0.00 (Included)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-bold text-sm text-slate-900">
                  <span>Total Amount Payable</span>
                  <span className="text-blue-700 font-mono text-base">₹{event.price}.00</span>
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Payment Method:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-blue-600 mb-1" />
                    <span className="block text-xs font-bold text-slate-900">UPI / QR</span>
                    <span className="text-[10px] text-slate-500">GPay, PhonePe, Paytm</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-indigo-600 mb-1" />
                    <span className="block text-xs font-bold text-slate-900">RuPay / Card</span>
                    <span className="text-[10px] text-slate-500">Debit / Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'netbanking'
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <Building className="w-4 h-4 text-emerald-600 mb-1" />
                    <span className="block text-xs font-bold text-slate-900">Net Banking</span>
                    <span className="text-[10px] text-slate-500">SBI, BOB, HDFC</span>
                  </button>
                </div>
              </div>

              {/* UPI Screen */}
              {paymentMethod === 'upi' && (
                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Simulated UPI QR Code */}
                    <div className="w-32 h-32 p-2 bg-white border border-slate-300 rounded-xl shadow-xs flex flex-col items-center justify-center shrink-0">
                      <QrCode className="w-20 h-20 text-slate-800" />
                      <span className="text-[9px] font-mono text-slate-500 mt-1">Scan via any UPI App</span>
                    </div>

                    <div className="space-y-2 flex-1 w-full">
                      <span className="text-xs font-bold text-slate-900 block">
                        Ramnarain Ruia Autonomous College Account
                      </span>
                      <span className="text-xs font-mono text-slate-500 block">
                        ruiacollege.events@sbi
                      </span>

                      <div className="pt-2">
                        <label className="block text-xs text-slate-600 mb-1 font-medium">
                          Or enter your UPI VPA ID:
                        </label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. yourname@oksbi / @paytm"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Screen */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 •••• •••• ••••"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Valid Thru</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* NetBanking Screen */}
              {paymentMethod === 'netbanking' && (
                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Select Bank</label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="State Bank of India">State Bank of India (Official College Partner)</option>
                    <option value="Bank of Baroda">Bank of Baroda</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Canara Bank">Canara Bank</option>
                  </select>
                </div>
              )}

              {/* Security Badge */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 justify-center">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted • State Bank of India Campus Gateway</span>
              </div>

              {/* Footer Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => setCurrentStep('details')}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{processingStatus || 'Processing...'}</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Pay ₹{event.price} & Confirm</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: REGISTRATION CONFIRMED & PASS PREVIEW */}
          {currentStep === 'confirmed' && confirmedRegistration && (
            <div className="space-y-5 text-center">
              {/* Success Badge */}
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  Registration Successfully Confirmed!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Your seat has been reserved and your official entrance QR pass has been generated.
                </p>
              </div>

              {/* Digital Pass Preview Card */}
              <div className="border border-blue-200 bg-gradient-to-b from-blue-50/60 to-white rounded-2xl p-5 text-left relative overflow-hidden shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-blue-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
                      Ramnarain Ruia Autonomous College
                    </span>
                    <h5 className="font-bold text-sm text-slate-900 mt-0.5">
                      {event.title}
                    </h5>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Confirmed Pass ✓
                  </span>
                </div>

                <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1.5 text-xs flex-1">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">Attendee</span>
                      <span className="font-bold text-slate-900 text-sm block">
                        {confirmedRegistration.studentName}
                      </span>
                      <span className="font-mono text-slate-600 block text-xs">
                        {confirmedRegistration.studentIdNumber}
                      </span>
                    </div>

                    <div className="pt-1">
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">Venue & Date</span>
                      <span className="font-semibold text-slate-800 block">
                        {event.venueName}
                      </span>
                      <span className="text-slate-500 block">
                        {confirmedRegistration.eventDate}
                      </span>
                    </div>

                    {confirmedRegistration.paymentAmount > 0 && (
                      <div className="pt-1">
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Payment Receipt</span>
                        <span className="text-[11px] font-mono text-emerald-700 block font-semibold">
                          ₹{confirmedRegistration.paymentAmount} • {confirmedRegistration.transactionRef}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* QR Code Matrix */}
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center shrink-0">
                    <div className="w-24 h-24 bg-slate-900 rounded-lg p-2 flex items-center justify-center">
                      <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm12-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zM5 5h2v2H5V5zm12 0h2v2h-2V5zM5 17h2v2H5v-2z" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 mt-1">
                      {confirmedRegistration.qrToken.slice(0, 16)}...
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-dashed border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Entry Gate: Auditorium / Quadrangle</span>
                  <span className="text-blue-600 font-medium">Present at Entry Scanner</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Pass / Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
