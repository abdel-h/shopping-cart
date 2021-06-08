import React from "react";
import { useStore } from "../../utils/appReducer";

type Props = {
  onClick: () => void;
};

export function CartButton({ onClick }: Props) {
  const { state } = useStore();
  const { cart } = state;

  return (
    <button
      onClick={onClick}
      className="relative overflow-visible inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
    >
      {cart.length > 0 && (
        <div className="-mt-4 absolute bg-red-500 px-2 py-0.5 right-0 rounded-full text-white text-xs top-0 top-1.5">
          {cart.length}
        </div>
      )}
      View cart
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-4 h-4 ml-1"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );
}
