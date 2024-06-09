import React, { useState } from "react";
import ZoomClass from "../ZoomClass/zoom-class";
// import ZoomClass from "../ZoomClass/zoom-component";
import { videoBaseUrl } from "../../utils/constants";

const ClassroomComponent = () => {
  const [playRecording, setPlayRecording] = useState(false);

  const videoPlayHandler = () => {
    setPlayRecording(!playRecording);
  };

  return (
    <>
      <div>
        <ZoomClass />
        {/* <div id="zmmtg-root" className="zoom-class"></div> */}
        <div>
          <button
            onClick={videoPlayHandler}
            style={{
              padding: "10px",
              borderRadius: "3px",
              backgroundColor: "#008080",
              color: "#ffff",
              margin: "1rem",
              border: "none",
            }}
          >
            {!playRecording ? "Play Recording" : "Stop Recording"}
          </button>
        </div>

        {!playRecording ? (
          <div className="classroom">
            <h3>Notes</h3>
            <div style={{ marginTop: "2rem" }}>
              <div className="form">
                <p>
                  Title: <b>Title here</b>
                </p>

                <p>
                  Description: <b>Description here</b>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: "3rem" }}>
            <video
              width="800px"
              controls
              autoplay
              style={{ maxHeight: "350px" }}
            >
              <source src={videoBaseUrl} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </>
  );
};

export default ClassroomComponent;
