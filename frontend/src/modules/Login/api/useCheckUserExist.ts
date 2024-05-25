import { useQuery } from "@tanstack/react-query";
import loginService from "./loginService.ts";

export const useCheckUserExist = (username: string) =>
  useQuery({
    queryKey: ["is_exist"],
    queryFn: () => loginService.isExist(username),
  });
