import React from "react";

const Logo = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <img src="/assets/Learntern_Logo.png" alt="Learntern logo" />
    </div>
  );
};

export default Logo;
