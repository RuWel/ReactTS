import React, { useEffect, useRef, useState } from "react";

import { Col, Container, Navbar, NavbarBrand, Row } from "react-bootstrap";

import MediaIcon from "./MediaIcon";

import { FaBookOpen } from "react-icons/fa";

import facebookIcon from "../assets/icons8-facebook.svg";
import gmailIcon from "../assets/icons8-gmail.svg";
import instagramIcon from "../assets/icons8-instagram.svg";
import linkedinIcon from "../assets/icons8-linkedin.svg";
import messengerIcon from "../assets/icons8-messenger.svg";
import twitterIcon from "../assets/icons8-twitterx.svg";

const TitleBar = () => {
  const [media, setMedia] = useState<any>([]);

  useEffect(() => {
    setMedia([
      {
        id: 1,
        name: "facebook",
        url: "https://www.favebook.com/",
        icon: facebookIcon,
      },
      {
        id: 2,
        name: "messenger",
        url: "https://www.messenger.com/",
        icon: messengerIcon,
      },
      {
        id: 3,
        name: "instagram",
        url: "https://www.instagram.com/",
        icon: instagramIcon,
      },
      {
        id: 4,
        name: "twitter",
        url: "https://www.twitter.com/",
        icon: twitterIcon,
      },
      {
        id: 5,
        name: "linkedin",
        url: "https://www.linkedin.com/",
        icon: linkedinIcon,
      },
      {
        id: 6,
        name: "gmail",
        url: "https://mail.google.com/",
        icon: gmailIcon,
      },
    ]);
  }, []);

  const showMedia = () => {
    return (
      <span id="icons">
        {media.map((mediaitem: any) => (
          <MediaIcon
            name={mediaitem.name}
            url={mediaitem.url}
            icon={mediaitem.icon}
            key={mediaitem.id}
          />
        ))}
      </span>
    );
  };

  return (
    <Row>
      <Navbar className="bg-dark brand-text-color">
        <Container fluid>
          <Col md={10}>
            <NavbarBrand style={{ color: "orange" }}>
              <FaBookOpen
                className="tooltip-test"
                style={{ color: "orange" }}
                title="Tut-O-Pedia"
              ></FaBookOpen>{" "}
              <strong>Tut-O-Pedia</strong>
            </NavbarBrand>
          </Col>
          <Col md="auto" className="float-end">
            {showMedia()}
          </Col>
        </Container>
      </Navbar>
    </Row>
  );
};

export default TitleBar;
