import React from 'react';
import { useNavigate } from 'react-router-dom';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const openMovieDetails = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="card" onClick={() => openMovieDetails(movie.id)}>
      <img className="thumbnail" src={IMG_PATH + movie.poster_path} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="release-date">{movie.release_date}</p>
        <p className="overview">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
