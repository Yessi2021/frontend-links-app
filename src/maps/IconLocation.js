import ImgIcon from "../assets/venue_location_icon.svg"
import  L  from "leaflet"

export const IconLocation = new L.Icon({
    iconUrl: ImgIcon,
    iconRetinaUrl: ImgIcon,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: "leaflet-venue-icon",
})