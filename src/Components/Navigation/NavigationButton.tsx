import React from "react";
import { Col } from "react-bootstrap";
import Pages from "../../enum/Pages";
import { Link } from "react-router-dom";

import { FaPlusSquare } from "react-icons/fa";
import { FaHouse, FaMagnifyingGlassArrowRight } from "react-icons/fa6";

const NavigationButton = ({
  page,
  currentPage,
  navigateToPage,
}: {
  page: string;
  currentPage: string;
  navigateToPage(page: string): void;
}) => {
  const handleChangePage = (page: string): void => {
    navigateToPage(page);
  };

  return (
    <Col md="auto" className="p-1">
      <input
        className="btn-check"
        type="checkbox"
        id={`btn-${page}`}
        checked={page === currentPage}
        disabled={page === currentPage}
        onChange={() => handleChangePage(page)}
      />
      <label className="btn btn-outline-primary" htmlFor={`btn-${page}`}>
        {page === Pages.Home ? <FaHouse /> : <></>}
        {page === Pages.Create ? <FaPlusSquare /> : <></>}
        {page === Pages.Find ? <FaMagnifyingGlassArrowRight /> : <></>}

        {page}
      </label>
    </Col>
  );
};

export default NavigationButton;
