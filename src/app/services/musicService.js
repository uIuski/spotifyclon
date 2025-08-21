
export const getMusica = async () => {

  try {
     
    const response = await fetch(`https://v1.nocodeapi.com/${process.env.NEXT_PUBLIC_SPOTIFY_USER_KEY}/spotify/${process.env.NEXT_PUBLIC_SPOTIFY_API_KEY}/search?q=slowdive&type=album,artist,track&perPage=10&page=1`

);
    const data = await response.json();
    console.log("Respuesta de api",data);
   return {
    tracks:
  data.tracks.items,
  artists:
  data.artists.items

   };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};