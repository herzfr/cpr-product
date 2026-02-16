export function currencyPipe(
  value: number,
  locale: string,
  currency: string = 'USD',
): string {
  if (!currency || typeof currency !== 'string') {
    throw new Error('Invalid or missing currency code.');
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(Math.round(value));
}

export function toTitleCase(str: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function getStockPriority(stock: number): string {
  if (stock <= 33) {
    return 'bg-ait-danger-50 text-ait-danger-700 border-ait-danger-200';
  } else if (stock <= 66) {
    return 'bg-ait-warning-50 text-ait-warning-700 border-ait-warning-200';
  } else {
    return 'bg-ait-success-50 text-ait-success-700 border-ait-success-200';
  }
}

export function getTypeAlertColor(
  type: 'danger' | 'warning' | 'success' | 'info',
) {
  switch (type) {
    case 'danger':
      return {
        bgbold: 'bg-ait-danger-600',
        bg: 'bg-ait-danger-100',
        text: 'text-ait-danger-600',
      };
    case 'warning':
      return {
        bgbold: 'bg-ait-warning-700',
        bg: 'bg-ait-warning-50',
        text: 'text-ait-warning-700',
      };
    case 'info':
      return {
        bgbold: 'bg-ait-primary-600',
        bg: 'bg-ait-primary-100',
        text: 'text-ait-primary-600',
      };
    case 'success':
      return {
        bgbold: 'bg-ait-success-700',
        bg: 'bg-ait-success-50',
        text: 'text-ait-success-500',
      };
  }
}
