import "./App.css";
import Header from "./components/header";
import UrlAndDownload from "./components/urlAndDownload";
import Disclaimer from "./components/disclaimer";
import Footer from "./components/footer";
import Cards from "./components/cards";
import CardV2 from "./components/card";
import React from "react";
import { Grow, Box } from "@mui/material";
import cheerio from "react-native-cheerio/lib/cheerio";
import getVideoId from "get-video-id";
import { motion } from "framer-motion";

function App() {
  const [initialize, setInitialize] = React.useState(true);
  const [isDownloadCompleted, setIsDownloadCompleted] = React.useState(false);
  const [videoInfo, setVideoInfo] = React.useState({ imageUrl: "", header: "", link128kpbs: "" });
  const [inputVideoUrl, setInputVideoUrl] = React.useState("https://music.youtube.com/watch?v=8IDALpMEARU");
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [inputBackgroundColor, setInputBackgroundColor] = React.useState([0, 0, 0]);
  //return if same as old link
  const [prevId, setPrevId] = React.useState("");

  const pull_color = (color) => {
    if (color.length == 0) {
      return;
    }
    console.log(color);
    setInputBackgroundColor(color);
  };

  function handleDownloadClick() {
    setIsDownloading(true);

    function stopDownloading() {
      setIsDownloading("error");
      return;
    }

    var scrapeVideo = async () => {
      const { id } = await getVideoId(inputVideoUrl);
      if (id == null || id === prevId) {
        stopDownloading();
        return;
      }

      setPrevId(id);

      //Clear old card
      if (isDownloadCompleted === true) {
        setIsDownloadCompleted(false);
      }
      ////////////START FETCHING
      const url = `https://api.vevioz.com/api/widget/mp3/${id}`;

      const response = await fetch(url);
      //Return if error
      if (response.status === 500) {
        stopDownloading();
        return;
      }
      /////////////////
      const body = await response.text();
      let $ = await cheerio.load(body);
      //extract image url
      let image = await $("img");
      const imageUrl = await image.attr().src;
      //extract header
      var header = await $("h2").text();
      header = header.length > 40 ? `${header.slice(0, 20)}...` : header;
      //extract links
      var link128kpbs = await $("body > div > div > div > div > a:nth-child(4)").attr().href;
      setVideoInfo({ imageUrl: imageUrl, header: header, link128kpbs: link128kpbs });
      setIsDownloadCompleted(true);
      setIsDownloading(false);
      if (initialize) setInitialize(false);
    };
    scrapeVideo();
  }

  function handleInput(event) {
    setInputVideoUrl(event.target.value);
  }

  const imageStyle = {
    width: "70vw",
    maxWidth: "330px",
    height: "60vw",
    maxHeight: "330px",
    margin: "10px",
  };

  return (
    <div className="main">
      <Header />
      <div className="app" style={{ opacity: initialize ? "0%" : "100%" }}>
        <UrlAndDownload
          firstTime={initialize}
          inputBackgroundColor={inputBackgroundColor}
          isDownloading={isDownloading}
          handleDownload={handleDownloadClick}
          handleInput={handleInput}
        />
        {/*<div className="cards-image">
          {!isDownloadCompleted && (
            <Grow in={!isDownloadCompleted}>
              <Box component="img" sx={imageStyle} className="brain" src="/brain.svg"></Box>
            </Grow>
          )}
          {isDownloadCompleted && <Grow in={isDownloadCompleted}>{/*<Cards imageurl={videoInfo.imageUrl} header={videoInfo.header} link128kpbs={videoInfo.link128kpbs} /></Grow>}
        </div>*/}
        <CardV2 style={{ zIndex: "0" }} pull_color={pull_color} imageurl={videoInfo.imageUrl} header={videoInfo.header} link128kpbs={videoInfo.link128kpbs} /> <Footer />
      </div>
      <motion.img
        animate={{ rotate: 360 }}
        transition={{ duration: 0.75, repeat: Infinity, ease: "circInOut" }}
        src="/loading.svg"
        style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0", margin: "auto", width: "200px", height: "200px", opacity: initialize ? "100%" : "0%" }}
      />
    </div>
  );
}
export default App;
