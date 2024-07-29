import React, { useEffect, useState } from "react";
import { FaListAlt, FaPersonBooth } from "react-icons/fa";
import { FaBucket } from "react-icons/fa6";
import AWSNavigationButton from "../Navigation/AWS/AWSNavigationButton";
import AWSNavigationGroup from "../Navigation/AWS/AWSNavigationGroup";
import AWSPages from "../../enum/AWSPages";
import { Outlet, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { log } from "../../Logging/Logger";

const AWS = () => {
  const navigate = useNavigate();

  const [currentAWSPage, setCurrentAWSPage] = useState<string>(AWSPages.IAM);
  const navigateToAWSPage = (page: string): void => {
    log("AWS", `Navigate to new AWS page = ${page}`);

    log("AWS", `Navigate to ${page}`);
    navigate(`${page}`);

    setCurrentAWSPage(page);
  };

  useEffect(() => {
    navigate("iam");
  }, []);

  const handleIAM = () => {
    console.log("IAM Clicked");
    navigate("iam");
  };

  const handleS3 = () => {
    console.log("S3 Clicked");
    navigate("s3");
  };

  const handleTutorials = () => {
    console.log("Tutorials Clicked");
    navigate("tutorials");
  };

  return (
    <>
      <Row style={{ height: "85vh" }}>
        <Col md={2}>
          <header>
            <nav
              id="sidebarMenu"
              className="sidebar collapse d-lg-block collapse bg-secondary"
            >
              <div className="position-sticky">
                <AWSNavigationGroup
                  awspages={[AWSPages.IAM, AWSPages.S3, AWSPages.Tutorials]}
                  currentAWSPage={currentAWSPage}
                  navigateToAWSPage={navigateToAWSPage}
                />
              </div>
              <Outlet />
            </nav>
          </header>
        </Col>
        <Col md={10}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default AWS;
