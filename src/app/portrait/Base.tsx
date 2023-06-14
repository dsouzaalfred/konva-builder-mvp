import { Stage, Layer, Group } from "react-konva";
import Konva from "konva";

import { CanvasImage } from "@/components/CanvasImage";
import { useState, useRef } from "react";

interface SlotData {
  [key: string]: {
    image: string;
    rotation: number;
    scale: number;
  };
}

const Base = () => {
  const [slotData, setSlotData] = useState<SlotData>({
    slot1: {
      image: "./img1.jpg",
      rotation: 0,
      scale: 0.2,
    },
  });
  const [selectedSlot, setSelectedSlot] = useState<string>("slot1");

  const group1Ref = useRef<Konva.Group>(null);
  const stageRef = useRef<Konva.Stage>(null);

  const handleSaveImage = () => {
    if (group1Ref.current !== null) {
      const uri1 = group1Ref.current.toDataURL({
        x: 0,
        y: 0,
        width: 400,
        height: 800,
      });
      const link1 = document.createElement("a");
      link1.download = "group1.png";
      link1.href = uri1;
      document.body.appendChild(link1);
      link1.click();
      document.body.removeChild(link1);
    }
    // delete link;
  };

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1 className="text-4xl font-bold text-center pb-4">Portrait</h1>
      <div className="pb-4">
        Selected: {selectedSlot}
        <span className="px-2 pr-2">|</span>
        <button
          onClick={() =>
            setSlotData({
              ...slotData,
              [selectedSlot]: {
                image: slotData[selectedSlot].image,
                rotation: slotData[selectedSlot].rotation + 90,
                scale: slotData[selectedSlot].scale,
              },
            })
          }
        >
          Rotate
        </button>
        <span className="px-2 pr-2">|</span>
        Scale:{" "}
        <button
          onClick={() =>
            setSlotData({
              ...slotData,
              [selectedSlot]: {
                image: slotData[selectedSlot].image,
                rotation: slotData[selectedSlot].rotation,
                scale: slotData[selectedSlot].scale + 0.1,
              },
            })
          }
        >
          +
        </button>{" "}
        <button
          onClick={() =>
            setSlotData({
              ...slotData,
              [selectedSlot]: {
                image: slotData[selectedSlot].image,
                rotation: slotData[selectedSlot].rotation,
                scale: slotData[selectedSlot].scale - 0.1,
              },
            })
          }
        >
          -
        </button>
        <span className="px-2 pr-2">|</span>
        <button onClick={() => handleSaveImage()}>Save image</button>
      </div>
      <Stage width={400} height={800} ref={stageRef}>
        <Layer
          x={0}
          y={0}
          width={400}
          height={800}
          onClick={() => setSelectedSlot("slot1")}
          draggable={false}
        >
          <Group
            ref={group1Ref}
            clipX={0}
            clipY={0}
            clipWidth={400}
            clipHeight={800}
            width={400}
            height={800}
          >
            <CanvasImage
              rotation={slotData.slot1.rotation}
              imageScale={slotData.slot1.scale}
              isSelected={selectedSlot === "slot1"}
              imagePath={slotData.slot1.image}
            />
          </Group>
        </Layer>
      </Stage>
    </main>
  );
};

export default Base;
/*

*/
