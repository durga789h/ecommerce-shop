import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []); // Empty dependency array ensures this effect runs only once after component mount

  return null; // Since this component doesn't render anything, return null
}
//navigate donot call directly it need function or useeffect