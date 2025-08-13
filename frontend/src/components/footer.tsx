"use client";

export const Footer = () => {
  return (
    <div className="mt-10 w-full bg-transparent text-gray-200 shadow-inner">
      <div className="p-6">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full flex flex-row items-center justify-around flex-wrap">
            <div className="hidden md:flex flex-row gap-5"></div>
          </div>

          <div className="mt-6 text-[15px] text-center text-gray-400">
            &copy; Ted and Fabian {new Date().getFullYear()} Inc. All rights
            reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
