import React, { useState } from "react";
import { FaTimes, FaCreditCard, FaPaypal, FaApple, FaChevronRight, FaLock, FaCheckCircle, FaSpinner } from "react-icons/fa";

interface Props {
    amount: number;
    closeModal: () => void;
    onSuccess: () => void;
}

const PaymentModal: React.FC<Props> = ({ amount, closeModal, onSuccess }) => {
    const [selectedMethod, setSelectedMethod] = useState<string>("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePay = () => {
        setIsProcessing(true);
        // Simulate network delay for payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            // Let success screen show for a moment, then close
            setTimeout(() => {
                onSuccess();
                closeModal();
            }, 2000);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-[70] p-4">
                <div className="bg-[#0B0F19] border border-white/10 rounded-3xl shadow-2xl w-full max-w-sm p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-1/4 w-32 h-32 bg-green-500/20 blur-[60px] pointer-events-none rounded-full"></div>

                    <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-6 relative">
                        <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                        <FaCheckCircle className="text-5xl text-green-400 relative z-10" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">Payment Successful</h2>
                    <p className="text-gray-400">Your transaction of <span className="text-white font-bold">${amount.toFixed(2)}</span> has been securely processed.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-[70] p-4">
            <div className="bg-[#0B0F19] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative">
                {/* Background Glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 blur-[80px] pointer-events-none z-0"></div>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 relative z-10 bg-white/5">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 mr-4">
                            <FaLock className="text-white text-lg" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">Secure Checkout</h2>
                            <p className="text-gray-400 text-xs mt-0.5">Powered by Make My Clinic Pay</p>
                        </div>
                    </div>
                    <button
                        className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-full transition focus:outline-none"
                        onClick={closeModal}
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 relative z-10 text-white">
                    <div className="flex justify-between items-end mb-8 bg-gray-900/50 p-6 rounded-2xl border border-white/5">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Total Amount</p>
                            <div className="text-4xl font-extrabold tracking-tight">${amount.toFixed(2)}</div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400">Consultation Fee</p>
                            <p className="text-xs text-gray-500 mt-1">Ref: INV-09214</p>
                        </div>
                    </div>

                    <p className="text-sm font-semibold text-gray-300 mb-4 select-none">Select Payment Method</p>

                    <div className="space-y-3 mb-8">
                        <label className={`flex items-center p-4 rounded-xl border border-white/10 cursor-pointer transition-all ${selectedMethod === 'card' ? 'bg-cyan-500/10 border-cyan-500/50 ring-1 ring-cyan-500/50' : 'bg-white/5 hover:bg-white/10'}`}>
                            <input type="radio" value="card" checked={selectedMethod === 'card'} onChange={() => setSelectedMethod('card')} className="hidden" />
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${selectedMethod === 'card' ? 'border-cyan-400 bg-cyan-400/20' : 'border-gray-500'}`}>
                                {selectedMethod === 'card' && <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full"></div>}
                            </div>
                            <FaCreditCard className={`text-xl mr-3 ${selectedMethod === 'card' ? 'text-cyan-400' : 'text-gray-400'}`} />
                            <span className="font-medium flex-1">Credit / Debit Card</span>
                        </label>

                        <label className={`flex items-center p-4 rounded-xl border border-white/10 cursor-pointer transition-all ${selectedMethod === 'paypal' ? 'bg-cyan-500/10 border-cyan-500/50 ring-1 ring-cyan-500/50' : 'bg-white/5 hover:bg-white/10'}`}>
                            <input type="radio" value="paypal" checked={selectedMethod === 'paypal'} onChange={() => setSelectedMethod('paypal')} className="hidden" />
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${selectedMethod === 'paypal' ? 'border-cyan-400 bg-cyan-400/20' : 'border-gray-500'}`}>
                                {selectedMethod === 'paypal' && <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full"></div>}
                            </div>
                            <FaPaypal className={`text-xl mr-3 ${selectedMethod === 'paypal' ? 'text-[#00457C]' : 'text-gray-400'}`} />
                            <span className="font-medium flex-1">PayPal</span>
                        </label>

                        <label className={`flex items-center p-4 rounded-xl border border-white/10 cursor-pointer transition-all ${selectedMethod === 'apple' ? 'bg-cyan-500/10 border-cyan-500/50 ring-1 ring-cyan-500/50' : 'bg-white/5 hover:bg-white/10'}`}>
                            <input type="radio" value="apple" checked={selectedMethod === 'apple'} onChange={() => setSelectedMethod('apple')} className="hidden" />
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${selectedMethod === 'apple' ? 'border-cyan-400 bg-cyan-400/20' : 'border-gray-500'}`}>
                                {selectedMethod === 'apple' && <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full"></div>}
                            </div>
                            <FaApple className={`text-2xl mr-3 ${selectedMethod === 'apple' ? 'text-white' : 'text-gray-400'}`} />
                            <span className="font-medium flex-1">Apple Pay</span>
                        </label>
                    </div>

                    <button
                        onClick={handlePay}
                        disabled={isProcessing}
                        className="w-full relative flex justify-center items-center py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? (
                            <FaSpinner className="animate-spin text-xl" />
                        ) : (
                            <>
                                <span className="text-lg">Pay ${amount.toFixed(2)}</span>
                                <div className="absolute right-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                    <FaChevronRight />
                                </div>
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-gray-500 mt-4 flex justify-center items-center">
                        <FaLock className="mr-1" /> End-to-end encrypted
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
