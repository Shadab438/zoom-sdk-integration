import React from "react";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareWebSDK();

const ZoomClass = () => {
  const client = ZoomMtgEmbedded.createClient();
  // console.log(client);

  var authEndpoint = "http://localhost:4000/join";
  var sdkKey = "W6fa6PGhSbytdro32CQsjA";
  var meetingNumber = "84389181729";
  var passWord = "7fXA4S";
  var role = 0;
  var userName = "React-new";
  var userEmail = "";
  var registrantToken = "";
  var zakToken = "";
  var leaveUrl = "http://localhost:3000";

  function getSignature(e) {
    e.preventDefault();

    fetch(authEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        startMeeting(response.signature);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const startMeeting = (signature) => {
    let meetingSDKElement = document.getElementById("meetingSDKElement");

    client
      .init({
        debug: true,
        zoomAppRoot: meetingSDKElement,
        language: "en-US",
        patchJsMedia: true,
        customize: {
          video: {
            isResizable: true,
            viewSizes: {
              default: {
                width: 800,
                height: 400,
              },
            },
          },
        },
      })
      .then(() => {
        client
          .join({
            signature: signature,
            sdkKey: sdkKey,
            meetingNumber: meetingNumber,
            password: passWord,
            userName: userName,
            userEmail: userEmail,
            tk: registrantToken,
            zak: zakToken,
          })
          .then(() => {
            console.log("joined successfully");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div id="meetingSDKElement"></div>
      <button
        onClick={getSignature}
        style={{
          padding: "10px",
          borderRadius: "3px",
          backgroundColor: "#008080",
          color: "#ffff",
          border: "none",
        }}
      >
        Go to class
      </button>
    </div>
  );
};

export default ZoomClass;
