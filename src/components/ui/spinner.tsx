import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="loader">
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3; /* Warna abu-abu muda */
          border-top: 8px solid #3498db; /* Warna biru */
          border-radius: 50%;
          width: 50px; /* Ukuran spinner */
          height: 50px; /* Ukuran spinner */
          animation: spin 1s linear infinite; /* Animasi berputar */
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
