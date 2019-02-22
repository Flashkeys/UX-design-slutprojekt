import React from 'react';

 const Popup = (props) => {
  function closePopup() {       // this is a callback function that closese the popup
    props.closePopup()
  }
    return (
      <div className="popupen">
        <div className="popup__content">
          <h2>Finished</h2>
          <p>You got {props.correctAnswer}/10 correct answers </p>
          <div className="popup__bottoms">
            <button onClick={() => props.apiCall()}>Restart</button>      {/* makes a new API call onclick */}
            <button onClick={() => closePopup()}>Close</button>       {/* calls closepopup on click */}
          </div>
        </div>
      </div>)
  }
  export default Popup;         // exportes components so that it can be inported somwhere else