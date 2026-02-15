import { AbsoluteFill, Img, Video, spring, useCurrentFrame, useVideoConfig, interpolate, staticFile, Sequence } from "remotion";
import React from "react";

// Google Fonts - Luxury/Sophisticated Style
import { loadFont as loadCinzel } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadPlayfairDisplay } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";

const { fontFamily: cinzel } = loadCinzel();
const { fontFamily: playfairDisplay } = loadPlayfairDisplay();
const { fontFamily: montserrat } = loadMontserrat();

// Typography - Luxury Style
const FONTS = {
    headline: cinzel,          // Classic luxury headlines
    accent: playfairDisplay,   // Elegant serif accents
    body: montserrat,          // Modern premium body text
};

// =====================
// BILINGUAL SUPPORT
// =====================
type Lang = "en" | "pt";

const TRANSLATIONS = {
    en: {
        productName: "WAVE DETECTOR",
        productSubtitle: "VOL. 1",
        highlightText: "(+10) BEATS",
        ctaText: "NOW AVAILABLE",
        tagline: "PREMIUM BEATS COLLECTION",
        limitedEdition: "🔥 LIMITED EDITION",
        exclusive: "🔥 EXCLUSIVE",
        exclusiveLabel: "⚡ EXCLUSIVE",
        produceMusic: "PRODUCE PROFESSIONAL\nMUSIC",
        folderList: [{ name: "100% Royalty-Free", icon: "🔥" }],
        headerLine1: "AND",
        headerLine2: "MUCH MORE!",
        allIncluded: "ALL INCLUDED",
        beatsLabel: "BEATS",
        beatsSubLabel: "High Quality & Rare",
        fireRare: "🔥 FIRE & RARE",
        plusBeats: "+10 BEATS",
        ctaLine1: "👥 TAG",
        ctaLine2: "2 RAPPER\nFRIENDS",
        ctaLine3: "TO GET THE PACK 🎁",
    },
    pt: {
        productName: "WAVE DETECTOR",
        productSubtitle: "VOL. 1",
        highlightText: "(+10) BEATS",
        ctaText: "DISPONÍVEL AGORA",
        tagline: "COLEÇÃO PREMIUM DE BEATS",
        limitedEdition: "🔥 EDIÇÃO LIMITADA",
        exclusive: "🔥 EXCLUSIVO",
        exclusiveLabel: "⚡ EXCLUSIVO",
        produceMusic: "PRODUZA MÚSICA\nPROFISSIONAL",
        folderList: [{ name: "100% Livre de Royalties", icon: "🔥" }],
        headerLine1: "E",
        headerLine2: "MUITO MAIS!",
        allIncluded: "TUDO INCLUÍDO",
        beatsLabel: "BEATS",
        beatsSubLabel: "Alta Qualidade & Raros",
        fireRare: "🔥 FOGO & RAROS",
        plusBeats: "+10 BEATS",
        ctaLine1: "👥 MARQUE",
        ctaLine2: "2 AMIGOS\nRAPPERS",
        ctaLine3: "PARA RECEBER O PACK 🎁",
    },
} as const;

type Translations = typeof TRANSLATIONS[Lang];

// Color Palette (matching cover - thermal green style)
const COLORS = {
    bg: "#000000",
    primary: "#7FFF00", // Lime Green (main accent)
    secondary: "#00D4FF", // Cyan (secondary)
    text: "#FFFFFF",
    glow: "#4ADE80" // Softer green for glow effects
};

// =====================



// =====================
// SEGMENT 2: COVER SHOWCASE (Enhanced Premium)
// =====================
const CoverShowcase: React.FC<{ t: Translations }> = ({ t }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entrance animation
    const entranceProgress = spring({ frame, fps, config: { stiffness: 80, damping: 15 } });
    const entranceBlur = interpolate(entranceProgress, [0, 1], [30, 0]);

    // Text animations
    const titleSpring = spring({ frame: frame - 10, fps, config: { stiffness: 100, damping: 15 } });
    const coverSpring = spring({ frame: frame - 5, fps, config: { stiffness: 80, damping: 12 } });
    const ctaSpring = spring({ frame: frame - 25, fps, config: { stiffness: 100, damping: 15 } });
    const glassSpring = spring({ frame: frame - 3, fps, config: { stiffness: 60, damping: 12 } });
    const taglineSpring = spring({ frame: frame - 35, fps, config: { stiffness: 120, damping: 15 } });
    const badgeSpring = spring({ frame: frame - 20, fps, config: { stiffness: 150, damping: 12 } });

    // 3D Tilt effect
    const tiltX = Math.sin(frame / 25) * 4;
    const tiltY = Math.cos(frame / 30) * 3;

    // Float animation for cover
    const floatY = Math.sin(frame / 20) * 6;

    // Glow pulse
    const glowPulse = 0.7 + Math.sin(frame / 15) * 0.3;

    // White flash on entrance (quick burst at frames 3-8)
    const flashOpacity = interpolate(frame, [3, 6, 12], [0, 0.8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // Dramatic zoom: start big and pull back
    const zoomScale = interpolate(frame, [0, 20], [1.4, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // Glitch effect for title (random micro offsets at specific frames)
    const glitchActive = (frame > 12 && frame < 16) || (frame > 45 && frame < 48) || (frame > 85 && frame < 88);
    const glitchX = glitchActive ? Math.sin(frame * 50) * 8 : 0;
    const glitchSkew = glitchActive ? Math.cos(frame * 30) * 2 : 0;

    // Border light rotation (continuous)
    const borderLightAngle = (frame * 4) % 360;

    // Tagline letter-by-letter
    const TAGLINE = t.tagline;
    const visibleLetters = Math.round(interpolate(taglineSpring, [0, 1], [0, TAGLINE.length]));

    // Orbiting sparks/particles
    const sparks = Array.from({ length: 8 }, (_, i) => {
        const angle = ((frame * 2 + i * 45) % 360) * (Math.PI / 180);
        const radius = 310 + Math.sin(frame / 10 + i) * 15;
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            size: 4 + (i % 3) * 2,
            opacity: 0.5 + Math.sin(frame / 8 + i) * 0.4
        };
    });

    // Exit (adjusted for 5s duration)
    const exitBlur = interpolate(frame, [130, 145], [0, 40], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // Equalizer bars
    const eqBars = Array.from({ length: 20 }, (_, i) => ({
        height: 30 + Math.sin(frame / (4 + i * 0.5) + i * 0.8) * 25 + Math.cos(frame / (6 + i * 0.3)) * 15,
        opacity: 0.3 + Math.sin(frame / (5 + i)) * 0.2
    }));

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(180deg, #000000 0%, #0a1a0a 50%, #000000 100%)",
            filter: `blur(${entranceBlur + exitBlur}px)`,
            transform: `scale(${zoomScale})`,
        }}>
            {/* White Flash on Entrance */}
            <AbsoluteFill style={{
                background: "white",
                opacity: flashOpacity,
                zIndex: 100,
                pointerEvents: "none"
            }} />

            {/* Animated Light Rays */}
            <AbsoluteFill style={{
                background: `conic-gradient(from ${frame * 0.5}deg at 50% 30%, transparent 0deg, rgba(127,255,0,0.08) 30deg, transparent 60deg, rgba(127,255,0,0.05) 120deg, transparent 180deg)`,
                opacity: glassSpring
            }} />

            {/* Equalizer Bars Background */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 200,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: 6,
                opacity: glassSpring * 0.5,
                zIndex: 0
            }}>
                {eqBars.map((bar, i) => (
                    <div key={i} style={{
                        width: 16,
                        height: bar.height,
                        background: `linear-gradient(180deg, ${COLORS.primary} 0%, rgba(127,255,0,0.1) 100%)`,
                        borderRadius: "4px 4px 0 0",
                        opacity: bar.opacity,
                        boxShadow: `0 0 8px rgba(127,255,0,${bar.opacity * 0.5})`
                    }} />
                ))}
            </div>

            {/* Green Glow Overlay */}
            <AbsoluteFill style={{
                background: "radial-gradient(ellipse 80% 50% at 50% 45%, rgba(127,255,0,0.15) 0%, transparent 60%)",
                opacity: glowPulse
            }} />

            {/* Floating Glass Panels (Background Depth) */}
            <div style={{
                position: "absolute",
                top: "15%",
                left: "-5%",
                width: 200,
                height: 300,
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                borderRadius: 30,
                border: "1px solid rgba(255,255,255,0.1)",
                transform: `rotate(-15deg) translateY(${floatY * 1.5}px)`,
                opacity: glassSpring * 0.5
            }} />
            <div style={{
                position: "absolute",
                bottom: "20%",
                right: "-8%",
                width: 180,
                height: 250,
                background: "linear-gradient(135deg, rgba(127,255,0,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                borderRadius: 25,
                border: "1px solid rgba(127,255,0,0.15)",
                transform: `rotate(20deg) translateY(${-floatY * 1.2}px)`,
                opacity: glassSpring * 0.4
            }} />

            {/* Content */}
            <AbsoluteFill className="flex flex-col items-center justify-center gap-4 px-6">
                {/* Top Text with Glitch */}
                <div style={{
                    transform: `translateY(${interpolate(titleSpring, [0, 1], [-40, 0])}px) translateX(${glitchX}px) skewX(${glitchSkew}deg)`,
                    opacity: titleSpring,
                    textAlign: "center"
                }}>
                    <div style={{
                        fontSize: 36,
                        fontWeight: 400,
                        color: COLORS.primary,
                        letterSpacing: 8,
                        textTransform: "uppercase",
                        fontFamily: FONTS.body,
                        textShadow: `0 0 20px ${COLORS.primary}`
                    }}>
                        {t.highlightText}
                    </div>
                    <div style={{
                        fontSize: 100,
                        fontWeight: 400,
                        color: COLORS.text,
                        letterSpacing: 6,
                        textTransform: "uppercase",
                        fontFamily: FONTS.headline,
                        lineHeight: 0.9,
                        textShadow: `0 0 60px ${COLORS.primary}, 0 0 120px rgba(127,255,0,0.3), 0 4px 20px rgba(0,0,0,0.8)`,
                        position: "relative"
                    }}>
                        {t.productName}
                        {/* Glitch duplicate layers */}
                        {glitchActive && (
                            <>
                                <div style={{
                                    position: "absolute", top: 2, left: -3, right: 0,
                                    color: "rgba(0,255,0,0.4)",
                                    clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)"
                                }}>{t.productName}</div>
                                <div style={{
                                    position: "absolute", top: -2, left: 3, right: 0,
                                    color: "rgba(0,200,255,0.3)",
                                    clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)"
                                }}>{t.productName}</div>
                            </>
                        )}
                    </div>
                    <div style={{
                        fontSize: 48,
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.6)",
                        letterSpacing: 16,
                        textTransform: "uppercase",
                        fontFamily: FONTS.headline
                    }}>
                        {t.productSubtitle}
                    </div>
                </div>

                {/* Glass Card with Cover Art - 3D Tilt + Orbiting Sparks */}
                <div style={{
                    transform: `scale(${interpolate(coverSpring, [0, 1], [0.8, 1])}) translateY(${floatY}px) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                    opacity: coverSpring,
                    position: "relative"
                }}>
                    {/* Orbiting Sparks */}
                    {sparks.map((spark, i) => (
                        <div key={i} style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            width: spark.size,
                            height: spark.size,
                            borderRadius: "50%",
                            background: COLORS.primary,
                            opacity: spark.opacity * coverSpring,
                            transform: `translate(${spark.x}px, ${spark.y}px) translate(-50%, -50%)`,
                            boxShadow: `0 0 ${spark.size * 4}px ${COLORS.primary}, 0 0 ${spark.size * 8}px rgba(127,255,0,0.3)`,
                            zIndex: 10
                        }} />
                    ))}

                    {/* Outer Glow */}
                    <div style={{
                        position: "absolute",
                        inset: -20,
                        background: `radial-gradient(circle, rgba(127,255,0,${0.4 * glowPulse}) 0%, transparent 70%)`,
                        borderRadius: 40,
                        filter: "blur(30px)"
                    }} />

                    {/* Glass Frame with Rotating Border Light */}
                    <div style={{
                        position: "relative",
                        padding: 12,
                        background: `linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(127,255,0,0.08) 100%)`,
                        borderRadius: 24,
                        border: `2px solid rgba(127,255,0,${0.3 + glowPulse * 0.3})`,
                        boxShadow: `
                            0 30px 60px rgba(0,0,0,0.5),
                            0 0 40px rgba(127,255,0,${0.2 * glowPulse}),
                            inset 0 1px 0 rgba(255,255,255,0.2),
                            inset 0 -1px 0 rgba(0,0,0,0.3)
                        `,
                        backdropFilter: "blur(20px)",
                        overflow: "hidden"
                    }}>
                        {/* Rotating Border Light Point */}
                        <div style={{
                            position: "absolute",
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: `radial-gradient(circle, ${COLORS.primary} 0%, transparent 70%)`,
                            filter: "blur(8px)",
                            top: `${50 + Math.sin(borderLightAngle * Math.PI / 180) * 52}%`,
                            left: `${50 + Math.cos(borderLightAngle * Math.PI / 180) * 52}%`,
                            transform: "translate(-50%, -50%)",
                            opacity: 0.8,
                            zIndex: 20,
                            pointerEvents: "none"
                        }} />

                        {/* LIMITED EDITION Badge */}
                        <div style={{
                            position: "absolute",
                            top: 20,
                            right: -8,
                            background: `linear-gradient(135deg, ${COLORS.primary} 0%, #4ADE80 100%)`,
                            color: "#000",
                            fontSize: 13,
                            fontWeight: 900,
                            padding: "6px 18px",
                            borderRadius: 20,
                            fontFamily: FONTS.body,
                            letterSpacing: 2,
                            boxShadow: `0 4px 15px rgba(127,255,0,0.5)`,
                            transform: `scale(${interpolate(badgeSpring, [0, 1], [0, 1])})`,
                            zIndex: 30
                        }}>
                            {t.limitedEdition}
                        </div>

                        {/* Cover Image */}
                        <div style={{
                            borderRadius: 16,
                            overflow: "hidden",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
                        }}>
                            <Img src={staticFile("cover.png")} style={{ width: 480, height: 480, objectFit: "cover" }} />
                        </div>

                        {/* Glass Shine Effect */}
                        <div style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "50%",
                            background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                            borderRadius: "24px 24px 0 0",
                            pointerEvents: "none"
                        }} />
                    </div>

                    {/* Mirror Reflection */}
                    <div style={{
                        marginTop: 8,
                        borderRadius: 16,
                        overflow: "hidden",
                        transform: "scaleY(-1)",
                        height: 80,
                        opacity: 0.15,
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)"
                    }}>
                        <Img src={staticFile("cover.png")} style={{ width: 480, height: 480, objectFit: "cover", borderRadius: 16 }} />
                    </div>
                </div>

                {/* Animated Tagline (Letter by Letter) */}
                <div style={{
                    opacity: taglineSpring,
                    marginTop: 10,
                    display: "flex",
                    gap: 3,
                    justifyContent: "center"
                }}>
                    {TAGLINE.split("").map((letter, i) => (
                        <span key={i} style={{
                            fontSize: 20,
                            fontWeight: 600,
                            color: i < visibleLetters ? COLORS.primary : "transparent",
                            fontFamily: FONTS.body,
                            letterSpacing: 4,
                            textShadow: i < visibleLetters ? `0 0 10px ${COLORS.primary}` : "none"
                        }}>
                            {letter === " " ? "\u00A0" : letter}
                        </span>
                    ))}
                </div>

                {/* CTA Text with Glass Pill */}
                <div style={{
                    transform: `translateY(${interpolate(ctaSpring, [0, 1], [30, 0])}px) scale(${interpolate(ctaSpring, [0, 1], [0.8, 1])})`,
                    opacity: ctaSpring,
                    position: "relative",
                    marginTop: 8
                }}>
                    {/* Glass Pill Background */}
                    <div style={{
                        position: "absolute",
                        inset: "-15px -40px",
                        background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
                        borderRadius: 50,
                        border: "1px solid rgba(255,255,255,0.15)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
                    }} />
                    <div style={{
                        position: "relative",
                        fontSize: 72,
                        fontWeight: 400,
                        color: COLORS.primary,
                        letterSpacing: 10,
                        textTransform: "uppercase",
                        fontFamily: FONTS.accent,
                        textShadow: `0 0 40px ${COLORS.primary}, 0 0 80px rgba(127,255,0,0.5)`
                    }}>
                        {t.ctaText}
                    </div>
                </div>
            </AbsoluteFill>

            {/* Equalizer Bars at Bottom */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: 4,
                padding: "0 40px",
                zIndex: 4,
                opacity: 0.5
            }}>
                {eqBars.map((bar, i) => (
                    <div key={`eq-${i}`} style={{
                        width: `${100 / 20}%`,
                        height: bar.height,
                        background: `linear-gradient(180deg, ${COLORS.primary} 0%, rgba(127,255,0,0.2) 100%)`,
                        borderRadius: "4px 4px 0 0",
                        opacity: bar.opacity,
                        boxShadow: "0 0 8px rgba(127,255,0,0.2)"
                    }} />
                ))}
            </div>
        </AbsoluteFill>
    );
};

// =====================
// SEGMENT 3: CONTENT COUNTER (Glassmorphism)
// =====================
const ContentCounter: React.FC<{ count: string; label: string; subLabel?: string }> = ({ count, label, subLabel }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entranceSpring = spring({ frame, fps, config: { stiffness: 100, damping: 15 } });
    const countSpring = spring({ frame: frame - 5, fps, config: { stiffness: 80, damping: 12 } });
    const glassSpring = spring({ frame: frame - 3, fps, config: { stiffness: 60, damping: 12 } });

    // Glow pulse
    const glowPulse = 0.7 + Math.sin(frame / 12) * 0.3;

    // Float animation
    const floatY = Math.sin(frame / 18) * 5;

    const exitBlur = interpolate(frame, [55, 70], [0, 30], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // Equalizer bars
    const eqBars = Array.from({ length: 20 }, (_, i) => ({
        height: 30 + Math.sin(frame / (4 + i * 0.5) + i * 0.8) * 25 + Math.cos(frame / (6 + i * 0.3)) * 15,
        opacity: 0.3 + Math.sin(frame / (5 + i)) * 0.2
    }));

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(180deg, #000000 0%, #0a1a0a 50%, #000000 100%)",
            filter: `blur(${interpolate(entranceSpring, [0, 1], [20, 0]) + exitBlur}px)`
        }}>
            {/* Animated Light Rays */}
            <AbsoluteFill style={{
                background: `conic-gradient(from ${frame * 0.8}deg at 50% 40%, transparent 0deg, rgba(127,255,0,0.06) 20deg, transparent 40deg, rgba(127,255,0,0.04) 80deg, transparent 120deg)`,
                opacity: glassSpring
            }} />

            {/* Green Glow Overlay */}
            <AbsoluteFill style={{
                background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(127,255,0,0.18) 0%, transparent 60%)",
                opacity: glowPulse
            }} />

            {/* Floating Glass Panels */}
            <div style={{
                position: "absolute",
                top: "10%",
                right: "-10%",
                width: 160,
                height: 240,
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                borderRadius: 25,
                border: "1px solid rgba(255,255,255,0.08)",
                transform: `rotate(25deg) translateY(${floatY * 1.3}px)`,
                opacity: glassSpring * 0.4
            }} />
            <div style={{
                position: "absolute",
                bottom: "15%",
                left: "-8%",
                width: 140,
                height: 200,
                background: "linear-gradient(135deg, rgba(127,255,0,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                borderRadius: 20,
                border: "1px solid rgba(127,255,0,0.12)",
                transform: `rotate(-20deg) translateY(${-floatY}px)`,
                opacity: glassSpring * 0.35
            }} />

            {/* Counter Content with Glass Card */}
            <AbsoluteFill className="flex flex-col items-center justify-center">
                <div style={{
                    position: "relative",
                    transform: `translateY(${floatY}px)`,
                }}>
                    {/* Outer Glow */}
                    <div style={{
                        position: "absolute",
                        inset: -30,
                        background: `radial-gradient(circle, rgba(127,255,0,${0.35 * glowPulse}) 0%, transparent 70%)`,
                        borderRadius: 50,
                        filter: "blur(25px)"
                    }} />

                    {/* Glass Card */}
                    <div style={{
                        position: "relative",
                        padding: "50px 80px",
                        background: "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, rgba(127,255,0,0.06) 100%)",
                        borderRadius: 30,
                        border: `2px solid rgba(127,255,0,${0.25 + glowPulse * 0.25})`,
                        boxShadow: `
                            0 25px 50px rgba(0,0,0,0.4),
                            0 0 30px rgba(127,255,0,${0.15 * glowPulse}),
                            inset 0 1px 0 rgba(255,255,255,0.15),
                            inset 0 -1px 0 rgba(0,0,0,0.2)
                        `,
                        backdropFilter: "blur(20px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8
                    }}>
                        {/* Count */}
                        <div style={{
                            fontSize: 160,
                            fontWeight: 400,
                            color: COLORS.text,
                            fontFamily: FONTS.headline,
                            lineHeight: 1,
                            transform: `scale(${interpolate(countSpring, [0, 1], [0.5, 1])})`,
                            opacity: countSpring,
                            textShadow: `0 0 60px ${COLORS.primary}, 0 0 120px rgba(127,255,0,0.4)`
                        }}>
                            {count}
                        </div>

                        {/* Label */}
                        <div style={{
                            fontSize: 52,
                            fontWeight: 400,
                            color: COLORS.primary,
                            letterSpacing: 8,
                            textTransform: "uppercase",
                            fontFamily: FONTS.accent,
                            transform: `translateY(${interpolate(entranceSpring, [0, 1], [20, 0])}px)`,
                            opacity: entranceSpring,
                            textShadow: `0 0 30px ${COLORS.primary}`
                        }}>
                            {label}
                        </div>

                        {/* SubLabel */}
                        {subLabel && (
                            <div style={{
                                fontSize: 22,
                                fontWeight: 600,
                                color: "rgba(255,255,255,0.6)",
                                fontStyle: "italic",
                                fontFamily: FONTS.accent,
                                marginTop: 10,
                                opacity: entranceSpring
                            }}>
                                {subLabel}
                            </div>
                        )}

                        {/* Glass Shine */}
                        <div style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "45%",
                            background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)",
                            borderRadius: "30px 30px 0 0",
                            pointerEvents: "none"
                        }} />
                    </div>
                </div>
            </AbsoluteFill>

            {/* Equalizer Bars at Bottom */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: 4,
                padding: "0 40px",
                zIndex: 4,
                opacity: entranceSpring * 0.5
            }}>
                {eqBars.map((bar, i) => (
                    <div key={`eq-${i}`} style={{
                        width: `${100 / 20}%`,
                        height: bar.height,
                        background: `linear-gradient(180deg, ${COLORS.primary} 0%, rgba(127,255,0,0.2) 100%)`,
                        borderRadius: "4px 4px 0 0",
                        opacity: bar.opacity,
                        boxShadow: "0 0 8px rgba(127,255,0,0.2)"
                    }} />
                ))}
            </div>
        </AbsoluteFill>
    );
};

// =====================
// SEGMENT 4: FOLDER LIST (Enhanced Glassmorphism)
// =====================
// =====================
// SEGMENT 2: HYBRID SHOWCASE (Logo + Video + Fire)
// =====================
const HybridShowcase: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entranceSpring = spring({ frame, fps, config: { stiffness: 80, damping: 14 } });
    const glassSpring = spring({ frame: frame - 5, fps, config: { stiffness: 60, damping: 12 } });
    const glowPulse = 0.7 + Math.sin(frame / 15) * 0.3;
    const floatY = Math.sin(frame / 22) * 4;
    const tiltX = Math.sin(frame / 25) * 4;
    const tiltY = Math.cos(frame / 30) * 3;
    const borderLightAngle = (frame * 4) % 360;
    const badgeSpring = spring({ frame: frame - 20, fps, config: { stiffness: 150, damping: 12 } });
    const scanLineY = ((frame * 4) % 120);

    const exitBlur = interpolate(frame, [180, 205], [0, 40], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // Sparks (Fire effect)
    const sparks = Array.from({ length: 8 }, (_, i) => {
        const angle = ((frame * 2 + i * 45) % 360) * (Math.PI / 180);
        const radius = 290 + Math.sin(frame / 10 + i) * 15;
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            size: 4 + (i % 3) * 2,
            opacity: 0.5 + Math.sin(frame / 8 + i) * 0.4
        };
    });

    const eqBars = Array.from({ length: 20 }, (_, i) => ({
        height: 30 + Math.sin(frame / (4 + i * 0.5) + i * 0.8) * 25 + Math.cos(frame / (6 + i * 0.3)) * 15,
        opacity: 0.3 + Math.sin(frame / (5 + i)) * 0.2
    }));

    const particles = Array.from({ length: 12 }, (_, i) => ({
        x: 15 + (i * 67) % 85,
        y: (10 + (i * 43) % 80 + Math.sin(frame / (15 + i * 3)) * 8),
        size: 3 + (i % 4) * 2,
        opacity: 0.15 + Math.sin(frame / (10 + i * 2)) * 0.15
    }));

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(180deg, #000000 0%, #0a1a0a 50%, #000000 100%)",
            filter: `blur(${interpolate(entranceSpring, [0, 1], [20, 0]) + exitBlur}px)`
        }}>
            {/* Background Effects */}
            <AbsoluteFill style={{
                background: `conic-gradient(from ${frame * 0.6}deg at 50% 35%, transparent 0deg, rgba(127,255,0,0.05) 25deg, transparent 50deg, rgba(127,255,0,0.03) 100deg, transparent 150deg)`,
                opacity: glassSpring
            }} />
            <AbsoluteFill style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 55%, rgba(127,255,0,0.12) 0%, transparent 60%)",
                opacity: glowPulse
            }} />
            {particles.map((p, i) => (
                <div key={i} style={{
                    position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: "50%",
                    background: COLORS.primary, opacity: p.opacity * glassSpring, boxShadow: `0 0 ${p.size * 3}px ${COLORS.primary}`, filter: "blur(1px)"
                }} />
            ))}

            {/* Main Content Stack: Logo Top, Video/Card Bottom */}
            <AbsoluteFill className="flex flex-col items-center justify-center">
                <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 40,
                    transform: `translateY(${floatY}px) scale(0.9)`
                }}>

                    {/* 1. COVER ART (Logo) */}
                    <div style={{
                        position: "relative",
                        opacity: glassSpring,
                        transform: `scale(${interpolate(glassSpring, [0, 1], [0.7, 1])}) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                    }}>
                        {/* Outer Glow */}
                        <div style={{ position: "absolute", inset: -25, background: `radial-gradient(circle, rgba(127,255,0,${0.4 * glowPulse}) 0%, transparent 70%)`, borderRadius: 35, filter: "blur(30px)" }} />

                        {/* Glass Frame */}
                        <div style={{
                            position: "relative", padding: 10,
                            background: "linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(127,255,0,0.08) 100%)",
                            borderRadius: 24, border: `2px solid rgba(127,255,0,${0.3 + glowPulse * 0.3})`,
                            boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(127,255,0,${0.2 * glowPulse})`,
                            backdropFilter: "blur(20px)", overflow: "hidden"
                        }}>
                            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.4)" }}>
                                <Img src={staticFile("cover.png")} style={{ width: 400, height: 400, objectFit: "cover" }} />
                            </div>
                        </div>
                    </div>

                    {/* 2. VIDEO PREVIEW + FIRE CARD */}
                    <div style={{ position: "relative" }}>
                        {/* Video Container */}
                        <div style={{
                            position: "relative", width: 600, height: 340, borderRadius: 24, overflow: "hidden",
                            border: `2px solid rgba(127,255,0,${0.2 + glowPulse * 0.2})`,
                            boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(127,255,0,${0.1 * glowPulse})`,
                            transform: `scale(${interpolate(entranceSpring, [0, 1], [0.8, 1])})`, opacity: entranceSpring
                        }}>
                            <Video src={staticFile("wave.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted startFrom={0} />
                            {/* Overlays */}
                            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(127,255,0,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
                            <div style={{ position: "absolute", top: `${scanLineY}%`, left: 0, right: 0, height: 3, background: "rgba(127,255,0,0.2)", boxShadow: "0 0 12px rgba(127,255,0,0.15)", pointerEvents: "none" }} />
                        </div>

                        {/* Floating Card Overlapping Video */}
                        <div style={{
                            position: "absolute", top: -30, right: -40,
                            padding: "20px 40px",
                            background: "linear-gradient(145deg, rgba(0,0,0,0.8) 0%, rgba(20,40,10,0.9) 100%)",
                            borderRadius: 24,
                            border: `1px solid rgba(127,255,0,${0.5 + glowPulse * 0.3})`,
                            boxShadow: `0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(127,255,0,${0.3 * glowPulse})`,
                            backdropFilter: "blur(10px)",
                            transform: `rotate(5deg) scale(${interpolate(badgeSpring, [0, 1], [0.5, 1])})`
                        }}>
                            {/* Sparks on Card */}
                            {sparks.slice(0, 4).map((spark, i) => (
                                <div key={i} style={{
                                    position: "absolute", left: "50%", top: "50%", width: spark.size, height: spark.size,
                                    borderRadius: "50%", background: COLORS.primary, opacity: spark.opacity,
                                    transform: `translate(${spark.x / 4}px, ${spark.y / 4}px)`,
                                    boxShadow: `0 0 ${spark.size * 2}px ${COLORS.primary}`
                                }} />
                            ))}
                            <div style={{ fontSize: 52, fontWeight: 900, color: COLORS.primary, fontFamily: FONTS.accent, textShadow: `0 0 20px ${COLORS.primary}` }}>
                                +10 BEATS
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: "white", textAlign: "center", fontStyle: "italic", letterSpacing: 2 }}>
                                🔥 FIRE & RARE
                            </div>
                        </div>
                    </div>

                </div>
            </AbsoluteFill>

            {/* Equalizer Bars at Bottom */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
                display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 4, padding: "0 40px", zIndex: 4, opacity: entranceSpring * 0.5
            }}>
                {eqBars.map((bar, i) => (
                    <div key={`eq-${i}`} style={{
                        width: `${100 / 20}%`, height: bar.height,
                        background: `linear-gradient(180deg, ${COLORS.primary} 0%, rgba(127,255,0,0.2) 100%)`,
                        borderRadius: "4px 4px 0 0", opacity: bar.opacity, boxShadow: "0 0 8px rgba(127,255,0,0.2)"
                    }} />
                ))}
            </div>
        </AbsoluteFill>
    );
};

const FolderList: React.FC<{ t: Translations }> = ({ t }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entranceSpring = spring({ frame, fps, config: { stiffness: 100, damping: 15 } });
    const glassSpring = spring({ frame: frame - 5, fps, config: { stiffness: 60, damping: 12 } });
    const glowPulse = 0.7 + Math.sin(frame / 15) * 0.3;

    // Float animation
    const floatY = Math.sin(frame / 22) * 4;

    // Breathing pulse for card (1.0 -> 1.015 -> 1.0)
    const breathe = 1 + Math.sin(frame / 25) * 0.015;

    // Shine sweep position (moves top to bottom over time)
    const shineSweep = interpolate(frame, [15, 60], [-100, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 3D Tilt effect (matching clip 1)
    const tiltX = Math.sin(frame / 25) * 4;
    const tiltY = Math.cos(frame / 30) * 3;

    // Border light rotation
    const borderLightAngle = (frame * 4) % 360;

    // Badge spring
    const badgeSpring = spring({ frame: frame - 20, fps, config: { stiffness: 150, damping: 12 } });

    // Orbiting sparks
    const sparks = Array.from({ length: 8 }, (_, i) => {
        const angle = ((frame * 2 + i * 45) % 360) * (Math.PI / 180);
        const radius = 290 + Math.sin(frame / 10 + i) * 15;
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            size: 4 + (i % 3) * 2,
            opacity: 0.5 + Math.sin(frame / 8 + i) * 0.4
        };
    });

    const exitBlur = interpolate(frame, [160, 175], [0, 40], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // Equalizer bars
    const eqBars = Array.from({ length: 20 }, (_, i) => ({
        height: 30 + Math.sin(frame / (4 + i * 0.5) + i * 0.8) * 25 + Math.cos(frame / (6 + i * 0.3)) * 15,
        opacity: 0.3 + Math.sin(frame / (5 + i)) * 0.2
    }));

    // Particles data (fixed positions, animated with frame)
    const particles = Array.from({ length: 12 }, (_, i) => ({
        x: 15 + (i * 67) % 85,
        y: (10 + (i * 43) % 80 + Math.sin(frame / (15 + i * 3)) * 8),
        size: 3 + (i % 4) * 2,
        opacity: 0.15 + Math.sin(frame / (10 + i * 2)) * 0.15
    }));

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(180deg, #000000 0%, #0a1a0a 50%, #000000 100%)",
            filter: `blur(${interpolate(entranceSpring, [0, 1], [20, 0]) + exitBlur}px)`
        }}>
            {/* Animated Light Rays */}
            <AbsoluteFill style={{
                background: `conic-gradient(from ${frame * 0.6}deg at 50% 35%, transparent 0deg, rgba(127,255,0,0.05) 25deg, transparent 50deg, rgba(127,255,0,0.03) 100deg, transparent 150deg)`,
                opacity: glassSpring
            }} />

            {/* Green Glow Overlay */}
            <AbsoluteFill style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 55%, rgba(127,255,0,0.12) 0%, transparent 60%)",
                opacity: glowPulse
            }} />

            {/* Floating Particles */}
            {particles.map((p, i) => (
                <div key={i} style={{
                    position: "absolute",
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: p.size,
                    height: p.size,
                    borderRadius: "50%",
                    background: COLORS.primary,
                    opacity: p.opacity * glassSpring,
                    boxShadow: `0 0 ${p.size * 3}px ${COLORS.primary}`,
                    filter: "blur(1px)"
                }} />
            ))}

            {/* Floating Glass Panels */}
            <div style={{
                position: "absolute",
                top: "8%",
                left: "-12%",
                width: 180,
                height: 280,
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                borderRadius: 30,
                border: "1px solid rgba(255,255,255,0.08)",
                transform: `rotate(-18deg) translateY(${floatY * 1.5}px)`,
                opacity: glassSpring * 0.35
            }} />
            <div style={{
                position: "absolute",
                bottom: "10%",
                right: "-10%",
                width: 150,
                height: 220,
                background: "linear-gradient(135deg, rgba(127,255,0,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                borderRadius: 25,
                border: "1px solid rgba(127,255,0,0.1)",
                transform: `rotate(22deg) translateY(${-floatY}px)`,
                opacity: glassSpring * 0.3
            }} />

            {/* Header */}
            <div style={{
                position: "absolute",
                top: 50,
                left: 0,
                right: 0,
                textAlign: "center",
                transform: `translateY(${interpolate(entranceSpring, [0, 1], [-30, 0])}px)`,
                opacity: entranceSpring
            }}>
                <div style={{
                    fontSize: 72,
                    fontWeight: 400,
                    color: COLORS.text,
                    fontFamily: FONTS.headline,
                    textShadow: `0 0 50px ${COLORS.primary}, 0 0 100px rgba(127,255,0,0.3)`
                }}>
                    {t.headerLine1}
                </div>
                <div style={{
                    fontSize: 64,
                    fontWeight: 400,
                    color: COLORS.primary,
                    fontFamily: FONTS.accent,
                    textShadow: `0 0 40px ${COLORS.primary}`
                }}>
                    {t.headerLine2}
                </div>
            </div>

            {/* Main Content: Cover on TOP, List Below */}
            <AbsoluteFill className="flex items-center justify-center">
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 30,
                    transform: `translateY(${floatY}px)`,
                    marginTop: 60
                }}>
                    {/* Cover Preview on TOP - Full Effects like Clip 1 */}
                    <div style={{
                        position: "relative",
                        opacity: glassSpring,
                        transform: `scale(${interpolate(glassSpring, [0, 1], [0.7, 1])}) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                    }}>
                        {/* Orbiting Sparks */}
                        {sparks.map((spark, i) => (
                            <div key={i} style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                width: spark.size,
                                height: spark.size,
                                borderRadius: "50%",
                                background: COLORS.primary,
                                opacity: spark.opacity * glassSpring,
                                transform: `translate(${spark.x}px, ${spark.y}px) translate(-50%, -50%)`,
                                boxShadow: `0 0 ${spark.size * 4}px ${COLORS.primary}, 0 0 ${spark.size * 8}px rgba(127,255,0,0.3)`,
                                zIndex: 10
                            }} />
                        ))}

                        {/* Outer Glow */}
                        <div style={{
                            position: "absolute",
                            inset: -25,
                            background: `radial-gradient(circle, rgba(127,255,0,${0.4 * glowPulse}) 0%, transparent 70%)`,
                            borderRadius: 35,
                            filter: "blur(30px)"
                        }} />

                        {/* Glass Frame with Rotating Border Light */}
                        <div style={{
                            position: "relative",
                            padding: 10,
                            background: "linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(127,255,0,0.08) 100%)",
                            borderRadius: 24,
                            border: `2px solid rgba(127,255,0,${0.3 + glowPulse * 0.3})`,
                            boxShadow: `
                                0 30px 60px rgba(0,0,0,0.5),
                                0 0 40px rgba(127,255,0,${0.2 * glowPulse}),
                                inset 0 1px 0 rgba(255,255,255,0.2),
                                inset 0 -1px 0 rgba(0,0,0,0.3)
                            `,
                            backdropFilter: "blur(20px)",
                            overflow: "hidden"
                        }}>
                            {/* Rotating Border Light Point */}
                            <div style={{
                                position: "absolute",
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: `radial-gradient(circle, ${COLORS.primary} 0%, transparent 70%)`,
                                filter: "blur(8px)",
                                top: `${50 + Math.sin(borderLightAngle * Math.PI / 180) * 52}%`,
                                left: `${50 + Math.cos(borderLightAngle * Math.PI / 180) * 52}%`,
                                transform: "translate(-50%, -50%)",
                                opacity: 0.8,
                                zIndex: 20,
                                pointerEvents: "none"
                            }} />

                            {/* LIMITED EDITION Badge */}
                            <div style={{
                                position: "absolute",
                                top: 20,
                                right: -8,
                                background: `linear-gradient(135deg, ${COLORS.primary} 0%, #4ADE80 100%)`,
                                color: "#000",
                                fontSize: 13,
                                fontWeight: 900,
                                padding: "6px 18px",
                                borderRadius: 20,
                                fontFamily: FONTS.body,
                                letterSpacing: 2,
                                boxShadow: `0 4px 15px rgba(127,255,0,0.5)`,
                                transform: `scale(${interpolate(badgeSpring, [0, 1], [0, 1])})`,
                                zIndex: 30
                            }}>
                                {t.limitedEdition}
                            </div>

                            {/* Cover Image */}
                            <div style={{
                                borderRadius: 16,
                                overflow: "hidden",
                                boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
                            }}>
                                <Img src={staticFile("cover.png")} style={{ width: 500, height: 500, objectFit: "cover" }} />
                            </div>

                            {/* Glass Shine Effect */}
                            <div style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: "50%",
                                background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                                borderRadius: "24px 24px 0 0",
                                pointerEvents: "none"
                            }} />
                        </div>

                        {/* Mirror Reflection */}
                        <div style={{
                            marginTop: 8,
                            borderRadius: 16,
                            overflow: "hidden",
                            transform: "scaleY(-1)",
                            height: 80,
                            opacity: 0.15,
                            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)"
                        }}>
                            <Img src={staticFile("cover.png")} style={{ width: 500, height: 500, objectFit: "cover", borderRadius: 16 }} />
                        </div>
                    </div>

                    {/* Glass Card with Folder List */}
                    <div style={{ position: "relative", width: "100%" }}>
                        {/* Outer Glow */}
                        <div style={{
                            position: "absolute",
                            inset: -25,
                            background: `radial-gradient(circle, rgba(127,255,0,${0.3 * glowPulse}) 0%, transparent 70%)`,
                            borderRadius: 35,
                            filter: "blur(20px)"
                        }} />

                        {/* Glass Container with Breathing Pulse */}
                        <div style={{
                            position: "relative",
                            background: "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(127,255,0,0.05) 100%)",
                            borderRadius: 28,
                            border: `2px solid rgba(127,255,0,${0.2 + glowPulse * 0.2})`,
                            boxShadow: `
                                0 25px 50px rgba(0,0,0,0.4),
                                0 0 30px rgba(127,255,0,${0.12 * glowPulse}),
                                inset 0 1px 0 rgba(255,255,255,0.15),
                                inset 0 -1px 0 rgba(0,0,0,0.2)
                            `,
                            backdropFilter: "blur(20px)",
                            padding: "30px 40px",
                            width: 650,
                            transform: `scale(${breathe})`,
                            overflow: "hidden"
                        }}>
                            {t.folderList.map((folder: { name: string; icon: string }, i: number) => {
                                const itemDelay = i * 5;
                                const itemSpring = spring({ frame: frame - itemDelay - 12, fps, config: { stiffness: 100, damping: 14 } });
                                return (
                                    <div key={i} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 24,
                                        padding: "22px 30px",
                                        marginBottom: i < t.folderList.length - 1 ? 12 : 0,
                                        background: "linear-gradient(135deg, rgba(127,255,0,0.15) 0%, rgba(127,255,0,0.05) 100%)",
                                        borderRadius: 20,
                                        border: `2px solid rgba(127,255,0,${0.5 + glowPulse * 0.3})`,
                                        opacity: itemSpring,
                                        transform: `translateX(${interpolate(itemSpring, [0, 1], [-50, 0])}px) scale(${interpolate(itemSpring, [0, 1], [0.9, 1])})`,
                                        boxShadow: `0 0 25px rgba(127,255,0,${0.15 * glowPulse})`,
                                        position: "relative"
                                    }}>
                                        <div style={{
                                            fontSize: 50,
                                            filter: `drop-shadow(0 0 12px ${COLORS.primary})`,
                                            minWidth: 60,
                                            textAlign: "center"
                                        }}>{folder.icon}</div>
                                        <div style={{
                                            fontSize: 36,
                                            fontWeight: 700,
                                            color: COLORS.primary,
                                            fontFamily: FONTS.body,
                                            textShadow: `0 0 15px ${COLORS.primary}`,
                                            letterSpacing: 2
                                        }}>
                                            {folder.name}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Shine Sweep Effect */}
                            <div style={{
                                position: "absolute",
                                top: `${shineSweep}%`,
                                left: 0,
                                right: 0,
                                height: 60,
                                background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                                pointerEvents: "none",
                                transform: "skewY(-2deg)"
                            }} />

                            {/* Glass Shine */}
                            <div style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: "40%",
                                background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
                                borderRadius: "28px 28px 0 0",
                                pointerEvents: "none"
                            }} />
                        </div>
                    </div>
                </div>
            </AbsoluteFill>

            {/* Bottom Text - ALL INCLUDED */}
            <div style={{
                position: "absolute",
                bottom: 80,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center"
            }}>
                <div style={{ position: "relative" }}>
                    <div style={{
                        position: "absolute",
                        inset: "-14px -40px",
                        background: "linear-gradient(135deg, rgba(127,255,0,0.15) 0%, rgba(127,255,0,0.04) 100%)",
                        borderRadius: 40,
                        border: `1px solid rgba(127,255,0,${0.2 + glowPulse * 0.2})`,
                        backdropFilter: "blur(10px)",
                        boxShadow: `0 0 25px rgba(127,255,0,${0.1 * glowPulse})`
                    }} />
                    <div style={{
                        position: "relative",
                        fontSize: 30,
                        fontWeight: 400,
                        color: COLORS.primary,
                        fontFamily: FONTS.accent,
                        letterSpacing: 6,
                        textShadow: `0 0 25px ${COLORS.primary}`
                    }}>
                        {t.allIncluded}
                    </div>
                </div>
            </div>

            {/* Equalizer Bars at Bottom */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: 4,
                padding: "0 40px",
                zIndex: 4,
                opacity: entranceSpring * 0.5
            }}>
                {eqBars.map((bar, i) => (
                    <div key={`eq-${i}`} style={{
                        width: `${100 / 20}%`,
                        height: bar.height,
                        background: `linear-gradient(180deg, ${COLORS.primary} 0%, rgba(127,255,0,0.2) 100%)`,
                        borderRadius: "4px 4px 0 0",
                        opacity: bar.opacity,
                        boxShadow: "0 0 8px rgba(127,255,0,0.2)"
                    }} />
                ))}
            </div>
        </AbsoluteFill>
    );
};

// =====================
// SEGMENT 4: CTA (Cinematic Full-Screen)
// =====================
const CTASection: React.FC<{ t: Translations }> = ({ t }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entranceSpring = spring({ frame, fps, config: { stiffness: 80, damping: 14 } });
    const coverSpring = spring({ frame: frame - 3, fps, config: { stiffness: 60, damping: 12 } });
    const textSpring = spring({ frame: frame - 15, fps, config: { stiffness: 100, damping: 14 } });
    const sendSpring = spring({ frame: frame - 25, fps, config: { stiffness: 120, damping: 12 } });
    const subSpring = spring({ frame: frame - 35, fps, config: { stiffness: 100, damping: 14 } });
    const arrowSpring = spring({ frame: frame - 40, fps, config: { stiffness: 150, damping: 12 } });

    const glowPulse = 0.7 + Math.sin(frame / 10) * 0.3;
    const sendPulse = 1 + Math.sin(frame / 6) * 0.05;
    const sendGlow = 0.6 + Math.sin(frame / 5) * 0.4;
    const coverFloat = Math.sin(frame / 20) * 6;
    const tiltX = Math.sin(frame / 25) * 4;
    const tiltY = Math.cos(frame / 30) * 3;
    const borderAngle = (frame * 5) % 360;
    const arrowBounce = Math.sin(frame / 8) * 12;
    const exitOpacity = interpolate(frame, [190, 205], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const zoomScale = interpolate(frame, [0, 15], [1.3, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    const sparks = Array.from({ length: 8 }, (_, i) => {
        const angle = ((frame * 3 + i * 45) % 360) * (Math.PI / 180);
        const radius = 340 + Math.sin(frame / 10 + i) * 15;
        return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, size: 4 + (i % 3) * 2, opacity: 0.5 + Math.sin(frame / 8 + i) * 0.4 };
    });

    const risingParticles = Array.from({ length: 20 }, (_, i) => {
        const speed = 1.5 + (i % 4) * 0.5;
        const baseY = 100 - ((frame * speed + i * 30) % 130);
        return { x: 8 + (i * 47) % 84, y: baseY, size: 2 + (i % 3) * 2, opacity: interpolate(baseY, [-10, 10, 70, 100], [0, 0.4, 0.4, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) };
    });

    const eqBars = Array.from({ length: 24 }, (_, i) => ({
        height: 25 + Math.sin(frame / (3 + i * 0.4) + i * 0.7) * 20 + Math.cos(frame / (5 + i * 0.3)) * 12,
        opacity: 0.35 + Math.sin(frame / (4 + i)) * 0.2
    }));

    return (
        <AbsoluteFill style={{ background: "#000", filter: `blur(${interpolate(entranceSpring, [0, 1], [20, 0])}px)`, opacity: exitOpacity, transform: `scale(${zoomScale})` }}>
            {/* Blurred cover background */}
            <AbsoluteFill style={{ opacity: coverSpring * 0.35, filter: "blur(60px) saturate(1.5)", transform: "scale(1.3)" }}>
                <Img src={staticFile("cover.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </AbsoluteFill>

            {/* Dark overlay */}
            <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 100%)" }} />

            {/* Light rays */}
            <AbsoluteFill style={{ background: `conic-gradient(from ${frame * 1.5}deg at 50% 40%, transparent 0deg, rgba(127,255,0,0.08) 20deg, transparent 40deg, rgba(127,255,0,0.05) 100deg, transparent 160deg, rgba(127,255,0,0.06) 240deg, transparent 300deg)`, opacity: entranceSpring * 0.8 }} />

            {/* Central glow */}
            <div style={{ position: "absolute", top: "25%", left: "50%", width: 700, height: 700, transform: "translate(-50%, -50%)", background: `radial-gradient(circle, rgba(127,255,0,${0.25 * glowPulse}) 0%, rgba(127,255,0,0.08) 40%, transparent 70%)`, filter: "blur(40px)" }} />

            {/* Rising particles */}
            {risingParticles.map((p, i) => (
                <div key={`rp-${i}`} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: "50%", background: i % 3 === 0 ? COLORS.primary : "rgba(255,255,255,0.6)", opacity: p.opacity * entranceSpring, boxShadow: i % 3 === 0 ? `0 0 ${p.size * 4}px ${COLORS.primary}` : `0 0 ${p.size * 2}px rgba(255,255,255,0.3)` }} />
            ))}

            {/* ===== MAIN LAYOUT ===== */}
            <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0, paddingBottom: 80 }}>

                {/* COVER ART — Hero */}
                <div style={{ position: "relative", transform: `translateY(${coverFloat}px) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${interpolate(coverSpring, [0, 1], [0.5, 1])})`, opacity: coverSpring, marginBottom: 50 }}>
                    {/* Orbiting Sparks */}
                    {sparks.map((spark, i) => (
                        <div key={`s-${i}`} style={{ position: "absolute", left: "50%", top: "50%", width: spark.size, height: spark.size, borderRadius: "50%", background: COLORS.primary, opacity: spark.opacity * coverSpring, transform: `translate(${spark.x}px, ${spark.y}px) translate(-50%, -50%)`, boxShadow: `0 0 ${spark.size * 4}px ${COLORS.primary}, 0 0 ${spark.size * 8}px rgba(127,255,0,0.3)`, zIndex: 10 }} />
                    ))}

                    {/* Outer glow */}
                    <div style={{ position: "absolute", inset: -30, background: `radial-gradient(circle, rgba(127,255,0,${0.4 * glowPulse}) 0%, transparent 70%)`, borderRadius: 40, filter: "blur(30px)" }} />

                    {/* Cover glass frame */}
                    <div style={{ position: "relative", padding: 10, background: "linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 50%, rgba(127,255,0,0.1) 100%)", borderRadius: 28, border: `2px solid rgba(127,255,0,${0.4 + glowPulse * 0.3})`, boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(127,255,0,${0.25 * glowPulse}), inset 0 1px 0 rgba(255,255,255,0.25)`, backdropFilter: "blur(20px)", overflow: "hidden" }}>
                        {/* Rotating border light */}
                        <div style={{ position: "absolute", width: 50, height: 50, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.primary} 0%, transparent 70%)`, filter: "blur(8px)", top: `${50 + Math.sin(borderAngle * Math.PI / 180) * 52}%`, left: `${50 + Math.cos(borderAngle * Math.PI / 180) * 52}%`, transform: "translate(-50%, -50%)", opacity: 0.9, zIndex: 20, pointerEvents: "none" }} />

                        <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
                            <Img src={staticFile("cover.png")} style={{ width: 500, height: 500, objectFit: "cover" }} />
                        </div>

                        {/* Glass shine */}
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)", borderRadius: "28px 28px 0 0", pointerEvents: "none" }} />
                    </div>

                    {/* Mirror reflection */}
                    <div style={{ marginTop: 6, borderRadius: 20, overflow: "hidden", transform: "scaleY(-1)", height: 60, opacity: 0.12, maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)" }}>
                        <Img src={staticFile("cover.png")} style={{ width: 500, height: 500, objectFit: "cover", borderRadius: 20 }} />
                    </div>
                </div>

                {/* TEXT — Below Cover */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transform: `translateY(${interpolate(textSpring, [0, 1], [50, 0])}px)` }}>
                    {/* 👥 MARQUE */}
                    <div style={{ opacity: textSpring, fontSize: 42, fontWeight: 400, color: "rgba(255,255,255,0.85)", fontFamily: FONTS.body, letterSpacing: 4, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
                        {t.ctaLine1}
                    </div>

                    {/* "2 AMIGOS RAPPERS" */}
                    <div style={{ position: "relative", transform: `scale(${interpolate(sendSpring, [0, 1], [0.3, 1]) * sendPulse})`, opacity: sendSpring }}>
                        <div style={{ position: "absolute", inset: "-20px -50px", background: `radial-gradient(ellipse, rgba(127,255,0,${0.3 * sendGlow}) 0%, transparent 70%)`, filter: "blur(20px)" }} />
                        <div style={{ position: "relative", fontSize: 80, fontWeight: 400, color: COLORS.primary, fontFamily: FONTS.headline, letterSpacing: 4, lineHeight: 1.1, textAlign: "center", textShadow: `0 0 30px ${COLORS.primary}, 0 0 60px ${COLORS.primary}, 0 0 120px rgba(127,255,0,0.5), 0 4px 30px rgba(0,0,0,0.8)` }}>
                            {t.ctaLine2.split("\n").map((line: string, i: number) => <React.Fragment key={i}>{i > 0 && "\n"}{line}</React.Fragment>)}
                        </div>
                    </div>

                    {/* PARA RECEBER O PACK */}
                    <div style={{ fontSize: 34, fontWeight: 600, color: "rgba(255,255,255,0.8)", fontFamily: FONTS.body, letterSpacing: 6, opacity: subSpring, transform: `translateY(${interpolate(subSpring, [0, 1], [20, 0])}px)`, textShadow: "0 2px 15px rgba(0,0,0,0.5)", textAlign: "center" }}>
                        {t.ctaLine3}
                    </div>

                    {/* Animated arrow */}
                    <div style={{ marginTop: 20, opacity: arrowSpring * (0.6 + Math.sin(frame / 8) * 0.4), transform: `translateY(${arrowBounce}px) scale(${interpolate(arrowSpring, [0, 1], [0, 1])})` }}>
                        <div style={{ width: 50, height: 50, borderLeft: `3px solid ${COLORS.primary}`, borderBottom: `3px solid ${COLORS.primary}`, transform: "rotate(-45deg)", filter: `drop-shadow(0 0 8px ${COLORS.primary})` }} />
                    </div>
                </div>
            </AbsoluteFill>

            {/* EQ Bars */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 70, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 3, padding: "0 30px", zIndex: 4, opacity: entranceSpring * 0.4 }}>
                {eqBars.map((bar, i) => (
                    <div key={`eq-${i}`} style={{ width: `${100 / 24}%`, height: bar.height, background: `linear-gradient(180deg, ${COLORS.primary} 0%, rgba(127,255,0,0.15) 100%)`, borderRadius: "3px 3px 0 0", opacity: bar.opacity, boxShadow: "0 0 6px rgba(127,255,0,0.15)" }} />
                ))}
            </div>
        </AbsoluteFill>
    );
};


// =====================
// SEGMENT: VIDEO CONTENT COUNTER
// =====================
const VideoContentCounter: React.FC<{ count: string; label: string; subLabel?: string; videoSrc: string; t: Translations }> = ({ count, label, subLabel, videoSrc, t }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entranceSpring = spring({ frame, fps, config: { stiffness: 100, damping: 15 } });
    const countSpring = spring({ frame: frame - 5, fps, config: { stiffness: 80, damping: 12 } });
    const badgeSpring = spring({ frame: frame - 18, fps, config: { stiffness: 150, damping: 12 } });

    const glowPulse = 0.7 + Math.sin(frame / 12) * 0.3;
    const floatY = Math.sin(frame / 18) * 5;
    const exitBlur = interpolate(frame, [190, 205], [0, 30], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // 1. White flash on entrance
    // 1. White flash removed

    // 2. 3D Tilt
    const tiltX = Math.sin(frame / 25) * 4;
    const tiltY = Math.cos(frame / 30) * 3;

    // 3. Border light rotation
    const borderLightAngle = (frame * 4) % 360;

    // 4. Orbiting sparks
    const sparks = Array.from({ length: 8 }, (_, i) => {
        const angle = ((frame * 2.5 + i * 45) % 360) * (Math.PI / 180);
        const radius = 220 + Math.sin(frame / 10 + i) * 20;
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            size: 4 + (i % 3) * 2,
            opacity: 0.5 + Math.sin(frame / 8 + i) * 0.4
        };
    });

    // 5. Floating particles
    const particles = Array.from({ length: 15 }, (_, i) => ({
        x: 10 + (i * 59) % 80,
        y: (5 + (i * 41) % 90 + Math.sin(frame / (12 + i * 2)) * 6),
        size: 3 + (i % 4) * 2,
        opacity: 0.2 + Math.sin(frame / (8 + i * 2)) * 0.2
    }));

    // 6. Equalizer bars
    const eqBars = Array.from({ length: 20 }, (_, i) => ({
        height: 30 + Math.sin(frame / (4 + i * 0.5) + i * 0.8) * 25 + Math.cos(frame / (6 + i * 0.3)) * 15,
        opacity: 0.3 + Math.sin(frame / (5 + i)) * 0.2
    }));

    // 7. Scan line position (VHS effect)
    const scanLineY = ((frame * 4) % 120);

    return (
        <AbsoluteFill style={{
            background: "linear-gradient(180deg, #000000 0%, #0a1a0a 50%, #000000 100%)",
            filter: `blur(${interpolate(entranceSpring, [0, 1], [20, 0]) + exitBlur}px)`
        }}>


            {/* Background green radial glow */}
            <AbsoluteFill style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(127,255,0,0.08) 0%, transparent 60%)",
                opacity: glowPulse
            }} />

            {/* 1. Floating Particles */}
            {particles.map((p, i) => (
                <div key={`p-${i}`} style={{
                    position: "absolute",
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: p.size,
                    height: p.size,
                    borderRadius: "50%",
                    background: COLORS.primary,
                    opacity: p.opacity * entranceSpring,
                    boxShadow: `0 0 ${p.size * 3}px ${COLORS.primary}`,
                    filter: "blur(1px)",
                    zIndex: 6
                }} />
            ))}

            {/* 6. Equalizer Bars at Bottom */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: 4,
                padding: "0 40px",
                zIndex: 4,
                opacity: entranceSpring * 0.5
            }}>
                {eqBars.map((bar, i) => (
                    <div key={`eq-${i}`} style={{
                        width: `${100 / eqBars.length}%`,
                        height: bar.height,
                        background: `linear-gradient(180deg, ${COLORS.primary} 0%, rgba(127,255,0,0.2) 100%)`,
                        borderRadius: "4px 4px 0 0",
                        opacity: bar.opacity,
                        boxShadow: "0 0 8px rgba(127,255,0,0.2)"
                    }} />
                ))}
            </div>

            {/* Main Content: Card on top, Video below */}
            <AbsoluteFill className="flex flex-col items-center justify-center" style={{ gap: 40 }}>

                {/* Persuasive Copy at Top */}
                <div style={{
                    position: "absolute",
                    top: 100,
                    left: 0,
                    right: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    zIndex: 20,
                }}>
                    <div style={{
                        fontSize: 32,
                        fontWeight: 400,
                        color: COLORS.primary,
                        letterSpacing: 8,
                        textTransform: "uppercase",
                        fontFamily: FONTS.body,
                        textShadow: `0 0 20px ${COLORS.primary}`,
                        opacity: spring({ frame: frame - 8, fps, config: { stiffness: 100, damping: 14 } }),
                        transform: `translateY(${interpolate(spring({ frame: frame - 8, fps, config: { stiffness: 100, damping: 14 } }), [0, 1], [-20, 0])}px)`,
                    }}>
                        {t.exclusiveLabel}
                    </div>
                    <div style={{
                        fontSize: 52,
                        fontWeight: 400,
                        color: COLORS.text,
                        fontFamily: FONTS.headline,
                        textAlign: "center",
                        lineHeight: 1.1,
                        textShadow: `0 0 40px ${COLORS.primary}, 0 0 80px rgba(127,255,0,0.3), 0 4px 20px rgba(0,0,0,0.8)`,
                        opacity: spring({ frame: frame - 14, fps, config: { stiffness: 80, damping: 12 } }),
                        transform: `translateY(${interpolate(spring({ frame: frame - 14, fps, config: { stiffness: 80, damping: 12 } }), [0, 1], [30, 0])}px)`,
                        padding: "0 60px",
                    }}>
                        {t.produceMusic.split("\n").map((line: string, i: number) => <React.Fragment key={i}>{i > 0 && "\n"}{line}</React.Fragment>)}
                    </div>
                </div>

                {/* Glass Card with Counter */}
                <div style={{
                    position: "relative",
                    transform: `translateY(${floatY}px) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                }}>
                    {/* 2. Orbiting Sparks */}
                    {sparks.map((spark, i) => (
                        <div key={`s-${i}`} style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            width: spark.size,
                            height: spark.size,
                            borderRadius: "50%",
                            background: COLORS.primary,
                            opacity: spark.opacity * entranceSpring,
                            transform: `translate(${spark.x}px, ${spark.y}px) translate(-50%, -50%)`,
                            boxShadow: `0 0 ${spark.size * 4}px ${COLORS.primary}, 0 0 ${spark.size * 8}px rgba(127,255,0,0.3)`,
                            zIndex: 10
                        }} />
                    ))}

                    {/* Outer Glow */}
                    <div style={{
                        position: "absolute",
                        inset: -35,
                        background: `radial-gradient(circle, rgba(127,255,0,${0.4 * glowPulse}) 0%, transparent 70%)`,
                        borderRadius: 50,
                        filter: "blur(30px)"
                    }} />

                    {/* Glass Card */}
                    <div style={{
                        position: "relative",
                        padding: "50px 90px",
                        background: "linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(127,255,0,0.08) 100%)",
                        borderRadius: 30,
                        border: `2px solid rgba(127,255,0,${0.25 + glowPulse * 0.25})`,
                        boxShadow: `
                            0 30px 60px rgba(0,0,0,0.5),
                            0 0 40px rgba(127,255,0,${0.2 * glowPulse}),
                            inset 0 1px 0 rgba(255,255,255,0.15),
                            inset 0 -1px 0 rgba(0,0,0,0.2)
                        `,
                        backdropFilter: "blur(20px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                        overflow: "hidden"
                    }}>
                        {/* 3. Rotating Border Light */}
                        <div style={{
                            position: "absolute",
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            background: `radial-gradient(circle, ${COLORS.primary} 0%, transparent 70%)`,
                            filter: "blur(10px)",
                            top: `${50 + Math.sin(borderLightAngle * Math.PI / 180) * 54}%`,
                            left: `${50 + Math.cos(borderLightAngle * Math.PI / 180) * 54}%`,
                            transform: "translate(-50%, -50%)",
                            opacity: 0.8,
                            zIndex: 20,
                            pointerEvents: "none"
                        }} />

                        {/* 8. EXCLUSIVE Badge */}
                        <div style={{
                            position: "absolute",
                            top: 15,
                            right: -5,
                            background: `linear-gradient(135deg, ${COLORS.primary} 0%, #4ADE80 100%)`,
                            color: "#000",
                            fontSize: 12,
                            fontWeight: 900,
                            padding: "5px 16px",
                            borderRadius: 20,
                            fontFamily: FONTS.body,
                            letterSpacing: 2,
                            boxShadow: "0 4px 15px rgba(127,255,0,0.5)",
                            transform: `scale(${interpolate(badgeSpring, [0, 1], [0, 1])})`,
                            zIndex: 30
                        }}>
                            {t.exclusive}
                        </div>

                        {/* 7. Count with massive glow */}
                        <div style={{
                            fontSize: 180,
                            fontWeight: 400,
                            color: COLORS.text,
                            fontFamily: FONTS.headline,
                            lineHeight: 1,
                            transform: `scale(${interpolate(countSpring, [0, 1], [0.3, 1])})`,
                            opacity: countSpring,
                            textShadow: `
                                0 0 40px ${COLORS.primary},
                                0 0 80px ${COLORS.primary},
                                0 0 160px rgba(127,255,0,0.5),
                                0 0 250px rgba(127,255,0,0.2)
                            `
                        }}>
                            {count}
                        </div>
                        <div style={{
                            fontSize: 52,
                            fontWeight: 400,
                            color: COLORS.primary,
                            letterSpacing: 10,
                            textTransform: "uppercase",
                            fontFamily: FONTS.accent,
                            transform: `translateY(${interpolate(entranceSpring, [0, 1], [20, 0])}px)`,
                            opacity: entranceSpring,
                            textShadow: `0 0 30px ${COLORS.primary}, 0 0 60px rgba(127,255,0,0.3)`
                        }}>
                            {label}
                        </div>
                        {subLabel && (
                            <div style={{
                                fontSize: 22,
                                fontWeight: 600,
                                color: "rgba(255,255,255,0.7)",
                                fontStyle: "italic",
                                fontFamily: FONTS.accent,
                                marginTop: 10,
                                opacity: entranceSpring,
                                textShadow: "0 0 10px rgba(127,255,0,0.2)"
                            }}>
                                {subLabel}
                            </div>
                        )}

                        {/* Glass Shine */}
                        <div style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "45%",
                            background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)",
                            borderRadius: "30px 30px 0 0",
                            pointerEvents: "none"
                        }} />
                    </div>
                </div>

                {/* Video Preview Below Card */}
                <div style={{
                    position: "relative",
                    width: 700,
                    height: 400,
                    borderRadius: 24,
                    overflow: "hidden",
                    border: `2px solid rgba(127,255,0,${0.2 + glowPulse * 0.2})`,
                    boxShadow: `
                        0 20px 50px rgba(0,0,0,0.5),
                        0 0 30px rgba(127,255,0,${0.1 * glowPulse})
                    `,
                    transform: `scale(${interpolate(entranceSpring, [0, 1], [0.8, 1])})`,
                    opacity: entranceSpring
                }}>
                    <Video
                        src={staticFile(videoSrc)}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                        muted
                        startFrom={0}
                    />
                    {/* Cinematic vignette on video */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        background: `
                            radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%),
                            linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%)
                        `,
                        pointerEvents: "none"
                    }} />
                    {/* Green tint */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "radial-gradient(ellipse at 50% 50%, rgba(127,255,0,0.08) 0%, transparent 60%)",
                        opacity: glowPulse,
                        pointerEvents: "none"
                    }} />
                    {/* VHS Scan Lines on video */}
                    <div style={{
                        position: "absolute",
                        top: `${scanLineY}%`,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: "rgba(127,255,0,0.2)",
                        boxShadow: "0 0 12px rgba(127,255,0,0.15)",
                        pointerEvents: "none"
                    }} />
                    <div style={{
                        position: "absolute",
                        top: `${(scanLineY + 50) % 100}%`,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: "rgba(255,255,255,0.06)",
                        pointerEvents: "none"
                    }} />
                    {/* Glass border shine */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 24,
                        border: "1px solid rgba(255,255,255,0.08)",
                        pointerEvents: "none"
                    }} />
                </div>

            </AbsoluteFill>
        </AbsoluteFill>
    );
};

// =====================
// MAIN COMPOSITION
// =====================
export const BeatsMotionCreatives: React.FC<{ lang?: Lang }> = ({ lang = "en" }) => {
    const t = TRANSLATIONS[lang];
    return (
        <AbsoluteFill style={{ backgroundColor: "black", fontFamily: FONTS.body }}>
            {/* Segment 1: Cover Showcase (5s) */}
            <Sequence durationInFrames={150}>
                <CoverShowcase t={t} />
            </Sequence>

            {/* Segment 2: +10 Beats with Video (7s) */}
            <Sequence from={150} durationInFrames={210}>
                <VideoContentCounter count="+10" label={t.beatsLabel} subLabel={t.beatsSubLabel} videoSrc="wave.mp4" t={t} />
            </Sequence>

            {/* Segment 3: Folder List (6s) */}
            <Sequence from={360} durationInFrames={180}>
                <FolderList t={t} />
            </Sequence>

            {/* Segment 4: CTA (7s) */}
            <Sequence from={540} durationInFrames={210}>
                <CTASection t={t} />
            </Sequence>
        </AbsoluteFill>
    );
};
