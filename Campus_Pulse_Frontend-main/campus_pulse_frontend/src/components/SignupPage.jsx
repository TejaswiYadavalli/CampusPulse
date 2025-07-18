import React, { useState } from "react";
import { Mail, Lock, User, Briefcase } from "lucide-react";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LoginNavbar from "./LoginNavbar";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_BACKEND_URL;


const SignupPage = () => {
  const [role, setRole] = useState("Student");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  const handleEmailVerification = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Password Strength Validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters long and contain both letters and numbers.");
      return;
    }

    try {
      const response =
        role === "Student"
          ? await axios.post(
              `${API_URL}/signup`,
              { firstName, lastName, email, password, role },
              { withCredentials: true }
            )
          : await axios.post(
              `${API_URL}/faculty/register`,
              { facultyId, password },
              { withCredentials: true }
            );

      if (response.status === 200) {
        if (role === "Student") {
          alert("Verification email sent. Please check your inbox.");
          setIsOtpSent(true);
        } else {
          navigate("/faculty");
        }
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });

      if (response.status === 200) {
        alert("OTP verified successfully! Account created.");
        navigate("/student");
      }
    } catch (error) {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("hero-bg.jpg")' }}>
      <LoginNavbar />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-around relative z-20 p-4 gap-8">
        <DotLottieReact
          src="https://lottie.host/f8300ede-4ba2-49c7-8232-b68fd8cddc45/oxLqOeKk2c.lottie"
          loop
          autoplay
          style={{ width: "650px", height: "300px" }}
        />
        <div className="w-full max-w-sm p-8 rounded-2xl text-center border border-white/50 backdrop-blur-lg shadow-2xl">
          <h2 className="text-3xl font-ovo text-white mb-3">Sign Up</h2>
          <p className="pb-3 text-gray-400">
            {isOtpSent ? "Enter the OTP sent to your email" : "Create a new account"}
          </p>

          {!isOtpSent ? (
            <form onSubmit={handleEmailVerification} className="flex flex-col space-y-6">
              <div className="relative flex items-center gap-2">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-transparent text-white text-lg pl-4 pr-4 py-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                >
                  <option value="Student" className="text-black">Student</option>
                  <option value="Faculty" className="text-black">Faculty</option>
                </select>
              </div>

              {role === "Student" ? (
                <>
                  <div className="flex gap-4">
                    <div className="relative w-1/2">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder="First Name"
                        className="w-full bg-transparent text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="relative w-1/2">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        placeholder="Last Name"
                        className="w-full bg-transparent text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email Address"
                      className="w-full bg-transparent text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              ) : (
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                  <input
                    type="text"
                    value={facultyId}
                    onChange={(e) => setFacultyId(e.target.value)}
                    required
                    placeholder="Employee ID"
                    className="w-full bg-transparent text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="w-full bg-transparent text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 outline-none"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm Password"
                  className="w-full bg-transparent text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 outline-none"
                />
              </div>

              <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg">
                {role === "Faculty" ? "Update Password" : "Verify Email"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpVerification} className="flex flex-col space-y-6">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter OTP"
                className="w-full bg-transparent text-white pl-4 pr-4 py-3 rounded-lg border border-gray-400 outline-none focus:border-white"
              />
              <button type="submit" className="bg-blue-500 text-white py-2 rounded">
                Verify OTP
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
