import UserInfo from "@/modules/Sidebar/ui/UserInfo.tsx";
import DataList from "@/modules/Sidebar/ui/DataList.tsx";

const Sidebar = () => {
  return (
    <div className="w-52 bg-cyan-100 fixed top-0 left-0 h-full flex flex-col gap-6 py-8 ">
      <UserInfo />
      <DataList />
    </div>
  );
};

export default Sidebar;
