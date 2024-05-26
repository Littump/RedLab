import { ReactNode } from "react";

interface Props {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "lead" | "paragraph";
  className?: string;
  children: ReactNode;
}

const Typography = ({ variant, className, children }: Props) => {
  const cn = `${variant} ${className}`;
  switch (variant) {
    case "h1":
      return <h1 className={cn}>{children}</h1>;
    case "h2":
      return <h2 className={cn}>{children}</h2>;
    case "h3":
      return <h3 className={cn}>{children}</h3>;
    case "h4":
      return <h4 className={cn}>{children}</h4>;
    case "h5":
      return <h5 className={cn}>{children}</h5>;
    case "h6":
      return <h6 className={cn}>{children}</h6>;
    case "lead":
      return <span className={cn}>{children}</span>;
    case "paragraph":
      return <p className={cn}>{children}</p>;
  }
};

export default Typography;
