"use client"

import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
  action?: React.ReactNode
}

export function useToast() {
  const toast = ({ title, description, variant, action }: ToastProps) => {
    const options = {
      description,
      action: action ? { label: "Action", onClick: () => {} } : undefined, // Simple shim
    }

    switch (variant) {
      case "destructive":
        return sonnerToast.error(title, options)
      case "success":
        return sonnerToast.success(title, options)
      default:
        return sonnerToast(title, options)
    }
  }

  return {
    toast,
    dismiss: (id?: string) => sonnerToast.dismiss(id),
  }
}

export const toast = sonnerToast