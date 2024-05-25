import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { ReactNode, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

type Props = {
  children: ReactNode;
  items: string[];
  className?: string | null;
  onClick: (text: string) => void;
  error?: boolean;
  dontShowTriangle?: boolean;
};

function DropdownInput({
  children,
  items,
  className,
  dontShowTriangle,
  error,
  onClick,
  ...props
}: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: () => setOpenMenu(false),
  });
  if (!items || !items.length) return null;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <summary
        tabIndex={0}
        role="button"
        className={`flex ${
          dontShowTriangle ? "justify-center" : "justify-start"
        } bg-main-bg border-0 text-gray-100 hover:bg-dark-bg text-dark-gray btn ${
          error && "border border-red"
        }`}
        {...props}
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        {children}
        {!dontShowTriangle && (
          <ChevronDownIcon
            className={`w-5 h-5 transition absolute right-2 top-4 ${
              openMenu ? "rotate-0" : "rotate-180"
            }`}
          />
        )}
      </summary>
      <ul
        tabIndex={0}
        className={`${
          openMenu ? "" : "hidden"
        } absolute top-14 font-medium shadow-xl dropdown-content z-[1] menu p-2  bg-main-bg text-gray-100 rounded-box w-52`}
      >
        {items.map((item: string) => (
          <li
            onClick={() => {
              onClick(item);
              setOpenMenu(false);
            }}
            key={item}
            className={`py-2 rounded-md text-center hover:bg-dark-bg transition cursor-pointer`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropdownInput;
