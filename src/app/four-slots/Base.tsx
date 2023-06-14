import { Stage, Layer, Group } from "react-konva";
import Konva from "konva";

import { CanvasImage } from "@/components/CanvasImage";
import { EditableTextInput } from "@/components/EditableTextInput";
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
      scale: 0.12,
    },
    slot2: {
      image: "./img2.jpg",
      rotation: 0,
      scale: 0.12,
    },
    slot3: {
      image: "./img3.jpg",
      rotation: 0,
      scale: 0.12,
    },
  });
  const [selectedSlot, setSelectedSlot] = useState<string>("slot1");

  const group1Ref = useRef<Konva.Group>(null);
  const group2Ref = useRef<Konva.Group>(null);
  const group3Ref = useRef<Konva.Group>(null);
  const group4Ref = useRef<Konva.Group>(null);
  const stageRef = useRef<Konva.Stage>(null);

  const handleSaveImage = () => {
    if (group1Ref.current !== null) {
      const uri1 = group1Ref.current.toDataURL({
        x: 0,
        y: 0,
        width: 400,
        height: 400,
      });
      const link1 = document.createElement("a");
      link1.download = "group1.png";
      link1.href = uri1;
      document.body.appendChild(link1);
      link1.click();
      document.body.removeChild(link1);
    }
    if (group2Ref.current !== null) {
      const uri2 = group2Ref.current.toDataURL({
        x: 400,
        y: 0,
        width: 400,
        height: 400,
      });
      const link2 = document.createElement("a");
      link2.download = "group2.png";
      link2.href = uri2;
      document.body.appendChild(link2);
      link2.click();
      document.body.removeChild(link2);
    }
    if (group3Ref.current !== null) {
      const uri3 = group3Ref.current.toDataURL({
        x: 0,
        y: 400,
        width: 400,
        height: 400,
      });
      const link3 = document.createElement("a");
      link3.download = "group3.png";
      link3.href = uri3;
      document.body.appendChild(link3);
      link3.click();
      document.body.removeChild(link3);
    }
    // delete link;
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold text-center pb-4">Four slots</h1>
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

      <div className="flex flex-row">
        <Stage width={800} height={800} ref={stageRef}>
          <Layer
            x={0}
            y={0}
            width={400}
            height={400}
            onClick={() => setSelectedSlot("slot1")}
            draggable={false}
          >
            <Group
              ref={group1Ref}
              clipX={0}
              clipY={0}
              clipWidth={400}
              clipHeight={400}
              width={400}
              height={400}
            >
              <CanvasImage
                rotation={slotData.slot1.rotation}
                imageScale={slotData.slot1.scale}
                isSelected={selectedSlot === "slot1"}
                imagePath={slotData.slot1.image}
              />
            </Group>
          </Layer>
          <Layer
            x={400}
            y={0}
            width={400}
            height={400}
            onClick={() => setSelectedSlot("slot2")}
            draggable={false}
          >
            <Group
              ref={group2Ref}
              clipX={0}
              clipY={0}
              clipWidth={400}
              clipHeight={400}
              width={400}
              height={400}
            >
              <CanvasImage
                rotation={slotData.slot2.rotation}
                imageScale={slotData.slot2.scale}
                isSelected={selectedSlot === "slot2"}
                imagePath={slotData.slot2.image}
              />
            </Group>
          </Layer>

          <Layer
            x={0}
            y={400}
            width={400}
            height={400}
            onClick={() => setSelectedSlot("slot3")}
            draggable={false}
          >
            <Group
              ref={group3Ref}
              clipX={0}
              clipY={0}
              clipWidth={400}
              clipHeight={400}
              width={400}
              height={400}
            >
              <CanvasImage
                rotation={slotData.slot3.rotation}
                imageScale={slotData.slot3.scale}
                isSelected={selectedSlot === "slot3"}
                imagePath={slotData.slot3.image}
              />
            </Group>
          </Layer>
          <Layer
            x={400}
            y={400}
            width={400}
            height={400}
            onClick={() => setSelectedSlot("slot4")}
            draggable={false}
          >
            <Group
              ref={group4Ref}
              clipX={0}
              clipY={0}
              clipWidth={400}
              clipHeight={400}
              width={400}
              height={400}
            >
              <EditableTextInput
                x={0}
                y={0}
                width={200}
                height={200}
                text={"Text In a slot"}
              />
            </Group>
          </Layer>
          <Layer>
            <EditableTextInput
              x={0}
              y={0}
              width={200}
              height={200}
              text={"Text on canvas"}
            />
          </Layer>
        </Stage>
      </div>
    </main>
  );
};

export default Base;
/*

*/
