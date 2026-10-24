import type { ReactNode } from "react";

const INK = "#0B1B33";
const BLUE = "#1F5FBF";
const SKY = "#8DBBF2";
const PAPER = "#F2F6FB";
const FAIL = "#b04129";
const SKIN = "#F8C9B0";
const CAP = "#E8DCC4";
const BRIM = "#D2C197";
const YELLOW = "#F6E65A";
const BLUSH = "#F08C6B";
const MONO = { fontFamily: "var(--font-jetbrains-mono)" };
const line = {
  stroke: INK,
  strokeWidth: 3,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

// Flat fills, thick ink outlines and hard offset shadows: the same neo-brutalist language as the site.
function Box({
  x,
  y,
  w,
  h,
  fill,
  rx = 4,
  sw = 3,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  rx?: number;
  sw?: number;
}) {
  return (
    <>
      <rect x={x + 4} y={y + 4} width={w} height={h} rx={rx} fill={INK} />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={rx}
        fill={fill}
        stroke={INK}
        strokeWidth={sw}
      />
    </>
  );
}

function Label({
  x,
  y,
  w,
  text,
  fill,
  color = INK,
}: {
  x: number;
  y: number;
  w: number;
  text: string;
  fill: string;
  color?: string;
}) {
  return (
    <>
      <Box x={x} y={y} w={w} h={18} fill={fill} rx={9} sw={2.5} />
      <text
        x={x + w / 2}
        y={y + 12.5}
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill={color}
        style={MONO}
      >
        {text}
      </text>
    </>
  );
}

// Cap with a smiley, blush and a flat profile: the character style we're borrowing.
function Head({ cx, cy }: { cx: number; cy: number }) {
  const t = {
    stroke: INK,
    strokeWidth: 2.5,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  };
  return (
    <g>
      <rect x={cx - 5} y={cy + 12} width={10} height={14} fill={SKIN} {...t} />
      <circle cx={cx - 15} cy={cy + 4} r={5} fill={SKIN} {...t} />
      <rect
        x={cx - 17}
        y={cy - 8}
        width={34}
        height={32}
        rx={12}
        fill={SKIN}
        {...t}
      />
      <ellipse cx={cx + 7} cy={cy + 12} rx={6} ry={3.5} fill={BLUSH} />
      <path d={`M${cx + 6} ${cy + 3}h7`} fill="none" {...t} />
      <path
        d={`M${cx + 17} ${cy + 6}l3.5 6h-4`}
        fill="none"
        {...t}
        strokeWidth={2}
      />
      <path d={`M${cx + 9} ${cy + 18}h6`} fill="none" {...t} />
      <path
        d={`M${cx - 19} ${cy - 6}q0-20 19-20 q19 0 19 20z`}
        fill={CAP}
        {...t}
      />
      <path
        d={`M${cx} ${cy - 26}q-6 10-4 20`}
        fill="none"
        {...t}
        strokeWidth={1.8}
      />
      <path d={`M${cx + 4} ${cy - 7}h25l-3 7h-22z`} fill={BRIM} {...t} />
      <circle
        cx={cx + 9}
        cy={cy - 17}
        r={5.5}
        fill={YELLOW}
        {...t}
        strokeWidth={1.8}
      />
      <path
        d={`M${cx + 7} ${cy - 18.5}v1.5M${cx + 11} ${cy - 18.5}v1.5M${cx + 6.5} ${cy - 14.5}q2.5 2.5 5 0`}
        fill="none"
        stroke={INK}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </g>
  );
}

function Arm({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <>
      <path d={`M${x1} ${y1}L${x2} ${y2}`} {...line} strokeWidth={11} />
      <path
        d={`M${x1} ${y1}L${x2} ${y2}`}
        stroke={BLUE}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <circle cx={x2} cy={y2} r={5.5} fill={SKIN} {...line} strokeWidth={2.5} />
    </>
  );
}

function Torso({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <>
      <rect x={x + 4} y={y + 4} width={w} height={h} rx={9} fill={INK} />
      <rect x={x} y={y} width={w} height={h} rx={9} fill={BLUE} {...line} />
      <path
        d={`M${x + 4} ${y + h - 14}l9-10 9 10 9-10 9 10`}
        fill="none"
        stroke={SKY}
        strokeWidth={4}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <rect
        x={x + w / 2 - 11}
        y={y - 3}
        width={22}
        height={9}
        rx={3}
        fill="#fff"
        {...line}
        strokeWidth={2}
      />
      <path
        d={`M${x + w / 2 - 5} ${y - 3}v9M${x + w / 2} ${y - 3}v9M${x + w / 2 + 5} ${y - 3}v9`}
        stroke={INK}
        strokeWidth={1.4}
      />
    </>
  );
}

function Leg({ d }: { d: string }) {
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={INK}
        strokeWidth={17}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke="#17325c"
        strokeWidth={11}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

function Shoe({ x, y }: { x: number; y: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={26}
      height={10}
      rx={5}
      fill="#fff"
      {...line}
      strokeWidth={2.5}
    />
  );
}

type Pose = "sit" | "stand" | "walk";

function Legs({ pose }: { pose: Pose }) {
  if (pose === "sit")
    return (
      <>
        <Leg d="M74 152h38v52" />
        <Shoe x={104} y={204} />
      </>
    );
  if (pose === "stand")
    return (
      <>
        <Leg d="M66 160v58" />
        <Leg d="M88 160v58" />
        <Shoe x={58} y={220} />
        <Shoe x={80} y={220} />
      </>
    );
  return (
    <>
      <Leg d="M70 160L48 212" />
      <Leg d="M86 160L106 206L108 218" />
      <Shoe x={34} y={220} />
      <Shoe x={98} y={220} />
    </>
  );
}

function Laptop() {
  return (
    <g transform="rotate(-6 126 128)">
      <rect x={110} y={112} width={40} height={28} fill={INK} />
      <rect x={106} y={108} width={40} height={28} fill="#fff" {...line} />
      <rect x={112} y={114} width={28} height={5} fill={BLUE} />
      <path
        d="M114 128l4 4 9-9"
        fill="none"
        stroke={BLUE}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={101}
        y={136}
        width={50}
        height={6}
        rx={2}
        fill={SKY}
        {...line}
        strokeWidth={2.5}
      />
    </g>
  );
}

function Upper({ pose }: { pose: Pose }) {
  if (pose === "sit")
    return (
      <>
        <Torso x={58} y={104} w={40} h={52} />
        <Head cx={80} cy={80} />
        <Arm x1={92} y1={118} x2={124} y2={156} />
      </>
    );
  return (
    <g transform={pose === "walk" ? "rotate(4 76 160)" : undefined}>
      <Torso x={54} y={102} w={44} h={62} />
      <Head cx={78} cy={78} />
      <Laptop />
      <Arm x1={92} y1={118} x2={112} y2={142} />
      <circle
        cx={150}
        cy={138}
        r={5.5}
        fill={SKIN}
        {...line}
        strokeWidth={2.5}
      />
    </g>
  );
}

function Robot({ x }: { x: number }) {
  return (
    <g>
      <Leg d={`M${x + 12} 196v26`} />
      <Leg d={`M${x + 34} 196v26`} />
      <Box x={x} y={150} w={46} h={48} fill={SKY} rx={6} />
      <path
        d={`M${x + 12} 176l5 5 10-11`}
        fill="none"
        stroke={INK}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d={`M${x + 23} 112v-8`} {...line} />
      <circle
        cx={x + 23}
        cy={100}
        r={4.5}
        fill={BLUE}
        {...line}
        strokeWidth={2.5}
      />
      <Box x={x + 4} y={112} w={38} h={32} fill="#fff" rx={8} />
      <circle cx={x + 16} cy={128} r={3.5} fill={INK} />
      <circle cx={x + 30} cy={128} r={3.5} fill={INK} />
    </g>
  );
}

const alt = [
  "A developer sitting at a computer building a website",
  "A developer standing with a laptop beside a test robot and a checklist, with automation gears",
  "A developer walking with a laptop past a CI/CD pipeline, cloud platforms and AI assistants",
];

export default function ServiceScene({ level }: { level: 1 | 2 | 3 }) {
  const pose: Pose = (["sit", "stand", "walk"] as const)[level - 1];
  let scene: ReactNode;

  if (level === 1) {
    scene = (
      <>
        <Legs pose="sit" />
        {/* chair */}
        <rect x={42} y={98} width={12} height={64} rx={4} fill={INK} />
        <rect x={46} y={156} width={52} height={10} rx={4} fill={INK} />
        <path d="M70 166v50m-12 0h24" {...line} strokeWidth={4} />
        {/* desk */}
        <rect x={34} y={182} width={10} height={48} fill={INK} />
        <rect x={316} y={182} width={10} height={48} fill={INK} />
        <Box x={20} y={170} w={320} h={12} fill={BLUE} rx={3} />
        <Upper pose="sit" />
        {/* monitor showing the site being built */}
        <rect x={154} y={146} width={16} height={14} fill={INK} />
        <rect
          x={140}
          y={158}
          width={44}
          height={12}
          rx={3}
          fill={SKY}
          {...line}
          strokeWidth={2.5}
        />
        <Box x={110} y={58} w={116} h={90} fill="#fff" rx={7} />
        <rect
          x={118}
          y={66}
          width={100}
          height={74}
          fill={PAPER}
          stroke={INK}
          strokeWidth={2}
        />
        <rect x={118} y={66} width={100} height={11} fill={BLUE} />
        {[125, 132, 139].map((cx) => (
          <circle key={cx} cx={cx} cy={71.5} r={2} fill="#fff" />
        ))}
        <rect x={124} y={84} width={44} height={7} fill={INK} />
        <rect
          x={124}
          y={96}
          width={64}
          height={24}
          fill={SKY}
          stroke={INK}
          strokeWidth={2}
        />
        <rect x={194} y={96} width={18} height={11} fill={BLUE} />
        <rect
          x={194}
          y={110}
          width={18}
          height={10}
          fill="#fff"
          stroke={INK}
          strokeWidth={2}
        />
        <rect x={124} y={126} width={28} height={8} rx={4} fill={INK} />
        <rect
          x={116}
          y={162}
          width={62}
          height={8}
          rx={2}
          fill="#fff"
          stroke={INK}
          strokeWidth={2.5}
        />
        {/* a UI block being dragged onto the page */}
        <g transform="rotate(-8 270 90)">
          <Box x={246} y={70} w={64} h={40} fill={SKY} />
          <rect x={254} y={78} width={30} height={7} fill={INK} />
          <rect
            x={254}
            y={90}
            width={46}
            height={10}
            fill={PAPER}
            stroke={INK}
            strokeWidth={2}
          />
          <path
            d="M296 104l0 18 5-5 4 9 4-2-4-9 7 0z"
            fill="#fff"
            {...line}
            strokeWidth={2.5}
          />
        </g>
      </>
    );
  } else if (level === 2) {
    scene = (
      <>
        <Legs pose="stand" />
        <Upper pose="stand" />
        {/* test checklist */}
        <Box x={190} y={40} w={104} h={60} fill="#fff" />
        {[0, 1, 2].map((i) => {
          const y = 56 + i * 16;
          return (
            <g key={i}>
              {i < 2 ? (
                <path
                  d={`M200 ${y} l5 5 l9 -10`}
                  fill="none"
                  stroke={BLUE}
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d={`M201 ${y - 5} l11 10 M212 ${y - 5} l-11 10`}
                  fill="none"
                  stroke={FAIL}
                  strokeWidth={3.5}
                  strokeLinecap="round"
                />
              )}
              <rect
                x={222}
                y={y - 4}
                width={i === 1 ? 50 : 58}
                height={7}
                rx={2}
                fill={i < 2 ? SKY : FAIL}
              />
            </g>
          );
        })}
        <Robot x={210} />
        {/* gears */}
        <circle
          cx={324}
          cy={74}
          r={16}
          fill="none"
          stroke={INK}
          strokeWidth={8}
          strokeDasharray="6 5.7"
        />
        <circle cx={324} cy={74} r={12} fill={SKY} {...line} />
        <circle
          cx={324}
          cy={74}
          r={4.5}
          fill="#fff"
          {...line}
          strokeWidth={2.5}
        />
        <circle
          cx={150}
          cy={52}
          r={10}
          fill="none"
          stroke={INK}
          strokeWidth={6}
          strokeDasharray="4 3.9"
        />
        <circle
          cx={150}
          cy={52}
          r={7}
          fill={BLUE}
          {...line}
          strokeWidth={2.5}
        />
      </>
    );
  } else {
    const steps = [
      ["BUILD", 100, "#fff", INK],
      ["TEST", 180, SKY, INK],
      ["DEPLOY", 260, BLUE, "#fff"],
    ] as const;
    scene = (
      <>
        {/* motion lines */}
        <path d="M14 150h18M8 166h24M16 182h16" {...line} strokeWidth={3} />
        <Legs pose="walk" />
        <Upper pose="walk" />
        {/* CI/CD pipeline */}
        {steps.map(([t, x, fill, color], i) => (
          <g key={t}>
            <Box x={x} y={10} w={60} h={26} fill={fill} rx={6} sw={2.5} />
            <text
              x={x + 30}
              y={27}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill={color}
              style={MONO}
            >
              {t}
            </text>
            {i < 2 && (
              <path
                d={`M${x + 62} 23h16m-5-5l5 5-5 5`}
                fill="none"
                {...line}
                strokeWidth={2.5}
              />
            )}
          </g>
        ))}
        {/* AI assistant bubble */}
        <path
          d="M34 48l8 12 6-12z"
          fill="#fff"
          stroke={INK}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <Box x={8} y={12} w={78} h={36} fill="#fff" rx={10} sw={2.5} />
        <rect x={37} y={45} width={10} height={6} fill="#fff" />
        <text
          x={47}
          y={27}
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill={BLUE}
          style={MONO}
        >
          ✦ CLAUDE
        </text>
        <text
          x={47}
          y={39}
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill={INK}
          style={MONO}
        >
          CODE
        </text>
        <Robot x={172} />
        {/* cloud platforms */}
        <g fill="#fff" stroke={INK} strokeWidth={3}>
          <circle cx={238} cy={104} r={20} />
          <circle cx={272} cy={86} r={26} />
          <circle cx={308} cy={102} r={22} />
          <rect x={238} y={104} width={70} height={20} />
        </g>
        <g fill="#fff">
          <circle cx={238} cy={104} r={18} />
          <circle cx={272} cy={86} r={24} />
          <circle cx={308} cy={102} r={20} />
          <rect x={238} y={102} width={70} height={20} />
        </g>
        <Label x={246} y={72} w={54} text="RAILWAY" fill={INK} color="#fff" />
        <Label x={250} y={96} w={50} text="SENTRY" fill={SKY} />
        <Label x={236} y={192} w={50} text="VERCEL" fill="#fff" />
        <Label x={292} y={192} w={52} text="DOCKER" fill="#fff" />
        <Label
          x={256}
          y={214}
          w={68}
          text="CLAUDE AI"
          fill={BLUE}
          color="#fff"
        />
      </>
    );
  }

  return (
    <svg
      viewBox="0 0 360 240"
      role="img"
      aria-label={alt[level - 1]}
      className="block h-auto w-full"
      data-pose={pose}
    >
      <rect width="360" height="240" fill="#DCE8F7" />
      <path d="M0 230H360" {...line} />
      {scene}
    </svg>
  );
}
