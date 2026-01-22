import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

interface ShapeProps {
  type: "circle" | "square" | "triangle";
  color: string;
  size: number;
  x: number;
  y: number;
  delay: number;
  rotationSpeed: number;
}

const Shape: React.FC<ShapeProps> = ({
  type,
  color,
  size,
  x,
  y,
  delay,
  rotationSpeed,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 10,
      stiffness: 100,
    },
  });

  const scale = interpolate(entrance, [0, 1], [0, 1]);
  const rotation = frame * rotationSpeed;
  const opacity = interpolate(entrance, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Floating animation
  const floatY = Math.sin((frame + delay) * 0.08) * 15;
  const floatX = Math.cos((frame + delay) * 0.06) * 10;

  const shapeStyle: React.CSSProperties = {
    position: "absolute",
    left: x + floatX - size / 2,
    top: y + floatY - size / 2,
    width: size,
    height: size,
    transform: `scale(${scale}) rotate(${rotation}deg)`,
    opacity,
    filter: `drop-shadow(0 0 20px ${color})`,
  };

  if (type === "circle") {
    return (
      <div
        style={{
          ...shapeStyle,
          borderRadius: "50%",
          backgroundColor: color,
        }}
      />
    );
  }

  if (type === "square") {
    return (
      <div
        style={{
          ...shapeStyle,
          borderRadius: 10,
          backgroundColor: color,
        }}
      />
    );
  }

  // Triangle using borders
  return (
    <div
      style={{
        ...shapeStyle,
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
        borderBottom: `${size}px solid ${color}`,
      }}
    />
  );
};

const Counter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const countTo = 100;
  const countDuration = 60; // frames

  const count = Math.min(
    Math.floor(
      interpolate(frame, [30, 30 + countDuration], [0, countTo], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      })
    ),
    countTo
  );

  const scaleSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  return (
    <div
      style={{
        position: "absolute",
        transform: `scale(${interpolate(scaleSpring, [0, 1], [0.5, 1])})`,
        opacity: interpolate(scaleSpring, [0, 1], [0, 1]),
      }}
    >
      <span
        style={{
          fontFamily: "monospace",
          fontSize: 200,
          fontWeight: "bold",
          color: "#ffffff",
          textShadow:
            "0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(124,58,237,0.5)",
        }}
      >
        {count}%
      </span>
    </div>
  );
};

export const ColorfulShapes: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Background color transition
  const bgHue = interpolate(frame, [0, durationInFrames], [240, 280]);

  // Fade out
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  const shapes: ShapeProps[] = [
    { type: "circle", color: "#f43f5e", size: 100, x: 200, y: 200, delay: 0, rotationSpeed: 0 },
    { type: "square", color: "#8b5cf6", size: 80, x: 1700, y: 300, delay: 5, rotationSpeed: 2 },
    { type: "triangle", color: "#06b6d4", size: 90, x: 300, y: 800, delay: 10, rotationSpeed: -1 },
    { type: "circle", color: "#f97316", size: 120, x: 1600, y: 750, delay: 15, rotationSpeed: 0 },
    { type: "square", color: "#22c55e", size: 70, x: 150, y: 500, delay: 20, rotationSpeed: 1.5 },
    { type: "triangle", color: "#eab308", size: 100, x: 1750, y: 550, delay: 25, rotationSpeed: -2 },
    { type: "circle", color: "#ec4899", size: 60, x: 400, y: 150, delay: 8, rotationSpeed: 0 },
    { type: "square", color: "#3b82f6", size: 90, x: 1500, y: 150, delay: 12, rotationSpeed: -1.5 },
    { type: "triangle", color: "#14b8a6", size: 80, x: 500, y: 900, delay: 18, rotationSpeed: 1 },
    { type: "circle", color: "#a855f7", size: 110, x: 1400, y: 900, delay: 22, rotationSpeed: 0 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${bgHue}, 50%, 10%) 0%, hsl(${bgHue + 30}, 60%, 15%) 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {shapes.map((shape, index) => (
        <Shape key={index} {...shape} />
      ))}
      <Counter />
    </AbsoluteFill>
  );
};
