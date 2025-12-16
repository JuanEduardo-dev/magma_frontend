import svgPaths from "./svg-paths";

interface LogoProps {
  width?: number;
  height?: number;
  color?: string;
}

export function Logo({ width = 193, height = 20, color }: LogoProps) {
  return (
    <div
      className="relative overflow-clip"
      style={{ width: `${width}px`, height: `${height}px` }}
      data-name="Grupo Magma"
    >
      <svg
        className="block size-full text-zinc-900 dark:text-white"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 193 20"
      >
        <title>Grupo Magma</title>
        <g id="Grupo Magma">
          <path
            d={svgPaths.p27a50980}
            fill={color || "currentColor"}
            id="Vector"
          />
          <path
            d={svgPaths.p3fe3400}
            fill={color || "currentColor"}
            id="Vector_2"
          />
          <path
            d={svgPaths.p28686900}
            fill={color || "currentColor"}
            id="Vector_3"
          />
          <path
            d={svgPaths.p1ad95b00}
            fill={color || "currentColor"}
            id="Vector_4"
          />
          <path
            d={svgPaths.p1eb77080}
            fill={color || "currentColor"}
            id="Vector_5"
          />
          <path
            d={svgPaths.p23b0a780}
            fill={color || "currentColor"}
            id="Vector_6"
          />
          <path
            d={svgPaths.p1f2ab600}
            fill={color || "currentColor"}
            id="Vector_7"
          />
          <path
            d={svgPaths.pc740000}
            fill={color || "currentColor"}
            id="Vector_8"
          />
          <path
            d={svgPaths.p18af02f0}
            fill={color || "currentColor"}
            id="Vector_9"
          />
          <path
            d={svgPaths.p27f352a0}
            fill={color || "currentColor"}
            id="Vector_10"
          />
        </g>
      </svg>
    </div>
  );
}
