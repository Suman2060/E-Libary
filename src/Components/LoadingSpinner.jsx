import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center items-center py-20">
        <div className="animate-bounce rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;