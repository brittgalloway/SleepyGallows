import Image from 'next/image'
import { USD } from '@/lib/utils'
import { useCartContext } from '@/shop/cartContext'
import styles from '@/shop/page.module.scss'

export function CartProduct() {
  const { cart, setCart } = useCartContext();

  const handleQty = (event, id) => {
    const newQty = Number(event.target.value);
    if (newQty < 1) return;

    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      ),
      count: (cart.count - newQty) + newQty,
    }));
  };

  const handleRemoval = (key) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.id === key
      );

      if (existingItemIndex !== -1) {
        const updatedItems = prevCart.items.filter((item) => item.id !== key);
        const newCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
        return {
          count: newCount,
          items: updatedItems,
        };
      }

      return prevCart;
    });
  };

  return (
    <ul className={styles.productList}>
      {cart.items.map((item) => (
        <li key={item.id} data-testid={`item_${item.id}`}>
          <button
            data-testid={`delete-item_${item.id}`}
            type="button"
            onClick={() => handleRemoval(item.id)}
            onKeyUp={() => handleRemoval(item.id)}
          >
            Remove
          </button>
          <Image
            data-testid={`item-image_${item.id}`}
            src={item.productDisplay}
            width={100}
            height={100}
            alt={`${item.productName} product thumbnail`}
            title={`${item.productName} product thumbnail`}
            style={{ objectFit: 'cover' }}
          />
          <p className={styles.prodName} data-testid={`item-name_${item.id}`}>{item.productName}</p>
          <p className={styles.description} data-testid={`item-description_${item.id}`}>{item.productDescription}</p>
          <p className={styles.price} data-testid={`item-price_${item.id}`}>Unit Price: {USD.format(item.productPrice)}</p>
          {item?.productStock > 1 ? (
            <label className={styles.qty} aria-label={`Current quantity of ${item.productName}. Adjust quantity here.`}>
              Qty:
              <input
                data-testid={`item-qty-input_${item.id}`}
                type="number"
                min={1}
                max={item.productStock}
                size={3}
                maxLength={3}
                value={item.quantity}
                onChange={(e) => handleQty(e, item.id)}
              />
            </label>
          ) : <p className={styles.qty} data-testid={`item-qty_${item.id}`}>Qty: {item.quantity}</p>
          }
        </li>
      ))}
    </ul>
  );
}
