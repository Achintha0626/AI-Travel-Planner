export const GetPhotoRef = async (placeName) => {
  const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY;

  // Ensure query is URL encoded
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    placeName
  )}&key=${API_KEY}`;

  try {
    const resp = await fetch(url);
    const result = await resp.json();

    console.log("Google Places API Response:", result); // Debugging

    if (result.results.length > 0 && result.results[0].photos) {
      return result.results[0].photos[0].photo_reference;
    } else {
      console.warn("No photo reference found for:", placeName);
      return null;
    }
  } catch (error) {
    console.error("Error fetching place photo:", error);
    return null;
  }
};
