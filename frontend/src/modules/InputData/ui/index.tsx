import InputDataForm from "./InputDataForm.tsx";
import InputDataInfo from "./InputDataInfo.tsx";
import Typography from "@/ui/Typography.tsx";

const InputData = () => {
  return (
    <div className="flex gap-6 flex-col pt-4 w-full items-start  rounded-xl bg-main-bg px-4 md:px-6">
      <Typography variant="h3" className="text-center">
        Загрузка файлов
      </Typography>
      <InputDataForm />
      <InputDataInfo />
    </div>
  );
};

export default InputData;
