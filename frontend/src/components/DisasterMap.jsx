import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DisasterMap = ({ reports = [] }) => {
  // Default location: Dhaka, Bangladesh
  const defaultPosition = [23.8103, 90.4125];

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <MapContainer
        center={defaultPosition}
        zoom={7}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        {/* OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Disaster Reports */}
        {reports.map((report) => {
          // Support different possible coordinate formats
          const lat =
            report.latitude ??
            report.location?.latitude ??
            report.coordinates?.lat;

          const lng =
            report.longitude ??
            report.location?.longitude ??
            report.coordinates?.lng;

          // Don't show marker if coordinates are missing
          if (!lat || !lng) return null;

          return (
            <Marker key={report._id} position={[lat, lng]}>
              <Popup>
                <div>
                  <h5>{report.title || "Disaster Report"}</h5>

                  <p>
                    <strong>Type:</strong>{" "}
                    {report.disasterType || report.type || "Unknown"}
                  </p>

                  <p>
                    <strong>Severity:</strong>{" "}
                    {report.severity || "Unknown"}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {report.status || "Pending"}
                  </p>

                  <p>
                    {report.description || "No description available"}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default DisasterMap;