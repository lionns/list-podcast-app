export const formatDateString = (isoDateString: string): string => {
  const [year, month, day] = isoDateString.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
};

export const formatDurationString = (numero: string) => {
  const horas = Math.floor(parseInt(numero) / 3600000);
  const minutos = Math.floor((parseInt(numero) % 3600000) / 60000);
  const segundos = Math.floor((parseInt(numero) % 60000) / 1000);

  return `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
};

export const isFetchingExpired = (podcastId: string): boolean => {
  const podcastStorage = localStorage.getItem(`podcast_${podcastId}`);
  if (!podcastStorage) return true;
  const data = JSON.parse(podcastStorage);
  
  const nextUpdate = new Date(data.expiry);
  const now = new Date();

  return now >= nextUpdate;
};