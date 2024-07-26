import React from "react";
import Actions from "../../enum/Actions";
import { ButtonGroup, Col } from "react-bootstrap";
import ActionButton from "./ActionButton";

const ActionGroup = ({
  actions,
  disabled,
  deleteAllTutorialsInView,
  publishAllTutorialsInView,
}: {
  actions: string[];
  disabled: boolean;
  deleteAllTutorialsInView(): void;
  publishAllTutorialsInView(): void;
}) => {
  const handleActionClick = (action: any): void => {
    if (action === Actions.PublishAll) {
      publishAllTutorialsInView();
    } else {
      deleteAllTutorialsInView();
    }
  };

  return (
    <Col md={4} className="p-1">
      <ButtonGroup className="float-end">
        {actions.map((action) => (
          <ActionButton
            key={action}
            action={action}
            disabled={disabled}
            handleActionClick={handleActionClick}
          />
        ))}
      </ButtonGroup>
    </Col>
  );
};

export default ActionGroup;
