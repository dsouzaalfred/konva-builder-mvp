import useImage from "use-image";
import { Image } from "react-konva";
import { useState, useEffect } from "react";

type CanvasImageProps = {
  rotation: number;
  imageScale: number;
  isSelected: boolean;
  imagePath: string;
};

type rotateImageProps = {
  x: any;
  y: any;
  deg: any;
};

export const CanvasImage = ({
  rotation,
  imageScale,
  isSelected,
  imagePath,
}: CanvasImageProps) => {
  console.log({ rotation });
  const [image] = useImage(imagePath);
  const [imageRotation, setImageRotation] = useState(rotation);
  const [scale, setScale] = useState({ x: imageScale, y: imageScale });
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const imageWidth = image?.width || 0;
  const imageHeight = image?.height || 0;

  const degToRad = Math.PI / 180;

  const rotatePoint = ({ x, y, deg }: rotateImageProps) => {
    const rcos = Math.cos(deg * degToRad),
      rsin = Math.sin(deg * degToRad);
    return { x: x * rcos - y * rsin, y: y * rcos + x * rsin };
  };

  const rotateImage = (deg: number) => {
    const displayedWidth = imageWidth * scale.x;
    const displayedHeight = imageHeight * scale.y;
    const topLeft = { x: -displayedWidth / 2, y: -displayedHeight / 2 };
    console.log({ topLeft });
    const current = rotatePoint({
      x: topLeft.x,
      y: topLeft.y,
      deg: imageRotation,
    });
    console.log({ current });
    const rotated = rotatePoint({ x: topLeft.x, y: topLeft.y, deg: deg });
    console.log({ rotated });
    const dx = rotated.x - current.x,
      dy = rotated.y - current.y;

    setImageRotation(rotation);
    setX(x + dx);
    setY(y + dy);
  };
  useEffect(() => {
    rotateImage(0);
  }, []);
  useEffect(() => {
    if (isSelected) {
      setScale({ x: imageScale, y: imageScale });
    }
  }, [imageScale, isSelected]);

  useEffect(() => {
    if (isSelected) {
      rotateImage(rotation);
    }
  }, [rotation, isSelected]);

  return (
    <Image
      image={image}
      x={x}
      y={y}
      scale={{ x: scale.x, y: scale.y }}
      rotation={rotation}
      alt="test"
      draggable
    />
  );
};
