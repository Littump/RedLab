import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

interface Props {
  name: string;
  value: DateValueType;
  setFieldValue: (name: string, val: DateValueType) => void;
}

function DateInput({ name, value, setFieldValue }: Props) {
  return (
    <Datepicker
      inputClassName={() =>
        " text-white bg-main-bg py-3 rounded-xl px-4 w-full border-0 outline-0"
      }
      containerClassName={"bg-black flex relative border-0 outline-0"}
      i18n={"ru"}
      separator={":"}
      primaryColor={"red"}
      displayFormat={"DD/MM/YYYY"}
      value={value}
      onChange={(value) => setFieldValue(name, value)}
    />
  );
}

export default DateInput;
