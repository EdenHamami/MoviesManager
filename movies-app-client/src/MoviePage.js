import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from './api/MoviesApi';
import './MoviePage.css';

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const fetchMovie = async (id) => {
    const response = await getMovieById(id);
    setMovie(response.data);
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-page">
      <div className="movie-content">
        <img src={movie.image} alt={movie.name} />
        <div className="movie-page-content">
          <div className="movie-page-name">{movie.name}</div>
          <div className="movie-page-description">{movie.description}</div>
          <div className="movie-page-header">Year Of Release</div>
          <div className="movie-page-yearOfRelease">{movie.yearOfRelease}</div>
          <div className="movie-page-header">Actors</div>
          <ul className="movie-page-actors">
            {movie.actors.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>
          <div className="movie-page-header">Duration</div>
          <div className="movie-page-duration">{movie.duration} minutes</div>
          <div className="movie-page-header">Category</div>
          <div className="movie-page-category">{movie.category}</div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
