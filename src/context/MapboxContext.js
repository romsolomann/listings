import { createContext, useContext, useEffect, useState } from "react";


const MapboxContext = createContext();

export const MapboxProvider = ({children}) => {
    const [map,setMap] = useState(null);
    const [zoom, setZoom] = useState(7);
    const [center, setCenter] = useState([34.79482056785241, 32.08440630136077]);
    const [isMapDisplay, setIsMapDisplay] = useState(false);
    

    return (
        <MapboxContext.Provider value={{map,setMap,zoom,setZoom,center,setCenter,isMapDisplay, setIsMapDisplay}}>
            {children}
        </MapboxContext.Provider>
    )
}

export const useMapbox = () => useContext(MapboxContext)