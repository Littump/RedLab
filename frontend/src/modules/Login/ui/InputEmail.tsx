import { Form, Formik } from "formik";
import TextInput from "@/ui/TextInput.tsx";
import LoginDto from "@/modules/Login/types/login.dto.ts";

interface Props {
  next: (data: LoginDto, final: boolean) => void;
  info: LoginDto;
}

const InputEmail = ({ next, info }: Props) => {
  const handleSubmit = (data: LoginDto) => {
    next(data, false);
  };
  console.log(info);
  return (
    <Formik onSubmit={handleSubmit} initialValues={info}>
      {() => (
        <Form>
          <TextInput
            name="username"
            isError={false}
            placeholder="somemail@gmail.com"
            label="email"
          />
          <button className="my-btn" type="submit">
            дальше
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default InputEmail;
