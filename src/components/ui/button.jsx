import React from 'react';

export const Button = React.forwardRef(({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-zinc-900';
  
  const variants = {
    default: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100',
    secondary: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700',
    ghost: 'hover:bg-zinc-800 hover:text-zinc-100',
    link: 'underline-offset-4 hover:underline text-zinc-100',
  };
  
  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button className={classes} ref={ref} {...props} />
  );
});
Button.displayName = 'Button';