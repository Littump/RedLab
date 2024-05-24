import { IDataItem } from "@/modules/Sidebar/types/data.ts";
import { NavLink } from "react-router-dom";

const DataList = () => {
  const data: IDataItem[] = [
    {
      name: "data1.csv",
      id: 1,
    },
    {
      name: "data2.csv",
      id: 2,
    },
    {
      name: "data3.csv",
      id: 3,
    },
  ];

  return (
    <div className="max-h-96 text-center items-center overflow-y-scroll no-scroll flex flex-col gap-4">
      {data.map(({ name, id }) => (
        <div className="my-link py-2 px-4 w-full hover:bg-blue-500 items-center flex gap-4 justify-center">
          <NavLink to={"/data/" + id}>{name}</NavLink>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      ))}
      <NavLink to={"/"} className="my-link py-2 px-4 w-full hover:bg-blue-500">
        добавить
      </NavLink>
    </div>
  );
};

export default DataList;
