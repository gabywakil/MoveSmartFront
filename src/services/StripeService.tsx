// src/services/StripeService.ts
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe, PaymentMethod } from '@stripe/stripe-js';


/**
 * Configuración de Stripe
 */
export const STRIPE_CONFIG = {
  publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_51SKut9PaOt0CkVRihAr0Mzcx2Saw6rNqoMTkQCC2BJ2G2FsjGbaqL6P6cSE0RaVGqgjxLaHXHOPybfCqQdo1pwbI0098Q4Z85P',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
};

/**
 * Tipos e Interfaces
 */
export interface SavedCard {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  holderName?: string;
  isDefault: boolean;
}

export interface PaymentMethodResult {
  success: boolean;
  paymentMethod?: PaymentMethod;
  error?: string;
}

/**
 * Servicio de Stripe - Singleton
 */
class StripeService {
  private static instance: StripeService;
  private stripePromise: Promise<Stripe | null>;

  private constructor() {
    this.stripePromise = loadStripe(STRIPE_CONFIG.publicKey);
  }

  /**
   * Obtener instancia única (Singleton Pattern)
   */
  public static getInstance(): StripeService {
    if (!StripeService.instance) {
      StripeService.instance = new StripeService();
    }
    return StripeService.instance;
  }

  /**
   * Obtener instancia de Stripe
   */
  public async getStripe(): Promise<Stripe | null> {
    return await this.stripePromise;
  }

  /**
   * Guardar método de pago en el backend
   */
  public async savePaymentMethod(
    paymentMethodId: string,
    userId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // TODO: Implementar cuando tengas el backend
      console.log('💾 Guardando método de pago:', { paymentMethodId, userId });
      
      // Simular guardado exitoso por ahora
      return { success: true };
      
      /* Cuando tengas backend, usa esto:
      const response = await fetch(`${STRIPE_CONFIG.apiUrl}/payment-methods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el método de pago');
      }

      return { success: true };
      */
    } catch (error: any) {
      console.error('Error guardando método de pago:', error);
      return {
        success: false,
        error: error.message || 'Error al guardar el método de pago',
      };
    }
  }

  /**
   * Obtener métodos de pago guardados
   */
  public async getSavedCards(userId: string): Promise<SavedCard[]> {
    try {
      console.log('📋 Obteniendo tarjetas de:', userId);
      
      // Datos de ejemplo por ahora
      return [];
      
      /* Cuando tengas backend:
      const response = await fetch(`${STRIPE_CONFIG.apiUrl}/payment-methods/${userId}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener métodos de pago');
      }

      const data = await response.json();
      return data.cards || [];
      */
    } catch (error) {
      console.error('Error obteniendo tarjetas:', error);
      return [];
    }
  }

  /**
   * Eliminar método de pago
   */
  public async deletePaymentMethod(
    paymentMethodId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🗑️ Eliminando método de pago:', paymentMethodId);
      
      return { success: true };
      
      /* Cuando tengas backend:
      const response = await fetch(
        `${STRIPE_CONFIG.apiUrl}/payment-methods/${paymentMethodId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error al eliminar el método de pago');
      }

      return { success: true };
      */
    } catch (error: any) {
      console.error('Error eliminando método de pago:', error);
      return {
        success: false,
        error: error.message || 'Error al eliminar el método de pago',
      };
    }
  }

  /**
   * Validar clave pública
   */
  public isConfigured(): boolean {
    return (
      STRIPE_CONFIG.publicKey !== 'pk_test_TU_CLAVE_AQUI' &&
      STRIPE_CONFIG.publicKey.startsWith('pk_')
    );
  }
}

// Exportar instancia única
export default StripeService.getInstance();