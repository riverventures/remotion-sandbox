import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

const Circle: React.FC<{
  delay: number;
  color: string;
  size: number;
  x: number;
  y: number;
}> = ({ delay, color, size, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleSpring = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const scale = interpolate(scaleSpring, [0, 1], [0, 1]);
  const opacity = interpolate(scaleSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        transform: `scale(${scale})`,
        opacity,
        boxShadow: `0 0 40px ${color}`,
      }}
    />
  );
};

const AnimatedLetter: React.FC<{
  letter: string;
  delay: number;
  index: number;
}> = ({ letter, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 15,
      stiffness: 150,
    },
  });

  const y = interpolate(entrance, [0, 1], [50, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const rotation = interpolate(entrance, [0, 1], [20, 0]);

  // Subtle continuous animation
  const float = Math.sin((frame + index * 10) * 0.1) * 5;

  return (
    <span
      style={{
        display: "inline-block",
        transform: `translateY(${y + float}px) rotate(${rotation}deg)`,
        opacity,
        fontFamily: "Arial Black, sans-serif",
        fontSize: 120,
        fontWeight: "bold",
        color: "#ffffff",
        textShadow: "0 0 30px rgba(99, 102, 241, 0.8)",
      }}
    >
      {letter}
    </span>
  );
};

export const LogoAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const letters = "REMOTION".split("");

  // Pulsing background
  const pulse = Math.sin(frame * 0.05) * 0.1 + 1;

  // Fade out
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f23",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Background circles */}
      <Circle delay={0} color="#6366f1" size={300 * pulse} x={400} y={300} />
      <Circle delay={5} color="#8b5cf6" size={250 * pulse} x={1500} y={250} />
      <Circle delay={10} color="#a855f7" size={200 * pulse} x={300} y={700} />
      <Circle delay={15} color="#d946ef" size={180 * pulse} x={1600} y={750} />
      <Circle delay={20} color="#ec4899" size={150 * pulse} x={960} y={150} />

      {/* Animated text */}
      <div style={{ display: "flex", gap: 10 }}>
        {letters.map((letter, index) => (
          <AnimatedLetter
            key={index}
            letter={letter}
            delay={30 + index * 5}
            index={index}
          />
        ))}
      </div>

      {/* Tagline */}
      <Sequence from={70}>
        <div
          style={{
            position: "absolute",
            bottom: 250,
          }}
        >
          <p
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 36,
              color: "#a78bfa",
              opacity: interpolate(frame - 70, [0, 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `translateY(${interpolate(
                frame - 70,
                [0, 20],
                [20, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )}px)`,
            }}
          >
            Make videos programmatically
          </p>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
