import PropTypes from 'prop-types';
import './ProductList.scss';
import { useMediaQuery } from 'react-responsive';
import { Skeleton } from '@mui/material';

import CardProduct from '../CardProduct/CardProduct';

const ProductList = ({ products }) => {
  const skeletonCount = 2;
  const isMobileDevice = useMediaQuery({ maxWidth: 768 });
  const isTabletDevice = useMediaQuery({ maxWidth: 1024 });

  return (
    <div className='products'>
      {products && products.length === 0
        ? Array.from({ length: skeletonCount }).map((_, index) => (
            <div key={index} className='skeleton-wrapper'>
              <Skeleton
                animation='wave'
                variant='rounded'
                height={
                  isMobileDevice ? '84vw' : isTabletDevice ? '46vw' : '33vw'
                }
              />
            </div>
          ))
        : products &&
          products.map(
            product =>
              product && <CardProduct key={product?._id} {...product} />
          )}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array
};

export default ProductList;
