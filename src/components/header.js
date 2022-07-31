import React from "react";

export default function Header() {
  return (
    <div className="header-div">
      <h1 className="site-name">jigglemp3.</h1>
      <div className="header-div-right">
        <h1 className="header-div-right-header">
          download
          <br />
          mp3s!
        </h1>
        <hr className="header-hr"></hr>
        <h5 className="header-div-right-bottom">from youtube.</h5>
      </div>
    </div>
  );
}
