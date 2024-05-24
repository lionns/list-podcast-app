import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchPodcastInfoById,
  Podcast,
} from "../features/podcast/podcastSlice";
import { PodcastInfoCard } from "../components/PodcastInfoCard";
import { EpisodesTable } from "../components/EpisodesTable";

export const PodcastPage = () => {
  const { podcastId } = useParams();
  const dispatch = useAppDispatch();
  const selectedPodcast: Podcast = useAppSelector(
    (state) => state.podcast.selectedPodcast
  );

  useEffect(() => {
    if (podcastId) dispatch(fetchPodcastInfoById(podcastId));
  }, []);

  return (
    <>
      {selectedPodcast.id === podcastId && (
        <main className="py-10 grid md:grid-cols-3 md:gap-10 gap-y-10">
          <PodcastInfoCard podcast={selectedPodcast} />
          <section className="w-full md:col-span-2 space-y-10">
            <div className="shadow-md p-5">
              <h3 className="font-bold text-2xl">
                Episodes: {selectedPodcast.totalEpisodes}
              </h3>
            </div>
            <div className="w-full relative shadow-md p-5">
              <EpisodesTable podcast={selectedPodcast} />
            </div>
          </section>
        </main>
      )}
    </>
  );
};
