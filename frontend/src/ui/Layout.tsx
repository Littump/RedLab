import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/modules/Sidebar";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

  return (
    <div className="flex gap-6">
      <Sidebar />
      <div className="ml-52 pl-6">{children}</div>
    </div>
  );
}

export default Layout;
