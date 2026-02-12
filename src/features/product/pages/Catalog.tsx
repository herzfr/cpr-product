import { DataTable } from '@/components/shared/table';
import { useProduct } from '../hook/product/useProduct';
import { Plus } from 'lucide-react';
import { DialogData } from '@/components/shared/dialog';
import ProductForm from '../components/Form';

export default function CatalogPage() {
  const {
    products,
    categories,
    isLoading,
    error,
    columns,
    chooseCategory,
    search,
    filter,
    openDialog,
    setChooseCategory,
    handleView,
    handleClickRow,
    handleClickSort,
    handleSearch,
    closeDialog,
  } = useProduct();

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-ait-neutral-50 rounded-lg">
        <h3 className="text-ait-h3-semibold text-ait-neutral-900">Products</h3>
        <p className="text-ait-body-lg-regular text-ait-neutral-600">
          Track and manage your product, stock, and etc...
        </p>
      </div>

      {/* Table Product */}
      <div className="bg-white rounded-xl border border-ait-neutral-200 shadow-sm overflow-hidden">
        <DataTable
          data={products}
          columns={columns}
          onRowClick={handleView}
          onRowClickType={handleClickRow}
          onSortChange={handleClickSort}
          onSearchChange={handleSearch}
          onCategoryChange={setChooseCategory}
          enablePagination
          enableSorting
          enableFiltering
          enableRowSelection
          pageSize={filter.limit ?? 10}
          searchPlaceholder="Search product..."
          searchValue={search}
          chooseCategory={chooseCategory}
          categories={categories}
          actions={[
            {
              label: 'Create Product',
              variant: 'primary' as const,
              className:
                'cursor-pointer border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:text-slate-900 active:bg-neutral-100 text-white',
              onClick: () => console.log('Sort by'),
              icon: <Plus className="w-4 h-4" />,
            },
          ]}
        />
      </div>

      <DialogData
        title="Create Product"
        isOpen={openDialog}
        isShowButtonTrigger={false}
        component={<ProductForm />} // Inject form here
        onClose={closeDialog} // Handle close dialog
      />
    </div>
  );
}
