import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { useProperty } from "../context/PropertyContext";
import { useMapStyles } from "../styledCmp/MapStyled";

const polygonStyle = {
  fillColor: "#001145",
  strokeWeight: 1,
};

export const PropertyMap = ({ area }) => {
  const { centerdArea } = useProperty();
  const classes = useMapStyles();
  const [center] = useState({ lat: 32.1, lng: 34.85 });
  const [zoom] = useState(11);

  return (
    <div className={classes.map}>
      {!area && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAchi1_MEb0QoTUt3dFyTQ7wJ6Rn7Db574" }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternalss={true}
          onGoogleApiLoaded={({ map }) => {
            map.streetViewControl = true;
          }}
        ></GoogleMapReact>
      )}
      {area && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAchi1_MEb0QoTUt3dFyTQ7wJ6Rn7Db574" }}
          center={center}
          zoom={11}
          onGoogleApiLoaded={({ map, maps }) => {
            map.streetViewControl = true;
            map.data.addGeoJson(area[0]);
            map.data.setStyle(polygonStyle);
            map.setCenter(centerdArea);
            map.setZoom(12);
            // map.setMapTypeId("hybrid");
          }}
          yesIWantToUseGoogleMapApiInternalss={true}
        ></GoogleMapReact>
      )}
    </div>
  );
};
