import { Form, Formik } from "formik";
import TextInput from "@/ui/TextInput.tsx";
import LoginDto from "@/modules/Login/types/login.dto.ts";
interface Props {
  prev: (data: LoginDto) => void;
  next: (data: LoginDto, final: boolean) => void;
  info: LoginDto;
}

const InputPassword = ({ prev, next, info }: Props) => {
  const handleSubmit = (data: LoginDto) => {
    //если нет аккаунта зарегаем
    next(data, true);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={info}>
      {({ values }) => (
        <Form>
          <TextInput
            name="password"
            isError={false}
            placeholder="password"
            label="password"
          />
          <button className="my-btn" type="button" onClick={() => prev(values)}>
            назад
          </button>
          <button className="my-btn" type="submit">
            Войти
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default InputPassword;
