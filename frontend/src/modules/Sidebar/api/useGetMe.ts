import sidebarService from "./sidebarService.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () =>
  useQuery({
    queryKey: ["userInfo"],
    queryFn: () => sidebarService.getMe(),
  });
