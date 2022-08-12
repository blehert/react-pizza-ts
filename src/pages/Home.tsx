import React from 'react';
import { useSelector } from 'react-redux';

import { setCategoryId, setSortType, setCurrentPage } from '../redux/filter/slice';
import { filterSelector } from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { pizzaDataSelector } from '../redux/pizza/selectors';
import { useAppDispatch } from '../redux/store';

import { Categories, Sort, Skeleton, PizzaBlock, Pagination } from '../components';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const isSearch = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);
  const { items, status } = useSelector(pizzaDataSelector);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);
  const onClickSortType = React.useCallback((obj: any) => {
    dispatch(setSortType(obj));
  }, []);
  const onChangeCurrentPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    //получаем и сохраняем данные
    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage: String(currentPage),
      }),
    );
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryValue={categoryId} onChangeCategory={onChangeCategory} />
        <Sort sortValue={sort} onClickSortType={onClickSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 🤡</h2>
          <p>
            К сожалению, не удалось получить питсы.
            <br />
            Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} setCurrentPage={onChangeCurrentPage} />
    </div>
  );
};

export default Home;
