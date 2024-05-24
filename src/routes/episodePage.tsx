import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  Episode,
  Podcast,
  selectEpisode,
} from "../features/podcast/podcastSlice";
import { useEffect } from "react";
import { PodcastInfoCard } from "../components/PodcastInfoCard";

export const EpisodePage = () => {
  const { episodeId } = useParams();
  const dispatch = useAppDispatch();
  const podcast: Podcast = useAppSelector(
    (state) => state.podcast.selectedPodcast
  );
  const episode: Episode = useAppSelector(
    (state) => state.podcast.selectedEpisode
  );

  useEffect(() => {
    if (episodeId) dispatch(selectEpisode(episodeId));
  }, [episode]);

  return (
    <main className="py-10 grid md:grid-cols-3 md:gap-10 gap-y-10">
      <PodcastInfoCard podcast={podcast} />
      {episode.id !== "" && (
        <section className="w-full self-start md:col-span-2 space-y-10 shadow-md p-5">
          <h2 className="font-bold text-2xl">{episode.title}</h2>
          <p
            className="italic"
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
          <audio className="w-full" controls src={episode.episodeUrl}></audio>
        </section>
      )}
    </main>
  );
};
