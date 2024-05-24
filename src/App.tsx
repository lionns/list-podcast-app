import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  getPodcastsAsync,
  Podcast,
  searchPodcast,
} from "./features/podcast/podcastSlice";
import { Podcasts } from "./components/Podcasts";

export const App = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const podcasts: Podcast[] = useAppSelector(
    (state) => state.podcast.filteredPodcasts
  );

  useEffect(() => {
    dispatch(getPodcastsAsync());
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  useEffect(() => {
    dispatch(searchPodcast(search));
  }, [search]);

  return (
    <>
      <section>
        <div className="my-10 flex justify-end gap-5 items-center">
          <p className="p-1 bg-blue-400 text-blue-800 rounded-lg">
            {podcasts.length}
          </p>
          <form>
            <input
              className="border-2 rounded-lg p-2"
              name="query"
              onChange={(e) => handleChange(e)}
              placeholder="Filter podcast..."
              type="text"
            />
          </form>
        </div>
      </section>
      <main>
        <Podcasts podcasts={podcasts} />
      </main>
    </>
  );
};
