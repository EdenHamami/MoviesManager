import React from 'react'
import "./MovieCard.css"
import { Link } from 'react-router-dom'
function MovieCard({movie}) {
  return (
    <div className='movie-card'>
        <Link to={`${movie.id}`}>
    <img src={movie.image} alt='logo'></img>
    <div className='movie-card-content'>
        <h1 className='movie-card-name'>{movie.name}</h1>
        <div className='movie-card-category'>{movie.category}</div>
        <p className='movie-card-summary'>{movie.summary}</p>

    </div></Link>
    </div>
      )
}

export default MovieCard