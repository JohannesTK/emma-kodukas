import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useForm } from 'react-hook-form';

interface OrderForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

const Cart = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    isOpen,
    closeCart,
    totalPrice,
  } = useCart();

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderForm>();

  const onSubmit = async (data: OrderForm) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const orderData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        notes: data.notes,
        items: items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total: totalPrice,
      };

      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Midagi läks valesti');
      }

      setOrderNumber(result.orderNumber);
      setIsSubmitted(true);

      setTimeout(() => {
        clearCart();
        reset();
        setIsCheckout(false);
        setIsSubmitted(false);
        setOrderNumber(null);
        closeCart();
      }, 5000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Midagi läks valesti. Proovi hiljem uuesti.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div style={styles.overlay} onClick={closeCart} />

      {/* Cart Drawer */}
      <div style={styles.drawer} className="cart-drawer">
        <div style={styles.header}>
          <h2 style={styles.title}>Ostukorv</h2>
          <button onClick={closeCart} style={styles.closeButton} aria-label="Sulge">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isSubmitted ? (
          <div style={styles.success}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-success)"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3 style={styles.successTitle}>Täname tellimuse eest!</h3>
            {orderNumber && (
              <p style={styles.orderNumber}>Tellimuse number: {orderNumber}</p>
            )}
            <p style={styles.successText}>
              Saatsime kinnituse Sinu e-postile. Võtame peagi ühendust!
            </p>
          </div>
        ) : items.length === 0 ? (
          <div style={styles.empty}>
            <p>Sinu ostukorv on tühi</p>
            <button onClick={closeCart} className="btn btn-primary">
              Jätka sirvimist
            </button>
          </div>
        ) : isCheckout ? (
          <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Nimi *</label>
              <input
                {...register('name', { required: 'Nimi on kohustuslik' })}
                style={styles.input}
                placeholder="Sinu nimi"
              />
              {errors.name && <span style={styles.error}>{errors.name.message}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>E-post *</label>
              <input
                {...register('email', {
                  required: 'E-post on kohustuslik',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Vigane e-posti aadress',
                  },
                })}
                type="email"
                style={styles.input}
                placeholder="sinu@email.ee"
              />
              {errors.email && <span style={styles.error}>{errors.email.message}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Telefon *</label>
              <input
                {...register('phone', { required: 'Telefon on kohustuslik' })}
                type="tel"
                style={styles.input}
                placeholder="+372 ..."
              />
              {errors.phone && <span style={styles.error}>{errors.phone.message}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Aadress *</label>
              <input
                {...register('address', { required: 'Aadress on kohustuslik' })}
                style={styles.input}
                placeholder="Tänav, maja, linn"
              />
              {errors.address && (
                <span style={styles.error}>{errors.address.message}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Märkused</label>
              <textarea
                {...register('notes')}
                style={{ ...styles.input, minHeight: '80px' }}
                placeholder="Lisainfo tellimuse kohta"
              />
            </div>

            <div style={styles.orderSummary}>
              <strong>Tellimus kokku: {totalPrice.toFixed(2)}€</strong>
            </div>

            {submitError && (
              <div style={styles.errorMessage} role="alert">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{submitError}</span>
              </div>
            )}

            <div style={styles.actions}>
              <button
                type="button"
                onClick={() => setIsCheckout(false)}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Tagasi
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? 'Saadan...' : 'Saada tellimus'}
              </button>
            </div>
          </form>
        ) : (
          <>
            <div style={styles.items}>
              {items.map((item) => (
                <div key={item.product.id} style={styles.item}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    style={styles.itemImage}
                  />
                  <div style={styles.itemInfo}>
                    <h4 style={styles.itemName}>{item.product.name}</h4>
                    <p style={styles.itemPrice}>{item.product.price.toFixed(2)}€</p>
                    <div style={styles.quantity}>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        style={styles.quantityButton}
                      >
                        -
                      </button>
                      <span style={styles.quantityValue}>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        style={styles.quantityButton}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    style={styles.removeButton}
                    aria-label="Eemalda"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div style={styles.footer}>
              <div style={styles.total}>
                <span>Kokku:</span>
                <strong>{totalPrice.toFixed(2)}€</strong>
              </div>
              <button
                onClick={() => setIsCheckout(true)}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Vormista tellimus
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1100,
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: '420px',
    backgroundColor: 'var(--color-background)',
    zIndex: 1200,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--shadow-xl)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--space-4) var(--space-6)',
    borderBottom: '1px solid var(--color-border)',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-xl)',
    margin: 0,
  },
  closeButton: {
    padding: 'var(--space-2)',
    color: 'var(--color-text)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  empty: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-4)',
    padding: 'var(--space-6)',
    textAlign: 'center',
  },
  items: {
    flex: 1,
    overflowY: 'auto',
    padding: 'var(--space-4) var(--space-6)',
  },
  item: {
    display: 'flex',
    gap: 'var(--space-4)',
    padding: 'var(--space-4) 0',
    borderBottom: '1px solid var(--color-border)',
  },
  itemImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: 'var(--radius-md)',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 'var(--text-sm)',
    fontWeight: 500,
    margin: '0 0 var(--space-1) 0',
  },
  itemPrice: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-primary)',
    margin: '0 0 var(--space-2) 0',
  },
  quantity: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
  },
  quantityButton: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'var(--color-white)',
    cursor: 'pointer',
    fontSize: 'var(--text-base)',
  },
  quantityValue: {
    minWidth: '24px',
    textAlign: 'center',
  },
  removeButton: {
    padding: 'var(--space-1)',
    color: 'var(--color-text-muted)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  footer: {
    padding: 'var(--space-4) var(--space-6)',
    borderTop: '1px solid var(--color-border)',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--space-4)',
    fontSize: 'var(--text-lg)',
  },
  form: {
    flex: 1,
    overflowY: 'auto',
    padding: 'var(--space-4) var(--space-6)',
  },
  formGroup: {
    marginBottom: 'var(--space-4)',
  },
  label: {
    display: 'block',
    fontSize: 'var(--text-sm)',
    fontWeight: 500,
    marginBottom: 'var(--space-1)',
  },
  input: {
    width: '100%',
    padding: 'var(--space-3)',
    fontSize: 'var(--text-base)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-white)',
  },
  error: {
    display: 'block',
    fontSize: 'var(--text-xs)',
    color: 'var(--color-error)',
    marginTop: 'var(--space-1)',
  },
  orderSummary: {
    padding: 'var(--space-4)',
    backgroundColor: 'var(--color-background-alt)',
    borderRadius: 'var(--radius-md)',
    marginBottom: 'var(--space-4)',
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    gap: 'var(--space-3)',
  },
  success: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-4)',
    padding: 'var(--space-6)',
    textAlign: 'center',
  },
  successTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-xl)',
    margin: 0,
  },
  successText: {
    color: 'var(--color-text-light)',
    margin: 0,
  },
  orderNumber: {
    fontWeight: 600,
    color: 'var(--color-primary)',
    margin: 0,
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    padding: 'var(--space-3) var(--space-4)',
    backgroundColor: '#FEF2F2',
    color: 'var(--color-error)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--text-sm)',
    marginBottom: 'var(--space-4)',
  },
};

// Responsive styles
const responsiveStyles = `
  @media (max-width: 480px) {
    .cart-drawer {
      max-width: 100% !important;
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = responsiveStyles;
  document.head.appendChild(style);
}

export default Cart;
