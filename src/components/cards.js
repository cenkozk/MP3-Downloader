import React, { forwardRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DownloadIcon from "@mui/icons-material/Download";
import { Link } from "@mui/material";

function Cards(props, ref) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentSong, setCurrentSong] = React.useState(new Audio(""));

  function handlePlayPause() {
    setIsPlaying((prevPlay) => !prevPlay);
  }

  //when fetch complete change song to current
  React.useEffect(() => {
    setCurrentSong(new Audio(props.link128kpbs));
  }, [props.link128kpbs]);

  //start/pause music
  React.useEffect(() => {
    var song = currentSong;
    if (song === "") {
      return;
    }
    if (!isPlaying) {
      song.pause();
    } else {
      song.play();
    }
    // eslint-disable-next-line
  }, [isPlaying]);

  const inter = "'Inter', sans-serif";

  return (
    <Card {...props} ref={ref} sx={{ display: "flex", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)", margin: "50px 30px 50px 30px", borderRadius: "25px", overflow: "visible" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 1 auto" }}>
          <Typography component="div" variant="h5" sx={{ fontFamily: inter, fontWeight: "600", letterSpacing: "-1.4px", margin: "0px" }}>
            {props.header}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton onClick={handlePlayPause} aria-label="play/pause">
            {!isPlaying && <PlayArrowIcon sx={{ height: 38, width: 38, color: "black" }} />}
            {isPlaying && <PauseIcon sx={{ height: 38, width: 38, color: "black" }} />}
          </IconButton>
          <Link href={props.link128kpbs} sx={{ WebkitTapHighlightColor: "transparent" }}>
            <IconButton aria-label="download">
              <DownloadIcon sx={{ height: 38, width: 38, color: "#7FCB73" }} />
            </IconButton>
          </Link>
        </Box>
      </Box>
      <CardMedia component="img" sx={{ width: 125, borderRadius: "25px" }} image={props.imageurl} alt="Live from space album cover" />
    </Card>
  );
}

export default forwardRef(Cards);
