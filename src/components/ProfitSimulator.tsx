import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Sequence } from "remotion";
import React from "react";
import { ParticleEffect } from "./ParticleEffect";
import { TrendingUp, DollarSign } from "lucide-react";

// Helper component for a Slider
const Slider = ({ label, value, min, max, format, delay }: { label: string, value: number, min: number, max: number, format: (v: number) => string, delay: number }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const spr = spring({
        frame: frame - delay,
        fps,
        config: { damping: 15, stiffness: 80 },
    });

    const progress = interpolate(spr, [0, 1], [0, (value - min) / (max - min)]);
    // Clamp progress
    const widthPct = Math.min(Math.max(progress, 0), 1) * 100;

    return (
        <div className="mb-6 w-full">
            <div className="flex justify-between text-white mb-2 font-medium">
                <span>{label}</span>
                <span className="text-yellow-500 font-bold">{format(value)}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full relative">
                <div
                    className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full"
                    style={{ width: `${widthPct}%` }}
                />
                {/* Thumb */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 bg-yellow-400 w-4 h-4 rounded-full shadow-lg border-2 border-white"
                    style={{ left: `${widthPct}%` }}
                />

                {/* Min/Max labels */}
                <div className="absolute top-4 left-0 text-[10px] text-gray-500">{format(min)}</div>
                <div className="absolute top-4 right-0 text-[10px] text-gray-500">{format(max)}</div>
            </div>
        </div>
    );
};

// Helper for counting numbers
const Counter = ({ target, prefix = "", duration }: { target: number, prefix?: string, duration: number }) => {
    const frame = useCurrentFrame();

    // Count up until 1.5 seconds before end (45 frames)
    // Start at frame 15 (after entrance)
    const endFrame = duration - 45;

    const progress = interpolate(frame, [15, endFrame], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
    const current = Math.round(progress * target);

    // Format currency Brazil style
    const formatted = current.toLocaleString('pt-BR', { minimumFractionDigits: 0 });

    return <span>{prefix} {formatted}</span>;
}

export const ProfitSimulator: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // Entrance Blur
    const introProgress = spring({ frame, fps, config: { stiffness: 50, damping: 20 } });
    const introBlur = interpolate(introProgress, [0, 1], [30, 0]);
    const introOpacity = interpolate(introProgress, [0, 1], [0, 1]);

    // Exit Blur (similar logic to previous)
    const exitStart = durationInFrames - 30;
    const exitProgress = spring({ frame: frame - exitStart, fps, config: { stiffness: 50, damping: 20 } });
    const exitBlur = interpolate(exitProgress, [0, 1], [0, 50]);
    const exitOpacity = interpolate(exitProgress, [0, 0.2, 1], [1, 1, 0]);

    const totalBlur = introBlur + exitBlur;
    const totalOpacity = introOpacity * exitOpacity;

    // Staggered entrance for containers
    const leftColSpring = spring({ frame: frame - 10, fps, config: { damping: 20 } });
    const leftY = interpolate(leftColSpring, [0, 1], [50, 0]);
    const leftOp = leftColSpring;

    const rightColSpring = spring({ frame: frame - 20, fps, config: { damping: 20 } });
    const rightY = interpolate(rightColSpring, [0, 1], [50, 0]);
    const rightOp = rightColSpring;

    return (
        <AbsoluteFill
            className="bg-black font-sans text-white items-center overflow-hidden"
            style={{
                filter: `blur(${totalBlur}px)`,
                opacity: totalOpacity
            }}
        >
            <ParticleEffect />

            {/* Glows */}
            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col items-center justify-center w-full h-full max-w-6xl px-8">

                {/* Header */}
                <div className="text-center mb-10 z-10">
                    <h2 className="text-5xl font-extrabold uppercase mb-2">SIMULE SEU <span className="text-yellow-500">LUCRO</span></h2>
                    <p className="text-gray-400 text-lg max-w-2xl">Descubra o potencial financeiro de fabricar reboques.</p>
                </div>

                <div className="flex w-full gap-8 items-stretch h-[450px]">

                    {/* Left Column: Sliders */}
                    <div
                        className="flex-1 bg-[#111] border border-gray-800 rounded-3xl p-8 flex flex-col justify-center shadow-lg"
                        style={{ opacity: leftOp, transform: `translateY(${leftY}px)` }}
                    >
                        <Slider
                            label="Custo de Material (unidade)"
                            value={2500} min={1500} max={4000}
                            format={(v) => `R$ ${v.toLocaleString('pt-BR')}`}
                            delay={15}
                        />
                        <Slider
                            label="Preço de Venda (unidade)"
                            value={5500} min={4000} max={10000}
                            format={(v) => `R$ ${v.toLocaleString('pt-BR')}`}
                            delay={30}
                        />
                        <Slider
                            label="Vendas por Mês"
                            value={2} min={1} max={10}
                            format={(v) => `${v} reboques`}
                            delay={45}
                        />
                    </div>

                    {/* Right Column: Result Card */}
                    <div
                        className="flex-1 bg-gradient-to-br from-black to-[#1a1500] border border-yellow-900/50 rounded-3xl p-8 flex flex-col items-center justify-between text-center relative shadow-2xl"
                        style={{ opacity: rightOp, transform: `translateY(${rightY}px)` }}
                    >
                        <div className="w-full text-center mt-4">
                            <h3 className="text-gray-400 font-bold tracking-widest uppercase text-sm mb-4">SEU POTENCIAL DE LUCRO</h3>
                            <div className="text-gray-300 text-sm mb-1">Lucro Mensal Estimado</div>
                            {/* MAIN NUMBER */}
                            <div className="text-7xl font-black text-white drop-shadow-xl" style={{ lineHeight: 1 }}>
                                <Counter target={6000} prefix="R$" duration={durationInFrames} />
                            </div>
                        </div>

                        <div className="w-full h-px bg-yellow-900/30 my-4" />

                        <div className="flex justify-between w-full px-4">
                            <div className="text-left">
                                <div className="text-xs text-gray-500 uppercase font-bold">Lucro por Unidade</div>
                                <div className="text-2xl font-bold text-yellow-500">
                                    <Counter target={3000} prefix="R$" duration={durationInFrames} />
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-gray-500 uppercase font-bold">Lucro Anual</div>
                                <div className="text-2xl font-bold text-green-500">
                                    <Counter target={72000} prefix="R$" duration={durationInFrames} />
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-yellow-900/20 border border-yellow-700/50 rounded-xl py-3 mt-6 flex items-center justify-center gap-2 text-yellow-500 font-bold">
                            <TrendingUp size={20} />
                            Margem de Lucro: 55%
                        </div>

                        {/* Glow behind */}
                        <div className="absolute inset-0 bg-yellow-500/5 blur-3xl rounded-3xl -z-10" />
                    </div>

                </div>
            </div>
        </AbsoluteFill>
    );
};
