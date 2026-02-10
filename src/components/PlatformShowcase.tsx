import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Sequence } from "remotion";
import React from "react";
import { ParticleEffect } from "./ParticleEffect";
import { Play, Check, Lock, AlertTriangle, MonitorPlay, FileText, Settings, Maximize2, X } from "lucide-react";
import { Cursor } from "./Cursor";

const ModuleItem = ({ number, title, duration, active = false }: { number: number, title: string, duration: string, active?: boolean }) => (
    <div className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${active ? 'bg-yellow-900/20 border-yellow-600/50' : 'bg-transparent border-transparent text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${active ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-500'}`}>
            {number}
        </div>
        <div className="flex-1">
            <div className={`text-sm font-medium ${active ? 'text-white' : 'text-gray-400'}`}>{title}</div>
            <div className="text-[10px] text-gray-600">{duration}</div>
        </div>
        {active && <Play size={14} className="text-yellow-500 fill-yellow-500" />}
        {!active && number < 1 && <Check size={14} className="text-green-500" />}
        {!active && number > 1 && <Lock size={14} className="text-gray-700" />}
    </div>
);

export const PlatformShowcase: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height, durationInFrames } = useVideoConfig();

    // 1. Entrance
    const introProgress = spring({
        frame,
        fps,
        config: { stiffness: 50, damping: 20 }
    });
    const introBlur = interpolate(introProgress, [0, 1], [30, 0]);
    const introOpacity = interpolate(introProgress, [0, 1], [0, 1]);

    // 2. Cursor Animation
    const cursorStartFrame = 60;
    const clickFrame = 120;

    // Move to play button
    const cursorSpring = spring({
        frame: frame - cursorStartFrame,
        fps,
        config: { damping: 30, stiffness: 80 }
    });

    const targetX = 1920 * 0.35;
    const targetY = 1080 * 0.55;

    const cursorX = interpolate(cursorSpring, [0, 1], [width, targetX]);
    const cursorY = interpolate(cursorSpring, [0, 1], [height, targetY]);

    // Click Animation
    const clickSpring = spring({
        frame: frame - clickFrame,
        fps,
        config: { damping: 15, stiffness: 150 }
    });
    const scaleClick = interpolate(clickSpring, [0, 0.2, 1], [1, 0.8, 1]);

    // 3. Popup Trigger
    const popupStartFrame = clickFrame + 5;
    const popupSpring = spring({
        frame: frame - popupStartFrame,
        fps,
        config: { stiffness: 100, damping: 20 }
    });

    // Background Dim & Blur (when popup appears)
    const bgDim = interpolate(popupSpring, [0, 1], [1, 0.1]); // Darken heavy
    const bgBlur = interpolate(popupSpring, [0, 1], [0, 20]); // Blur heavy

    // Popup Animation
    const popupScale = interpolate(popupSpring, [0, 1], [0.8, 1]);
    const popupOpacity = interpolate(popupSpring, [0, 1], [0, 1]);
    const popupY = interpolate(popupSpring, [0, 1], [50, 0]);

    // 4. Exit Transition (End of clip)
    const exitStart = durationInFrames - 30;
    const exitSpring = spring({ frame: frame - exitStart, fps, config: { stiffness: 50, damping: 20 } });
    const exitBlur = interpolate(exitSpring, [0, 1], [0, 50]);
    const exitOpacity = interpolate(exitSpring, [0, 0.2, 1], [1, 1, 0]);

    const totalBlur = introBlur + exitBlur;
    const totalOpacity = introOpacity * exitOpacity;

    return (
        <AbsoluteFill
            className="bg-black font-sans text-white items-center justify-center overflow-hidden"
            style={{
                filter: `blur(${totalBlur}px)`,
                opacity: totalOpacity
            }}
        >
            <ParticleEffect />

            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yellow-900/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Main Content Wrapper - gets diffused when popup is active */}
            <div
                className="w-full max-w-7xl px-8 flex flex-col h-[85vh] justify-center relative z-10 transition-all duration-500"
                style={{
                    opacity: bgDim,
                    filter: `blur(${bgBlur}px)`
                }}
            >
                {/* Header Text */}
                <div className="mb-8 pl-4 border-l-4 border-yellow-500">
                    <h2 className="text-6xl font-extrabold uppercase mb-2">Por Dentro da <span className="text-yellow-500">Plataforma</span></h2>
                    <p className="text-gray-400 text-xl max-w-2xl">Aulas gravadas em alta definição, didática simples e direta.</p>
                </div>

                {/* Content */}
                <div className="flex gap-6 h-[600px] items-stretch">
                    {/* Video Player */}
                    <div className="flex-[2] bg-zinc-900/40 backdrop-blur-md border border-zinc-700/50 rounded-2xl relative overflow-hidden group shadow-2xl">
                        {/* Video Mockup Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                            <div className="mb-4">
                                <div className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-2">Você está assistindo</div>
                                <h3 className="text-3xl font-bold text-white mb-4">Módulo 01: Introdução e Ferramentas</h3>
                            </div>
                            <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden flex items-center">
                                <div className="h-full bg-yellow-500 w-1/3" />
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-mono">
                                <div className="flex gap-2 items-center">
                                    <Play size={10} fill="currentColor" />
                                    12:45 / 35:20
                                </div>
                                <div className="flex gap-2">
                                    <Settings size={12} />
                                    <Maximize2 size={12} />
                                </div>
                            </div>
                        </div>

                        {/* PLAY BUTTON */}
                        <div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{ transform: `scale(${scaleClick})` }}
                        >
                            <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.4)] relative">
                                <div className="absolute inset-0 bg-yellow-500 animate-ping opacity-20 rounded-full" />
                                <Play size={40} className="ml-2 text-black fill-black" />
                            </div>
                        </div>
                    </div>

                    {/* Module List */}
                    <div className="flex-1 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2 overflow-hidden">
                        <div className="flex justify-between items-end mb-4 border-b border-gray-800 pb-4">
                            <div>
                                <h4 className="font-bold text-white">Conteúdo Programático</h4>
                                <div className="text-xs text-gray-500">8 Módulos • 45 Aulas</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
                            <ModuleItem number={1} title="Introdução e Ferramentas" duration="45 min" active />
                            <ModuleItem number={2} title="Projeto e Planejamento" duration="1h 20m" />
                            <ModuleItem number={3} title="Corte e Preparação" duration="2h 10m" />
                            <ModuleItem number={4} title="Soldagem do Chassi" duration="3h 30m" />
                        </div>
                    </div>
                </div>
            </div>

            {/* POPUP OVERLAY */}
            <AbsoluteFill className="flex items-center justify-center z-50 pointer-events-none">
                <div
                    className="bg-zinc-950/95 border border-yellow-500/30 rounded-3xl p-10 w-[600px] text-center shadow-[0_0_100px_rgba(234,179,8,0.15)] backdrop-blur-2xl relative transform transition-transform"
                    style={{
                        opacity: popupOpacity,
                        transform: `scale(${popupScale}) translateY(${popupY}px)`
                    }}
                >
                    {/* Close Icon (Visual only) */}
                    <div className="absolute top-6 right-6 text-gray-400 opacity-50"><X size={24} /></div>

                    {/* Warning Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                            <AlertTriangle size={40} className="text-yellow-500" strokeWidth={2.5} />
                        </div>
                    </div>

                    <h3 className="text-4xl font-black uppercase text-white mb-1 leading-none tracking-tight">PARE! <span className="text-yellow-500">NÃO PERCA</span> ESSA</h3>
                    <h3 className="text-4xl font-black uppercase text-white mb-6 leading-none tracking-tight">CHANCE</h3>

                    <p className="text-gray-400 text-base mb-8 leading-relaxed px-6">
                        Você está a um passo de ver o conteúdo que vai transformar sua vida financeira. Mas antes, você precisa garantir sua vaga!
                    </p>

                    {/* Offer Box */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 mb-8 text-left">
                        <div className="text-yellow-600 font-extrabold text-xs uppercase mb-4 text-center tracking-[0.2em]">Oferta Exclusiva Dose Dupla</div>
                        <div className="space-y-3 text-sm text-gray-300 font-medium">
                            <div className="flex items-center gap-3"><div className="bg-green-500/20 p-1 rounded"><Check size={14} className="text-green-500" /></div> Curso de Fabricação de Reboques</div>
                            <div className="flex items-center gap-3"><div className="bg-green-500/20 p-1 rounded"><Check size={14} className="text-green-500" /></div> Curso de Suspensão e Freio (Bônus)</div>
                            <div className="flex items-center gap-3"><div className="bg-green-500/20 p-1 rounded"><Check size={14} className="text-green-500" /></div> Acesso Vitalício + Certificado</div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-black uppercase py-5 rounded-xl shadow-[0_10px_30px_rgba(34,197,94,0.3)] transform transition-transform hover:scale-105 mb-4 text-xl tracking-wide border-b-4 border-green-800">
                        QUERO GARANTIR MINHA VAGA AGORA
                    </button>

                    <div className="flex justify-center items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider font-bold opacity-60">
                        <Lock size={10} /> Ambiente 100% Seguro • Satisfação Garantida
                    </div>
                </div>
            </AbsoluteFill>


            {/* CURSOR - Fade out when popup appears */}
            <AbsoluteFill style={{
                left: cursorX,
                top: cursorY,
                zIndex: 100,
                pointerEvents: "none",
                transform: `scale(${scaleClick})`,
                opacity: interpolate(popupSpring, [0, 0.2], [1, 0])
            }}>
                <Cursor />
            </AbsoluteFill>

        </AbsoluteFill>
    );
};
