import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";

export interface Podcast {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  totalEpisodes?: number;
  episodes?: Episode[];
}

export interface Episode {
  id: string;
  title: string;
  date: string;
  duration: string;
  episodeUrl: string;
  description: string;
}

export interface PodcastSliceState {
  podcasts: Podcast[];
  filteredPodcasts: Podcast[];
  selectedPodcast: Podcast;
  selectedEpisode: Episode;
  status: number;
}

const initialState: PodcastSliceState = {
  podcasts: [],
  filteredPodcasts: [],
  selectedPodcast: {
    id: "",
    title: "",
    author: "",
    coverImage: "",
    description: "",
    totalEpisodes: 0,
    episodes: [],
  },
  selectedEpisode: {
    id: "",
    title: "",
    date: "",
    duration: "",
    episodeUrl: "",
    description: "",
  },
  status: 0,
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

const formatDateString = (isoDateString: string): string => {
  const [year, month, day] = isoDateString.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
};

const formatDurationString = (numero: string) => {
  const horas = Math.floor(parseInt(numero) / 3600000);
  const minutos = Math.floor((parseInt(numero) % 3600000) / 60000);
  const segundos = Math.floor((parseInt(numero) % 60000) / 1000);

  return `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
};

const mapEpisodes = (data: any): Episode[] => {
  return data?.map(
    (episode: any) =>
      ({
        id: episode.trackId,
        title: episode.trackName,
        date: formatDateString(episode.releaseDate),
        duration: formatDurationString(episode.trackTimeMillis),
        episodeUrl: episode.episodeUrl,
        description: episode.shortDescription,
      } || [])
  );
};

export const fetchPodcastInfoById = createAsyncThunk(
  "podcasts/fetchInfoById",
  async (podcastId: string) => {
    const now = new Date();

    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
      )}`
    );
    const data = await response.json();
    const expireDate = now.getHours() + 24;
    console.log(expireDate);
    localStorage.setItem(
      `podcast_${podcastId}`,
      `{value: ${data.contents}, expiry: ${expireDate}}`
    );
    const podcastInfo = JSON.parse(data.contents);
    return { id: podcastId, episodes: podcastInfo.results };
  }
);

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
          state.status += 1;
        },
        fulfilled: (state, action) => {
          state.status -= 1;
          state.podcasts = action.payload;
          state.filteredPodcasts = action.payload;
        },
        rejected: (state) => {
          state.status -= 1;
          console.log(
            "Ocurrio un error al obtener la información de los podcasts"
          );
        },
      }
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchPodcastInfoById.fulfilled,
        (state, action: PayloadAction<{ id: string; episodes: Episode[] }>) => {
          console.log(action.payload.id);

          const infoPodcast = state.filteredPodcasts.find(
            (podcast) => podcast.id === action.payload.id
          );

          console.log(infoPodcast);

          if (infoPodcast) {
            state.selectedPodcast.id = action.payload.id;
            state.selectedPodcast.title = infoPodcast.title;
            state.selectedPodcast.author = infoPodcast.author;
            state.selectedPodcast.coverImage = infoPodcast.coverImage;
            state.selectedPodcast.description = infoPodcast.description;
            state.selectedPodcast.totalEpisodes =
              action.payload.episodes.length - 1;
          }
          state.selectedPodcast.episodes = mapEpisodes(
            action.payload.episodes.slice(1)
          );
          console.log(action.payload.episodes);
          state.status -= 1;
        }
      )
      .addCase(fetchPodcastInfoById.pending, (state) => {
        state.status += 1;
      })
      .addCase(fetchPodcastInfoById.rejected, (state) => {
        console.log("Ocurrio un error al obtener los episodios del podcast");
        state.status -= 1;
      });
  },
});

export const { searchPodcast, getPodcastsAsync } = podcastSlice.actions;
