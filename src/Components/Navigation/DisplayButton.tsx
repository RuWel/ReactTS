import React from "react";
import { Button } from "react-bootstrap";

const DisplayButton = ({
  view,
  currentView,
  disabled,
  handleChangeView,
}: {
  view: string;
  currentView: string;
  disabled: boolean;
  handleChangeView(view: string): void;
}) => {
  return (
    <>
      <Button
        variant="outline-success"
        id={`"btn-${view}"`}
        disabled={view === currentView || disabled}
        onClick={() => handleChangeView(view)}
      >
        {view}
      </Button>
    </>
  );
};

export default DisplayButton;
