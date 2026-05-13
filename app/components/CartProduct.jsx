import Image from 'next/image'
import { USD } from '@/lib/utils'
import { useCartContext } from '@/shop/cartContext'
import styles from '@/shop/page.module.scss'

export function CartProduct() {
  const { cart, setCart } = useCartContext();

  let total = 0;
  const cartItems= cart.items;
  for (let i = 0; i < cartItems.length; i++) {
    const current = cartItems[i];
    const currentPrice = current.productDiscount ? current.productDiscount : current.productPrice;
    total += currentPrice * current.quantity;
  }

  const handleQty = (event, id) => {
    const newQty = Number(event.target.value);
    if (newQty < 1) return;

    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      ),
      count: cartItems.reduce((total, item) => {
          return item.id == id ? total + newQty : total + item.quantity;
      }, 0)
    }));
  }

  const handleRemoval = (key) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.id === key
      );

      if (existingItemIndex !== -1) {
        let updatedShipping;
        const updatedItems = prevCart.items.filter((item) => item.id !== key);
        const newCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
        checkShipping(updatedItems);
        return {
          count: newCount,
          items: updatedItems,
          shipping: updatedShipping,
        };
        function checkShipping(items) {
          try {
            const hasFineArt = items.some((item)=>{
              return item.shipping =='fine art';
            });
            const hasBooks = items.some((item)=>{
              return item.shipping =='books';
            });
            const hasPrints = items.some((item)=>{
              return item.shipping =='print domestic';
            });
            const hasStickers = items.every((item)=>{
              return item.shipping =='stickers';
            });
            if (hasFineArt) {
              return updatedShipping = 0;
            } else
              if (hasBooks && !hasFineArt) {
                return updatedShipping = 1000;
              } else
                if(hasPrints && !hasFineArt && !hasBooks) {
                  return updatedShipping = 800;
                } else 
                  if (hasStickers) {
                    return updatedShipping = 200;
                  }
          } catch (error) {
              console.error('Something went wrong finding the shipping. A default $8 charge was added to your order');
              return updatedShipping = 800; 
          }
        }
      }

      return prevCart;
    });
  };
  return (
    <div>
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
              src={item.productDisplay}
              alt={`${item.productName} product thumbnail`}
              data-testid={`item-image_${item.id}`}
              width={100}
              height={100}
              title={`${item.productName} product thumbnail`}
              style={{ objectFit: 'cover' }}
            />
            <p className={styles.prodName} data-testid={`item-name_${item.id}`}>{item.productName}{item.variantName && ` | ${item.variantName}`}</p>
            <p className={styles.description} data-testid={`item-description_${item.id}`}>{item.productDescription}</p>
            <p className={styles.price} data-testid={`item-price_${item.id}`}>Unit Price: {USD.format(item.productDiscount ? item.productDiscount : item.productPrice)}</p>
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
      <p>Subtotal: {USD.format(total)}</p>
    </div>
  );
}
