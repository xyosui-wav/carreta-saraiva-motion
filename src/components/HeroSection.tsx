import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import React from "react";
import { ParticleEffect } from "./ParticleEffect";
import { Cursor } from "./Cursor";

export const HeroSection: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Helper for Premium Entrance (Blur + Scale + Opacity)
    // MODIFIED: Increased initial blur to match exit (50px)
    const premiumEntrance = (delay: number) => {
        const spr = spring({
            frame: frame - delay * 30,
            fps,
            config: { damping: 200, stiffness: 100, mass: 2 },
        });

        const scale = interpolate(spr, [0, 1], [1.1, 1]);

        // Changing standard entrance to be somewhat strong, 
        // BUT we will apply a master blur for the full scene entrance below.
        const blur = interpolate(spr, [0, 1], [10, 0]);

        const opacity = spr;
        const y = interpolate(spr, [0, 1], [20, 0]);

        return {
            opacity,
            transform: `scale(${scale}) translateY(${y}px)`,
            filter: `blur(${blur}px)`,
        };
    };

    // --- FLOATING ANIMATION ---
    const useFloating = (phase: number, intensity: number = 2) => {
        const y = Math.sin((frame + phase) / 80) * intensity;
        return { transform: `translateY(${y}px)` };
    };

    // --- CURSOR ANIMATION ---
    const cursorStartFrame = 75; // starts at 2.5s
    const clickFrame = 95; // clicks at ~3.1s

    // 1. Move Cursor from bottom right to button
    // Using higher damping for stability, less bounce
    const cursorProgress = spring({
        frame: frame - cursorStartFrame,
        fps,
        config: { damping: 40, stiffness: 200, mass: 1 },
    });

    const cursorX = interpolate(cursorProgress, [0, 1], [width, width / 2 - 140]);
    const cursorY = interpolate(cursorProgress, [0, 1], [height, height / 2 + 250]);

    const clickProgress = spring({
        frame: frame - clickFrame,
        fps,
        config: { damping: 100, stiffness: 200 }
    });

    const cursorScale = interpolate(clickProgress, [0, 0.5, 1], [1, 0.85, 1]);
    const buttonScale = interpolate(clickProgress, [0, 0.2, 1], [1, 0.98, 1]);


    // --- TRANSITIONS ---

    // EXIT TRANSITION (Blur Out)
    const transitionStart = clickFrame + 10;
    const transitionProgress = spring({
        frame: frame - transitionStart,
        fps,
        config: { stiffness: 50, damping: 20 }
    });
    const exitBlur = interpolate(transitionProgress, [0, 1], [0, 50]);
    const exitOpacity = interpolate(transitionProgress, [0, 0.2, 1], [1, 1, 0]);

    // INTRO TRANSITION (Blur In) - NEW!
    // Strong blur fading rapidly at start
    const introProgress = spring({
        frame,
        fps,
        config: { stiffness: 50, damping: 20 }
    });
    // Blur from 50px down to 0
    const introBlur = interpolate(introProgress, [0, 1], [50, 0]);
    // Opacity from 0 to 1
    const introOpacity = interpolate(introProgress, [0, 1], [0, 1]);


    // Combined opacity/blur logic
    // We need to handle both intro and exit. 
    // Entrance dominates at start, Exit at end.

    // Ideally we combine them:
    const totalOpacity = introOpacity * exitOpacity;
    // For blur, we want max(introBlur, exitBlur) conceptually, or just add them
    const totalBlur = introBlur + exitBlur;


    return (
        <AbsoluteFill
            className="bg-gradient-to-b from-black via-black to-yellow-900/30 font-sans p-10 flex flex-col items-center text-center text-white overflow-hidden"
            style={{
                opacity: totalOpacity,
                filter: `blur(${totalBlur}px)`,
            }}
        >

            {/* Particles */}
            <ParticleEffect />


            {/* Navbar */}
            <div className="flex justify-between items-center w-full max-w-6xl mb-16 z-10" style={premiumEntrance(0)}>
                <h1 className="text-xl font-bold text-yellow-500">ESCOLA <span className="text-white">SARAIVA</span></h1>
                <div className="flex gap-6 text-sm text-gray-300">
                    <span>Quem Somos</span>
                    <span>O Que Aprender</span>
                    <span>Instrutor</span>
                    <span>Depoimentos</span>
                    <button className="bg-yellow-500 text-black px-4 py-1 rounded font-bold">Inscrever-se</button>
                </div>
            </div>

            <div className="flex flex-col flex-1 justify-center items-center max-w-4xl z-10">
                {/* Badge */}
                <div
                    className="bg-yellow-900/30 border border-yellow-600/50 text-yellow-500 px-3 py-1 text-xs rounded mb-6 tracking-widest uppercase font-semibold"
                    style={{
                        ...premiumEntrance(0.2),
                        ...useFloating(0, 2)
                    }}
                >
                    Escola Saraiva de Fabricação de Reboques
                </div>

                {/* Headline */}
                <div style={{ ...premiumEntrance(0.4), ...useFloating(100, 3) }}>
                    <h2 className="text-7xl font-extrabold uppercase leading-tight mb-4">
                        O Reboque <span className="text-red-600 text-8xl">Perfeito</span> <br />
                        Para o seu Negócio!
                    </h2>
                </div>

                {/* Subheadline */}
                <p
                    className="text-gray-400 text-xl mb-8 max-w-2xl"
                    style={{ ...premiumEntrance(0.6), ...useFloating(200, 2) }}
                >
                    Transforme sua paixão por reboques em um verdadeiro negócio lucrativo!
                </p>

                {/* Features */}
                <div
                    className="flex gap-4 mb-10 justify-center"
                    style={{ ...premiumEntrance(0.8), ...useFloating(300, 2) }}
                >
                    {["+100 Alunos Formados", "Comunidade Exclusiva", "Acesso Vitalício"].map((feat, i) => (
                        <div key={i} className="bg-slate-900/80 border border-slate-800 px-3 py-2 rounded text-xs text-yellow-500 flex items-center gap-2 backdrop-blur-sm">
                            <span>👑</span> {feat}
                        </div>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4 justify-center relative" style={premiumEntrance(1.0)}>
                    {/* Primary Button with Interaction */}
                    <button
                        className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded font-bold flex items-center gap-2 transform transition-transform shadow-[0_0_20px_rgba(234,179,8,0.5)]"
                        style={{
                            transform: `scale(${buttonScale})`
                        }}
                    >
                        🚀 QUERO ME INSCREVER AGORA!
                    </button>
                    <button className="border border-slate-700 text-white px-6 py-3 rounded flex items-center gap-2 hover:bg-slate-900 bg-slate-950/50 backdrop-blur-sm">
                        ▶ SAIBA MAIS
                    </button>
                </div>

                {/* Trust Badge */}
                <div className="mt-6 text-xs text-gray-500 flex items-center gap-2" style={premiumEntrance(1.2)}>
                    🛡️ Compra 100% segura • Garantia de 7 dias • Suporte dedicado
                </div>
            </div>

            <AbsoluteFill style={{
                left: cursorX,
                top: cursorY,
                transform: `scale(${cursorScale})`,
                zIndex: 100,
                pointerEvents: "none"
            }}>
                <Cursor />
            </AbsoluteFill>

        </AbsoluteFill>
    );
};
