import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div
      className="
      h-screen
      p-6 flex 
      justify-center"
    >
      {children}
    </div>
  );
};

export default AuthLayout;
