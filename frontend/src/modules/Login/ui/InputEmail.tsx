import { Form, Formik } from "formik";
import TextInput from "@/ui/TextInput.tsx";
import LoginDto from "@/modules/Login/types/login.dto.ts";
import Typography from "@/ui/Typography.tsx";
import * as yup from "yup";

const validationsSchema = yup.object().shape({
  username: yup
    .string()
    .required("Введите почту")
    .email("Неверно указана почта"),
});

interface Props {
  next: (data: LoginDto, final: boolean) => void;
  info: LoginDto;
}

const InputEmail = ({ next, info }: Props) => {
  const handleSubmit = (data: LoginDto) => {
    next(data, false);
  };
  return (
    <Formik
      validationSchema={validationsSchema}
      onSubmit={handleSubmit}
      initialValues={info}
    >
      {({ touched, errors }) => (
        <Form className="flex flex-col gap-6 w-full">
          <Typography variant="h3">Добро пожаловать на наш сервис!</Typography>
          <TextInput
            name="username"
            isError={!!(touched.username && errors.username)}
            error={errors.username}
            placeholder="somemail@gmail.com"
            label="email"
          />
          <button className="my-btn my-4" type="submit">
            дальше
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default InputEmail;
