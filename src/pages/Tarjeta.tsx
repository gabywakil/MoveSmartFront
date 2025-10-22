import React, { useState } from 'react';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { CreditCard, Lock, AlertCircle, CheckCircle, X } from 'lucide-react';
import StripeService from '../services/StripeService';
import './css/AgregarTarjeta.css';

// Estilos para los elementos de Stripe
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#0f172a',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#94a3b8',
      },
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444',
    },
  },
};

interface AgregarTarjetaFormProps {
  onClose: () => void;
  onSuccess: (paymentMethod: any) => void;
  userId?: string;
}

function AgregarTarjetaForm({ onClose, onSuccess, userId = 'user_123' }: AgregarTarjetaFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [cardholderName, setCardholderName] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe no está listo. Por favor recarga la página.');
      return;
    }

    if (!cardholderName.trim()) {
      setError('Por favor ingresa el nombre del titular');
      return;
    }

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardNumberElement);

    if (!cardElement) {
      setError('Error al procesar la tarjeta');
      setLoading(false);
      return;
    }

    try {
      // 1. Crear Payment Method en Stripe (Frontend - Seguro)
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: cardholderName,
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Error al procesar la tarjeta');
        setLoading(false);
        return;
      }

      console.log('✅ Payment Method creado:', paymentMethod);

      // 2. Guardar en el backend (si está habilitado)
      if (saveCard && paymentMethod) {
        const stripeService = StripeService;
        const result = await stripeService.savePaymentMethod(
          paymentMethod.id,
          userId
        );

        if (!result.success) {
          console.warn('⚠️ No se pudo guardar en el backend:', result.error);
          // Continuar de todas formas si el payment method se creó
        }
      }

      // 3. Éxito
      setSuccess(true);
      setTimeout(() => {
        onSuccess(paymentMethod);
        onClose();
      }, 1500);

    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Error al procesar la tarjeta');
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete = 
    cardholderName.trim() !== '' &&
    cardComplete.cardNumber &&
    cardComplete.cardExpiry &&
    cardComplete.cardCvc;

  return (
    <div className="agregar-tarjeta-overlay" onClick={onClose}>
      <div className="agregar-tarjeta-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} type="button">
          <X className="w-6 h-6" />
        </button>

        <div className="modal-header">
          <div className="modal-icon">
            <CreditCard className="w-8 h-8" />
          </div>
          <h2 className="modal-title">Agregar Tarjeta</h2>
          <p className="modal-subtitle">Tus datos están protegidos y encriptados</p>
        </div>

        {success ? (
          <div className="success-message">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <p className="success-text">¡Tarjeta agregada exitosamente!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="tarjeta-form">
            {/* Nombre del titular */}
            <div className="form-group">
              <label className="form-label">Nombre del Titular</label>
              <input
                type="text"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                placeholder="Como aparece en la tarjeta"
                className="form-input"
                disabled={loading}
              />
            </div>

            {/* Número de tarjeta */}
            <div className="form-group">
              <label className="form-label">Número de Tarjeta</label>
              <div className="stripe-element">
                <CardNumberElement
                  options={CARD_ELEMENT_OPTIONS}
                  onChange={(e) => setCardComplete({ ...cardComplete, cardNumber: e.complete })}
                />
              </div>
            </div>

            {/* Fecha y CVC */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Expiración</label>
                <div className="stripe-element">
                  <CardExpiryElement
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={(e) => setCardComplete({ ...cardComplete, cardExpiry: e.complete })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">CVC</label>
                <div className="stripe-element">
                  <CardCvcElement
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={(e) => setCardComplete({ ...cardComplete, cardCvc: e.complete })}
                  />
                </div>
              </div>
            </div>

            {/* Checkbox para guardar tarjeta */}
            <div className="form-checkbox">
              <input
                type="checkbox"
                id="saveCard"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
                className="checkbox-input"
              />
              <label htmlFor="saveCard" className="checkbox-label">
                Guardar esta tarjeta para futuros pagos
              </label>
            </div>

            {/* Error message */}
            {error && (
              <div className="error-message">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            {/* Security badge */}
            <div className="security-badge">
              <Lock className="w-4 h-4" />
              <span>Conexión segura encriptada SSL</span>
            </div>

            {/* Tarjetas de prueba (solo en desarrollo) */}
            {import.meta.env.DEV && (
              <div className="test-card-info">
                <p className="test-card-title">🧪 Tarjeta de prueba:</p>
                <p className="test-card-number">4242 4242 4242 4242</p>
                <p className="test-card-details">Fecha: 12/34 | CVC: 123</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="submit-btn"
              disabled={!stripe || loading || !isFormComplete}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Procesando...
                </>
              ) : (
                'Agregar Tarjeta'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// Componente principal con el Provider de Stripe
interface AgregarTarjetaProps {
  onClose: () => void;
  onSuccess: (paymentMethod: any) => void;
  userId?: string;
}

export default function AgregarTarjeta({ onClose, onSuccess, userId }: AgregarTarjetaProps) {
  const [stripePromise] = useState(() => StripeService.getStripe());

  return (
    <Elements stripe={stripePromise}>
      <AgregarTarjetaForm onClose={onClose} onSuccess={onSuccess} userId={userId} />
    </Elements>
  );
}