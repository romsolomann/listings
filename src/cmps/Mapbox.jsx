import ReactMapboxGl from "react-mapbox-gl";
import {
  Popup,
  GeoJSONLayer,
  Cluster,
  Marker,
  ZoomControl,
} from "react-mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useHistory } from "react-router-dom";
import { useProperty } from "../context/PropertyContext";
import { useMapbox } from "../context/MapboxContext";
import { useState } from "react";
import { useEffect } from "react";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicHJvcGRvIiwiYSI6ImNrcjh0Y2lqZTBmdm4ycHA4YmNjeG1qeG8ifQ.5kaJ7ckkIl4-1V4IfKZnIg",
  maxZoom: 12,
  attributionControl: false,
});

export default function Mapbox({ districts, yeshuvim }) {
  let history = useHistory();
  const nDistricts = { type: "FeatureCollection", features: districts };
  const nYeshuvim = { type: "FeatureCollection", features: yeshuvim };
  const { setMap, zoom, setZoom, center, setCenter } = useMapbox();
  const { filterBy, setFilterBy, loadProperties } = useProperty();

  const handleDistrictClick = (district) => {
    yeshuvim.forEach((yeshuv) => (yeshuv.is_clicked = 0));
    districts.forEach((district) => (district.is_clicked = 0));
    district.is_clicked = 1;
    if (district.properties.district === "מחוז חיפה") setZoom(10);
    else if (district.properties.district === "מחוז תל אביב") setZoom(11);
    else if (district.properties.district === "מחוז המרכז") setZoom(9.5);
    else setZoom(8.5);
    setCenter([district.properties.centre[1], district.properties.centre[0]]);
    setFilterBy({ ...filterBy, district: [district.properties.district] });
    history.push({
      pathname: "/",
      search: `?district=${district.properties.district}&area=&minPrice=0&maxPrice=20000000`,
    });
    loadProperties({ ...filterBy, district: [district.properties.district] });
  };

  const handleYeshuvClick = (yeshuv) => {
    if (zoom < 8.5) return;
    districts.forEach((district) => (district.is_clicked = 0));
    yeshuvim.forEach((yeshuv) => (yeshuv.is_clicked = 0));
    yeshuv.is_clicked = 1;
    setZoom(11);
    setCenter([yeshuv.properties.centre[1], yeshuv.properties.centre[0]]);
    setFilterBy({
      ...filterBy,
      district: [],
      area: [yeshuv.properties.yeshuv],
    });
    history.push({
      pathname: "/",
      search: `?district=&area=${yeshuv.properties.yeshuv}&minPrice=0&maxPrice=20000000`,
    });
    loadProperties({
      ...filterBy,
      district: [],
      area: [yeshuv.properties.yeshuv],
    });
  };

  const clusterMarker = (coordinates, pointCount) => {
    return (
      <Marker
        coordinates={coordinates}
        style={{
          width: 8 * pointCount,
          height: 8 * pointCount,
          borderRadius: "50%",
          backgroundColor: "var(--main-prop-color)",
          color: "white",
          fontSize: 12 + pointCount,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        key={(pointCount + 3.5) * 12}
      >
        {pointCount}
      </Marker>
    );
  };

  return (
    nYeshuvim && (
      <div style={{ height: "100%", width: "100%", position: "relative" }}>
        <Map
          center={center}
          zoom={[zoom]}
          style="mapbox://styles/mapbox/light-v10"
          containerStyle={{
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
          onStyleLoad={(map) => setMap(map)}
        >
          {/* ##DISTRICTSLAYER CMP */}
          {nDistricts.features.map((district, idx) => {
            return (
              <GeoJSONLayer
                data={district}
                fillPaint={{
                  "fill-color": district.is_clicked ? "#001145" : "white",
                  "fill-opacity": district.is_clicked ? 0.2 : 0,
                }}
                linePaint={{
                  "line-color": district.is_clicked ? "#ef3043" : "white",
                  "line-width": district.is_clicked ? 1 : 0,
                }}
                key={(idx + 4) * 13}
                fillOnClick={() => handleDistrictClick(district)}
              />
            );
          })}
          {/* ##YESHUVIMLAYER CMP */}
          {nYeshuvim.features.map((yeshuv, idx) => {
            return (
              <>
                <GeoJSONLayer
                  data={yeshuv}
                  fillPaint={{
                    "fill-color": yeshuv.is_clicked ? "#001145" : "white",
                    "fill-opacity": yeshuv.is_clicked ? 0.2 : 0,
                  }}
                  linePaint={{
                    "line-color": yeshuv.is_clicked ? "#ef3043" : "white",
                    "line-width": yeshuv.is_clicked ? 1 : 0,
                  }}
                  key={idx}
                  fillOnClick={() => handleYeshuvClick(yeshuv)}
                ></GeoJSONLayer>
                {yeshuv.is_clicked ? (
                  <Popup
                    coordinates={[
                      yeshuv.properties.centre[1],
                      yeshuv.properties.centre[0],
                    ]}
                    anchor="bottom"
                    offset={{
                      bottom: [0, -80],
                    }}
                  >
                    <p>
                      נמצא {yeshuv.properties.count} נכסים ב-{" "}
                      {yeshuv.properties.yeshuv}
                    </p>
                  </Popup>
                ) : null}
              </>
            );
          })}
          {/* ##CLUSTER CMP */}
          <Cluster ClusterMarkerFactory={clusterMarker} zoomOnClick={true}>
            {nYeshuvim.features.map((feature, key) => (
              <Marker
                key={(key + 3) * 12}
                style={{
                  width: 20 * feature.properties.count,
                  height: 20 * feature.properties.count,
                  fontSize: 13 + feature.properties.count,
                  borderRadius: "50%",
                  backgroundColor: "var(--main-prop-color)",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                coordinates={[
                  feature.properties.centre[1],
                  feature.properties.centre[0],
                ]}
                onClick={() => handleYeshuvClick(feature)}
              >
                {feature.properties.count}
              </Marker>
            ))}
          </Cluster>
          <ZoomControl position="bottom-right" />
        </Map>
      </div>
    )
  );
}
