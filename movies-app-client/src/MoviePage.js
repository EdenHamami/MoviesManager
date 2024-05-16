import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { deleteMovie,getMovieById } from './api/MoviesApi';
function MoviePage() {
    const {id}=useParams();
    const [movie,setMovie]=useState(null);
    const fetchMovie=async (id)=>{
        const response=await getMovieById(id);
        setMovie(response.data)

    }
    useEffect(() => {
        fetchMovie(id);
      },[id]);
    
      if(!movie){
        return (<div>loading...</div>)
      }

  return (
    <div>
        <div>{movie.name}</div>
    </div>
  )
}

export default MoviePage