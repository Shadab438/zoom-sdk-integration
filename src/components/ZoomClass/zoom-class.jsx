import React from "react";
import { ZoomMtg } from "@zoom/meetingsdk";
import { baseURL } from "../../utils/constants";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const ZoomClass = () => {
  var leaveUrl = "http://localhost:3000";

  const getMeetingDetailsByBatch = (batchId) => {
    const fetchMeetingDetails = async () => {
      try {
        setTimeout(async () => {
          const response = await fetch(
            `${baseURL}/batch/joinMeeting/${batchId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("_to-k_e--n")} `,
              },
            }
          );

          if (response.status === 200) {
            const data = await response.json();

            startMeeting(data);
          } else {
            alert("Something went wrong!");
          }
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMeetingDetails();
  };

  const startMeeting = (meetingDetails) => {
    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      success: (success) => {
        setTimeout(
          () =>
            ZoomMtg.join({
              signature: meetingDetails.signature,
              sdkKey: meetingDetails.sdkKey,
              meetingNumber: meetingDetails.meetingNumber,
              passWord: meetingDetails.passWord,
              userName: meetingDetails.userName,
              userEmail: meetingDetails.userEmail,
              tk: null,
              zak: null,
              success: (success) => {
                console.log(success);
              },
              error: (error) => {
                console.log(error);
              },
            }),
          3000
        );
        // window.open(joinUrl, "_blank");
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="App">
      <main>
        <button
          onClick={() => getMeetingDetailsByBatch(1)}
          style={{
            padding: "10px",
            borderRadius: "3px",
            backgroundColor: "#008080",
            color: "#ffff",
          }}
        >
          Go to class
        </button>
      </main>
    </div>
  );
};

export default ZoomClass;
