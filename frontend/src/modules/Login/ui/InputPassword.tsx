import { Form, Formik } from "formik";
import TextInput from "@/ui/TextInput.tsx";
import LoginDto from "@/modules/Login/types/login.dto.ts";
import Typography from "@/ui/Typography.tsx";
import * as yup from "yup";
import YupPassword from "yup-password";
import { useCheckUserExist } from "@/modules/Login/api/useCheckUserExist.ts";
import { useRegistration } from "@/modules/Login/api/useRegistration.ts";
YupPassword(yup);

const validationsSchema = yup.object().shape({
  password: yup
    .string()
    .typeError("Должно быть строкой")
    .required("Обязательное поле")
    .min(8, "Слишком простой")
    .minNumbers(1, "Добавьте 1 цифру"),
});

interface Props {
  prev: (data: LoginDto) => void;
  next: (data: LoginDto, final: boolean) => void;
  info: LoginDto;
  isLoading: boolean;
}

const InputPassword = ({ prev, next, info, isLoading }: Props) => {
  const { data, isPending } = useCheckUserExist(info.username);
  const { mutateAsync, isPending: isRegistrationPending } = useRegistration();
  if (isPending || !data) return <div className="loading"></div>;

  const { is_exist } = data.data;

  const handleSubmit = async (data: LoginDto) => {
    if (!is_exist) await mutateAsync(data);
    next(data, true);
  };

  return (
    <Formik
      validationSchema={validationsSchema}
      onSubmit={handleSubmit}
      initialValues={info}
    >
      {({ values, touched, errors }) => (
        <Form className="flex flex-col gap-4 w-full">
          <Typography variant="h3">
            {is_exist ? "Введите пароль ниже" : "Вы у нас впервые!"}
          </Typography>
          <TextInput
            type="password"
            name="password"
            placeholder="password"
            isError={!!(touched.password && errors.password)}
            error={errors.password}
            label={`${is_exist ? "Пароль" : "Придумайте пароль"}`}
          />
          <div className="grid grid-cols-2 gap-4 my-4">
            <button
              className="my-btn"
              type="button"
              onClick={() => prev(values)}
            >
              назад
            </button>
            <button className="my-btn" type="submit">
              {isRegistrationPending || isLoading ? (
                <span className="loading"></span>
              ) : (
                "Войти"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InputPassword;
