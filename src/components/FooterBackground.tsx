
"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";

export const FooterBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-brand-blue/80 z-10" />
      
      {/* Background boxes animation */}
      <div className="absolute inset-0 z-0">
        <Boxes
          className="opacity-20 dark:opacity-30"
        />
      </div>
    </div>
  );
};
