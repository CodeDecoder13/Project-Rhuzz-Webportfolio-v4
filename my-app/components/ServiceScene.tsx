import type { ReactNode } from "react";

const INK = "#0B1B33";
const BLUE = "#1F5FBF";
const SKY = "#8DBBF2";
const FAIL = "#b04129";
const SKIN = "#F8C9B0";
const CAP = "#E8DCC4";
const BRIM = "#D2C197";
const YELLOW = "#F6E65A";
const BLUSH = "#F08C6B";
const PANTS = "#17325c";
const MONO = { fontFamily: "var(--font-jetbrains-mono)" };
const line = {
  stroke: INK,
  strokeWidth: 3,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};
const thin = { ...line, strokeWidth: 2.5 };

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

// Front view: cap with a smiley, blush and a flat profile.
function Head({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <rect
        x={cx - 5}
        y={cy + 12}
        width={10}
        height={14}
        fill={SKIN}
        {...thin}
      />
      <circle cx={cx - 15} cy={cy + 4} r={5} fill={SKIN} {...thin} />
      <rect
        x={cx - 17}
        y={cy - 8}
        width={34}
        height={32}
        rx={12}
        fill={SKIN}
        {...thin}
      />
      <ellipse cx={cx + 7} cy={cy + 12} rx={6} ry={3.5} fill={BLUSH} />
      <path d={`M${cx + 6} ${cy + 3}h7`} fill="none" {...thin} />
      <path
        d={`M${cx + 17} ${cy + 6}l3.5 6h-4`}
        fill="none"
        {...thin}
        strokeWidth={2}
      />
      <path d={`M${cx + 9} ${cy + 18}h6`} fill="none" {...thin} />
      <path
        d={`M${cx - 19} ${cy - 6}q0-20 19-20 q19 0 19 20z`}
        fill={CAP}
        {...thin}
      />
      <path
        d={`M${cx} ${cy - 26}q-6 10-4 20`}
        fill="none"
        {...thin}
        strokeWidth={1.8}
      />
      <path d={`M${cx + 4} ${cy - 7}h25l-3 7h-22z`} fill={BRIM} {...thin} />
      <circle
        cx={cx + 9}
        cy={cy - 17}
        r={5.5}
        fill={YELLOW}
        {...thin}
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

// Back view, turned slightly to the right so the brim and ear show: he's looking at the screen.
function BackHead({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <rect
        x={cx - 6}
        y={cy + 10}
        width={12}
        height={14}
        fill={SKIN}
        {...thin}
      />
      <ellipse cx={cx} cy={cy + 4} rx={17} ry={19} fill={SKIN} {...thin} />
      <path d={`M${cx - 17} ${cy}q-2 14 7 22l5-4v-18z`} fill={INK} />
      <circle cx={cx + 14} cy={cy + 8} r={4.5} fill={SKIN} {...thin} />
      <path
        d={`M${cx - 20} ${cy}q0-24 20-24 q20 0 20 24z`}
        fill={CAP}
        {...thin}
      />
      <path
        d={`M${cx} ${cy - 24}q2 10 0 24`}
        fill="none"
        {...thin}
        strokeWidth={1.8}
      />
      <circle
        cx={cx}
        cy={cy - 25}
        r={2.5}
        fill={BRIM}
        {...thin}
        strokeWidth={1.8}
      />
      <circle
        cx={cx + 13}
        cy={cy - 12}
        r={5.5}
        fill={YELLOW}
        {...thin}
        strokeWidth={1.8}
      />
      <path
        d={`M${cx + 11} ${cy - 13.5}v1.5M${cx + 15} ${cy - 13.5}v1.5`}
        stroke={INK}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <path d={`M${cx + 16} ${cy - 8}l16 3-2 7-14-2z`} fill={BRIM} {...thin} />
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
      <circle cx={x2} cy={y2} r={5.5} fill={SKIN} {...thin} />
    </>
  );
}

function Torso({
  x,
  y,
  w,
  h,
  back = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  back?: boolean;
}) {
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
      {!back && (
        <path
          d={`M${x + w / 2 - 5} ${y - 3}v9M${x + w / 2} ${y - 3}v9M${x + w / 2 + 5} ${y - 3}v9`}
          stroke={INK}
          strokeWidth={1.4}
        />
      )}
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
        stroke={PANTS}
        strokeWidth={11}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

function Shoe({ x, y }: { x: number; y: number }) {
  return (
    <rect x={x} y={y} width={26} height={10} rx={5} fill="#fff" {...thin} />
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
      <rect x={101} y={136} width={50} height={6} rx={2} fill={SKY} {...thin} />
    </g>
  );
}

// Walking, facing right, laptop open in front.
function Walker() {
  return (
    <>
      <path d="M14 150h18M8 166h24M16 182h16" {...line} />
      <Leg d="M70 160L48 212" />
      <Leg d="M86 160L106 206L108 218" />
      <Shoe x={34} y={220} />
      <Shoe x={98} y={220} />
      <g transform="rotate(4 76 160)">
        <Torso x={54} y={102} w={44} h={62} />
        <Head cx={78} cy={78} />
        <Laptop />
        <Arm x1={92} y1={118} x2={112} y2={142} />
        <circle cx={150} cy={138} r={5.5} fill={SKIN} {...thin} />
      </g>
    </>
  );
}

// Small AI assistant that sits on the desk next to the monitor.
function AiBot() {
  return (
    <g>
      <path d="M316 94v-8" {...line} />
      <circle cx={316} cy={83} r={4} fill={BLUE} {...thin} />
      <Box x={303} y={94} w={26} h={22} fill="#fff" rx={7} sw={2.5} />
      <circle cx={311} cy={105} r={2.6} fill={INK} />
      <circle cx={321} cy={105} r={2.6} fill={INK} />
      <Box x={298} y={118} w={36} h={32} fill={SKY} rx={6} sw={2.5} />
      <path
        d="M310 134l4 4 8-9"
        fill="none"
        stroke={INK}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

const code = [
  [0, 28, SKY],
  [8, 40, YELLOW],
  [8, 22, "#fff"],
  [16, 46, SKY],
  [16, 30, "#F08C6B"],
  [8, 16, "#fff"],
  [0, 20, SKY],
  [0, 36, YELLOW],
] as const;

const alt = [
  "A developer seen from behind, sitting and coding at a monitor, with an AI assistant bot and Claude Code beside it",
  "A developer seen from behind holding a laptop and watching a presentation that demos bugs and test results",
  "A developer walking with a laptop past a CI/CD pipeline and cloud platforms",
];

export default function ServiceScene({ level }: { level: 1 | 2 | 3 }) {
  let scene: ReactNode;

  if (level === 1) {
    scene = (
      <>
        {/* desk legs sit behind the character */}
        <rect x={132} y={160} width={10} height={70} fill={INK} />
        <rect x={336} y={160} width={10} height={70} fill={INK} />
        <Box x={120} y={150} w={236} h={12} fill={BLUE} rx={3} />
        {/* monitor: a dark code editor */}
        <rect x={204} y={130} width={16} height={14} fill={INK} />
        <rect
          x={188}
          y={141}
          width={48}
          height={9}
          rx={3}
          fill={SKY}
          {...thin}
        />
        <Box x={148} y={30} w={124} h={102} fill="#fff" rx={7} />
        <rect x={156} y={38} width={108} height={86} fill={INK} />
        {code.map(([indent, len, fill], i) => (
          <g key={i}>
            <rect
              x={162}
              y={48 + i * 9.5}
              width={5}
              height={4}
              fill="#4a6791"
            />
            <rect
              x={172 + indent}
              y={47 + i * 9.5}
              width={len}
              height={5}
              rx={2}
              fill={fill}
            />
          </g>
        ))}
        <rect x={238} y={113} width={8} height={9} fill={YELLOW} />
        <rect
          x={134}
          y={141}
          width={50}
          height={8}
          rx={2}
          fill="#fff"
          {...thin}
        />
        {/* AI assistant, Claude Code and Claude AI */}
        <AiBot />
        <path
          d="M296 62l10 18 6-18z"
          fill="#fff"
          stroke={INK}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <Box x={270} y={24} w={84} h={38} fill="#fff" rx={10} sw={2.5} />
        <rect x={299} y={59} width={10} height={6} fill="#fff" />
        <text
          x={312}
          y={39}
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill={BLUE}
          style={MONO}
        >
          ✦ CLAUDE
        </text>
        <text
          x={312}
          y={51}
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill={INK}
          style={MONO}
        >
          CODE
        </text>
        <Label
          x={252}
          y={186}
          w={68}
          text="CLAUDE AI"
          fill={BLUE}
          color="#fff"
        />
        {/* the coder, from behind */}
        <Leg d="M76 184v30" />
        <Leg d="M98 184v30" />
        <Shoe x={64} y={216} />
        <Shoe x={86} y={216} />
        <Torso x={62} y={100} w={48} h={60} back />
        <rect
          x={58}
          y={128}
          width={56}
          height={40}
          rx={9}
          fill={PANTS}
          {...line}
        />
        <BackHead cx={86} cy={76} />
        <Arm x1={106} y1={116} x2={150} y2={144} />
      </>
    );
  } else if (level === 2) {
    scene = (
      <>
        {/* presentation board */}
        <path d="M205 146L190 230M300 146L316 230" {...line} strokeWidth={4} />
        <Box x={150} y={22} w={190} h={124} fill="#fff" rx={6} />
        <rect
          x={150}
          y={22}
          width={190}
          height={18}
          rx={4}
          fill={BLUE}
          stroke={INK}
          strokeWidth={3}
        />
        <text
          x={160}
          y={35}
          fontSize="10"
          fontWeight="700"
          fill="#fff"
          style={MONO}
        >
          BUG DEMO
        </text>
        {/* the bug */}
        <g {...line} strokeWidth={2.5}>
          <path
            d="M176 78l-12-8M176 90h-14M176 102l-12 8M206 78l12-8M206 90h14M206 102l12 8"
            fill="none"
          />
          <ellipse cx={191} cy={94} rx={15} ry={20} fill={FAIL} />
          <circle cx={191} cy={70} r={8} fill={FAIL} />
          <path d="M187 62l-5-7M195 62l5-7" fill="none" />
        </g>
        <path
          d="M191 78v34"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
        />
        {/* test results */}
        {[0, 1, 2].map((i) => {
          const y = 62 + i * 20;
          return (
            <g key={i}>
              {i === 1 ? (
                <path
                  d={`M246 ${y - 5} l10 10 M256 ${y - 5} l-10 10`}
                  fill="none"
                  stroke={FAIL}
                  strokeWidth={3.5}
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d={`M246 ${y} l5 5 l9 -10`}
                  fill="none"
                  stroke={BLUE}
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              <rect
                x={268}
                y={y - 4}
                width={i === 1 ? 52 : 60}
                height={7}
                rx={2}
                fill={i === 1 ? FAIL : SKY}
              />
            </g>
          );
        })}
        <path d="M168 122h160" stroke={INK} strokeWidth={2} />
        {[16, 24, 12, 30].map((h, i) => (
          <rect
            key={i}
            x={236 + i * 22}
            y={136 - h}
            width={14}
            height={h}
            fill={i === 2 ? FAIL : BLUE}
            stroke={INK}
            strokeWidth={2}
          />
        ))}
        {/* the tester, from behind, laptop in hand */}
        <Leg d="M66 160v58" />
        <Leg d="M88 160v58" />
        <Shoe x={58} y={220} />
        <Shoe x={80} y={220} />
        <Torso x={50} y={100} w={46} h={62} back />
        <BackHead cx={74} cy={76} />
        <Arm x1={90} y1={118} x2={104} y2={142} />
        <g transform="rotate(-8 124 128)">
          <Box x={104} y={110} w={42} h={30} fill={SKY} rx={3} />
          <circle
            cx={125}
            cy={125}
            r={4}
            fill="#fff"
            stroke={INK}
            strokeWidth={2}
          />
        </g>
        <circle cx={136} cy={142} r={5.5} fill={SKIN} {...thin} />
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
        <Walker />
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
        <Label x={196} y={206} w={50} text="VERCEL" fill="#fff" />
        <Label x={254} y={206} w={52} text="DOCKER" fill="#fff" />
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
      {scene}
    </svg>
  );
}
