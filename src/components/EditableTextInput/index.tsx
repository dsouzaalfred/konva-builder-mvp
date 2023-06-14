import React, { useState, useEffect } from "react";
import { Text } from "react-konva";
import { Html } from "react-konva-utils";

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

function getStyle(width: number, height: number) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    width: `${width}px`,
    height: `${height}px`,
    border: "none",
    padding: "0px",
    margin: "0px",
    background: "none",
    outline: "none",
    resize: "none",
    colour: "black",
    fontSize: "16px",
    fontFamily: "sans-serif",
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    margintop: "-4px",
  };
}

interface EditableTextInputProps {
  x: number;
  y: number;
  text: string;
  width: number;
  height: number;
}

export const EditableTextInput = ({
  x,
  y,
  text,
  width,
  height,
}: EditableTextInputProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(text);

  function handleEscapeKeys(e: any) {
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      setIsEditing(false);
    }
  }

  function handleTextChange(e: any) {
    setTextValue(e.target.value);
  }

  useEffect(() => {
    setTextValue(text);
  }, [text]);

  if (isEditing) {
    const style = getStyle(width, height);
    return (
      <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
        <input
          value={textValue}
          onChange={handleTextChange}
          onKeyDownCapture={(e) => handleEscapeKeys(e)}
          className="border-0 p-0 m-0 border-b-4 bg-transparent"
        />
      </Html>
    );
  }

  return (
    <Text
      x={x}
      y={y}
      width={width}
      text={textValue}
      fontSize={20}
      draggable
      onDblClick={() => setIsEditing(true)}
    />
  );
};
