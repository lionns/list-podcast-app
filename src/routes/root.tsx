import { NavLink, Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <div className="p-10 w-full max-w-6xl m-auto">
      <header className="flex justify-between items-center border-b-2 pb-5">
        <NavLink to="/" className="">
          <h1 className="font-bold text-3xl text-blue-800">Podcaster</h1>
        </NavLink>
        <div className="w-5 h-5 bg-blue-400 rounded-full"></div>
      </header>
      <Outlet />
    </div>
  );
};
