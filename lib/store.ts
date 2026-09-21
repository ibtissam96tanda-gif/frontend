"use client";

import { create } from "zustand";
import type { CartItem, Product } from "@/lib/catalog";

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  addItem: (product: Product, color: string, colorName: string, size: string, qty?: number) => void;
  addOffer: (
    lines: { product: Product; color: string; colorName: string; size: string; unit_price: number }[]
  ) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  count: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,
  isCheckoutOpen: false,

  addItem: (product, color, colorName, size, qty = 1) => {
    const key = `${product.slug}:${color}:${size}`;
    set((state) => {
      const existing = state.items.find((i) => i.key === key);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.key === key ? { ...i, qty: Math.min(i.qty + qty, 10) } : i
          ),
          isCartOpen: true,
          isCheckoutOpen: false,
        };
      }
      return {
        items: [
          ...state.items,
          {
            key,
            slug: product.slug,
            name_ar: product.name_ar,
            color,
            color_name: colorName,
            size,
            qty,
            unit_price: product.price,
          },
        ],
        isCartOpen: true,
        isCheckoutOpen: false,
      };
    });
  },

  addOffer: (lines) => {
    set((state) => {
      let next = state.items.map((i) => ({ ...i }));
      for (const line of lines) {
        const key = `${line.product.slug}:${line.color}:${line.size}`;
        const existing = next.find((i) => i.key === key);
        if (existing) {
          existing.qty = Math.min(existing.qty + 1, 10);
        } else {
          next = [
            ...next,
            {
              key,
              slug: line.product.slug,
              name_ar: line.product.name_ar,
              color: line.color,
              color_name: line.colorName,
              size: line.size,
              qty: 1,
              unit_price: line.unit_price,
            },
          ];
        }
      }
      return { items: next, isCartOpen: true, isCheckoutOpen: false };
    });
  },

  removeItem: (key) =>
    set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

  setQty: (key, qty) =>
    set((state) => ({
      items:
        qty < 1
          ? state.items.filter((i) => i.key !== key)
          : state.items.map((i) => (i.key === key ? { ...i, qty } : i)),
    })),

  clearCart: () => set({ items: [] }),
  openCart: () => set({ isCartOpen: true, isCheckoutOpen: false }),
  closeCart: () => set({ isCartOpen: false }),
  openCheckout: () => set({ isCheckoutOpen: true, isCartOpen: false }),
  closeCheckout: () => set({ isCheckoutOpen: false }),
  count: () => get().items.reduce((s, i) => s + i.qty, 0),
  total: () => get().items.reduce((s, i) => s + i.unit_price * i.qty, 0),
}));
