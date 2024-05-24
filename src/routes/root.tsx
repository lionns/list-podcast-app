import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getPodcastsAsync } from "../features/podcast/podcastSlice";
import { useEffect } from "react";

export const Root = () => {
  const { status } = useAppSelector((state) => state.podcast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPodcastsAsync());
  }, []);

  return (
    <div className="p-10 w-full max-w-6xl m-auto">
      <header className="flex justify-between items-center border-b-2 pb-5">
        <NavLink to="/">
          <h1 className="font-bold text-3xl text-blue-800">Podcaster</h1>
        </NavLink>
        {status > 0 && (
          <div className="w-5 h-5 bg-blue-700 rounded-full animate-ping"></div>
        )}
      </header>
      <Outlet />
    </div>
  );
};
