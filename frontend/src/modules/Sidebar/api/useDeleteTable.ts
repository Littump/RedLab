import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main.tsx";
import sidebarService from "./sidebarService.ts";

export const useDeleteTable = () =>
  useMutation({
    mutationFn: (id: number) => sidebarService.deleteTable(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["userInfo"] }),
  });
