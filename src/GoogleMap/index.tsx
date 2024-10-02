/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { SetStateAction, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  StandaloneSearchBox,
  Libraries,
  Polyline,
} from "@react-google-maps/api";
import { Modal, Space, Input, Button } from "antd";
interface iGoogleMap {
  openMap: boolean;
  setOpenMap: React.Dispatch<SetStateAction<boolean>>;
  location: {
    state: string;
    city: string;
    birthOrDeath: string;
    state2: string;
    city2: string;
  };
  setLocation: React.Dispatch<
    SetStateAction<{
      state: string;
      city: string;
      birthOrDeath: string;
      state2: string;
      city2: string;
    }>
  >;
}

const containerStyle = {
  width: "50vw",
  height: "50vh",
  margin: "20px 0px",
};

const libraries: Libraries = ["places"];

const GoogleMaps: React.FC<iGoogleMap> = ({
  openMap,
  setOpenMap,
  location,
  setLocation,
}) => {
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [value, setValue] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral | undefined
  >({
    lat: 0,
    lng: 0,
  });
  const [position, setPosition] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >({
    lat: 0,
    lng: 0,
  });

  const [position2, setPosition2] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >({
    lat: 0,
    lng: 0,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    language: "en" as string,
    region: "Armenia",
    libraries: libraries,
  });
  const center: google.maps.LatLng | google.maps.LatLngLiteral | undefined = {
    lat: selectedPosition?.lat as number,
    lng: selectedPosition?.lng as number,
  };
  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent): void => {
    setSelectedPosition({
      lat: e.latLng?.lat() as number,
      lng: e.latLng?.lng() as number,
    });
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    console.log(e.latLng?.lat(), e.latLng?.lng(), "kladjfsghbaouic5nsimuhgucs");
    setSelectedPosition({
      lat: e.latLng?.lat() as number,
      lng: e.latLng?.lng() as number,
    });
  };

  const onSearchBoxLoad = (
    ref: React.SetStateAction<google.maps.places.SearchBox | null>
  ): void => {
    setSearchBox(ref);
  };

  const addLocation = (): void => {
    const geocoder = new google.maps.Geocoder();
    void geocoder.geocode(
      { location: selectedPosition?.lat ? selectedPosition : position },
      (results, status) => {
        if (status === "OK" && results && results[0]) {
          const components = results[0].address_components;
          const cityComponent =
            components.find((component) =>
              component.types.includes("locality")
            ) ??
            components.find((component) =>
              component.types.includes("administrative_area_level_2")
            );
          const stateComponent = components.find((component) =>
            component.types.includes("administrative_area_level_1")
          );
          const city = cityComponent ? cityComponent.long_name : "";
          const state = stateComponent ? stateComponent.long_name : "";
          if (city && state) {
            if (location.birthOrDeath) {
              setLocation({ ...location, city2: city, state2: state });
              setPosition2({
                ...position,
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              });
            } else {
              setLocation({ ...location, city: city, state: state });
              setPosition({
                ...position,
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              });
            }

            setOpenMap(false);
            setSelectedPosition({
              lat: 0,
              lng: 0,
            });
            setValue("");
          } else {
            console.log("data chka ");
          }
        } else {
          console.log("Geocoder failed due to:", status);
        }
      }
    );
  };
  console.log(selectedPosition, "loxxxxc");
  const onPlacesChanged = (): void => {
    if (searchBox) {
      const places = searchBox?.getPlaces();
      if (places && places.length > 0) {
        const addressComponents = places[0].address_components;
        const cityComponent =
          addressComponents?.find((component) =>
            component.types.includes("locality")
          ) ??
          addressComponents?.find((component) =>
            component.types.includes("administrative_area_level_2")
          );
        const stateComponent = addressComponents?.find((component) =>
          component.types.includes("administrative_area_level_1")
        );
        const city = cityComponent ? cityComponent.long_name : "";
        const state = stateComponent ? stateComponent.long_name : "";
        if (!city || !state) {
          return;
        }
        if (places[0].geometry?.location) {
          setSelectedPosition({
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng(),
          });
        }
        setValue(city + " " + state);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setValue(e.target.value);
  const handleCancel = (): void => {
    setOpenMap(false);
    if (value) {
      setValue("");
    }
    if (selectedPosition?.lat || selectedPosition?.lng) {
      setSelectedPosition({
        lat: 0,
        lng: 0,
      });
    }
  };

  return (
    <Modal
      centered
      open={openMap}
      footer={true}
      width={"55vw"}
      style={{ height: "50vh" }}
      onCancel={(): void => handleCancel()}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
          heading={undefined}
          onClick={(e) => {
            handleMapClick(e as google.maps.MapMouseEvent);
          }}
          options={{
            mapTypeControl: true,
            fullscreenControl: null,
            disableDefaultUI: true,
          }}>
          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={onPlacesChanged}>
            <Input
              type="text"
              placeholder="Search for a location"
              allowClear
              style={{
                boxSizing: "border-box",
                border: "1px solid transparent",
                width: "20vw",
                height: "32px",
                padding: "0 11px",
                margin: "10px 30%",
                borderRadius: "3px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                fontSize: "16px",
                fontWeight: 600,
                outline: "none",
                textOverflow: "ellipses",
              }}
              value={value}
              onChange={handleChange}
              onTouchCancel={(): void => {
                setValue("");
              }}
            />
          </StandaloneSearchBox>
          {(selectedPosition?.lat ||
            (location.birthOrDeath && position2.lat) ||
            (position.lat && !location.birthOrDeath)) && (
            <MarkerF
              draggable
              position={
                selectedPosition?.lat && selectedPosition.lng
                  ? selectedPosition
                  : location.birthOrDeath && position2.lat
                  ? position2
                  : position
              }
              onDragEnd={handleMarkerDragEnd}
            />
          )}
          <Polyline
            path={[
              {...position as {
                lat: number,
                lng: number,
              }},
              {...position2 as {
                lat: number,
                lng: number,
              }},
            ]}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 1.0,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
      )}
      <Space size={16}>
        <Button onClick={(): void => handleCancel()}>Cancel</Button>
        <Button type="primary" onClick={(): void => void addLocation()}>
          Add Location
        </Button>
      </Space>
    </Modal>
  );
};
export default React.memo(GoogleMaps);
