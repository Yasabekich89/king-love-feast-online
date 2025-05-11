
"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";

export const FooterBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark overlay for text readability - reduced opacity */}
      <div className="absolute inset-0 bg-brand-blue/50 z-10" />
      
      {/* Background boxes animation - increased opacity */}
      <div className="absolute inset-0 z-0">
        <Boxes
          className="opacity-40 dark:opacity-50"
        />
      </div>
    </div>
  );
};
