import { NavLink } from "react-router-dom";
import { useDeleteTable } from "@/modules/Sidebar/api/useDeleteTable.ts";

interface Props {
  list: { name_y: string; id: number }[];
}

const DataList = ({ list }: Props) => {
  const { mutate } = useDeleteTable();
  if (!list)
    return (
      <div className="flex gap-4 flex-col w-full">
        <div className="skeleton w-44 h-10 mx-4"></div>
        <div className="skeleton w-44 h-10 mx-4"></div>
        <div className="skeleton w-44 h-10 mx-4"></div>
      </div>
    );
  return (
    <div className=" text-center items-center flex flex-col gap-2">
      {list.map(({ name_y, id }, index) => (
        <div
          key={name_y + index}
          className="my-link py-4 px-4 w-full hover:bg-dark-bg items-center flex gap-4 justify-center"
        >
          <NavLink to={"/data/" + id} className="flex gap-2 items-center">
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
                d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
              />
            </svg>
            {name_y.slice(0, 12)}
          </NavLink>
          <button
            onClick={() => mutate(id)}
            className="ml-auto hover:text-main-red"
          >
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
      <NavLink
        to={"/"}
        className="flex gap-2 my-link py-4 px-4 w-full hover:bg-dark-bg items-center"
      >
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
            d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
          />
        </svg>
        Добавить
      </NavLink>
    </div>
  );
};

export default DataList;
