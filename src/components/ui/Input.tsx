import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className,
  icon,
  ...props
}) => {
  const id = props.id || props.name || Math.random().toString(36).substring(2, 9);
  
  return (
    <div className={cn('mb-4', fullWidth ? 'w-full' : '')}>
      {label && (
        <label 
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          id={id}
          className={cn(
            'block rounded-md border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm',
            icon ? 'pl-10' : '',
            error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '',
            fullWidth ? 'w-full' : '',
            className
          )}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;