import { Composition } from "remotion";
import { HelloWorld } from "./compositions/HelloWorld";
import { LogoAnimation } from "./compositions/LogoAnimation";
import { ColorfulShapes } from "./compositions/ColorfulShapes";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: "Welcome to Remotion!",
          titleColor: "#ffffff",
        }}
      />
      <Composition
        id="LogoAnimation"
        component={LogoAnimation}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ColorfulShapes"
        component={ColorfulShapes}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
