import React from "react";
import { Composition } from "remotion";
import { BeatsMotionCreatives } from "./BeatsMotionCreatives";
import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BeatsMotionCreatives"
        component={BeatsMotionCreatives}
        durationInFrames={820} // ~27 seconds
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};