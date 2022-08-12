import React from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
  categoryValue: number;
  onChangeCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryValue, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={categoryValue === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
