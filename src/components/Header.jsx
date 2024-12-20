import React, { useEffect, useState } from "react";

const Header = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    document.title = "UNA BOT";
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="flex relative text-center mx-6 w-full h-24 justify-center items-center">
      <div className="flex-1">
        <img
          src="/unalogo.png"
          alt="UNA Logo"
          className="text-white mx-auto font-semibold h-3/4 sm:w-80 w-72"
        />
      </div>
      <div className="sm:block hidden text-white font-[500] lg:text-sm text-xs bg-[#104a36]/50 border-white px-4 py-2 absolute right-0 rounded-full">
        {currentDate}
      </div>
    </div>
  );
};
export default Header;
