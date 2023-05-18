import complaintsStore from "../stores/complaintsStore";
import "../asset/Complaint.css";
import React, { useState } from "react";

export default function Complaint({ complaint }) {
  // State for the number of likes and whether the post has been upvoted
  const [likes, setLikes] = useState(0);

  const handleUpVote = () => {
    setLikes(likes + 1);
  };

  const handleDownVote = () => {
    setLikes(likes - 1);
  };

  const [showPopup, setShowPopup] = useState(false);

  const showEditDeletePopup = () => {
    setShowPopup(true);
  };

  const hideEditDeletePopup = () => {
    setShowPopup(false);
  };

  const store = complaintsStore((store) => {
    return {
      deleteComplaint: store.deleteComplaint,
      toggleUpdate: store.toggleUpdate,
    };
  });

  // Display date and time correctly formatted

  function dateTimeString(unixTime) {
    const date = new Date(unixTime * 1);

    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const dateTimeString = date.toLocaleString("en-GB", options);

    return dateTimeString;
  }

  return (
    <div className="div2" key={complaint._id}>
      <h2>Complain Heading</h2>
      <h5>Created at: {dateTimeString(complaint.date)}</h5>
      <h3>{complaint.title}</h3>
      <h2>Description</h2>
      <h3>{complaint.body}</h3>

      <div className="post-buttons">
        <button className="post-button post-button-like" onClick={handleUpVote}>
          {likes} {likes === 1 ? "Upvote" : "Upvote"}
        </button>

        <button
          className="post-button post-button-like"
          onClick={handleDownVote}
        >
          {likes === 1 ? "" : "Downvote"}
        </button>

        <button
          className="post-button post-button-more"
          onClick={showEditDeletePopup}
        >
          More
        </button>
      </div>

      {showPopup && (
        <div className="edit-delete-popup">
          <button
            style={{
              backgroundColor: "#ff0000",
              color: "#ffffff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              marginRight: "10px",
            }}
            className="popup-button"
            onClick={() => store.deleteComplaint(complaint._id)}
          >
            Delete Complaint
          </button>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#ffffff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              marginRight: "10px",
            }}
            className="popup-button"
            onClick={() => store.toggleUpdate(complaint)}
          >
            Update Complaint
          </button>
          <button
            className="popup-button"
            style={{
              backgroundColor: "#6c757d",
              color: "#ffffff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={hideEditDeletePopup}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
