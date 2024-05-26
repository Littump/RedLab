import { useMutation } from "@tanstack/react-query";
import { AddFileDto } from "@/modules/InputData/types/file.ts";
import inputDataService from "@/modules/InputData/api/inputDataService.ts";
import { queryClient } from "@/main.tsx";
export const useAddFile = () =>
  useMutation({
    mutationFn: (body: AddFileDto) => inputDataService.addFile(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["userInfo"] }),
  });
