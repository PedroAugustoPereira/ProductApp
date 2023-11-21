import { ReactNode } from 'react';

interface RowInterface {
  children: ReactNode;
  id: string;
  styles?: string;
}

const Row = ({ children, key, styles }: RowInterface) => {
  const current =
    "w-full justify-between flex flex-row justify-start gap-4 items-center h-20 py-3 px-4";

  return (
    <div
      id={key}
      className={styles !== undefined ? `${current} ${styles}` : current}
    >
      {children}
    </div>
  );
};

export default Row;
