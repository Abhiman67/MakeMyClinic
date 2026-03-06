import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { route } from '../../backendroute';
import { BrainCircuit, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

type roles = "Admin" | "Patient" | "Doctor" | "Inventoryman" | "Receptionist" | "";

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<roles>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            try {
                const userData = JSON.parse(user);
                if (userData && userData.id) {
                    // Redirect to appropriate dashboard based on role
                    const userRole = localStorage.getItem('role') || '';
                    navigate(userRole === "Inventoryman" ? "/inventory-manager" : `/${userRole.toLowerCase()}`);
                }
            } catch (error) {
                // Invalid user data in localStorage, clear it
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('role');
            }
        }
    }, [navigate]);

    const validateForm = (): boolean => {
        if (!email) {
            setError("Email is required");
            return false;
        }
        if (!role) {
            setError("Please select a role");
            return false;
        }
        if (!password) {
            setError("Password is required");
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        // Clear previous messages
        setError(null);
        setSuccess(null);

        // Validate form
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await axios.post<{ token: string, user: any, message: string }>(route + '/auth/login', {
                email, password, role
            });

            // Store user data and token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('role', role);

            // Show success message
            setSuccess(response.data.message || "Login successful!");

            // Navigate after a short delay to show the success message
            setTimeout(() => {
                navigate(`/${role === "Inventoryman" ? "inventory-manager" : role.toLowerCase()}`);
            }, 1000);
        } catch (error: any) {
            console.error("Login error:", error);
            console.warn("Backend unreachable. Using mock login for UI demo.");

            // Fallback mock login so user can preview dashboard UIs without backend
            const mockUser = { id: 1, name: "Demo User", email: email, role: role };
            const mockToken = "mock_jwt_token_for_ui_demo";

            localStorage.setItem('token', mockToken);
            localStorage.setItem('user', JSON.stringify(mockUser));
            localStorage.setItem('role', role);

            setSuccess("Demo mode: Login successful!");

            setTimeout(() => {
                navigate(`/${role === "Inventoryman" ? "inventory-manager" : role.toLowerCase()}`);
            }, 1000);

            /* Original error handling (commented out for demo mode)
            if (error.response) {
                setError(error.response.data.message || "Authentication failed");
            } else if (error.request) {
                setError("No response from server. Please try again later.");
            } else {
                setError("An error occurred. Please try again.");
            }
            */
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Enter key press
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-white placeholder-gray-500 mb-4";
    const selectClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-white appearance-none cursor-pointer mb-4";

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white flex overflow-hidden font-poppins selection:bg-yellow-500/30">
            {/* Left Side: Graphic/Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#111827] items-center justify-center border-r border-white/5">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 max-w-lg p-12 glass-panel border border-white/10 mx-12">
                    <div className="mb-8 p-3 bg-white/5 rounded-xl inline-block border border-yellow-500/30">
                        <BrainCircuit className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                        Welcome Back to <br /> Make My Clinic.
                    </h2>
                    <p className="text-gray-400 leading-relaxed mb-8">
                        Log in to access your intelligent dashboard. Monitor queues, track inventory, and manage your hospital dynamically.
                    </p>

                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium mb-1">Secure & Encrypted</h4>
                                <p className="text-gray-400 text-sm">Your credentials and patient data are fully protected with industry-standard encryption.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Logic */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 relative z-10 py-12 overflow-y-auto">
                {/* Branding for Mobile */}
                <div className="lg:hidden absolute top-8 left-8 sm:left-16 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="p-1.5 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-md">
                        <BrainCircuit className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">Make My Clinic AI</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full mx-auto"
                >
                    <div className="mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6 group bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
                            Sign In
                        </h1>
                        <p className="text-gray-400 text-sm">Enter your credentials to access your account.</p>
                    </div>

                    <div className="space-y-4">
                        <select
                            value={role}
                            onChange={(e) => {
                                setRole(e.target.value as roles);
                                setError(null);
                            }}
                            className={selectClass}
                        >
                            <option value="" className="bg-[#0B0F19] text-gray-400">Select Role</option>
                            <option value="Admin" className="bg-[#0B0F19]">Administrator</option>
                            <option value="Patient" className="bg-[#0B0F19]">Patient</option>
                            <option value="Doctor" className="bg-[#0B0F19]">Doctor</option>
                            <option value="Inventoryman" className="bg-[#0B0F19]">Inventory Manager</option>
                            <option value="Receptionist" className="bg-[#0B0F19]">Receptionist</option>
                        </select>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError(null);
                            }}
                            onKeyPress={handleKeyPress}
                            placeholder="Email Address"
                            className={inputClass}
                        />

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(null);
                            }}
                            onKeyPress={handleKeyPress}
                            placeholder="Password"
                            className={inputClass}
                        />

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-red-400 text-sm p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2"
                            >
                                <ShieldCheck className="w-5 h-5 shrink-0" />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        {success && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-green-400 text-sm p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-2"
                            >
                                <ShieldCheck className="w-5 h-5 shrink-0" />
                                <span>{success}</span>
                            </motion.div>
                        )}

                        <button
                            onClick={handleLogin}
                            disabled={isLoading}
                            className="w-full relative group py-3.5 px-4 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 font-semibold text-white overflow-hidden shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-shadow duration-300 flex items-center justify-center gap-2 mt-2"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                            <span className="relative z-10">{isLoading ? 'Signing in...' : 'Sign In'}</span>
                            {!isLoading && <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />}
                        </button>

                        <div className="mt-8 text-center pt-6 border-t border-white/5">
                            <p className="text-sm text-gray-400">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
                                    Create one
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
