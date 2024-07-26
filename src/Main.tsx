import React from "react";

import { useEffect, useRef, useState } from "react";

import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

// import Tutorial from "./Components/Tutorial/Tutorial";
// import HeartBeat from "./Components/HeartBeat";
// import ModalDialog from "./Components/Dialog/ModalDialog";

import configData from "./tutorial_env.json";

import { Container } from "react-bootstrap";
import Tutorial from "./Components/Tutorial/Tutorial";
import { BrowserRouter } from "react-router-dom";
import ModalDialog from "./Components/Dialog/ModalDialog";
import { Logger } from "./Logging/Logger";

//import { logger, startLogging } from "./Logging/xlogger";

const Main = () => {
  const [serverConnected, setServerConnected] = useState(true);

  const mainRef = useRef<any>();
  // const [serverConnected, setServerConnected] = useState(false);

  // useEffect(() => {
  //   if (configData.activeServer) {
  //     mainRef.current.setModalData(
  //       "Checking Server",
  //       "Checking Connection To Server",
  //       true
  //     );
  //     mainRef.current.showDialog();
  //   } else {
  //     setServerConnected(true);
  //   }
  // }, []);

  // const notify = (count, connected) => {
  //   setServerConnected(connected);
  //   if (!connected) {
  //     if (count === 0) {
  //       mainRef.current.showDialog();
  //     }

  //     mainRef.current.setModalData(
  //       "Checking Server",
  //       "Checking Connection To Server",
  //       true
  //     );
  //   }

  //   if (connected) {
  //     mainRef.current.closeDialog();
  //   }
  // };

  return (
    <Container fluid>
      <Logger
        active={configData.Logging.active}
        timeout={configData.Logging.timeout}
      />
      <ModalDialog ref={mainRef} />
      <Header />
      <BrowserRouter>{serverConnected && <Tutorial />}</BrowserRouter>
      <Footer />
    </Container>
    // <>
    //   <ModalDialog ref={mainRef} />
    //   <HeartBeat
    //     active={configData.activeServer}
    //     timeout={configData.Heartbeat.timeout}
    //     URL={configData.Server.URL}
    //     notify={notify}
    //   />
    //   <Header />
    //   {serverConnected && <Tutorial />}
    //   <Footer />
    // </>
  );
};

export default Main;
