import React from "react";
import { Button } from "@mui/material";

export default function UrlAndDownload(props) {
  const oswald = "'Oswald', sans-serif";

  const buttonStyle = {
    margin: "0px",
    backgroundColor: "#000000",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)",
    borderRadius: "24px",

    fontFamily: { oswald },
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "16px",
    lineHeight: "29px",
    width: "120px",
    /* identical to box height, or 178% */

    textAlign: "center",
    letterSpacing: "-1px",
    color: "#FFFFFF",
    borderStyle: "none",
    textTransform: "none",
    "&:hover": { backgroundColor: "#000000" },
  };
  const buttonStyleDownloading = {
    margin: "0px",
    backgroundColor: "#7FCB73",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)",
    borderRadius: "24px",
    fontFamily: { oswald },
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "16px",
    lineHeight: "29px",
    width: "120px",
    /* identical to box height, or 178% */

    textAlign: "center",
    letterSpacing: "-1px",
    color: "black",
    borderStyle: "none",
    textTransform: "none",
    "&:hover": { backgroundColor: "#7FCB73" },
  };

  const buttonStyleError = {
    margin: "0px",
    backgroundColor: "#DB6E6E",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)",
    borderRadius: "24px",
    fontFamily: { oswald },
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "16px",
    lineHeight: "29px",
    width: "120px",
    /* identical to box height, or 178% */

    textAlign: "center",
    letterSpacing: "-1px",
    color: "#FFFFFF",
    borderStyle: "none",
    textTransform: "none",
    "&:hover": { backgroundColor: "#DB6E6E" },
  };

  var buttonCurrentStyle = props.isDownloading === false ? buttonStyle : props.isDownloading === true ? buttonStyleDownloading : buttonStyleError;
  var buttonText = props.isDownloading === false ? "download." : props.isDownloading === true ? "downloading..." : "error!";

  return (
    <div className="urlAndDownload">
      <h1 className="url-header">mp3 url.</h1>
      <form>
        <input name="url-input" onChange={props.handleInput} className="url-input" placeholder="https://www.youtube.com/watch?v=rsw_3eVa8L0" type="text" />
      </form>
      <Button disabled={props.isDownloading === true ? true : false} sx={buttonCurrentStyle} onClick={props.handleDownload} variant="contained">
        {buttonText}
      </Button>
    </div>
  );
}
