import "./App.css";
import {
  ProductButtons,
  ProductCard,
  ProductImage,
  ProductTitle,
} from "cr-product-card";

const product = {
  id: "1",
  title: "Coffee Mug - Card",
};

function App() {
  return (
    <div className="App App-header">
      <ProductCard
        key={product.id}
        product={product}
        className="bg-dark text-white"
        initialValues={{
          count: 6,
          maxCount: 10,
        }}
      >
        {({ reset, increaseBy, count, maxCount, isMaxCountReached }) => (
          <>
            <ProductImage />
            <ProductTitle />
            <ProductButtons />
          </>
        )}
      </ProductCard>
    </div>
  );
}

export default App;
