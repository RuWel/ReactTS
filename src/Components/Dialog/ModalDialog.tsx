import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Button, Modal } from "react-bootstrap";

const ModalDialog = forwardRef((props, ref) => {
  const [modalData, setModalData] = useState<{
    title: string;
    message: string;
    hidden: boolean;
  }>({
    title: "",
    message: "",
    hidden: false,
  });

  const [show, setShow] = useState<boolean>(false);
  const handleCloseModalDialog = () => setShow(false);
  const handleShowModalDialog = () => setShow(true);
  const toggle = () => {
    setShow(!show);
  };

  useImperativeHandle(ref, () => ({
    setModalData(_title: string, _message: string, _hidden: boolean = false) {
      setModalData({ title: _title, message: _message, hidden: _hidden });
    },
    showDialog() {
      handleShowModalDialog();
    },
    closeDialog() {
      console.log("CLOSE DIALOG");
      handleCloseModalDialog();
    },
  }));

  return (
    <>
      <Modal show={show} hide={toggle}>
        <Modal.Header id="modalHeader" className="modalDialog">
          <Modal.Title id="modalTitle">{modalData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modalBody" className="modal-body modalDialog">
          {modalData.message}
        </Modal.Body>
        <Modal.Footer className="modalDialog">
          <Button
            id="modalButton"
            variant="primary"
            onClick={handleCloseModalDialog}
            hidden={modalData.hidden}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default ModalDialog;
