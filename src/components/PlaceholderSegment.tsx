import { AbsoluteFill } from "remotion";
import React from "react";

export const PlaceholderSegment: React.FC<{ title: string; color: string }> = ({ title, color }) => {
    return (
        <AbsoluteFill style={{ backgroundColor: color, justifyContent: "center", alignItems: "center" }} className="text-white text-4xl font-bold font-sans">
            {title}
        </AbsoluteFill>
    );
};
