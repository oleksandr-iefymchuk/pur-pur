import './Home.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { BUTTON_LABELS } from '../../../constants/constants';
import { categories } from '../../../constants/categories';
import Banner from './components/Banner/Banner';
import ButtonWrapper from '../../common/Button/Button';
import ProductList from '../../layout/ProductList/ProductList';
import CatalogBatton from '../../layout/CatalogBatton/CatalogBatton';
import NoveltySlider from './components/NoveltySlider/NoveltySlider';
import SwipeableCategory from './components/SwipeableCategory/SwipeableCategory';

const Home = () => {
  const { BUTTON_CATALOG } = BUTTON_LABELS;
  const products = useSelector(state => state.products);

  const [categoryIndexes, setCategoryIndexes] = useState({});
  const isMobileDevice = useMediaQuery({ maxWidth: 1024 });

  const setCurrentIndex = (category, index) => {
    setCategoryIndexes(prevIndexes => ({
      ...prevIndexes,
      [category]: index
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSwipe = (direction, category) => {
    const currentIndex = categoryIndexes[category] || 0;
    const categoryProducts = products.filter(
      product => product.category === category
    );

    if (direction === 'left') {
      if (currentIndex + 2 < categoryProducts.length) {
        setCurrentIndex(category, currentIndex + 2);
      }
    } else if (direction === 'right') {
      if (currentIndex > 0) {
        setCurrentIndex(category, currentIndex - 2);
      }
    }
  };

  return (
    <div className='home-wrap'>
      <Banner />
      {isMobileDevice && (
        <CatalogBatton
          categories={categories}
          iconBurger='menu'
          buttonText={BUTTON_CATALOG}
          buttonClassName='home-catalog-btn'
        />
      )}

      <div className='products-list'>
        {categories.map(categoryData => {
          const { name: categoryName } = categoryData;

          const categoryProducts = products.filter(
            product => product.category === categoryName
          );

          const currentIndex = categoryIndexes[categoryName] || 0;
          const displayedProducts = categoryProducts.slice(
            currentIndex,
            currentIndex + 2
          );

          return (
            <SwipeableCategory
              key={categoryName}
              onSwipeLeft={() => handleSwipe('left', categoryName)}
              onSwipeRight={() => handleSwipe('right', categoryName)}
            >
              <div className='product-category'>
                <div className='category-title'>
                  <h2>{categoryName}</h2>
                  <ButtonWrapper
                    buttonClassName='category-buttons'
                    disabled={currentIndex === 0}
                    onClick={() =>
                      setCurrentIndex(categoryName, currentIndex - 2)
                    }
                    icon='arrow-prev'
                  />
                  <ButtonWrapper
                    buttonClassName='category-buttons'
                    disabled={currentIndex + 2 >= categoryProducts.length}
                    onClick={() =>
                      setCurrentIndex(categoryName, currentIndex + 2)
                    }
                    icon='arrow-next'
                  />
                </div>
                <ProductList products={displayedProducts} />
              </div>
            </SwipeableCategory>
          );
        })}
      </div>
      <NoveltySlider />
    </div>
  );
};

export default Home;
