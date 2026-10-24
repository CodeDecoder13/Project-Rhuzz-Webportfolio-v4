import type { ReactNode } from "react";

const INK = "#0B1B33";
const BLUE = "#1F5FBF";
const SKY = "#8DBBF2";
const PAPER = "#F2F6FB";
const FAIL = "#b04129";
const SKIN = "#F6D5B8";
const MONO = { fontFamily: "var(--font-jetbrains-mono)" };
const line = {
  stroke: INK,
  strokeWidth: 3,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

// Neo-brutalist cartoon: flat fills, thick ink outlines, hard offset shadows.
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

const alt = [
  "A developer at a computer building a website",
  "A developer building a website while a test robot checks it automatically",
  "A developer building a website with a test robot, a CI/CD pipeline, cloud platforms and AI assistants",
];

export default function ServiceScene({ level }: { level: 1 | 2 | 3 }) {
  let extra: ReactNode = null;

  if (level === 1) {
    // A UI block being dragged onto the page.
    extra = (
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
    );
  } else {
    extra = (
      <>
        {/* test checklist */}
        <Box x={240} y={44} w={104} h={60} fill="#fff" />
        {[0, 1, 2].map((i) => {
          const y = 58 + i * 16;
          return (
            <g key={i}>
              {i < 2 ? (
                <path
                  d={`M250 ${y} l5 5 l9 -10`}
                  fill="none"
                  stroke={BLUE}
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d={`M251 ${y - 5} l11 10 M262 ${y - 5} l-11 10`}
                  fill="none"
                  stroke={FAIL}
                  strokeWidth={3.5}
                  strokeLinecap="round"
                />
              )}
              <rect
                x={272}
                y={y - 4}
                width={i === 1 ? 50 : 58}
                height={7}
                rx={2}
                fill={i < 2 ? SKY : FAIL}
              />
            </g>
          );
        })}
        {/* test robot */}
        <path d="M284 112V104" {...line} />
        <circle
          cx={284}
          cy={100}
          r={4.5}
          fill={BLUE}
          {...line}
          strokeWidth={2.5}
        />
        <path d="M262 156l-24 8" {...line} strokeWidth={9} />
        <path
          d="M262 156l-24 8"
          stroke={SKY}
          strokeWidth={3.5}
          strokeLinecap="round"
        />
        <Box x={262} y={134} w={44} h={36} fill={SKY} rx={6} />
        <Box x={268} y={112} w={32} h={24} fill="#fff" rx={7} />
        <circle cx={278} cy={123} r={3.5} fill={INK} />
        <circle cx={291} cy={123} r={3.5} fill={INK} />
        <rect
          x={276}
          y={150}
          width={28}
          height={6}
          rx={2}
          fill="#fff"
          stroke={INK}
          strokeWidth={2}
        />
      </>
    );
  }

  if (level === 2) {
    // gear: a thick dashed ring gives the teeth
    extra = (
      <>
        {extra}
        <circle
          cx={46}
          cy={44}
          r={16}
          fill="none"
          stroke={INK}
          strokeWidth={8}
          strokeDasharray="6 5.7"
        />
        <circle cx={46} cy={44} r={12} fill={SKY} {...line} />
        <circle
          cx={46}
          cy={44}
          r={4.5}
          fill="#fff"
          {...line}
          strokeWidth={2.5}
        />
      </>
    );
  }

  if (level === 3) {
    const steps = [
      ["BUILD", 100, "#fff", INK],
      ["TEST", 180, SKY, INK],
      ["DEPLOY", 260, BLUE, "#fff"],
    ] as const;
    extra = (
      <>
        {extra}
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
          d="M30 48l6 14 8-14z"
          fill="#fff"
          stroke={INK}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <Box x={8} y={12} w={78} h={36} fill="#fff" rx={10} sw={2.5} />
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
        {/* cloud platforms and tools */}
        <Label x={140} y={192} w={54} text="RAILWAY" fill={INK} color="#fff" />
        <Label x={200} y={192} w={50} text="SENTRY" fill={SKY} />
        <Label x={256} y={192} w={50} text="VERCEL" fill="#fff" />
        <Label x={140} y={216} w={52} text="DOCKER" fill="#fff" />
        <Label
          x={200}
          y={216}
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
    >
      <rect width="360" height="240" fill="#DCE8F7" />
      <path d="M0 230H360" {...line} />

      {/* legs go behind the desk */}
      <path
        d="M72 156h42v54"
        fill="none"
        stroke={INK}
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={104}
        y={206}
        width={28}
        height={12}
        rx={5}
        fill="#fff"
        {...line}
        strokeWidth={2.5}
      />

      {/* chair */}
      <rect x={42} y={100} width={12} height={62} rx={4} fill={INK} />
      <rect x={46} y={156} width={52} height={10} rx={4} fill={INK} />
      <path d="M70 166v50m-12 0h24" {...line} strokeWidth={4} />

      {/* desk */}
      <rect x={34} y={182} width={10} height={48} fill={INK} />
      <rect x={316} y={182} width={10} height={48} fill={INK} />
      <Box x={20} y={170} w={320} h={12} fill={BLUE} rx={3} />

      {/* guy */}
      <path d="M92 116l32 40" {...line} strokeWidth={10} />
      <path
        d="M92 116l32 40"
        stroke={BLUE}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <rect
        x={58}
        y={104}
        width={40}
        height={52}
        rx={9}
        fill={BLUE}
        {...line}
      />
      <circle cx={80} cy={84} r={18} fill={SKIN} {...line} />
      <path
        d="M62 82A18 18 0 0 1 98 80l-4 2-8-5-10 4-8-2z"
        fill={INK}
        {...line}
        strokeWidth={2}
      />
      <circle cx={90} cy={87} r={2.2} fill={INK} />
      <path
        d="M86 95q5 3 9 0"
        fill="none"
        stroke={INK}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle cx={124} cy={157} r={5} fill={SKIN} {...line} strokeWidth={2.5} />

      {/* monitor */}
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

      {extra}
    </svg>
  );
}
