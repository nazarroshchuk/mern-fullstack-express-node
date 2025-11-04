import apiAxios from "./axios.js";
import HttpError from "../models/http-error.js";


export async function getCoordsForAddress(address) {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_PLACES_API_KEY}`

    const { data } = await apiAxios.get(geocodeUrl)

    if (data && data.status === "ZERO_RESULTS") {
        throw new HttpError("Could not find location for the specified address.", 422);
    }

    return data.results[0].geometry.location;
}