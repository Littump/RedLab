import Typography from "@/ui/Typography.tsx";
import { ITable, TNode } from "@/modules/DataAnalysis/types/graph.ts";
import { useEffect, useState } from "react";
import { useGetTablePaginated } from "@/modules/DataAnalysis/api/useGetTablePaginated.ts";
import { useParams } from "react-router-dom";

interface Props {
  name: string;
  points: TNode[];
  max: number;
}

const Table = ({ name, max }: Props) => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [previous, setPrevious] = useState<ITable>();
  const { data, isPending, isSuccess } = useGetTablePaginated({
    page,
    id: id ? +id : 1,
  });
  useEffect(() => {
    if (!isPending && isSuccess) setPrevious(data.data);
  }, [data, isPending, isSuccess]);
  if (!data && !isPending) return "ошибка";
  return (
    <>
      <Typography variant="h3">Таблица</Typography>
      <div className="overflow-x-auto bg-main-bg p-6 rounded-xl relative ">
        <table className="table h-[500px]">
          <thead className="text-main-red">
            <tr>
              <th className="w-2/3 sm:w-1/2">Дата</th>
              <th className="w-1/3 sm:w-1/2">{name}</th>
            </tr>
          </thead>
          <tbody className="text-gray-100">
            {data
              ? data.data.points.map((el, id) => {
                  let date = new Date(el.x).toString().split(":")[0];
                  date = date.slice(0, date.length - 2);
                  return (
                    <tr key={id + el.y.toString()}>
                      <td className="w-2/3 sm:w-1/2">{date}</td>
                      <td className="w-1/3 sm:w-1/2">{el.y}</td>
                    </tr>
                  );
                })
              : previous?.points.map((el, id) => {
                  let date = new Date(el.x).toString().split(":")[0];
                  date = date.slice(0, date.length - 2);
                  return (
                    <tr key={id + el.y.toString()}>
                      <td className="w-2/3 sm:w-1/2">{date}</td>
                      <td className="w-1/3 sm:w-1/2">{el.y}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <div className="flex justify-center mt-auto gap-6 items-center text-gray-100">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <span className="h6">{page}</span>
          <button
            onClick={() => {
              setPage((old) => old + 1);
            }}
            disabled={page * 10 >= max - 10}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
          {isPending && (
            <div className="loading absolute bottom-4 right-8"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Table;
