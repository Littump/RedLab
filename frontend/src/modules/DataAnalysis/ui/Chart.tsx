import { LinePlot } from "@mui/x-charts/LineChart";
import { NavLink, useParams } from "react-router-dom";
import {
  axisClasses,
  ChartsGrid,
  ChartsXAxis,
  ChartsYAxis,
  ResponsiveChartContainer,
  ScatterPlot,
} from "@mui/x-charts";
import { TNode } from "@/modules/DataAnalysis/types/graph.ts";
import { downloadFile } from "@/modules/DataAnalysis/api/DownloadFile.ts";

interface Props {
  type: "Линейный" | "Точечный";
  points: TNode[];
}

const Chart = ({ type, points }: Props) => {
  const { id } = useParams();
  const allPoint_line = points.map((el) => el.y);
  let allPoints_scatter = points.map((el, id) => {
    return { ...el, id: id };
  });
  const anomalPoints_scatter = allPoints_scatter.filter((el) => el.is_anomal);
  const axis_x = points.map((el) => el.x);
  const isLine = type === "Линейный";
  allPoints_scatter = allPoints_scatter.filter((el) => !el.is_anomal);

  const config = isLine
    ? {
        type: "line",
        data: allPoint_line,
        showMark: true,
      }
    : {
        type: "scatter",
        data: allPoints_scatter,
        markerSize: 6,
      };

  return (
    <>
      <div className=" w-full flex flex-col pb-4 gap-2 items-end rounded-xl bg-main-bg px-4 md:px-6">
        <div className="w-full">
          <ResponsiveChartContainer
            sx={{
              [`.${axisClasses.root}`]: {
                [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                  stroke: "#ffffff",
                  strokeWidth: 3,
                },
                [`.${axisClasses.tickLabel}`]: {
                  fill: "#ffffff",
                },
              },
            }}
            colors={["#FFFFFF", "#FE5E48"]}
            xAxis={[{ data: axis_x }]}
            series={[
              {
                type: "scatter",
                data: anomalPoints_scatter,
                markerSize: 12,
              },
              // @ts-ignore
              config,
            ]}
            z-index={1}
            height={440}
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          >
            <ChartsGrid vertical horizontal />

            {type === "Линейный" ? <LinePlot /> : <ScatterPlot />}
            <ScatterPlot />
            <ChartsXAxis />
            <ChartsYAxis />
          </ResponsiveChartContainer>
        </div>
        <div className="tooltip" data-tip="см. полный график">
          <NavLink to="fullscreen" className="my-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-1 md:flex gap-6 items-center">
        <button
          onClick={() => downloadFile(id ? +id : 1)}
          className="my-btn md:w-52"
        >
          Экспорт файлов
        </button>
      </div>
    </>
  );
};

export default Chart;
