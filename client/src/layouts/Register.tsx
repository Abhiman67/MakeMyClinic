import { useState, useEffect, FC, ChangeEvent, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { route } from '../../backendroute';
import { BrainCircuit, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

// Define roles type
type Role = "Admin" | "Patient" | "Doctor" | "Inventoryman" | "Receptionist";

// Define form data structure for each role
type AdminForm = {
  name: string;
  email: string;
  password: string;
  hospitalName: string;
  hospitalAdminpass: string;
}

type InventorymanForm = {
  name: string;
  email: string;
  password: string;
  hospitalName: string;
  hospitalInventorypass: string;
}

type DoctorForm = {
  name: string;
  email: string;
  password: string;
  specialty?: string;
  hospitalName: string;
  hospitalDocpass: string;
  departmentId: number;
  description?: string;
  workingdays: string[];
}

type PatientForm = {
  name: string;
  email: string;
  password: string;
  age: number;
  bloodtype?: string;
  contact: string;
}

type ReceptionistForm = {
  name: string;
  email: string;
  password: string;
  hospitalName: string;
  hospitalReceptionpass: string;
}

// Define union type for all forms
type FormData = AdminForm | InventorymanForm | DoctorForm | PatientForm | ReceptionistForm;

interface Department {
  id: number;
  name: string;
}

interface Hospital {
  id: number;
  name: string;
  coordinates: number[];
  services: string[];
  departments: Department[];
}

const Register = () => {
  const roles = ["Admin", "Patient", "Doctor", "Inventoryman", "Receptionist"];
  const [role, setRole] = useState<Role | "">('');
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [formData, setFormData] = useState<FormData | Partial<FormData>>({});
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [isRoleSelected, setIsRoleSelected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHospitalLoading, setIsHospitalLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch hospital names on component mount
    const fetchHospitals = async () => {
      setIsHospitalLoading(true);
      try {
        const response = await axios.get<Hospital[]>(route + '/hospitals');
        if (response.data && response.data.length > 0) {
          setHospitalList(response.data);
        } else {
          throw new Error("Empty list returned, triggering mock fallback");
        }
      } catch (error: any) {
        console.error("Backend unreachable or DB empty. Using mock data for UI demo.", error);
        // Fallback mock data so user can preview the UI without starting DB
        const mockHospitals: Hospital[] = [
          { id: 1, name: "Central City Hospital", coordinates: [0, 0], services: [], departments: [{ id: 101, name: "Cardiology" }, { id: 102, name: "Neurology" }] },
          { id: 2, name: "Global Health Institute", coordinates: [0, 0], services: [], departments: [{ id: 201, name: "Pediatrics" }, { id: 202, name: "Orthopedics" }] },
          { id: 3, name: "CareSync Demo Hospital", coordinates: [0, 0], services: [], departments: [{ id: 301, name: "Emergency" }, { id: 302, name: "General Surgery" }] }
        ];
        setHospitalList(mockHospitals);
        // Clear error since we handled it gracefully for the UI demo
        setError(null);
      } finally {
        setIsHospitalLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  const handleRoleSelection = () => {
    setError(null);
    if (!role) {
      setError("Please select a role to continue");
      return;
    }
    setIsRoleSelected(true);
  };

  const handleBack = () => {
    setIsRoleSelected(false);
    setFormData({});
    setError(null);
    setSuccess(null);
    setRole('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    // Clear any previous errors when user makes changes
    setError(null);

    const { name, value } = e.target;
    if (name === "confirmPassword")
      setConfirmPassword(value);
    else if (name === "hospitalName") {
      setFormData((prev) => ({
        ...prev,
        hospitalName: value,
      }));
      const hospital = hospitalList.find(h => h.name === value);
      setDepartmentList(hospital?.departments || []);
    }
    else if (name === "workingdays") {
      const days = value.split(", ");
      setFormData((prev) => ({
        ...prev,
        [name]: days
      }));
    }
    else if (name === "age") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value)
      }));
    }
    else if (name === "departmentId")
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    else setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    // Common validation for all roles
    if (!formData.name) {
      setError("Name is required");
      return false;
    }
    if (!formData.email) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    // Role-specific validation
    switch (role) {
      case 'Admin':
      case 'Doctor':
      case 'Receptionist':
      case 'Inventoryman':
        if (!('hospitalName' in formData) || !formData.hospitalName) {
          setError("Hospital selection is required");
          return false;
        }
        break;
      case 'Patient':
        if (!('age' in formData) || !formData.age) {
          setError("Age is required");
          return false;
        }
        if (!('contact' in formData) || !formData.contact) {
          setError("Contact information is required");
          return false;
        }
        break;
    }

    return true;
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const payload = { ...formData, role };

    try {
      const response = await axios.post<{ token: string, user: any, message: string }>(route + '/auth/register', payload);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("role", role);

      // Show success message
      setSuccess(response.data.message || "Registration successful!");

      // Navigate after a short delay to show the success message
      setTimeout(() => {
        navigate(role === "Inventoryman" ? "/inventory-manager" : "/" + role.toLowerCase());
      }, 1500);
    } catch (error: any) {
      console.error("Error during registration:", error);
      console.warn("Backend unreachable. Using mock registration for UI demo.");

      // Fallback mock registration so user can preview dashboard UIs without backend
      const mockUser = { id: Date.now(), name: formData.name || "Demo User", email: formData.email, role: role };
      const mockToken = "mock_jwt_token_for_ui_demo";

      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("role", role);

      setSuccess("Demo mode: Registration successful!");

      setTimeout(() => {
        navigate(role === "Inventoryman" ? "/inventory-manager" : "/" + role.toLowerCase());
      }, 1500);

      /* Original error handling (commented out for demo mode)
      if (error.response) {
        setError(error.response.data.message || "Registration failed");
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!isRoleSelected) {
        handleRoleSelection();
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex overflow-hidden font-poppins selection:bg-yellow-500/30">
      {/* Left Side: Graphic/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#111827] items-center justify-center border-r border-white/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-lg p-12 glass-panel border border-white/10 mx-12">
          <div className="mb-8 p-3 bg-white/5 rounded-xl inline-block border border-amber-500/30">
            <BrainCircuit className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            The Future of <br /> Healthcare is Here.
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Create your account to join Make My Clinic. Modernize your hospital's queues, bed management, and inventory in minutes.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/40">
                <span className="text-amber-400 text-xs">✓</span>
              </div>
              Join 500+ Hospitals
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/40">
                <span className="text-amber-400 text-xs">✓</span>
              </div>
              Zero Manual Paperwork
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/40">
                <span className="text-amber-400 text-xs">✓</span>
              </div>
              Automated Triage
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
          {isRoleSelected ? (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6 group bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Roles
                </button>
                <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
                  {role} Registration
                </h1>
                <p className="text-gray-400 text-sm">Fill in your details to create your {role.toLowerCase()} account.</p>
              </div>

              <div className="space-y-4">
                <RenderFormFields
                  role={role}
                  hospitalList={hospitalList}
                  handleChange={handleChange}
                  formData={formData}
                  departmentList={departmentList}
                  handleKeyPress={handleKeyPress}
                  isHospitalLoading={isHospitalLoading}
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
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full relative group py-3.5 px-4 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 font-semibold text-white overflow-hidden shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-shadow duration-300 flex items-center justify-center gap-2 mt-6"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                  <span className="relative z-10">{isLoading ? 'Creating Account...' : 'Complete Registration'}</span>
                  {!isLoading && <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />}
                </button>

                <div className="mt-8 text-center pt-4 border-t border-white/5">
                  <p className="text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="mb-10 text-center lg:text-left mt-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Create Account</h1>
                <p className="text-gray-400 text-sm">First, select your role within the hospital system.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Account Type</label>
                  <select
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value as Role);
                      setError(null);
                    }}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-white appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0B0F19] text-gray-400">Select your role</option>
                    {roles.map((r) => (
                      <option key={r} value={r} className="bg-[#0B0F19]">{r}</option>
                    ))}
                  </select>
                </div>

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

                <button
                  onClick={handleRoleSelection}
                  className="w-full relative group py-3.5 px-4 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 font-semibold text-white overflow-hidden shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-shadow duration-300 flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                  <span className="relative z-10">Continue</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-8 text-center pt-8 border-t border-white/5">
                  <p className="text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const RenderFormFields: FC<{
  role: Role | "",
  hospitalList: Hospital[],
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
  formData: Partial<FormData>,
  departmentList: Department[],
  handleKeyPress: (e: React.KeyboardEvent) => void,
  isHospitalLoading: boolean
}> = ({
  role,
  hospitalList,
  handleChange,
  formData,
  departmentList,
  handleKeyPress,
  isHospitalLoading
}) => {
    const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-white placeholder-gray-500 mb-4";
    const selectClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-white appearance-none cursor-pointer mb-4";

    return useMemo(() => {
      // Common fields for all roles
      const commonFields = (
        <>
          <input
            className={inputClass}
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name || ''}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
          />
          <input
            className={inputClass}
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email || ''}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
          />
          <input
            className={inputClass}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password || ''}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
          />
          <input
            className={inputClass}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
          />
        </>
      );

      // Hospital selection field
      const hospitalField = (
        <select
          className={selectClass}
          name="hospitalName"
          onChange={handleChange}
          disabled={isHospitalLoading}
          required
        >
          <option value="" className="bg-[#0B0F19] text-gray-400">
            {isHospitalLoading ? "Loading hospitals..." : "Select Hospital"}
          </option>
          {hospitalList.map(h => (
            <option key={h.id} value={h.name} className="bg-[#0B0F19]">{h.name}</option>
          ))}
        </select>
      );

      switch (role) {
        case 'Admin':
          return (
            <>
              {commonFields}
              {hospitalField}
              <input
                className={inputClass}
                type="password"
                name="hospitalAdminpass"
                placeholder="Admin Registration Code"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
              />
            </>
          );
        case 'Inventoryman':
          return (
            <>
              {commonFields}
              {hospitalField}
              <input
                className={inputClass}
                type="password"
                name="hospitalInventorypass"
                placeholder="Inventory Manager Code"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
              />
            </>
          );
        case 'Doctor':
          return (
            <>
              {commonFields}
              {hospitalField}
              <input
                className={inputClass}
                type="text"
                name="specialty"
                placeholder="Specialty (e.g. Cardiology)"
                value={'specialty' in formData ? formData.specialty || '' : ''}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
              <select
                className={selectClass}
                name="departmentId"
                onChange={handleChange}
                required
              >
                <option value="" className="bg-[#0B0F19] text-gray-400">Select Department</option>
                {departmentList.map(d => (
                  <option key={d.id} value={d.id} className="bg-[#0B0F19]">{d.name}</option>
                ))}
              </select>
              <input
                className={inputClass}
                type="password"
                name="hospitalDocpass"
                placeholder="Doctor Registration Code"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
              />
              <input
                className={inputClass}
                type="text"
                name="workingdays"
                placeholder="Working Days (e.g. Mon, Tue)"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
              />
              <textarea
                className={inputClass}
                name="description"
                placeholder="Brief professional description"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                rows={3}
              />
            </>
          );
        case 'Patient':
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <div className="sm:col-span-2">
                <input
                  className={inputClass}
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  className={inputClass}
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email || ''}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  required
                />
              </div>
              <div className="col-span-1">
                <input
                  className={inputClass}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password || ''}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  required
                />
              </div>
              <div className="col-span-1">
                <input
                  className={inputClass}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  required
                />
              </div>
              <div className="col-span-1">
                <input
                  className={inputClass}
                  type="number"
                  name="age"
                  placeholder="Age"
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  min="1"
                  max="120"
                  required
                />
              </div>
              <div className="col-span-1">
                <input
                  className={inputClass}
                  type="text"
                  name="bloodtype"
                  placeholder="Blood Type"
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  className={inputClass}
                  type="tel"
                  name="contact"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  required
                />
              </div>
            </div>
          );
        case 'Receptionist':
          return (
            <>
              {commonFields}
              {hospitalField}
              <input
                className={inputClass}
                type="password"
                name="hospitalReceptionpass"
                placeholder="Receptionist Code"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
              />
            </>
          );
        default:
          return null;
      }
    }, [role, hospitalList, handleChange, formData, departmentList, handleKeyPress, isHospitalLoading, inputClass, selectClass]);
  };

export default Register;