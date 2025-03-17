import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../utils/NotificationProvider";

const generateClientCode = () => {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
};

const SabPaisaPayment = () => {
    const { showNotification } = useNotification();
    const userData = useSelector((state) => state.auth.userData);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [clientCode, setClientCode] = useState(generateClientCode());
  const [fullName, setFullName] = useState("");
  const [amount, setAmount] = useState(100);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [credits, setCredits] = useState((100 / 10) * 20.5); // Initial value
  const navigate = useNavigate();

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    setCredits((newAmount / 10) * 20.5);
  };

  const handlePayment = () => {
  if (!fullName.trim() || !amount || !email.trim() || !phone.trim()) {
    // alert("Please fill in all fields before proceeding!");
    showNotification("error", "All fields are required!");
    return;
  }

  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    setStatus("success");
    showNotification("success", "Payment successful!");
  }, 2000); // Fake 2-sec load
};

useEffect(() => {
    setFullName(userData?.name);
    setEmail(userData?.email);
}, [userData])


    if (!isLoggedIn) {
    return (
        <div className=" text-center font-bold text-3xl">Log in first!</div>
    )}

  return (
    <div className="max-w-sm mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl mt-2">
        <div className=" flex justify-center mb-6">
            <img src="https://sabpaisa.in/wp-content/uploads/2023/06/header-logo.png" />
        </div>
      <h2 className="text-xl w-full flex justify-center font-bold text-gray-900 dark:text-white mb-4 ">
        🔒 Payment Details
      </h2>
      {/* Payment Details */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold">
          Client Code
        </label>
        <input
          type="text"
          value={clientCode}
          readOnly
          className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold">
          Full Name
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold">
          Amount (INR)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Contact Information */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">
        Contact Information:
      </h3>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold">
          Email ID
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold">
          Phone
        </label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition flex justify-center items-center"
      >
        {loading ? (
          <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-5 h-5"></span>
        ) : (
          "Continue"
        )}
      </button>

      {status === "success" && (
        <p className="mt-4 text-green-600 font-semibold text-center">
          ✅ Payment Successful!
        </p>
      )}
    </div>
  );
};

export default SabPaisaPayment;
