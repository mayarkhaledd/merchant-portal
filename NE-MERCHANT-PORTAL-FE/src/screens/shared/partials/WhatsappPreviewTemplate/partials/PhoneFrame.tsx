// components/PhoneFrame.tsx
import React from "react";
import whatsappBG from "@ejada/common/assets/whatsappBG.png";

export const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="flex items-center justify-center w-full">
    <div className="relative w-[280px] h-[560px] bg-gray-800 rounded-[2.5rem] shadow-2xl border-4 border-gray-800">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-800 rounded-full" />
      <div className="absolute top-6 left-1.5 right-1.5 bottom-6 bg-white rounded-[2rem] overflow-hidden">
        <div
          className="h-full w-full p-3 overflow-y-auto"
          style={{
            background: `url(${whatsappBG}) repeat`,
            backgroundSize: "150px",
            backgroundPosition: "center",
            opacity: 0.7,
          }}
        >
          {children}
        </div>
      </div>
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gray-800 rounded-full" />
    </div>
  </div>
);
