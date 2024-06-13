import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useBasketStore } from "store/basket-store";
import { BsBasket2Fill } from "react-icons/bs";

export const Cart: FC = () => {
  const { t } = useTranslation();
  const basketItems = useBasketStore((state) => state.items);
  const incrementQuantity = useBasketStore((state) => state.incrementQuantity);
  const decrementQuantity = useBasketStore((state) => state.decrementQuantity);
  const removeItem = useBasketStore((state) => state.removeItem);

  const getTotalPrice = useMemo(() => {
    return basketItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }, [basketItems]);

  if (basketItems.length === 0) {
    return (
      <div className="container text-3xl mx-auto p-4 flex-col gap-3 justify-center items-center w-full h-screen flex">
        <BsBasket2Fill className="text-[var(--color-primary)] text-6xl mr-4 w-24 h-24" />
        {t("cart.empty-cart")}
      </div>
    );
  }

  return (
    <div className="continer mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Sepet</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {/* Products List */}
          <div className="grid grid-cols-1 gap-4  overflow-auto  pr-4">
            {basketItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center border p-4 rounded-lg shadow-md bg-white"
              >
                <img
                  src={item.smallThumbnail}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h2>
                  <p className="text-gray-600">{item.authors.join(", ")}</p>
                  <p className="text-gray-800">Fiyat: ${item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="px-2 py-1 bg-[var(--color-primary)] text-white rounded-lg hover:bg-red-600 transition"
                    >
                      -
                    </button>
                    <span className="mx-2 text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="px-2 py-1 bg-[var(--color-primary)] text-white rounded-lg hover:bg-green-600 transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 px-2 py-1 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
                    >
                      Kaldır
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 bg-white p-4 h-[220px] mr-4 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Toplam</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Toplam Ürün Sayısı:</span>
              <span className="text-gray-900 font-semibold">
                {basketItems.length}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700">Toplam Tutar:</span>
              <span className="text-gray-900 font-semibold">
                ${getTotalPrice}
              </span>
            </div>
          </div>
          <button className="w-full py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition mt-4">
            Ödeme Yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
