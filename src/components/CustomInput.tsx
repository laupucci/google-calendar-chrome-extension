import { ChangeEventHandler, FC } from "react";

type Props = {
  className: string;
  type: string;
  title: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
export const CustomInput: FC<Props> = ({
  className,
  type,
  title,
  value,
  onChange,
}) => {
  return (
    <div className="card">
      <span>{title}</span>
      <input
        type={type}
        placeholder={title}
        className={className}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
