import { HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

// ─── Button ───────────────────────────────────────────────
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
          {
            // variants
            'bg-[hsl(162,100%,40%)] text-[hsl(220,20%,5%)] hover:bg-[hsl(162,100%,45%)] shadow-lg shadow-[hsl(162,100%,40%)]/20 active:scale-[0.98]': variant === 'primary',
            'bg-[hsl(220,15%,14%)] text-[hsl(210,40%,80%)] hover:bg-[hsl(220,15%,18%)] border border-[hsl(220,15%,20%)]': variant === 'secondary',
            'text-[hsl(210,40%,70%)] hover:text-white hover:bg-[hsl(220,15%,12%)]': variant === 'ghost',
            'bg-[hsl(0,84%,60%)] text-white hover:bg-[hsl(0,84%,65%)]': variant === 'danger',
            'border border-[hsl(162,100%,40%)] text-[hsl(162,100%,40%)] hover:bg-[hsl(162,100%,40%)] hover:text-[hsl(220,20%,5%)]': variant === 'outline',
            // sizes
            'px-3 py-1.5 text-xs': size === 'sm',
            'px-4 py-2.5 text-sm': size === 'md',
            'px-6 py-3.5 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

// ─── Card ───────────────────────────────────────────────
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean
}

export function Card({ className, glow, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-[hsl(220,18%,8%)] border border-[hsl(220,15%,14%)] rounded-xl',
        glow && 'glow-green',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── Input ───────────────────────────────────────────────
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-2.5 bg-[hsl(220,15%,10%)] border rounded-lg text-sm text-white placeholder:text-[hsl(215,20%,40%)] focus:outline-none focus:ring-2 focus:ring-[hsl(162,100%,40%)] transition-all',
            error ? 'border-[hsl(0,84%,60%)]' : 'border-[hsl(220,15%,18%)] hover:border-[hsl(220,15%,24%)]',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-[hsl(0,84%,60%)]">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

// ─── Badge ───────────────────────────────────────────────
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
}

export function Badge({ variant = 'neutral', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold',
        {
          'bg-[hsl(142,76%,36%)]/15 text-[hsl(142,76%,50%)]': variant === 'success',
          'bg-[hsl(38,92%,50%)]/15 text-[hsl(38,92%,60%)]': variant === 'warning',
          'bg-[hsl(0,84%,60%)]/15 text-[hsl(0,84%,70%)]': variant === 'danger',
          'bg-[hsl(210,100%,56%)]/15 text-[hsl(210,100%,70%)]': variant === 'info',
          'bg-[hsl(220,15%,18%)] text-[hsl(215,20%,60%)]': variant === 'neutral',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// ─── ScoreRing ───────────────────────────────────────────────
export function ScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const grade = score >= 90 ? 'A' : score >= 70 ? 'B' : score >= 50 ? 'C' : score >= 30 ? 'D' : 'F'
  const color = score >= 70 ? 'hsl(162,100%,40%)' : score >= 50 ? 'hsl(38,92%,50%)' : 'hsl(0,84%,60%)'
  const pct = `${score}%`
  
  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} ${pct}, hsl(220,15%,14%) ${pct})`,
      }}
    >
      <div
        className="flex flex-col items-center justify-center rounded-full bg-[hsl(220,18%,8%)]"
        style={{ width: size - 12, height: size - 12 }}
      >
        <span className="text-white font-bold" style={{ fontSize: size * 0.28 }}>{score}</span>
        <span style={{ color, fontSize: size * 0.18, fontWeight: 700 }}>{grade}</span>
      </div>
    </div>
  )
}
