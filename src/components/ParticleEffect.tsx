import { AbsoluteFill, useVideoConfig, useCurrentFrame, random } from "remotion";
import React, { useMemo } from "react";

export const ParticleEffect: React.FC = () => {
    const { fps, width, height, durationInFrames } = useVideoConfig();
    const frame = useCurrentFrame();

    const particles = useMemo(() => {
        return new Array(50).fill(0).map((context, i) => {
            const x = random("x" + i) * width;
            const y = random("y" + i) * height;
            const size = random("size" + i) * 3 + 1;
            const speed = random("speed" + i) * 1 + 0.2;
            const opacity = random("opacity" + i) * 0.5 + 0.1;
            return { x, y, size, speed, opacity };
        });
    }, [height, width]);

    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            {particles.map((p, i) => {
                const y = (p.y - frame * p.speed) % height;
                const top = y < 0 ? y + height : y;
                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: p.x,
                            top: top,
                            width: p.size,
                            height: p.size,
                            backgroundColor: "#FCD34D", // Gold/Yellow
                            borderRadius: "50%",
                            opacity: p.opacity,
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};
