import { CartCounter } from "@/shopping-cart";

export const metadata = {
  title: "Shopping Cart",
  description: "A simple counter",
};

export default function CounterPage() {

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span>Products in cart</span>
      <CartCounter value={20} />
    </div>
  );
}
