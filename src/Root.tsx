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
        durationInFrames={750} // 25 seconds (5s + 7s + 6s + 7s)
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};