import Typography from "@/ui/Typography.tsx";
import { PieChart } from "@mui/x-charts";

interface Props {
  count_anomalies: number;
  count_total: number;
}

const Anomalies = ({ count_anomalies, count_total }: Props) => {
  const fraction = ((count_anomalies / count_total) * 100).toFixed(0);
  const count_noAnomalies = count_total - count_anomalies;

  const list = [
    {
      text: "Количество выбросов",
      value: count_anomalies.toString(),
    },
    {
      text: "Нормальных значений",
      value: count_noAnomalies.toString(),
    },
    {
      text: "Всего значений",
      value: count_total.toString(),
    },
    {
      text: "Доля выбросов",
      value: fraction + "%",
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h3">Выбросы</Typography>
      <div className="flex lg:flex-row flex-col gap-8 lg:h-[200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-6/12 w-full ">
          {list.map(({ value, text }) => (
            <div
              key={text}
              className="bg-main-bg flex gap-3 rounded-xl items-center justify-center h-24 px-6"
            >
              <Typography variant="lead">{text}:</Typography>
              <Typography variant="lead" className="text-main-red">
                {value}
              </Typography>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-6/12 bg-main-bg grid sm:grid-cols-2 h-56 pl-24 sm:pl-0 items-center gap-6 rounded-xl  text-center py-6">
          <Typography variant="h6" className="text-main-red hidden sm:block">
            Диаграмма
          </Typography>
          <PieChart
            title={"Доля выбросов"}
            series={[
              {
                data: [
                  { value: count_anomalies, color: "#FE5E48" },
                  { value: count_noAnomalies, color: "#FFFFFF" },
                ],
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Anomalies;
