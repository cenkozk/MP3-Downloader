import React from "react";
import { Box, Button } from "@mui/material";
import { TypeAnimation } from "react-type-animation";

export default function UrlAndDownload(props) {
  const oswald = "'Oswald', sans-serif";
  const buttonRef = React.useRef();

  React.useEffect(() => {
    buttonRef.current.click();
  }, []);

  const buttonStyle = {
    margin: "0px",
    backgroundColor: "rgba(31, 216, 96, 1)",
    borderRadius: "10px",
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
    textTransform: "none",
    transition: "all 0.1s",
    boxShadow: "inset 0px 0px 0px rgba(0, 0, 0, 0.25)",
    "&:hover": { backgroundColor: "rgba(31, 216, 96, 1)", boxShadow: "inset 0px 10px 10px 0px rgba(0,0,0,0.5)" },
  };

  const buttonStyleFirst = {
    opacity: "0%",
    margin: "0px",
    backgroundColor: "rgba(31, 216, 96, 1)",
    borderRadius: "10px",
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
    textTransform: "none",
    transition: "all 0.1s",
    boxShadow: "inset 0px 0px 0px rgba(0, 0, 0, 0.25)",
    "&:hover": { backgroundColor: "rgba(31, 216, 96, 1)", boxShadow: "inset 0px 10px 10px 0px rgba(0,0,0,0.5)" },
  };
  const buttonStyleDownloading = {
    margin: "0px",
    backgroundColor: "#7FCB73",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
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
    textTransform: "none",
    "&:hover": { backgroundColor: "#7FCB73" },
  };

  const buttonStyleError = {
    margin: "0px",
    backgroundColor: "#DB6E6E",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
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
    textTransform: "none",
    "&:hover": { backgroundColor: "#DB6E6E" },
  };

  var buttonCurrentStyle = props.isDownloading === false ? buttonStyle : props.isDownloading === true ? buttonStyleDownloading : buttonStyleError;
  buttonCurrentStyle = props.firstTime ? buttonStyleFirst : buttonCurrentStyle;
  var buttonText = props.isDownloading === false ? "download." : props.isDownloading === true ? "downloading..." : "error!";

  return (
    <div className="urlAndDownload">
      <TypeAnimation
        className="url-header"
        sequence={[
          "mp3url.", // Types 'One'
          5000, // Waits 1s
          "just download.", // Deletes 'One' and types 'Two'
          5000, // Waits 2s
        ]}
        wrapper="div"
        cursor={true}
        repeat={Infinity}
      />

      <form>
        <input name="url-input" onChange={props.handleInput} className="url-input" placeholder="https://music.youtube.com/watch?v=JApegyYlvyY" type="text" />
      </form>
      <Button
        ref={buttonRef}
        className="button-download"
        disabled={props.isDownloading === true ? true : false}
        sx={buttonCurrentStyle}
        onClick={props.handleDownload}
        variant="contained"
      >
        {buttonText}
      </Button>
    </div>
  );
}
