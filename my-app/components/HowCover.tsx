import {
  Arm,
  BLUE,
  Box,
  Head,
  INK,
  Leg,
  SKY,
  Shoe,
  Torso,
  YELLOW,
  thin,
} from "./ServiceScene";

const code = [
  [0, 30, SKY],
  [8, 42, YELLOW],
  [8, 24, "#fff"],
  [16, 50, SKY],
  [0, 36, YELLOW],
] as const;

// The idle face of the "How I work" panel: the same cap-wearing developer, typing away. Motion lives in globals.css (.cv-*).
export default function HowCover() {
  return (
    <svg
      viewBox="40 24 330 206"
      role="img"
      aria-label="Rhuzzel typing code at a laptop"
      className="how-cover block w-full max-w-[340px] max-[800px]:max-w-[170px]"
    >
      <rect x={132} y={160} width={10} height={70} fill={INK} />
      <rect x={336} y={160} width={10} height={70} fill={INK} />
      <Box x={120} y={150} w={236} h={12} fill={BLUE} rx={3} />
      {/* laptop with code being typed in from the right */}
      <Box x={198} y={62} w={106} h={82} fill="#fff" rx={6} />
      <rect
        className="cv-screen"
        x={206}
        y={70}
        width={90}
        height={66}
        fill={INK}
      />
      {code.map(([indent, len, fill], i) => (
        <rect
          key={i}
          className="cv-ln"
          style={{ animationDelay: `${i * 0.25}s` }}
          x={212 + indent}
          y={78 + i * 10.5}
          width={len}
          height={5}
          rx={2}
          fill={fill}
        />
      ))}
      <rect
        className="cv-cursor"
        x={270}
        y={124}
        width={7}
        height={8}
        fill={YELLOW}
      />
      <rect
        x={186}
        y={144}
        width={130}
        height={7}
        rx={3}
        fill={SKY}
        {...thin}
      />
      {/* the developer, seated */}
      <rect x={46} y={106} width={10} height={54} rx={4} fill={INK} />
      <Leg d="M70 166h44v48" />
      <Shoe x={102} y={214} />
      <rect x={52} y={154} width={62} height={14} rx={6} fill={INK} />
      <Torso x={58} y={100} w={44} h={58} />
      <g className="cv-head">
        <Head cx={80} cy={76} />
      </g>
      <g className="cv-arm">
        <Arm x1={92} y1={118} x2={190} y2={146} />
      </g>
    </svg>
  );
}
