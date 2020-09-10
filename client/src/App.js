import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 36.7,
    longitude: -95.665,
    zoom: 3
  });

  // useEffect behaves like componentDidMount in that we can create a function that only runs once
  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();

  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {
        logEntries.map(entry => (
          <>
            <Marker
              key={entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude}
            // offsetLeft={-12}
            // offsetTop={-24}
            >
              <div
                onClick={() => setShowPopup({
                  //...showPopup,
                  [entry._id]: true,
                })}
              >
                <img
                  className="marker"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }}
                  src="https://i.imgur.com/y0G5YTX.png"
                  alt="marker"
                />
                {/* <svg
                className="marker"
                style={{
                  width: "24px",
                  height: "24px",
                }}
                viewBox="0 0 24 24"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
              </svg> */}
              </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
              <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                  </div>
                </Popup>
              ) : null
            }
          </>
        ))
      }

    </ReactMapGL>
  );
}

export default App;