import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface HelloWorldProps {
  titleText: string;
  titleColor: string;
}

export const HelloWorld: React.FC<HelloWorldProps> = ({
  titleText,
  titleColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Spring animation for the title entrance
  const titleSpring = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 100,
      mass: 0.5,
    },
  });

  // Scale animation
  const scale = interpolate(titleSpring, [0, 1], [0.5, 1]);

  // Opacity fade in
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtle rotation
  const rotation = interpolate(titleSpring, [0, 1], [-10, 0]);

  // Background gradient animation
  const gradientProgress = interpolate(
    frame,
    [0, durationInFrames],
    [0, 360]
  );

  // Fade out at the end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientProgress}deg, #1a1a2e, #16213e, #0f3460)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          opacity: opacity * fadeOut,
        }}
      >
        <h1
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 100,
            fontWeight: "bold",
            color: titleColor,
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            margin: 0,
          }}
        >
          {titleText}
        </h1>
      </div>

      {/* Animated subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          opacity: interpolate(frame, [30, 50], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }) * fadeOut,
          transform: `translateY(${interpolate(
            frame,
            [30, 50],
            [20, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )}px)`,
        }}
      >
        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 40,
            color: "#94a3b8",
            margin: 0,
          }}
        >
          Create amazing videos with code
        </p>
      </div>
    </AbsoluteFill>
  );
};
