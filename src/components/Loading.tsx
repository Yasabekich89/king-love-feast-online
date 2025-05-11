
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-white">
      <div className="relative flex">
        <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-brand-gold animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
