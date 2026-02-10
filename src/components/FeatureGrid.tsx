import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Sequence, Easing } from "remotion";
import React from "react";
import { ParticleEffect } from "./ParticleEffect";
import { LucideIcon, Wrench, Settings, Zap, PaintRoller, ClipboardList, TrendingUp } from "lucide-react";

// Lucide icons map nicely to the request:
// Wrench -> Estrutura
// Settings -> Suspensão (Gears)
// Zap -> Elétrica
// PaintRoller -> Pintura
// ClipboardList -> Homologação
// TrendingUp -> Gestão

const features = [
    {
        icon: Wrench,
        title: "Estrutura e Chassi",
        desc: "Aprenda a calcular e montar estruturas resistentes e seguras para diversos tipos de carga."
    },
    {
        icon: Settings,
        title: "Suspensão e Eixos",
        desc: "Domine os sistemas de suspensão, feixes de molas e instalação correta de eixos."
    },
    {
        icon: Zap,
        title: "Elétrica e Sinalização",
        desc: "Instalação completa do sistema elétrico seguindo as normas de trânsito vigentes."
    },
    {
        icon: PaintRoller,
        title: "Acabamento e Pintura",
        desc: "Técnicas profissionais para um acabamento impecável e duradouro."
    },
    {
        icon: ClipboardList,
        title: "Homologação",
        desc: "Entenda todo o processo burocrático para emplacar e regularizar seus reboques."
    },
    {
        icon: TrendingUp,
        title: "Gestão do Negócio",
        desc: "Como precificar, vender e escalar sua fábrica de reboques."
    }
];

const FeatureCard = ({
    item,
    index,
    frame,
    fps
}: {
    item: typeof features[0],
    index: number,
    frame: number,
    fps: number
}) => {
    // Staggered entrance
    const delay = index * 5; // 5 frames spacing

    const spr = spring({
        frame: frame - delay - 10, // Start slightly after scene start
        fps,
        config: { damping: 15, stiffness: 100, mass: 1 },
    });

    // Slide up + Fade In + Scale up slightly
    const opacity = spr;
    const y = interpolate(spr, [0, 1], [100, 0]);
    const scale = interpolate(spr, [0, 1], [0.8, 1]);

    // Icon Animation
    // Continuous subtle movement
    const iconWiggle = Math.sin((frame + index * 10) / 10) * 10; // Rotate +/- 10 degrees

    const Icon = item.icon;

    return (
        <div
            className="bg-[#0f0f0f] border border-gray-800 p-6 rounded-2xl flex flex-col items-start gap-4 text-left w-full h-full shadow-lg"
            style={{
                opacity,
                transform: `translateY(${y}px) scale(${scale})`,
                boxShadow: `0 10px 30px -10px rgba(0,0,0,0.5)`
            }}
        >
            <div
                className="text-yellow-500 mb-2"
                style={{
                    transform: `rotate(${iconWiggle}deg)`
                }}
            >
                <Icon size={40} strokeWidth={2.5} />
            </div>
            <h3 className="text-white font-bold text-xl">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
            </p>
        </div>
    );
};

export const FeatureGrid: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // Scroll Animation: Gentle float up
    const scrollProgress = spring({
        frame: frame,
        fps,
        config: { damping: 200, mass: 10 }
    });

    const translateY = interpolate(scrollProgress, [0, 1], [0, -20]);

    // Entrance (Blur In from previous segment)
    const introProgress = spring({
        frame,
        fps,
        config: { stiffness: 50, damping: 20 }
    });
    const introBlur = interpolate(introProgress, [0, 1], [30, 0]);
    const introOpacity = interpolate(introProgress, [0, 1], [0, 1]);

    // EXIT TRANSITION (Blur Out)
    // End of segment is durationInFrames. Let's start blur 20 frames before end.
    const exitStart = durationInFrames - 30;
    const exitProgress = spring({
        frame: frame - exitStart,
        fps,
        config: { stiffness: 50, damping: 20 }
    });

    const exitBlur = interpolate(exitProgress, [0, 1], [0, 50]);
    const exitOpacity = interpolate(exitProgress, [0, 0.2, 1], [1, 1, 0]);

    const totalBlur = introBlur + exitBlur;
    const totalOpacity = introOpacity * exitOpacity;


    return (
        <AbsoluteFill
            className="bg-black font-sans text-white items-center overflow-hidden"
            style={{
                filter: `blur(${totalBlur}px)`,
                opacity: totalOpacity
            }}
        >
            <ParticleEffect />

            {/* Background Glows - GOLDEN NOW */}
            {/* Top Left */}
            <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-yellow-600/20 rounded-full blur-[100px] pointer-events-none" />
            {/* Bottom Right */}
            <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-yellow-700/15 rounded-full blur-[120px] pointer-events-none" />


            <div
                className="flex flex-col items-center justify-center w-full h-full max-w-7xl px-10"
                style={{ transform: `translateY(${translateY}px)` }}
            >
                {/* Section Title */}
                <div className="mb-12 text-center" style={{ opacity: introOpacity }}>
                    <h2 className="text-5xl font-extrabold uppercase tracking-tight flex flex-col items-center gap-2">
                        <span>VEJA O QUE VOCÊ IRÁ <span className="text-yellow-500">APRENDER</span></span>
                        <div className="w-24 h-1.5 bg-yellow-500 rounded-full mt-2" />
                    </h2>
                </div>

                {/* Grid 3x2 */}
                <div className="grid grid-cols-3 gap-6 w-full">
                    {features.map((item, index) => (
                        <FeatureCard
                            key={index}
                            item={item}
                            index={index}
                            frame={frame}
                            fps={fps}
                        />
                    ))}
                </div>
            </div>
        </AbsoluteFill>
    );
};
