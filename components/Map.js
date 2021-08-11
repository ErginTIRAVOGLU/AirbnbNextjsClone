import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { getCenter } from 'geolib';
import Image from "next/image"
function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({});
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    console.log(selectedLocation);  
    const center = getCenter(coordinates);

    const [viewport,setViewport] =useState({
        width:"100%",
        height:"100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 8
    });
    return (
        <ReactMapGL 
         mapStyle="mapbox://styles/ergint/cks7nzx9q17f517qub4k0n4gm"
         mapboxApiAccessToken={process.env.mapbox_key}
         {...viewport}
         onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker longitude={result.long} latitude={result.lat} offsetLeft={-20} offsetTop={-10} >
<p role="img" onClick={() => setSelectedLocation(result)} className="cursor-pointer text-2xl hover:animate-pulse  "><Image src="/pin.png" objectFit="contain" width="20" height="20"  /> </p>
                    </Marker>

                    {selectedLocation.long === result.long ? (
                        <Popup 
                        closeOnClick={true} 
                        onClose={() => setSelectedLocation({})}
                        latitude={result.lat}
                        longitude={result.long}
                        className=""
                        
                        >
                            {result.title}
                        </Popup>
                    ):(
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
