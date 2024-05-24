import { Podcast } from "../types/podcast";
import { PodcastCard } from "./PodcastCard";

export const Podcasts = ({ podcasts }: { podcasts: Podcast[] }) => {
  return (
    <ul className="w-full grid grid-cols-podcastGrid gap-10">
      {podcasts.length > 0 &&
        podcasts.map((podcast: Podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
    </ul>
  );
};
