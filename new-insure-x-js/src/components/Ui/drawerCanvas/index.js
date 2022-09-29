import { useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalHeaderIconWrapper,
  ModalHeaderTitle,
} from "../../../pages/customer/register/style";
import DrawerBg from "../../../assets/img/auto_bg.svg";
import { Tach } from "../../../components/icon";

function DrawerCanvas({ open = false, setOpen, setImageBg }) {
  const canvasEl = useRef(null);
  const handleClick = () => {
    canvasEl.current.clearCanvas();
  };
  document.body.style.overflow = open ? "hidden" : "auto";
  return (
    <div>
      {open && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalHeaderIconWrapper>
                <ModalHeaderTitle>תרשים איזורי הפגיעה</ModalHeaderTitle>
                <Tach />
              </ModalHeaderIconWrapper>
            </ModalHeader>
            <ModalBody style={{ padding: "0" }}>
              <div style={{ display: "flex" }}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0 20px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#1D3557",
                        textAlign: "center",
                        marginBottom: "20px",
                      }}
                    >
                      רכב המבוטח
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#1D3557",
                        textAlign: "center",
                        marginBottom: "20px",
                      }}
                    >
                      רכב צד ג'
                    </p>
                  </div>

                  <ReactSketchCanvas
                    ref={canvasEl}
                    backgroundImage={DrawerBg}
                    exportWithBackgroundImage={true}
                    width={280}
                    height={260}
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <div
                  style={{
                    background: "#1D3557",
                    borderRadius: "16px",
                    padding: "0 10px",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "18px",
                    width: "100%",
                    minWidth: "200px",
                    textAlign: "center",
                  }}
                  onClick={handleClick}
                >
                  נקה
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <div
                  style={{
                    background: "#1D3557",
                    borderRadius: "16px",
                    padding: "0 10px",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "18px",
                    width: "100%",
                    minWidth: "200px",
                    textAlign: "center",
                  }}
                  onClick={() => {
                    canvasEl.current
                      .exportImage("png")
                      .then((data) => {
                        setImageBg(data);
                        setOpen(false);
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  }}
                >
                  אשר וסגור
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default DrawerCanvas;
