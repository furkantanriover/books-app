import Header from "components/Header";
import React from "react";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className=" md:px-36 px-4  bg-[var(--color-background)]  text-[var(--color-text)] min-h-screen">
        <div className="pt-[100px]">{children}</div>
      </div>
    </div>
  );
};

export default BaseLayout;
