import { useEffect, useState } from "react";
import LoginDto from "@/modules/Login/types/login.dto.ts";
import InputEmail from "@/modules/Login/ui/InputEmail.tsx";
import InputPassword from "@/modules/Login/ui/InputPassword.tsx";
import { useLogin } from "@/modules/Login/api/useLogin.ts";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [info, setInfo] = useState<LoginDto>({
    username: "",
    password: "",
  });
  const [currentStep, setCurrentStep] = useState<number>(0);
  const navigate = useNavigate();
  const { mutate, data, isPending } = useLogin();

  const handleNextStep = (newData: LoginDto, final = false) => {
    setInfo((prev) => ({ ...prev, ...newData }));
    if (final) {
      mutate(newData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };
  const handlePrevStep = (newData: LoginDto) => {
    setInfo((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };
  useEffect(() => {
    if (data && !isPending) {
      localStorage.setItem("token", data.data.auth_token);
      navigate("/");
    }
    if (localStorage.getItem("token") != null) navigate("/");
  }, [data]);

  const steps = [
    <InputEmail next={handleNextStep} info={info} />,
    <InputPassword
      next={handleNextStep}
      prev={handlePrevStep}
      info={info}
      isLoading={isPending}
    />,
  ];

  return (
    <div className="flex gap-4 flex-col justify-center items-center w-[80vw] sm:w-96 mx-auto h-[100vh]">
      {steps[currentStep]}
    </div>
  );
};

export default Login;
