
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <Crown className="text-brand-gold mb-4" size={48} />
      <h1 className="text-5xl font-bold text-brand-blue mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8 text-center">
        The royal page you're looking for has been moved or doesn't exist.
      </p>
      <Button 
        asChild
        className="bg-brand-blue hover:bg-brand-gold text-white"
      >
        <Link to="/">
          Return to Kingdom
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
