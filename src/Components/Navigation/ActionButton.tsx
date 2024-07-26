import React from "react";
import { Button } from "react-bootstrap";

const ActionButton = ({
  action,
  disabled,
  handleActionClick,
}: {
  action: string;
  disabled: boolean;
  handleActionClick(action: any): void;
}) => {
  return (
    <>
      <Button
        variant="outline-success"
        id={`"btn-${action}"`}
        disabled={disabled}
        onClick={() => handleActionClick(action)}
      >
        {action}
      </Button>
    </>
  );
};

export default ActionButton;
