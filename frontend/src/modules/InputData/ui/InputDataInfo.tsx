import Typography from "@/ui/Typography.tsx";

const InputDataInfo = () => {
  const info = [
    {
      name: "Формат данных",
      value: ".csv, .tsv",
    },
    {
      name: "Обязательные поля таблицы",
      value: "дата, значения",
    },
    {
      name: "Размер файла",
      value: "до 50мб",
    },
    {
      name: "Дополнительные условия",
      value: "файл обязан содержать столбец date!",
    },
  ];
  return (
    <div className="w-full flex pb-6">
      <ul>
        {info.map(({ value, name }) => (
          <li
            key={name + value}
            className="flex flex-wrap py-1  sm:py-0 gap-x-2 items-center text-gray-200"
          >
            <Typography variant="lead" className="font-normal text-gray-300">
              {name}:{" "}
            </Typography>
            <Typography
              variant="paragraph"
              className="font-normal text-gray-300"
            >
              {value}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InputDataInfo;
