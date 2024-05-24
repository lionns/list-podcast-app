import { Episode, Podcast } from "../features/podcast/podcastSlice";

export const EpisodesTable = ({ podcast }: { podcast: Podcast }) => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-left">
          <th scope="col" className="px-6 py-3">
            Title
          </th>
          <th scope="col" className="px-6 py-3">
            Date
          </th>
          <th scope="col" className="px-6 py-3">
            Duration
          </th>
        </tr>
      </thead>
      <tbody>
        {podcast.episodes?.map((episode: Episode) => (
          <tr key={episode.id}>
            <td scope="row" className="px-6 py-3">
              <a href="#">{episode.title}</a>
            </td>
            <td className="px-6 py-3">{episode.date}</td>
            <td className="px-6 py-3">{episode.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
