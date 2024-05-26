import UserInfo from "@/modules/Sidebar/ui/UserInfo.tsx";
import DataList from "@/modules/Sidebar/ui/DataList.tsx";
import { useResize } from "@/helpers/useResize.ts";
import { useGetMe } from "@/modules/Sidebar/api/useGetMe.ts";

const Sidebar = () => {
  const width = useResize();

  const { data, isPending } = useGetMe();

  if (!data) return;
  const email = data.data.username.split("@")[0];
  const tables = data.data.tables.filter((el) => el.name_y);
  return (
    <>
      {width <= 1024 ? (
        <div className="dropdown fixed top-4 left-4  z-50 ">
          <div
            tabIndex={0}
            role="button"
            className="btn bg-main-bg border-0 shadow-xl text-gray-100 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <div
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 px-0 shadow bg-black rounded-box w-52 flex flex-col gap-4 py-6"
          >
            <UserInfo email={email} isPending={isPending} />
            <hr />
            <DataList list={tables} />
          </div>
        </div>
      ) : (
        <div className="w-52 bg-main-bg shadow fixed top-0 left-0 h-full flex flex-col gap-6 py-8 ">
          <UserInfo email={email} isPending={isPending} />
          <DataList list={tables} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
