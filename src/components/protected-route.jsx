
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/predictions/verify", {
          method:'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json()
        console.log('response token', res, json)
        if(json.error && json.error.includes("unauthorized")){
          setIsValid(false)
        }
        else {
          setIsValid(true)
        }
        //setIsValid(res.ok);
      } catch (e){
        console.log("catching ehre", e)
        setIsValid(false);
      }
    };

    verifyToken();
  }, []);
  console.log("isvalids", isValid)

  if (isValid === null) return <div>Loading...</div>;
  if (!isValid) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
