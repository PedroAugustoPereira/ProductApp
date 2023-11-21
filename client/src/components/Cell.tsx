import { ReactNode } from "react";

interface CellProps {
  name: string;
  children?: ReactNode | null;
  pStyles?: string;
  divStyles?: string;
}

export const Cell = ({ name, children, pStyles, divStyles }: CellProps) => {
  if (divStyles === undefined) {
    divStyles = "";
  }

  if (pStyles === undefined) {
    pStyles = "";
  }

  return (
    <>
      {children === undefined ? (
        <div className={`w-[calc(100%/7)] text-center ${divStyles}`}>
          <p className={`text-white  text-md ${pStyles}`}>{name}</p>
        </div>
      ) : (
        <div className="w-[calc(100%/7)] text-center">{children}</div>
      )}
    </>
  );
};

export default Cell;
