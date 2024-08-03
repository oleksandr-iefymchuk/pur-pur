import './NoveltySlider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';

import ButtonWrapper from '../../../../common/Button/Button';
import { isNewProduct } from '../../../../../helpers';
import CardProduct from '../../../../layout/CardProduct/CardProduct';

const NoveltySlider = () => {
  const products = useSelector(state => state.products);
  const newProducts = products.filter(product =>
    isNewProduct(product.dateAdded)
  );

  const isMobileDevice = useMediaQuery({ maxWidth: 768 });
  const isTabletDevice = useMediaQuery({ maxWidth: 1024 });
  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: isMobileDevice ? 2 : isTabletDevice ? 3 : 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,

    nextArrow: <ButtonWrapper buttonClassName='arrow-next' icon='arrow-next' />,
    prevArrow: <ButtonWrapper buttonClassName='arrow-prev' icon='arrow-prev' />
  };

  return (
    <div className='novelty-slider-wrap'>
      <div className='novelty-slider-container'>
        <h2>Новинки</h2>
        <Slider {...settings}>
          {newProducts.map(product => (
            <CardProduct key={product?._id} {...product} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NoveltySlider;
