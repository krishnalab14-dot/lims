import React from 'react';
import clsx from 'clsx';

interface KPICardProps {
  title: string;
  value: number | string;
  unit?: string;
  icon?: React.ReactNode;
  trend?: number;
  color?: 'blue' | 'green' | 'red' | 'yellow';
}

const colorClasses = {
  blue: 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700',
  green: 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700',
  red: 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700',
  yellow: 'bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700',
};

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit,
  icon,
  trend,
  color = 'blue',
}) => {
  return (
    <div className={clsx('p-4 rounded-lg border', colorClasses[color])}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            {title}
          </p>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </span>
            {unit && <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{unit}</span>}
          </div>
          {trend !== undefined && (
            <p className={clsx('text-xs mt-1', trend > 0 ? 'text-green-600' : 'text-red-600')}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        {icon && <div className="text-3xl opacity-20">{icon}</div>}
      </div>
    </div>
  );
};
