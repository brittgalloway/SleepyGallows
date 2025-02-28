import Image from 'next/image';
import { USD } from '@/lib/utils';
import { useCartContext } from '@/shop/cartContext'
import styles from '@/shop/page.module.scss'

export function CartProduct() {
    const { cart, setCart } = useCartContext();

    const handleQty = (event, price) => {
        const newQty = Number(event.target.value);
        if (newQty < 1) return;

        setCart((prevCart) => ({
            ...prevCart,
            items: prevCart.items.map((item) =>
                item.price === price ? { ...item, quantity: newQty } : item
            ),
            count: (cart.count - newQty) + newQty,
        }));
    };
    const handleRemoval = (key) => {
      setCart((prevCart) => {
        const existingItemIndex = prevCart.items.findIndex(
          (item) => item.price === key
        );

        let updatedItems;
        if (existingItemIndex !== -1) {
          updatedItems = prevCart.items.filter((item) => item.price !== key);
          const newCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
          return {
            count: newCount,
            items: updatedItems,
          };
        }
      });
    }
    return (
      <ul className={styles.productList}>
        {cart.items.map((item) => (
          
          <li key={item.price} data-testid={`item_${item.price}`}>
              <button data-testid={`delete-item_${item.price}`} type="button" onClick={() => handleRemoval(item.price)} onKeyUp={() => handleRemoval(item.price)}>Remove</button>
              <Image
                data-testid={`item-image_${item.price}`}
                src={item.productDisplay}
                width={100}
                height={100}
                alt={`${item.productName} product thumbnail`}
                title={`${item.productName} product thumbnail`}
                style={{objectFit: "cover"}}
              />
              <p data-testid={`item-name_${item.price}`} className={``}>{item.productName}</p>
              <p data-testid={`item-description_${item.price}`}>{item.productDescription}</p>
              <p data-testid={`item-qty_${item.price}`}>Qty: {item.quantity}</p>
              <p data-testid={`item-price_${item.price}`} className={``}>Unit Price: {USD.format(item.productPrice)}</p>
              {item?.productStock > 1 ?
                <label>
                  Quantity
                  <input
                    data-testid={`item-qty-input_${item.price}`}
                    type="number"
                    min={1}
                    max={item.productStock}
                    size={3}
                    value={item.quantity}
                    onChange={(e) => handleQty(e, item.price)}
                  />
                </label> 
              : null} 
          </li>
        ))}
      </ul>
    );
}
