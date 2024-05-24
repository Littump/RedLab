import { useState } from "react";
import LoginDto from "@/modules/Login/types/login.dto.ts";
import InputEmail from "@/modules/Login/ui/InputEmail.tsx";
import InputPassword from "@/modules/Login/ui/InputPassword.tsx";

const Login = () => {
  const [info, setInfo] = useState<LoginDto>({
    username: "",
    password: "",
  });
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNextStep = (newData: LoginDto, final = false) => {
    setInfo((prev) => ({ ...prev, ...newData }));
    if (final) {
      //мутируем
      console.log(newData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };
  const handlePrevStep = (newData: LoginDto) => {
    setInfo((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <InputEmail next={handleNextStep} info={info} />,
    <InputPassword next={handleNextStep} prev={handlePrevStep} info={info} />,
  ];

  return <div className="flex gap-4 flex-col mt-10 ">{steps[currentStep]}</div>;
};

export default Login;
