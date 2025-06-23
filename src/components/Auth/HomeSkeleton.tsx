import React from "react";

const HomeSkeleton: React.FC = () => {
  return (
    <div className=" animate-pulse text-transparent">
      <div className="m-10 flex justify-between">
        <h1 className="text-xl w-44 bg-gray-500">Welcome </h1>
        <button className="bg-primary hover:bg-primary/90   py-1 px-2 rounded-lg w-28 space-x-2  cursor-pointer">
          hello
        </button>
      </div>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 p-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            style={{
              height: Math.floor(Math.random() * (350 - 200 + 1)) + 200,
            }}
            className="mb-4 break-inside-avoid bg-gray-500 dark:bg-gray-800 p-4 space-y-2 rounded relative shadow group z-0"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HomeSkeleton;
