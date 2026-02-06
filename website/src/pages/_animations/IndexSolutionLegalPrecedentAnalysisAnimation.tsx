import { cn } from "@site/src/utils/twUtils";

import { useId } from "react";
import { BG_STANDARD, BG_SURFACE, BORDER_COLOR, BORDER_WIDTH, DISABLED_COLOR, PRIMARY_COLOR } from "./constants";
import SvgRecolorLinearGradientFilter from "@site/src/utils/visual-effects/SvgRecolorLinearGradientFilter";
import SvgBreathingGlowFilter from "@site/src/utils/visual-effects/SvgBreathingGlowFilter";
import SvgForeignIcon from "@site/src/utils/visual-effects/SvgForeignIcon";


export default function IndexSolutionLegalPrecedentAnalysisAnimation({ className, ...restProps }: React.HTMLAttributes<HTMLDivElement>) {
  const id = useId();
  const shapeDot = `${id}ShapeDot`;
  const shapeArrow = `${id}ShapeArrow`;
  const markerDot = `${id}MarkerDot`;
  const markerArrow = `${id}MarkerArrow`;
  const markerDotColored = `${id}MarkerDotColored`;
  const markerDotColoredSmall = `${id}MarkerDotColoredSmall`;
  const markerArrowColored = `${id}MarkerArrowColored`;
  const pathStartToFormulateAgent = `${id}PathStartToFormulateAgent`;
  const pathFormulateAgentToHTTP = `${id}PathFormulateAgentToHTTP`;
  const pathHTTPToIteration = `${id}PathHTTPToIteration`;
  const pathIterationToReportAgent = `${id}PathIterationToReportAgent`;
  const pathFormulateAgentToRetrievalAgent = `${id}PathFormulateAgentToRetrievalAgent`;
  const pathRetrievalToRetrievalAgent = `${id}PathRetrievalToRetrievalAgent`;
  const pathRetrievalAgentToReportAgent = `${id}PathRetrievalAgentToReportAgent`;
  const pathReportAgentToReport = `${id}PathReportAgentToReport`;

  const filterGlowBlurBreathing = `${id}FilterGlowBlurBreathing`;
  const filterRecolorPrimaryGradient = `${id}FilterRecolorPrimaryGradient`;
  const filterRecolorGreyGradient = `${id}FilterRecolorGreyGradient`;

  return (
    <div
      className={cn('ragflow-animation-root', className)}
      {...restProps}
    >
      <svg
        className="block size-full text-sm"
        viewBox="-490 -250 910 525"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        <defs>
          <circle
            id={shapeDot}
            cx="0" cy="0" r="5"
          />

          <path id={shapeArrow}
            d="M-5 -5 l10 5 l-10 5 z"
          />

          <marker id={markerDot}
            viewBox="-5 -5 10 10"
            markerUnits="userSpaceOnUse"
            markerWidth="4" markerHeight="4"
            orient="auto-start-reverse"
          >
            <use
              href={`#${shapeDot}`}
              fill={DISABLED_COLOR}
            />
          </marker>

          <marker id={markerDotColoredSmall}
            viewBox="-5 -5 10 10"
            markerUnits="userSpaceOnUse"
            markerWidth="4" markerHeight="4"
            orient="auto-start-reverse"
          >
            <use href={`#${shapeDot}`}
              fill={PRIMARY_COLOR} />
          </marker>

          <marker id={markerDotColored}
            viewBox="-5 -5 10 10"
            markerUnits="userSpaceOnUse"
            markerWidth="8" markerHeight="8"
            orient="auto-start-reverse"
          >
            <use href={`#${shapeDot}`}
              fill={PRIMARY_COLOR} />
          </marker>

          <marker id={markerArrow}
            viewBox="-5 -5 10 10"
            markerUnits="userSpaceOnUse"
            markerWidth="4" markerHeight="4"
            orient="auto-start-reverse"
          >
            <use href={`#${shapeArrow}`}
              fill={DISABLED_COLOR} />
          </marker>

          <marker id={markerArrowColored}
            viewBox="-5 -5 10 10"
            markerUnits="userSpaceOnUse"
            markerWidth="8" markerHeight="8"
            orient="auto-start-reverse"
          >
            <use href={`#${shapeArrow}`}
              fill={PRIMARY_COLOR} />
          </marker>

          <SvgRecolorLinearGradientFilter id={filterRecolorPrimaryGradient} to="bottom">
            <stop offset="0" stopColor={PRIMARY_COLOR} />
            <stop offset="1" stopColor="#01c48d" />
          </SvgRecolorLinearGradientFilter>

          <SvgRecolorLinearGradientFilter id={filterRecolorGreyGradient} to="bottom">
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="#666" />
          </SvgRecolorLinearGradientFilter>

          <SvgBreathingGlowFilter id={filterGlowBlurBreathing} to="bottom-right" />
        </defs>

        {/* Nodes */}
        <g>
          {/* Start */}
          <g transform="translate(-450, 0)">
            <rect
              x="-25" y="-25"
              rx="6" ry="6"
              width="50" height="50"
              fill={BG_STANDARD}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
            />

            <SvgForeignIcon
              icon="LucideHousePlus"
              size={24}
              filter={`url(#${filterRecolorGreyGradient})`}
            />
          </g>

          {/* Formulate agent */}
          <g transform="translate(-390, 0)">
            <rect
              y="-30"
              rx="6" ry="6"
              width="190" height="60"
              fill={BG_STANDARD}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
              filter={`url(#${filterGlowBlurBreathing})`}
            />

            <g className="text-disabled">
              <SvgForeignIcon
                icon="RagAiAgent"
                size={32}
                x="12"
                filter={`url(#${filterRecolorPrimaryGradient})`}
              />

              <text
                x="52"
                dominantBaseline="middle"
              >
                Formulate agent
              </text>
            </g>
          </g>

          {/* HTTP */}
          <g transform="translate(-110, -100)">
            <rect
              x="-30" y="-35"
              rx="6" ry="6"
              width="60" height="70"
              fill={BG_STANDARD}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
            />

            <g>
              <SvgForeignIcon
                icon="RagHTTP"
                size={24}
                y="-20"
                filter={`url(#${filterRecolorGreyGradient})`}
              />

              <text
                className="text-disabled text-sm"
                y="10"
                textAnchor="middle"
                dominantBaseline="hanging"
              >
                HTTP
              </text>
            </g>
          </g>

          {/* Iteration */}
          <g transform="translate(-50, -100)">
            <rect
              y="-35"
              width="140" height="160"
              rx="6" ry="6"
              fill={BG_STANDARD}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
            />

            <SvgForeignIcon
              icon="LucideRepeat2"
              size={24}
              x="12" y="-24"
              filter={`url(#${filterRecolorGreyGradient})`}
            />

            <text
              className="text-disabled text-sm"
              x="42" y="-12"
              dominantBaseline="middle"
            >
              Iteration
            </text>

            <g transform="translate(10, 5)">
              <rect
                width="120" height="110"
                rx="4" ry="4"
                fill={BG_SURFACE}
              />

              {/* Iteration inner nodes */}
              <g>
                <g transform="translate(15, 25)">
                  <rect
                    width="32" height="32"
                    rx="4" ry="4"
                    fill={BG_STANDARD}
                    stroke={BORDER_COLOR}
                    strokeWidth={BORDER_WIDTH}
                  />

                  <SvgForeignIcon
                    icon="LucideHousePlus"
                    size={16}
                    x="8" y="8"
                    filter={`url(#${filterRecolorGreyGradient})`}
                  />
                </g>

                <g transform="translate(70, 10)">
                  <rect
                    x="-2"
                    width="36" height="42"
                    rx="4" ry="4"
                    fill={BG_STANDARD}
                    stroke={BORDER_COLOR}
                    strokeWidth={BORDER_WIDTH}
                  />

                  <SvgForeignIcon
                    icon="RagHTTP"
                    size={16}
                    x="8" y="8"
                    filter={`url(#${filterRecolorGreyGradient})`}
                  />

                  <text
                    fontSize="8"
                    x="16" y="32"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    HTTP
                  </text>
                </g>

                <g transform="translate(70, 60)">
                  <rect
                    x="-2"
                    width="36" height="42"
                    rx="4" ry="4"
                    fill={BG_STANDARD}
                    stroke={BORDER_COLOR}
                    strokeWidth={BORDER_WIDTH}
                  />

                  <SvgForeignIcon
                    icon="RagAiAgent"
                    size={16}
                    x="8" y="8"
                    filter={`url(#${filterRecolorGreyGradient})`}
                  />

                  <text
                    fontSize="8"
                    x="16" y="32"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    Agent
                  </text>
                </g>
              </g>

              {/* Iteration inner connections */}
              <g
                stroke={BORDER_COLOR}
                strokeWidth="1"
              >
                <path
                  d="M47 41 c10.5 0 10.5 -10 21 -10"
                  markerStart={`url(#${markerDotColoredSmall})`}
                />

                <path
                  d="M104 31 c40 0 -76 50 -36 50"
                  markerStart={`url(#${markerDotColoredSmall})`}
                />
              </g>
            </g>
          </g>

          {/* Retrieval agent */}
          <g transform="translate(-140, 100)">
            <rect
              y="-30"
              rx="6" ry="6"
              width="175" height="60"
              fill={BG_STANDARD}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
            />

            <g className="text-disabled">
              <SvgForeignIcon
                icon="RagAiAgent"
                size={32}
                x="12"
                filter={`url(#${filterRecolorPrimaryGradient})`}
              />

              <text
                x="52"
                dominantBaseline="middle"
              >
                Retrieval agent
              </text>
            </g>
          </g>

          {/* Retrieval */}
          <g transform="translate(-50, 190)">
            <rect
              x="-40" y="-30"
              rx="6" ry="6"
              width="80" height="60"
              fill={BG_STANDARD}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
            />

            <g>
              <SvgForeignIcon
                icon="LucideFolderSearch"
                size={24}
                y="-20"
                filter={`url(#${filterRecolorGreyGradient})`}
              />

              <text
                className="text-disabled text-sm"
                y="10"
                textAnchor="middle"
                dominantBaseline="hanging"
              >
                Retrieval
              </text>
            </g>
          </g>

          {/* Report agent */}
          <g transform="translate(140, 0)">
            <rect
              y="-30"
              width="160" height="60"
              rx="6" ry="6"
              fill={BG_STANDARD}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
            />

            <g className="text-disabled">
              <SvgForeignIcon
                icon="RagAiAgent"
                size={32}
                x="12"
                filter={`url(#${filterRecolorPrimaryGradient})`}
              />

              <text
                x="52"
                dominantBaseline="middle"
              >
                Report agent
              </text>
            </g>
          </g>

          {/* Report */}
          <g transform="translate(350, -135)">
            <rect
              x="-50" y="-60"
              rx="6" ry="6"
              width="100" height="120"
              fill={BG_STANDARD}
              stroke={BORDER_COLOR}
              strokeWidth={BORDER_WIDTH}
            />

            <g className="text-disabled">
              <SvgForeignIcon
                icon="LucideChartNoAxesCombined"
                size={64}
                y="-42"
              />

              <text
                className="text-sm fill-current"
                y="26"
                textAnchor="middle"
                dominantBaseline="hanging"
              >
                Report
              </text>
            </g>
          </g>
        </g>

        {/* Connectors */}
        <g
          stroke={BORDER_COLOR}
          strokeWidth="1"
        >
          {/* Start -> Formulate agent */}
          <path
            id={pathStartToFormulateAgent}
            d="M-425 0 v0.01 v-0.01 h35"
            markerStart={`url(#${markerDot})`}
          />

          {/* Formulate agent -> HTTP */}
          <path
            id={pathFormulateAgentToHTTP}
            d="M-200 0 h20 a10 10 0 0 0 10 -10 v-80 a10 10 0 0 1 10 -10 h20"
            stroke={PRIMARY_COLOR}
            markerStart={`url(#${markerDotColored})`}
          />

          {/* HTTP -> Iteration */}
          <path
            id={pathHTTPToIteration}
            d="M-80 -100 h30"
            stroke={PRIMARY_COLOR}
            markerStart={`url(#${markerDotColored})`}
          />

          {/* Iteration -> Report agent */}
          <path
            id={pathIterationToReportAgent}
            d="M90 -100 h20 a10 10 0 0 1 10 10 v80 a10 10 0 0 0 10 10 h10"
            stroke={PRIMARY_COLOR}
            markerStart={`url(#${markerDotColored})`}
            markerEnd={`url(#${markerArrowColored})`}
          />

          {/* Formulate agent -> Retrieval agent */}
          <path
            id={pathFormulateAgentToRetrievalAgent}
            d="M-200 0 h20 a10 10 0 0 1 10 10 v80 a10 10 0 0 0 10 10 h20"
            stroke={PRIMARY_COLOR}
            markerStart={`url(#${markerDotColored})`}
          />

          {/* Retrieval -> Retrieval agent */}
          <path
            id={pathRetrievalToRetrievalAgent}
            d="M-50 160 v-30"
          />

          {/* Retrieval agent -> Report agent */}
          <path
            id={pathRetrievalAgentToReportAgent}
            d="M35 100 h75 a10 10 0 0 0 10 -10 v-80 a10 10 0 0 1 10 -10 h10"
            stroke={PRIMARY_COLOR}
            markerStart={`url(#${markerDotColored})`}
            markerEnd={`url(#${markerArrowColored})`}
          />

          {/* Report agent -> Report */}
          <path
            id={pathReportAgentToReport}
            d="M300 0 h40 a10 10 0 0 0 10 -10 v-65"
            stroke={PRIMARY_COLOR}
            markerStart={`url(#${markerDotColored})`}
            markerEnd={`url(#${markerArrowColored})`}
          />
        </g>
      </svg>
    </div>
  );
}
// import {
//   BaseEdge,
//   type BaseEdgeProps,
//   getSmoothStepPath,
//   type GetSmoothStepPathParams,
//   Handle,
//   Position,
//   ReactFlow,
// } from '@xyflow/react';
// import Icon from "@site/src/components/Icon";

// import '@xyflow/react/dist/style.css';

// const nodes = [
//   {
//     id: 'start',
//     type: 'start',
//     position: {
//       x: -450,
//       y: 7,
//     },
//     data: {},
//   },
//   {
//     id: 'formulateAgent',
//     type: 'agent',
//     position: {
//       x: -350,
//       y: 0,
//     },
//     data: {
//       label: 'Formulate agent',
//     },
//   },
//   {
//     id: 'http',
//     type: 'box',
//     position: {
//       x: -100,
//       y: -100,
//     },
//     data: {
//       icon: 'RagHTTP',
//       label: 'HTTP',
//       className: 'flex-col',
//       iconClassName: 'm-0 text-[1.5rem]'
//     },
//   },
//   {
//     id: 'iterate',
//     type: 'box',
//     position: {
//       x: 0,
//       y: -100,
//     },
//     data: {
//       icon: 'LucideRepeat2',
//       label: 'Iterate',
//     },
//   },
//   {
//     id: 'retrievalAgent',
//     type: 'agent',
//     position: {
//       x: -100,
//       y: 100,
//     },
//     data: {
//       label: 'Retrieval agent',
//     },
//   },
//   {
//     id: 'reportAgent',
//     type: 'agent',
//     position: {
//       x: 150,
//       y: 0,
//     },
//     data: {
//       label: 'Report agent',
//     },
//   },
//   {
//     id: 'report',
//     type: 'end',
//     position: {
//       x: 350,
//       y: -140,
//     },
//     data: {},
//   },
// ];

// const edges = [
//   {
//     id: 'start-formulateAgent',
//     source: 'start',
//     target: 'formulateAgent',
//     type: 'smoothstep',
//   },
//   {
//     id: 'formulateAgent-http',
//     source: 'formulateAgent',
//     target: 'http',
//     type: 'smoothstep',
//   },
//   {
//     id: 'http-iterate',
//     source: 'http',
//     target: 'iterate',
//     type: 'smoothstep',
//   },
//   {
//     id: 'iterate-reportAgent',
//     source: 'iterate',
//     target: 'reportAgent',
//     type: 'smoothstep',
//     step: 0.9,
//   },
//   {
//     id: 'formulateAgent-retrievalAgent',
//     source: 'formulateAgent',
//     target: 'retrievalAgent',
//     type: 'smoothstep',
//   },
//   {
//     id: 'retrievalAgent-reportAgent',
//     source: 'retrievalAgent',
//     target: 'reportAgent',
//     type: 'smoothstep',
//   },
//   {
//     id: 'reportAgent-report',
//     source: 'reportAgent',
//     target: 'report',
//     type: 'smoothstep',
//   },
// ];

// function AgentNode(props) {
//   const {
//     data,
//   } = props;

//   return (
//     <div className="
//       flex justify-center items-center gap-1
//       text-sm text-disabled
//       p-2 border border-solid border-component bg-standard rounded-md"
//     >
//       <Icon icon="RagAiAgent" className="m-0 text-[2rem]" />
//       {data.label && <div className="leading-none">{data.label}</div>}

//       <Handle type="target" position={Position.Left} className="!border-none !bg-transparent" />
//       <Handle type="source" position={Position.Right} className="!border-none !bg-secondary" />
//     </div>
//   );
// }

// function BoxNode(props) {
//   const {
//     data,
//   } = props;

//   return (
//     <div className={cn(
//       'flex justify-center items-center gap-1',
//       'text-sm text-disabled',
//       'p-2 border border-solid border-component bg-standard rounded-md',
//       data.className,
//     )}>
//       <Icon icon={data.icon} className={cn('m-0 text-lg leading-none', data.iconClassName)} />
//       {data.label && <div className="leading-none">{data.label}</div>}

//       <Handle type="target" position={Position.Left} className="!border-none !bg-transparent" />
//       <Handle type="source" position={Position.Right} className="!border-none !bg-secondary" />
//     </div>
//   );
// }

// function StartNode() {
//   return (
//     <div className="
//       flex justify-center items-center
//       text-sm text-disabled
//       p-2 border border-solid border-component bg-standard rounded-md"
//     >
//       <Icon icon="LucideHousePlus" className="text-lg leading-none" />
//       <Handle type="source" position={Position.Right} className="!border-none !bg-secondary" />
//     </div>
//   );
// }

// function EndNode() {
//   return (
//     <div className="
//       flex flex-col justify-center items-center
//       text-sm text-disabled
//       p-2 border border-solid border-component bg-standard rounded-md"
//     >
//       <Icon icon="LucideChartNoAxesCombined" className="text-lg leading-none size-[3rem]" />
//       <div className="leading-none">Report</div>

//       <Handle type="target" position={Position.Bottom} className="!border-none !bg-transparent" />
//     </div>
//   );
// }

// function SmoothStepEdge({ id, ...restProps }) {
//   console.log(id, restProps);

//   const [edgePath] = getSmoothStepPath({
//     ...restProps,
//     borderRadius: 10,
//   } as GetSmoothStepPathParams);

//   return (
//     <BaseEdge
//       id={id}
//       path={edgePath}
//       stroke={BORDER_COLOR}
//       strokeWidth={BORDER_WIDTH}
//     />
//   );
// }

// const nodeTypes = {
//   start: StartNode,
//   end: EndNode,
//   box: BoxNode,
//   agent:AgentNode,
// };

// const edgeTypes = {
//   smoothstep: SmoothStepEdge,
// };

// export default function A({ className }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div className={cn('ragflow-animation-root', className)}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         fitView
//         nodeTypes={nodeTypes}
//         edgeTypes={edgeTypes}
//         draggable={false}
//         edgesFocusable={false}
//         selectNodesOnDrag={false}
//         panOnDrag={false}
//         proOptions={{
//           hideAttribution: true,
//         }}
//       >
//       </ReactFlow>
//     </div>
//   );
// }
// #endregion