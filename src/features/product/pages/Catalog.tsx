import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import { DialogCustom } from '@/components/shared/dialog/Custom';
import { ConfirmationDialog } from '@/components/shared/dialog/Confirmation';
import type { Product } from '../types';
import type { SimpleSelectOption } from '@/components/ui/SimpleSelect';
import type { ToolbarActions } from '@/components/shared/table/components/ToolbarAction';
import type { Action } from '@/components/shared/table/types/types';
import { DataTable } from '@/components/shared/table';
import { useProduct } from '../hook/product/useProduct';
import { ProductForm } from '../components/Form';
import { ToastContainer } from '@/components/ui/Toast';

export default function CatalogPage() {
  const {
    productStore,
    productList,
    categoryList,
    columns,
    toast,
    setFilter,
    setProduct,
    setActionRow,
    setActionToolbar,
    confirmationDialog,
    retry,
  } = useProduct();

  const toolbarActions = [
    {
      id: 'create-product',
      type: 'button',
      label: 'Create Product',
      className:
        'cursor-pointer border-neutral-200 text-neutral-700 bg-ait-primary-600 hover:bg-neutral-50 hover:border-ait-primary-600 hover:text-slate-900 active:bg-neutral-100 text-white',
      icon: <Plus className="w-4 h-4" />,
      onClick: () => console.log('var(--color-slate-900)'),
    },
    {
      id: 'select-category',
      type: 'select',
      label: 'Filter',
      selected: productStore.category || 'all',
      items: [
        { value: 'all', label: 'All Categories' },
        ...((categoryList.categories?.map((item) => ({
          value: item.slug,
          label: item.name,
        })) as SimpleSelectOption[]) ?? []),
      ],
    },
  ] as ToolbarActions;

  const rowAction = [
    {
      id: 'view',
      label: 'View',
      className:
        'p-2 text-ait-neutral-500 hover:text-ait-primary-600 hover:bg-ait-primary-50 rounded-lg transition-all duration-200 hover:shadow-sm',
      icon: <Eye className="w-4 h-4" />,
    },
    {
      id: 'edit',
      label: 'Edit',
      className:
        'p-2 text-ait-neutral-500 hover:text-ait-primary-600 hover:bg-ait-primary-50 rounded-lg transition-all duration-200 hover:shadow-sm',
      icon: <Edit className="w-4 h-4" />,
    },
    {
      id: 'delete',
      label: 'Delete',
      className:
        'p-2 text-ait-neutral-500 hover:text-ait-primary-600 hover:bg-ait-primary-50 rounded-lg transition-all duration-200 hover:shadow-sm',
      icon: <Trash2 className="w-4 h-4" />,
    },
  ] as Action[];

  return (
    <div className="space-y-8">
      <div className="bg-ait-neutral-50 rounded-lg ">
        <h3 className="text-ait-h3-semibold text-ait-neutral-900">Products</h3>
        <p className="text-ait-body-lg-regular text-ait-neutral-600">
          Track and manage your product, stock, and etc...
        </p>
      </div>

      <div className="bg-white rounded-xl border border-ait-neutral-200 shadow-sm overflow-hidden">
        <DataTable<Product>
          data={productList.products}
          columns={columns}
          filter={productStore.filter}
          placeholder={{ search: 'Search product...' }}
          toolbarAction={toolbarActions}
          actions={rowAction}
          total={productList.meta.total}
          loading={productList.isFetching}
          error={productList.error}
          onFilterChange={setFilter}
          onRowClick={setProduct}
          onRowActionChange={setActionRow}
          onActionToolbar={setActionToolbar}
          onRetry={retry}
        />
      </div>

      {productStore.dialog.type === 'custom' && (
        <DialogCustom
          title={productStore.dialog.title}
          open={productStore.dialog.open}
          isLoading={productStore.dialog.waiting}
          btnConfirmText="Submit"
          component={<ProductForm />}
          onConfirm={confirmationDialog}
          onClose={() => {
            productStore.dispatch({ type: 'CLOSE_DIALOG' });
          }}
        />
      )}

      {productStore.dialog.type === 'confirmation' && (
        <ConfirmationDialog
          title={productStore.dialog.title}
          type="danger"
          btnConfirmText="Delete Product"
          message={`Are you sure you want to delete "${productStore.product?.title}"? This action cannot be undone.`}
          open={productStore.dialog.open}
          isLoading={productStore.dialog.waiting}
          onConfirm={confirmationDialog}
          onClose={() => {
            productStore.dispatch({ type: 'CLOSE_DIALOG' });
          }}
        />
      )}

      <ToastContainer toasts={toast.toasts} />
    </div>
  );
}
