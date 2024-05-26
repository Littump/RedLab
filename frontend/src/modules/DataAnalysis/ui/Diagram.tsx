import { DateValueType } from "react-tailwindcss-datepicker";
import Typography from "@/ui/Typography.tsx";
import DateInput from "@/ui/DateInput.tsx";
import DropdownInput from "@/ui/DropdownInput.tsx";
import Chart from "@/modules/DataAnalysis/ui/Chart.tsx";
import { TNode } from "@/modules/DataAnalysis/types/graph.ts";
import { IFilters } from "@/modules/DataAnalysis/ui/DataAnalysis.tsx";

interface Props {
  points: TNode[];
  name: string;
  values: IFilters;
  setFieldValue: (name: string, val: string | DateValueType) => void;
}

const Diagram = ({ points, name, values, setFieldValue }: Props) => {
  const types = ["Линейный", "Точечный"];
  return (
    <div className="flex flex-col gap-6 z-[10]">
      <div className="flex justify-between w-full my-4">
        <Typography variant="paragraph">{name}</Typography>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-4 items-center ">
        <DropdownInput
          className="md:w-40"
          items={types}
          onClick={(str) => setFieldValue("type", str)}
        >
          {values.type ? values.type : "Тип"}
        </DropdownInput>
        <div className="sm:w-[290px] ">
          <DateInput
            value={values.range}
            setFieldValue={setFieldValue}
            name="range"
          />
        </div>
      </div>
      <Chart points={points} type={values.type} />
    </div>
  );
};

export default Diagram;
