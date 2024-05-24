import { IUser } from "@/modules/Sidebar/types/user.ts";
import Typography from "@/ui/Typography.tsx";

const UserInfo = () => {
  const userInfo: IUser = {
    email: "ivan228@gmail.com",
  };
  const { email } = userInfo;
  return (
    <div className="flex flex-col gap-2 items-center w-full ">
      <Typography variant="lead">{email}</Typography>
      <button className="my-link">выйти</button>
    </div>
  );
};

export default UserInfo;
