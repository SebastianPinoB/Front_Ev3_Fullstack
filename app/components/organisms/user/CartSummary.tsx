// ~/components/organisms/user/CartSummary.tsx
import React from "react";

interface CartSummaryProps {
  subtotal: number;
  onCheckout: () => void;
  loading?: boolean; 
}

export default function CartSummary({ subtotal, onCheckout, loading = false }: CartSummaryProps) {
  const envio = 5000; 
  const total = subtotal + envio;

  return (
    <div className="bg-white dark:bg-blue-600 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Resumen de Compra</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="font-semibold">${subtotal.toLocaleString("es-CL")}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Envío:</span>
          <span className="font-semibold text-green-600">$5.000</span>
        </div>
        
        <div className="border-t pt-3 flex justify-between text-lg">
          <span className="font-bold">Total:</span>
          <span className="font-bold text-green-600">
            ${total.toLocaleString("es-CL")}
          </span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={loading}
        className={`
          w-full py-3 px-4 rounded-lg font-bold text-lg
          ${loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-[#FFE600] hover:bg-[#f5d800] text-black'
          }
          transition-colors
        `}
      >
        {loading ? 'Procesando...' : 'Finalizar Compra'}
      </button>
    </div>
  );
}