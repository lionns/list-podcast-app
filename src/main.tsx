import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/root.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { PodcastPage } from "./routes/podcastPage.tsx";
import { EpisodePage } from "./routes/episodePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/podcast/:podcastId",
        element: <PodcastPage />,
      },
      {
        path: "/podcast/:podcastId/episode/:episodeId",
        element: <EpisodePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
