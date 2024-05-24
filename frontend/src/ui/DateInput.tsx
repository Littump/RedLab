import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

interface Props {
  name: string;
  value: DateValueType;
  setFieldValue: (name: string, val: DateValueType) => void;
}

function DateInput({ name, value, setFieldValue }: Props) {
  return (
    <Datepicker
      i18n={"ru"}
      separator={":"}
      displayFormat={"DD/MM/YYYY"}
      value={value}
      onChange={(value) => setFieldValue(name, value)}
    />
  );
}

export default DateInput;
