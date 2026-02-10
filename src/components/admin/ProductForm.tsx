'use client';

import { useActionState } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import Link from 'next/link';

interface ProductFormProps {
  action: (prevState: unknown, formData: FormData) => Promise<{ error?: string } | void>;
  editProduct?: {
    id: string;
    name: string;
    sku: string;
    price: string;
    description: string | null;
    isActive: boolean | null;
    isFeatured: boolean | null;
  } | null;
  editProductImageUrl?: string;
}

export default function ProductForm({ action, editProduct, editProductImageUrl }: ProductFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
      <form action={formAction} className="space-y-4">
        {editProduct && <input type="hidden" name="id" value={editProduct.id} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input name="name" defaultValue={editProduct?.name} required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
            <input name="sku" defaultValue={editProduct?.sku} required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (UGX)</label>
            <input name="price" type="number" step="1" defaultValue={editProduct?.price} required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex items-center gap-6 pt-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isActive" defaultChecked={editProduct?.isActive ?? true} />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isFeatured" defaultChecked={editProduct?.isFeatured ?? false} />
              Featured
            </label>
          </div>
        </div>

        <ImageUpload
          name="imageUrl"
          defaultValue={editProductImageUrl ?? ''}
          label="Product Image"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" defaultValue={editProduct?.description ?? ''} rows={4} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
        </div>

        {state && 'error' in state && state.error ? (
          <p className="text-sm text-red-600">{state.error}</p>
        ) : null}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={pending} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
            {pending ? 'Saving...' : editProduct ? 'Update Product' : 'Create Product'}
          </button>
          <Link href="/admin/products" className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
