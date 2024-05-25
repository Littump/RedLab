import { useMutation } from "@tanstack/react-query";
import loginService from "./loginService.ts";
import LoginDto from "@/modules/Login/types/login.dto.ts";

export const useRegistration = () =>
  useMutation({
    mutationFn: (body: LoginDto) => loginService.registration(body),
  });
