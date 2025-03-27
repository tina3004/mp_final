import { useEffect } from "react";

const RedirectToBackend = () => {
useEffect(() => {
window.location.href = "http://localhost:5000/api/latest-uid";  // Redirect to backend
}, []);

return null; // This component renders nothing
};

export default RedirectToBackend;