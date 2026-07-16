import React, { Suspense } from 'react';
import { useUIStore } from '../store/uiStore';

const Skeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
  </div>
);

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, title, description }) => {
  const { isDarkMode } = useUIStore();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {title && (
          <div className="border-b border-gray-200 dark:border-gray-700 p-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            {description && <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>}
          </div>
        )}
        <div className="p-6">
          <Suspense fallback={<Skeleton />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
};
