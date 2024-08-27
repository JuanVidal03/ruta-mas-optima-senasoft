    import { useContext, useEffect, useState } from "react";
    import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from "react-leaflet";
    import "leaflet/dist/leaflet.css";

    import { GlobalContext } from "../context/GlobalContext";

    const Map = ({ longitud, latitud }) => {

        const { locationData, formLocationState } = useContext(GlobalContext);
        const [polylinePotions, setPolylinePositions] = useState([]);

        const [centerPosition, setCenterPosition] = useState([latitud, longitud]);

        useEffect(() => {
            
            if (locationData.length > 0) {

                const polyline = [];

                locationData.forEach(element => {
                    const pushLocation = [element.posY, element.posX];
                    polyline.push(pushLocation);
                });
                
                setPolylinePositions(polyline);
            }

        }, [formLocationState]);

        useEffect(() => {
            if (locationData && locationData.length > 0) {
            const firstLocation = locationData[0];
            setCenterPosition([firstLocation[1], firstLocation[0]]);
            }
        }, [locationData]);


        return (
            <div className="w-full max-w-[1300px] h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {
                    locationData.length > 0 ? (
                        <MapContainer className="w-full h-full" center={ centerPosition } zoom={8} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {
                                locationData?.map(location => (
                                    <Marker key={location.name} position={[location.posY, location.posX]}>
                                        <Popup>{location.name}</Popup>
                                    </Marker>
                                ))
                            }
                            { <Polyline pathOptions={{ color: 'red' }} positions={polylinePotions} /> }
                        </MapContainer>
                    ) : (
                        <MapContainer className="w-full h-full" center={ [latitud, longitud] } zoom={8} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[latitud, longitud]}>
                                <Popup>Popayan</Popup>
                            </Marker>
                        </MapContainer>
                    )
                }

            </div>
        );
    }

    export default Map;
