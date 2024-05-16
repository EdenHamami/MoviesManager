using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using movies_manager_server.Data;
using movies_manager_server.Models;
using System.Threading.Tasks;

namespace movies_manager_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public MoviesController(ApplicationContext context)
        {
            _context = context;
        }

        // GET/api/Movies ---> get all movies
        [HttpGet]
        public async Task<IActionResult> getMovies()
        {
            var movies = await _context.Movies.Find(_ => true).ToListAsync();
            return Ok(movies);
        }

        // GET/api/Movies/{id} ---> get movie by id
        [HttpGet("{id}")]
        public async Task<IActionResult> getMovieById(string id)
        {
            var movie = await _context.Movies.Find(m => m.Id == id).FirstOrDefaultAsync();
            if (movie == null)
            {
                return NotFound();
            }
            return Ok(movie);
        }

        // POST/api/Movies/ ---> fromBody-movie, create new movie
        [HttpPost]
        public async Task<IActionResult> CreateMovie([FromBody] Movie movie)
        {
            movie.Id = null;
            await _context.Movies.InsertOneAsync(movie);
            return CreatedAtAction(nameof(getMovieById), new { id = movie.Id }, movie);
        }

        // PUT/api/Movies/{id} ---> fromBody-movie, update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(string id, [FromBody] Movie movie)
        {
            var movieInDb = await _context.Movies.Find(m => m.Id == id).FirstOrDefaultAsync();
            if (movieInDb == null)
            {
                return NotFound();
            }
            movie.Id = id; // Ensure the movie Id remains the same
            await _context.Movies.ReplaceOneAsync(m => m.Id == id, movie);
            return NoContent();
        }

        // DELETE/api/Movies/{id} ---> delete by id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(string id)
        {
            var movie = await _context.Movies.Find(m => m.Id == id).FirstOrDefaultAsync();
            if (movie == null)
            {
                return NotFound();
            }
            await _context.Movies.DeleteOneAsync(m => m.Id == id);
            return NoContent();
        }
    }
}
