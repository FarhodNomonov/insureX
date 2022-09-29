import { useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import DrawerBg from "../../../assets/img/imzo.png";

function DrawerPodpis({ setImageBg = () => {} }) {
  const canvasEl = useRef(null);
  return (
    <div>
      <ReactSketchCanvas
        ref={canvasEl}
        backgroundImage={DrawerBg}
        exportWithBackgroundImage={true}
        height={200}
        strokeWidth={2}
        onChange={() => {
          canvasEl.current
            .exportImage("png")
            .then((data) => {
              setImageBg(data);
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      />
      <div style={{ margin: "10px 0 30px 0", textAlign: "center" }}>
        <button
          type="button"
          style={{
            padding: "0 2rem",
            fontSize: "18px",
            background: "#1D3557",
            borderRadius: "16px",
            color: "#fff",
            cursor: "pointer",
            height: "40px",
          }}
          onClick={() => {
            canvasEl.current.clearCanvas();
          }}
        >
          נקה
        </button>
      </div>
    </div>
  );
}

export default DrawerPodpis;
