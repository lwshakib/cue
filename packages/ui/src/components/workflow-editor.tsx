"use client";

import * as React from "react";
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";

type WorkflowEditorProps = {
  initialNodes?: Node[];
  initialEdges?: Edge[];
};

const defaultInitialNodes: Node[] = [
  { id: "start", position: { x: 120, y: 140 }, data: { label: "Start" }, type: "input" },
  { id: "step-1", position: { x: 420, y: 140 }, data: { label: "Step 1" } },
];

const defaultInitialEdges: Edge[] = [{ id: "e-start-step-1", source: "start", target: "step-1" }];

export function WorkflowEditor({
  initialNodes = defaultInitialNodes,
  initialEdges = defaultInitialEdges,
}: WorkflowEditorProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const colorMode = mounted
    ? (resolvedTheme === "dark" ? "dark" : "light")
    : undefined;
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const onConnect = React.useCallback((params: Connection) => {
    setEdges((snapshot) => addEdge(params, snapshot));
  }, [setEdges]);

  return (
    <ReactFlow
      key={colorMode ?? "pending-theme"}
      colorMode={colorMode}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      panOnDrag={false}
      selectionOnDrag
      proOptions={{ hideAttribution: true }}
      fitView
    >
      <MiniMap />
      <Background />
      <Controls />
    </ReactFlow>
  );
}
