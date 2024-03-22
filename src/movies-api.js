import axios from "axios";

const accessKey = '7b32b54cc3cfef27c3ffdf423e5a8b38';
 const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjMyYjU0Y2MzY2ZlZjI3YzNmZmRmNDIzZTVhOGIzOCIsInN1YiI6IjY1ZWYxNTFkOTNkYjkyMDE4NjVlNDJlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jThC10ecgdC6Aerw8up_5EeJN8X40S_Om0kGEUj3ZX8";

export const getTrendingMovies = async () => {
    const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US'
  try {
    const response = await axios.get(url, {
        params: {
            api_key: accessKey,
         headers: {
        Authorization: `Bearer ${accessToken}`
           }
      },
    });
      return response.data
  } catch (error) {
    console.error(error);
    throw error;     }
}

export const getTrendingMoviesById = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${accessKey}`;
  try {
    const response = await axios.get(url, {
      params: {
        api_key: accessKey,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      },
    });
    const dataWithFullImageUrls = {
      ...response.data,
      poster_path: `https://image.tmdb.org/t/p/w500/${response.data.poster_path}`
    };
    return dataWithFullImageUrls;
  } catch (error) {
    console.error('Помилка:', error);
    throw error
  }
};

export const getSearchMoives = async (query) => {
  const url = 'https://api.themoviedb.org/3/search/movie';
  try {
    const response = await axios.get(url, {
      params: {
        api_key: accessKey,
        query: query,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      },
    });
    return response.data.results;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMovieCast = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${accessKey }`;
  try {
    const response = await axios.get(url, {
      params: {
        api_key: accessKey,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    });
    return response.data;
  } catch (error) {
   console.error(error);
    throw error;
  }
};

 export const getMovieReview = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${accessKey }`;
  try {
    const response = await axios.get(url, {
        params: {
        api_key: accessKey,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    })
    return response.data;
  } catch (error) {
     console.error(error);
    throw error;
  }

}