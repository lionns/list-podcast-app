import { NavLink } from "react-router-dom";
import { Podcast } from "../types/podcast";

export const PodcastCard = ({ podcast }: { podcast: Podcast }) => (
  <li className="h-full">
    <NavLink to={`podcast/${podcast.id}`}>
      <article className="min-h-full p-5 cursor-pointer border rounded-lg shadow-md hover:shadow-2xl flex flex-col gap-5 justify-center items-center text-center transition-all duration-300 ease-in-out">
        <img className="rounded-full" src={podcast.coverImage} alt="" />
        <h2 className="font-bold uppercase">{podcast.title}</h2>
        <span className="text-gray-500">Author: {podcast.author}</span>
      </article>
    </NavLink>
  </li>
);
