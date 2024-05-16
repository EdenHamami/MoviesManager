import React from 'react'
import MovieCard from './MovieCard'
import "./moviesList.css"
function MoviesList({relevantMovies}) {
  if (!relevantMovies) {
    return <div>Loading movies...</div>;
  }
  return (
    <div className='moviesList'>
        {relevantMovies.map(movie=>(
            <MovieCard key={movie.id} movie={movie}/>
        ))}
    </div>
  )
}

export default MoviesList