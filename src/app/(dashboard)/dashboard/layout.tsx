import React from "react";
import Sidebar from "./_components/Sidebar";

const layout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div  className="min-h-screen bg-muted/40 lg:flex">
        <Sidebar />

      <main className="flex-2">{children}</main>
      
    </div>
  );
};

export default layout;
