import InputDataForm from "./InputDataForm.tsx";
import InputDataInfo from "./InputDataInfo.tsx";

const InputData = () => {
  return (
    <div className="flex gap-4 flex-col mt-10 ">
      <InputDataForm />
      <InputDataInfo />
    </div>
  );
};

export default InputData;
