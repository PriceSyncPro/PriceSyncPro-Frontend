
import { memo } from 'react';

interface AlertProps {
  type: 'error' | 'success';
  message: string;
}

const AlertMessage = memo(function AlertMessage({ type, message }: AlertProps) {
  const isError = type === 'error';
  
  return (
    <div className={`border px-4 py-3 rounded-xl text-sm font-medium ${
      isError 
        ? 'bg-red-50 border-red-200 text-red-800'
        : 'bg-green-50 border-green-200 text-green-800'
    }`}>
      <div className="flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          {isError ? (
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          ) : (
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          )}
        </svg>
        {message}
      </div>
    </div>
  );
});

export default AlertMessage;