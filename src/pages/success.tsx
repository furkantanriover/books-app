import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Success: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Ödeme Başarılı!</h1>
      <p className="text-lg mb-4">Ödemeniz başarıyla tamamlandı.</p>
      <p className="text-sm text-gray-500">
        Ana sayfaya yönlendiriliyorsunuz...
      </p>
    </div>
  );
};
