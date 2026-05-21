import { useRef, useState, useCallback, useEffect } from "react";
import type { GraphState } from "../../types/algorithm";

interface Props {
  graphState: GraphState;
}

function nodeBgColor(node: { highlight?: boolean; swap?: boolean; color?: string }) {
  if (node.color) return node.color;
  if (node.highlight && node.swap) return "#f97316";
  if (node.highlight) return "#3b82f6";
  return "#6b7280";
}

const NODE_W = 56;
const NODE_GAP = 20;
const START_X = 30;
const SVG_H = 200;
const SLOT_STEP = NODE_W + NODE_GAP;

export default function NodeGraph({ graphState }: Props) {
  const { nodes, edges } = graphState;
  const nodeCount = nodes.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const panDragRef = useRef({ startX: 0, startY: 0, panX: 0, panY: 0 });

  const svgW = Math.max(400, nodeCount * SLOT_STEP + 60);
  const centerY = SVG_H / 2;

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    setIsPanning(true);
    panDragRef.current.startX = e.clientX;
    panDragRef.current.startY = e.clientY;
    panDragRef.current.panX = pan.x;
    panDragRef.current.panY = pan.y;
  }, [pan]);

  useEffect(() => {
    if (!isPanning) return;
    const handleMove = (e: MouseEvent) => {
      setPan({
        x: panDragRef.current.panX + e.clientX - panDragRef.current.startX,
        y: panDragRef.current.panY + e.clientY - panDragRef.current.startY,
      });
    };
    const handleUp = () => setIsPanning(false);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };
  }, [isPanning]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((prev) => Math.min(Math.max(prev * (e.deltaY > 0 ? 0.9 : 1.1), 0.3), 3));
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const getSlotX = (idx: number) => START_X + idx * SLOT_STEP + NODE_W / 2;

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg bg-gray-50/50">
      <div
        ref={containerRef}
        className={`relative flex-1 overflow-hidden ${isPanning ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={handleCanvasMouseDown}
        onDoubleClick={() => { setPan({ x: 0, y: 0 }); setScale(1); }}
      >
        <div
          className="inline-block select-none"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          <svg width={svgW} height={SVG_H} className="min-w-[400px]" style={{ display: "block" }}>
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#9ca3af" />
              </marker>
            </defs>

            {edges.map((edge, i) => {
              const fromIdx = nodes.findIndex((n) => n.id === edge.from);
              const toIdx = nodes.findIndex((n) => n.id === edge.to);
              const x1 = START_X + fromIdx * SLOT_STEP + NODE_W;
              const x2 = START_X + toIdx * SLOT_STEP;
              const color = edge.color ?? "#9ca3af";
              return (
                <line key={i}
                  x1={x1} y1={centerY} x2={x2} y2={centerY}
                  stroke={color} strokeWidth={2}
                  markerEnd="url(#arrow)" className="transition-all duration-300"
                />
              );
            })}

            {nodes.map((node, i) => {
              const cx = getSlotX(i);
              const color = nodeBgColor(node);
              return (
                <g key={node.id}>
                  <rect
                    x={cx - NODE_W / 2} y={centerY - 22}
                    width={NODE_W} height={44} rx={8}
                    fill={color} className="drop-shadow-sm transition-all duration-300"
                    opacity={node.color ? 1 : node.highlight ? 1 : 0.85}
                  />
                  <text x={cx} y={centerY + 5}
                    textAnchor="middle" fill="white" fontSize={16} fontWeight={600}
                    className="select-none pointer-events-none"
                  >{node.value}</text>
                  {node.swap && (
                    <text x={cx} y={centerY - 30} textAnchor="middle" fill="#f97316" fontSize={11}>⇄</text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-between shrink-0 border-t border-gray-100 bg-white px-3 py-1.5 text-xs text-gray-400">
        <span>{nodeCount} 个节点</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setScale((s) => Math.max(s * 0.8, 0.3))}
            className="rounded px-1.5 py-0.5 hover:bg-gray-100" title="缩小">−</button>
          <span className="w-8 text-center font-mono">{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale((s) => Math.min(s * 1.25, 3))}
            className="rounded px-1.5 py-0.5 hover:bg-gray-100" title="放大">+</button>
          <span className="text-gray-200">|</span>
          <button onClick={() => { setPan({ x: 0, y: 0 }); setScale(1); }}
            className="rounded px-2 py-0.5 hover:bg-gray-100" title="重置视图">⊞ 适应</button>
        </div>
      </div>
    </div>
  );
}
