//src/api/MoviesApi.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://localhost:7064/api', // Adjust based on your API URL
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getMovies = () => apiClient.get('/Movies');
export const getMovieById = (id) => apiClient.get(`/Movies/${id}`);
export const createMovie = (movie) => apiClient.post('/Movies', movie);
export const deleteMovie = (id) => apiClient.delete(`/Movies/${id}`);
export const editMovie=(id,movie)=>apiClient.put( `/Movies/${id}`,movie);