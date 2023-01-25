const fetchBtn = document.querySelector('.fetch-btn');
const movies = document.getElementById('movies');
let loading = false;

const getMovies = async () => {
  loading = true;
  try {
    if (loading) movies.innerHTML = 'Loading...';
    const response = await fetch('http://localhost:3000/api/v1/movies');
    const data = await response.json();
    loading = false;
    movies.innerHTML = data.result
      .map(
        (movie) => `
          <aside>
            <header style="padding:0;">
              <h3>${movie.title}</h3>
              <img src=${movie.poster} width="220px" height="326px"/>
            </header>
            <p><small>Actors: ${movie.actors.join(', ')}</small></p>
            <p><small>Release year: ${movie.releaseYear}</small></p>
          </aside>
    `
      )
      .join('');
  } catch (error) {
    console.error(error);
    loading = false;
    movies.innerHTML = 'Error message: ' + error.message;
  }
};

fetchBtn.onclick = () => getMovies();
