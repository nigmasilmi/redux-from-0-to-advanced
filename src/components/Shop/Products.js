import ProductItem from './ProductItem';
import classes from './Products.module.css';
const DUMMY_PRODUCTS = [
  {
    id: '1',
    price: 12.99,
    title: 'Product 1',
    description: 'Description for product 1',
  },
  {
    id: '2',
    price: 11,
    title: 'Product 2',
    description: 'Description for product 2',
  },
  {
    id: '3',
    price: 8,
    title: 'Product 3',
    description: 'Description for product 3',
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
