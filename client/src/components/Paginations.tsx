import '../styles/Slider.css';

import React, {
  useEffect,
  useState,
} from 'react';

import usePage from '../states/pagination';

type ObjectPageAttributes = {
  countTransition: number;
  id: number;
  number: number;
  selected: boolean;
};

const Pagination = () => {
  const [objectPages, setObjectPages] = useState<ObjectPageAttributes[]>([]);
  const [selected, setSelected] = useState<string>("page1");
  const [dataPage, setDataPage] = usePage((state) => [
    state.dataPage,
    state.setDataPage,
  ]);

  console.log(dataPage);
  let pages = Math.ceil(dataPage.total / dataPage.perPage);

  useEffect(() => {
    pages = Math.ceil(dataPage.total / dataPage.perPage);

    if (objectPages.length > 0) {
      setObjectPages(() => []);
    }

    for (let i = 0; i < pages; i++) {
      setObjectPages((objectPages) => {
        return [
          ...objectPages,
          {
            countTransition: 1,
            id: i + 1,
            number: i + 1,
            selected: i === 0 ? true : false,
          },
        ];
      });
    }

    console.log(objectPages);
  }, [dataPage.perPage, dataPage.total]);

  const handleClickRight = (element: React.MouseEvent<HTMLInputElement>) => {
    const id = element.currentTarget.id;

    setObjectPages((objectPages) => {
      objectPages.forEach((value) => {
        if (`page${value.id} ` === selected) {
          value.selected = false;
        }

        if (`page${value.id}` === id) {
          value.selected = true;
          setDataPage({
            atualPage: value.id,
            perPage: dataPage.perPage,
            total: dataPage.total,
          });

          const antElement = document.getElementById(selected);

          if (antElement) {
            antElement.style.backgroundColor = `bg-[#141432]`;
          }

          const atual = document.getElementById(id);
          if (atual) {
            atual.style.backgroundColor = `bg-[#624DE3]`;
          }

          setSelected(() => id);
        }
      });

      return objectPages;
    });

    return null;
  };

  // const handleClickLeft = () => {};

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-center flex-row gap-1.5">
          <div className="flex  flex-row items-center  justify-center gap-0.5">
            {objectPages.map((value: ObjectPageAttributes) => (
              <>
                <div
                  id={`page${value.id}`}
                  onClick={handleClickRight}
                  className={`px-3  w-1/3 py-0.5 rounded-lg flex justify-center items-center cursor-pointer move ${
                    selected === `page${value.id}`
                      ? "bg-[#624DE3]"
                      : "bg-[#141432]"
                  }`}
                  style={{ minWidth: "35px" }}
                >
                  <p className="text-white">{value.number}</p>
                </div>

                <br />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
