import { Input } from '@/components/ui/Input';
import {
  SimpleSelect,
  type SimpleSelectOption,
} from '@/components/ui/SimpleSelect';
import type { Category } from '@/features/product/types';
import { Search } from 'lucide-react';
import type { Action } from '../types';
import { Button } from '@/components/ui/Button';
import { type MouseEvent } from 'react';

interface FilterProps {
  searchValue?: string;
  searchPlaceholder?: string;
  categories?: Category[];
  chooseCategory?: Category | null;
  onSearchChange: (search: string) => void;
  onCategoryChange: (cat: Category | undefined) => void;
  actions?: Action[];
}

export function Filter({
  searchValue,
  searchPlaceholder,
  categories,
  chooseCategory,
  onSearchChange,
  onCategoryChange,
  actions,
}: FilterProps) {
  const mappingCategories = () => {
    return categories?.map((item) => ({
      value: item.slug,
      label: item.name,
    })) as SimpleSelectOption[];
  };

  const handleCategoryChange = (value: string) => {
    if (value === 'all') {
      onCategoryChange(undefined); // For 'all', set the category to null
    } else {
      const selectedCategory = categories?.find((cat) => cat.slug === value);
      onCategoryChange(selectedCategory || undefined); // Set the selected category or null if not found
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 border-b border-neutral-200">
      <div className="flex flex-1 items-center gap-4">
        <Input
          variant="box"
          className="flex-1 max-w-sm"
          value={searchValue}
          onChange={(e) => onSearchChange(e.currentTarget.value)}
          placeholder={searchPlaceholder}
          leading={<Search />}
          inputClassName="text-sm"
        />
      </div>
      <div className="flex items-center gap-2">
        {categories && (
          <SimpleSelect
            value={chooseCategory?.slug || 'all'}
            onChange={(value) => handleCategoryChange(value)}
            options={[
              { value: 'all', label: 'All Categories' },
              ...mappingCategories(),
            ]}
            placeholder="Category"
            className="w-full sm:w-40"
          />
        )}

        {actions &&
          actions?.length > 0 &&
          actions.map((m, index) => (
            <Button
              key={index}
              variant={m.variant || 'text'}
              className={m.className}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                m.onClick();
              }}
              aria-label={m.label}
            >
              {m.icon}
              {m.label}
            </Button>
          ))}
      </div>
    </div>
  );
}
