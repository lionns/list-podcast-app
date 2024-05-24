import { Link } from "react-router-dom";
import { Podcast } from "../features/podcast/podcastSlice";

export const PodcastInfoCard = ({ podcast }: { podcast: Podcast }) => {
  return (
    <aside className="w-full self-start shadow-md p-5 flex flex-col items-start gap-5">
      <Link to={`/podcast/${podcast.id}`} className="self-center">
        <img className="rounded-md" src={podcast.coverImage} alt="" />
      </Link>
      <div className="w-full h-[2px] bg-gray-200"></div>
      <div>
        <Link replace={true} to={`/podcast/${podcast.id}`}>
          <h2 className="font-bold">{podcast.title}</h2>
        </Link>
        <span className=" italic">by {podcast.author}</span>
      </div>
      <div className="w-full h-[2px] bg-gray-200"></div>
      <p className="w-full break-words">
        <span className="font-bold">Description:</span>
        <br />{podcast.description}
      </p>
    </aside>
  );
};
