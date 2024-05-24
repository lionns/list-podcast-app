# Podcast App

### Endpoints:
```txt
100 Podcasts List -> https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json

Podcast Info -> https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/lookup?id=${PodcastId}&media=podcast&entity=podcastEpisode&limit=20')}
```
### Requisitos

- Node JS v12+
- npm v6+
- ReactJS / TailwindCSS / React Redux 

### Instalación

1. Clonación del repositorio:

```sh
git clone https://github.com/lionns/podcast-app.git
```

2. Navega al directorio del proyecto:

```sh
cd nombre-del-repo
```

3. Instalación de dependencias

```sh
npm install
```

### Uso

Instrucciones para ejecutar la aplicación en modo desarrollo y producción.

#### Modo Desarrollo

Para iniciar el servidor en modo desarrollo:

```sh
npm run dev
```

### Modo producción

Para inciar el servidor en modo producción:

```sh
npm run build
npm run preview
```

