import { MouseEventHandler, useEffect, useState } from 'react';

import { ICategory } from '@interfaces';
import { useAppDispatch } from '@store';
import { setStatuses } from '@store/slice';
import { BaseUrl } from '@utils/BaseUrl';
import axios from 'axios';

interface IProps {
  onChange: (value: string) => void;
}

export const ProductsFilter: React.FC<IProps> = ({ onChange }): JSX.Element => {
  const [categoriesState, setCategoriesState] = useState<ICategory[]>([]);
  const [checkedId, setCheckedId] = useState<string>('');
  const [categoryStatuses, setCategoryStatuses] = useState<any>([]);

  const dispatch = useAppDispatch();

  const getCategories = async () => {
    const response = await axios.get(
      process.env.REACT_APP_BASE_URL + '/categories'
    );

    const categories = response.data;

    categories.forEach((category: any) => {
      setCategoryStatuses((prev: any) => ({
        ...prev,
        [category.id]: {
          loaded: false,
        },
      }));
    });

    dispatch(setStatuses(categoryStatuses));
    setCategoriesState(categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleItemClick = (e: any) => {
    const id = e.target.getAttribute('data-id');
    setCheckedId(id);
  };

  useEffect(() => {
    onChange(checkedId);
  }, [checkedId]);

  const handleDownloadCategory: MouseEventHandler<HTMLDivElement> = (event) => {
    axios.get(BaseUrl + '/product/dowloandexceldocument?id=' + checkedId);
  };

  return (
    <div className="categories-filter">
      <h3 className="categories-filter__title">Category</h3>
      <div className="categories-filter__list">
        <div
          className={`categories-filter__item ${!checkedId ? 'active' : ''}`}
          onClick={handleItemClick}
          data-id={''}
        >
          All items
        </div>
        {categoriesState.map((category: any) => {
          return (
            <div
              className={`categories-filter__item ${
                category.id === checkedId ? 'active' : ''
              }`}
              onClick={handleItemClick}
              key={category.id}
              data-id={category.id}
            >
              {category.name}
            </div>
          );
        })}
        {/* <a
          className={`categories-filter__item ${!checkedId ? 'active' : ''}`}
          // onClick={handleDownloadCategory}
          style={{
            backgroundColor: 'green',
            color: '#fff',
          }}
          href={BaseUrl + '/product/dowloandexceldocument?id=' + checkedId}
        >
          Скачать как Excel файл
        </a> */}
      </div>
    </div>
  );
};
