//19/3/25 photo sent double amount deducted
// import React, { useState, useEffect } from "react";
// import { getDatabase, ref, get, update } from "firebase/database";
// import { useLocation, useNavigate } from "react-router-dom";


// const ScanPage = () => {
//   const [scannedUID, setScannedUID] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { totalAmount } = location.state || {};

//   useEffect(() => {
//     const fetchUid = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/latest-uid");
//         const data = await response.json();
//         if (data.uid) {
//           setScannedUID(data.uid);
//           fetchUserData(data.uid);
//         } else {
//           setError("Failed to get RFID UID. Please scan again.");
//         }
//       } catch (error) {
//         console.error("Error fetching UID:", error);
//         setError("Error fetching UID.");
//       }
//     };

//     fetchUid();
//   },[]);

//   const fetchUserData = (uid) => {
//     const database = getDatabase();
//     const userRef = ref(database, `users/${uid}`);

//     get(userRef)
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           const currentData = snapshot.val();
//           const newBalance = (currentData.balance || 0) - totalAmount;

//           update(userRef, { balance: newBalance, amount: totalAmount })
//             .then(() => {
//               setUserData({ ...currentData, balance: newBalance });
//             })
//             .catch((error) => setError(`Error updating balance: ${error.message}`));
//         } else {
//           setError("User not found.");
//         }
//       })
//       .catch((error) => setError(`Error fetching user data: ${error.message}`));
//   };

//   return (
//     <div className="scan-page-container">
//       <h1 className="fw-bold text-center">Scan your RFID</h1>
//       {scannedUID ? (
//         userData ? (
//           <div className="user-info">
//             <h2 className="text-success">Welcome, {userData.name}!</h2>
//             <h3 className="text-primary">New Balance: ₹{userData.balance}</h3>
//           </div>
//         ) : (
//           <h2 className="text-danger">{error}</h2>
//         )
//       ) : (
//         <h2 className="text-info">Waiting for RFID scan...</h2>
//       )}
//       <button className="btn btn-secondary" onClick={() => navigate("/")}>
//         Back to Home
//       </button>
//     </div>
//   );
// };

// export default ScanPage;

//20/3/25 amount deducted before scan but not doubled
// import React, { useState, useEffect } from "react";
// import { getDatabase, ref, get, update } from "firebase/database";
// import { useLocation, useNavigate } from "react-router-dom";

// const ScanPage = () => {
//   const [scannedUID, setScannedUID] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const [waitingForScan, setWaitingForScan] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { totalAmount } = location.state || {};

//   // Function to fetch a fresh UID
//   const fetchUid = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/latest-uid");
//       const data = await response.json();
//       console.log("Fetched UID:", data.uid);

//       if (data.uid && waitingForScan) {
//         setScannedUID(data.uid);
//         setWaitingForScan(false); // Stop listening for more scans temporarily
//         fetchUserData(data.uid);
//       } else {
//         setError("Please scan your RFID card.");
//       }
//     } catch (error) {
//       console.error("Error fetching UID:", error);
//       setError("Error fetching UID.");
//     }
//   };

  // Fetch user data and update balance only after a valid UID is received
//   const fetchUserData = (uid) => {
//     const database = getDatabase();
//     const userRef = ref(database, `users/${uid}`);

//     get(userRef)
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           const currentData = snapshot.val();
//           const newBalance = (currentData.balance || 0) - totalAmount;

//           update(userRef, { balance: newBalance, amount: totalAmount })
//             .then(() => {
//               setUserData({ ...currentData, balance: newBalance });
//             })
//             .catch((error) =>
//               setError(`Error updating balance: ${error.message}`)
//             );
//         } else {
//           setError("User not found.");
//         }
//       })
//       .catch((error) => setError(`Error fetching user data: ${error.message}`));
//   };

//   // Polling loop that checks for a new UID every second
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (waitingForScan) fetchUid();
//     }, 1000);

//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, [waitingForScan]);

//   return (
//     <div className="scan-page-container">
//       <h1 className="fw-bold text-center">Scan your RFID</h1>
//       {scannedUID ? (
//         userData ? (
//           <div className="user-info">
//             <h2 className="text-success">Welcome, {userData.name}!</h2>
//             <h3 className="text-primary">New Balance: ₹{userData.balance}</h3>
//           </div>
//         ) : (
//           <h2 className="text-danger">{error}</h2>
//         )
//       ) : (
//         <h2 className="text-info">Waiting for RFID scan...</h2>
//       )}
//       <button className="btn btn-secondary" onClick={() => navigate("/")}>
//         Back to Home
//       </button>
//     </div>
//   );
// };

// export default ScanPage;

import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, update } from "firebase/database";
import { useLocation, useNavigate } from "react-router-dom";

const ScanPage = () => {
  const [scannedUID, setScannedUID] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount } = location.state || {};

  // Fetch fresh UID from backend
  const fetchUid = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/latest-uid");
      const data = await response.json();

      if (data.uid && isScanning) {
        setScannedUID(data.uid);
        setIsScanning(false); // Prevent multiple deductions
        fetchUserData(data.uid);
      } else {
        setError("Waiting for a new scan...");
      }
    } catch (error) {
      console.error("Error fetching UID:", error);
      setError("Failed to fetch UID.");
    }
  };

  // Fetch user data and update balance only after a valid scan
  const fetchUserData = (uid) => {
    const database = getDatabase();
    const userRef = ref(database, `users/${uid}`);

    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const currentData = snapshot.val();
          const newBalance = (currentData.balance || 0) - totalAmount;

          // Deduct balance only after successful fetch
          update(userRef, { balance: newBalance, amount: totalAmount })
            .then(() => {
              setUserData({ ...currentData, balance: newBalance });
            })
            .catch((error) =>
              setError(`Error updating balance: ${error.message}`)
            );
        } else {
          setError("User not found.");
        }
      })
      .catch((error) => setError(`Error fetching user data: ${error.message}`));
  };

  // Continuously wait for a new scan — every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (isScanning) fetchUid();
    }, 1000);

    return () => clearInterval(interval);
  }, [isScanning]);

  return (
    <div className="scan-page-container">
      <h1 className="fw-bold text-center">Scan your RFID</h1>
      {scannedUID ? (
        userData ? (
          <div className="user-info">
            <h2 className="text-success">Welcome, {userData.name}!</h2>
            <h3 className="text-primary">New Balance: ₹{userData.balance}</h3>
          </div>
        ) : (
          <h2 className="text-danger">{error}</h2>
        )
      ) : (
        <h2 className="text-info">Waiting for a new RFID scan...</h2>
      )}
      <button className="btn btn-secondary" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default ScanPage;
