import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../utilities/NotificationProvider";
import { updateCredits } from "../../appStore/storeFeatures/authSlice";

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
  const dispatch = useDispatch();


  const addCredits = async (amount) => {
    try {
        const response = await fetch("http://localhost:5600/api/v1/user/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies (e.g., session tokens) are sent if using authentication
        body: JSON.stringify({ amount }),
        });

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.error || "Failed to add credits");
        }

        if (data.message == "Credits added successfully!") {
            setTimeout(() => {
                setStatus("success");
                setLoading(false);
                showNotification("success", "Payment successful!");
                dispatch(updateCredits(data.totalCredits));
                setTimeout(() => {
                    navigate("/dashboard/xp-wallet");
                }, 1000); 
            }, 2000); 
            
        }

        console.log("Credits added successfully:", data);
        return data;
    } catch (error) {
        console.error("Error adding credits:", error.message);
        return error.message;
    }
};

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    setCredits((newAmount / 10) * 20.5);
  };

  const handlePayment = () => {
  if (!fullName.trim() || !amount || !email.trim() || !phone.trim()) {
    showNotification("error", "All fields are required!");
    return;
  }

  setLoading(true);
    addCredits(amount);
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
    <div className=" w-full p-4 bg-gray-800 ">
        <div className="max-w-sm mx-auto p-6 dark:bg-black shadow-lg rounded-xl border-2 border-solid border-amber-600">
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
        className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 cursor-pointer active:scale-90 transition flex justify-center items-center"
      >
        {loading ? (
          <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-5 h-5"></span>
        ) : (
          "Pay"
        )}
      </button>

      {status === "success" && (
        <div>
            <p className="mt-4 text-green-600 font-semibold text-center">
            ✅ Payment Successful! 
            </p>
            {/* <p className=" text-blue-600 text-xl font-semibold text-center">Redirecting you to XP-Wallet page!</p>  */}
        </div>
      )}
    </div>
    </div>
  );
};

export default SabPaisaPayment;
