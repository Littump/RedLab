import Diagram from "@/modules/DataAnalysis/ui/Diagram.tsx";
import Typography from "@/ui/Typography.tsx";
import Anomalies from "@/modules/DataAnalysis/ui/Amomalies.tsx";
import { TNode } from "@/modules/DataAnalysis/types/graph.ts";
import { useParams } from "react-router-dom";
import { useGetTableLite } from "@/modules/DataAnalysis/api/useGetTableLite.ts";
import { useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker";
import { convertDateToUnix } from "@/helpers/convertDateToUnix.ts";
import Table from "@/modules/DataAnalysis/ui/Table.tsx";

export type GraphStateType = "Линейный" | "Точечный";

export interface IFilters {
  type: GraphStateType;
  range: DateValueType;
}

const DataAnalysis = () => {
  const { id } = useParams();

  const [values, setValues] = useState<IFilters>({
    range: {
      startDate: new Date(0),
      endDate: new Date(),
    },
    type: "Линейный",
  });

  const { data, isPending, refetch } = useGetTableLite({
    id: id ? +id : 1,
    start: convertDateToUnix(values.range ? values.range.startDate : null),
    end: convertDateToUnix(values.range ? values.range.endDate : null),
  });

  const setFieldValue = (name: string, value: string | DateValueType) => {
    if (name === "type")
      setValues((prev) => ({ ...prev, type: value as GraphStateType }));
    if (name === "range")
      setValues((prev) => ({ ...prev, range: value as DateValueType }));
    setTimeout(() => refetch(), 100);
  };

  if (!data || isPending) return <span className="loading"></span>;
  let points: TNode[] = data.data.points;
  console.log(points);
  const count_anomalies = data.data.points.reduce(
    (total, el) => total + (el.is_anomal ? +el.is_anomal : 0),
    0,
  );

  return (
    <div className="flex flex-col gap-8 py-8">
      <Typography variant="h2">Диаграмма</Typography>
      <Diagram
        setFieldValue={setFieldValue}
        values={values}
        points={points}
        name={data.data.name_y}
      />
      <Anomalies
        count_anomalies={count_anomalies}
        count_total={points.length}
      />
      <Table max={points.length} points={points} name={data.data.name_y} />
    </div>
  );
};

export default DataAnalysis;
