import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";

export interface Podcast {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
}

export interface PodcastSliceState {
  podcasts: Podcast[];
  filteredPodcasts: Podcast[];
  status: "idle" | "loading" | "failed";
  search: string;
}

const initialState: PodcastSliceState = {
  podcasts: [],
  filteredPodcasts: [],
  status: "idle",
  search: "",
};

const API_URL =
  "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

const mapPodcasts = (data: any): Podcast[] => {
  return (
    data?.feed?.entry?.map((podcast: any) => ({
      id: podcast.id.attributes["im:id"],
      title: podcast.title.label.split("-")[0].trim(),
      author: podcast["im:artist"].label,
      coverImage: podcast["im:image"][2].label,
      description: podcast.summary.label,
    })) || []
  );
};

export const podcastSlice = createAppSlice({
  name: "podcast",
  initialState,
  reducers: (create) => ({
    searchPodcast: create.reducer((state, action: PayloadAction<string>) => {
      state.filteredPodcasts =
        action.payload === ""
          ? state.podcasts
          : state.podcasts.filter(
              (podcast) =>
                podcast.title
                  .toLocaleLowerCase()
                  .includes(action.payload.toLocaleLowerCase()) ||
                podcast.author
                  .toLocaleLowerCase()
                  .includes(action.payload.toLocaleLowerCase())
            );
    }),
    getPodcastsAsync: create.asyncThunk(
      async () => {
        const response = await fetch(API_URL);
        const podcastsResponse = await response.json();
        const mappedPodcasts = mapPodcasts(podcastsResponse);
        return mappedPodcasts;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.podcasts = action.payload;
          state.filteredPodcasts = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
});

export const { searchPodcast, getPodcastsAsync } = podcastSlice.actions;
