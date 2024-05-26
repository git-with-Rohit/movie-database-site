import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const MOVIEDETAILSAPI = 'https://api.themoviedb.org/3/movie/';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [credits, setCredits] = useState<any[]>([]);
  const [video, setVideo] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id);
    }
  }, [id]);

  const fetchMovieDetails = (movieId: string) => {
    fetch(`${MOVIEDETAILSAPI}${movieId}?api_key=d2821eff1517b1cd92deed4b166ec08f&append_to_response=credits,images,videos`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setImages(data.images.posters.slice(0, 10));
        setCredits(data.credits.cast);
        const trailer = data.videos.results.find((vid: any) => vid.type === 'Trailer');
        setVideo(trailer ? `https://www.youtube.com/embed/${trailer.key}` : null);
      });
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <div className="topnav">
        <a className="active" href="/">MovieFlix</a>
      </div>
      <div className="background" style={{ backgroundImage: `url(${IMG_PATH + movie.backdrop_path})` }}>
        <div className="overlay"></div>
        <div className="container">
          <div className="movie-header">
            <img src={IMG_PATH + movie.poster_path} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
              <h1>{movie.title}</h1>
              <p className="release-date">Release Date: {movie.release_date}</p>
              <p className="rating">Rating: {movie.vote_average}</p>
              <p className="description">{movie.overview}</p>
            </div>
          </div>
          {video && (
            <div className="video-section">
              <h2>Trailer</h2>
              <iframe
                width="560"
                height="315"
                src={video}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Movie Trailer"
              ></iframe>
            </div>
          )}
          <h2 className="section-title">Cast</h2>
          <div className="credits">
            {credits.map(actor => (
              <div key={actor.cast_id} className="actor">
                {actor.name} as {actor.character}
              </div>
            ))}
          </div>
          <h2 className="section-title">Images</h2>
          <div className="image-container">
            {images.map(image => (
              <img key={image.file_path} src={IMG_PATH + image.file_path} className="thumbnail" alt="Movie Poster" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
