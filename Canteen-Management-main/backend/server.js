// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const admin = require("firebase-admin");

// const serviceAccount = require("./firebase-adminsdk.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://minifrontend-c8f04-default-rtdb.asia-southeast1.firebasedatabase.app/",
// });

// const db = admin.database();
// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// let latestScannedUID = null; 

// app.get("/", (req, res) => res.send("Working"));


// app.post("/api/rfid", async (req, res) => {
//   const { uid ,name,balance,totalAmount } = req.body;
//   console.log("Received RFID UID:", uid);
//   // console.log("Received RFID name:", name);
//   // console.log("Received RFID balance:", balance);
//   // console.log("Received RFID totalAmount:", totalAmount);
//   // return res.json({ message: "RFID received", uid: uid });
//   latestScannedUID = uid; 

//   try {
//     const userRef = db.ref(`users/${uid}`);
//     const snapshot = await userRef.once("value");

//     if (!snapshot.exists()) {
//       return res.status(404).json({ message: "User not found", uid });
//     }

//     // let userData = snapshot.val();
//     // let updatedBalance = userData.balance - 50;

    

//     // console.log("User Data:", userData);
//     // console.log("Updated Balance:", updatedBalance);

//     // if (updatedBalance < 0) {
//     //   return res.status(400).json({ message: "Insufficient balance", uid });
//     // }

//     // await userRef.update({ balance: updatedBalance });

//     // const updatedSnapshot = await userRef.once("value");
//     const updatedUserData = updatedSnapshot.val();

//     res.json({
//       message: "Transaction successful",
//       uid,
//       name: updatedUserData.name,
//       balance: updatedUserData.balance,
//       email: updatedUserData.email || "N/A", // Add email if needed
//     });
//   } catch (error) {
//     console.error("Error processing RFID:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// app.get("/api/latest-uid", async (req, res) => {
//   if (!latestScannedUID) {
//     return res.status(404).json({ message: "No RFID scanned yet" });
//   }

//   try {
//     console.log(latestScannedUID)
//     const userRef = db.ref(`users/${latestScannedUID}`);
//     const snapshot = await userRef.once("value");

//     console.log("Snapshot exists:", snapshot.exists());
//     console.log("Snapshot data:", snapshot.val());

//     if (!snapshot.exists()) {
//       return res.status(404).json({ message: "User not found", uid: latestScannedUID });
//     }

//     let userData = snapshot.val();

//     res.json({
//       uid: latestScannedUID,
//       name: userData.name,
//       balance: userData.balance,
//       // email: userData.email || "N/A",
//     });
//   } catch (error) {
//     console.error("Error fetching latest UID details:", error);
//     res.status(500).json({ message: "Server error" });
//   }
  
// });

// app.listen(5000, () => console.log("Server running on port 5000"));


// // const express = require("express");
// // const bodyParser = require("body-parser");
// // const cors = require("cors");
// // const admin = require("firebase-admin");

// // const serviceAccount = require("./firebase-adminsdk.json");

// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount),
// //   databaseURL: "https://minifrontend-c8f04-default-rtdb.asia-southeast1.firebasedatabase.app/",
// // });

// // const db = admin.database();
// // const app = express();

// // app.use(cors());
// // app.use(bodyParser.json());

// // let latestScannedUID = null;

// // app.get("/", (req, res) => res.send("Working"));

// // app.post("/api/rfid", async (req, res) => {
// //   const { uid, name, balance, totalAmount } = req.body;
// //   console.log("Received RFID UID:", uid);
// //   console.log("Received RFID name:", name);
// //   console.log("Received RFID balance:", balance);
// //   console.log("Received total amount:", totalAmount);

// //   latestScannedUID = uid;

// //   try {
// //     const userRef = db.ref(`users/${uid}`);
// //     const snapshot = await userRef.once("value");

// //     if (!snapshot.exists()) {
// //       return res.status(404).json({ message: "User not found", uid });
// //     }

// //     let userData = snapshot.val();
// //     let updatedBalance = userData.balance - totalAmount;

// //     console.log("User Data:", userData);
// //     console.log("Updated Balance:", updatedBalance);

// //     if (updatedBalance < 0) {
// //       return res.status(400).json({ message: "Insufficient balance", uid });
// //     }

// //     await userRef.update({ balance: updatedBalance });

// //     const updatedSnapshot = await userRef.once("value");
// //     const updatedUserData = updatedSnapshot.val();

// //     res.json({
// //       message: "Transaction successful",
// //       uid,
// //       name: updatedUserData.name,
// //       balance: updatedUserData.balance,
// //       email: updatedUserData.email || "N/A",
// //     });
// //   } catch (error) {
// //     console.error("Error processing RFID:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // app.get("/api/latest-uid", async (req, res) => {
// //   if (!latestScannedUID) {
// //     return res.status(404).json({ message: "No RFID scanned yet" });
// //   }

// //   try {
// //     console.log(latestScannedUID);
// //     const userRef = db.ref(`users/${latestScannedUID}`);
// //     const snapshot = await userRef.once("value");

// //     console.log("Snapshot exists:", snapshot.exists());
// //     console.log("Snapshot data:", snapshot.val());

// //     if (!snapshot.exists()) {
// //       return res.status(404).json({ message: "User not found", uid: latestScannedUID });
// //     }

// //     let userData = snapshot.val();

// //     res.json({
// //       uid: latestScannedUID,
// //       name: userData.name,
// //       balance: userData.balance,
// //       email: userData.email || "N/A",
// //     });
// //   } catch (error) {
// //     console.error("Error fetching latest UID details:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // app.listen(5000, () => console.log("Server running on port 5000"));


const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://minifrontend-c8f04-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const db = admin.database();
const app = express();

app.use(cors());
app.use(bodyParser.json());

let latestScannedUID = null;
let lastScanTime = 0; // Track last scan timestamp

app.get("/", (req, res) => res.send("Working"));

app.post("/api/rfid", async (req, res) => {
  const { uid, name, balance, totalAmount } = req.body;
  console.log("Received RFID UID:", uid);

  // Only store UID if it's different from last scan or timeout passed
  const now = Date.now();
  if (uid !== latestScannedUID || now - lastScanTime > 5000) { // 5s timeout to avoid re-use
    latestScannedUID = uid;
    lastScanTime = now;

    try {
      const userRef = db.ref(`users/${uid}`);
      const snapshot = await userRef.once("value");

      if (!snapshot.exists()) {
        return res.status(404).json({ message: "User not found", uid });
      }

      const updatedUserData = snapshot.val();

      res.json({
        message: "RFID received and stored",
        uid,
        name: updatedUserData.name,
        balance: updatedUserData.balance,
        email: updatedUserData.email || "N/A",
      });
    } catch (error) {
      console.error("Error processing RFID:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(400).json({ message: "Duplicate scan detected or too fast" });
  }
});

app.get("/api/latest-uid", async (req, res) => {
  if (!latestScannedUID) {
    return res.status(404).json({ message: "No RFID scanned yet" });
  }

  try {
    const userRef = db.ref(`users/${latestScannedUID}`);
    const snapshot = await userRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "User not found", uid: latestScannedUID });
    }

    const userData = snapshot.val();

    res.json({
      uid: latestScannedUID,
      name: userData.name,
      balance: userData.balance,
    });

    // Reset UID after use to prevent stale reads
    latestScannedUID = null;
  } catch (error) {
    console.error("Error fetching latest UID details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
