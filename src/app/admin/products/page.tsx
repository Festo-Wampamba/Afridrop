import { db } from '@/db';
import { products, productImages } from '@/db/schema';
import { eq, desc, isNull, like } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import ProductForm from '@/components/admin/ProductForm';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function generateUniqueSlug(baseSlug: string): Promise<string> {
  const existing = await db.query.products.findFirst({ where: eq(products.slug, baseSlug) });
  if (!existing) return baseSlug;
  const similar = await db.query.products.findMany({ where: like(products.slug, `${baseSlug}%`), columns: { slug: true } });
  const slugSet = new Set(similar.map((s) => s.slug));
  let counter = 2;
  while (slugSet.has(`${baseSlug}-${counter}`)) counter++;
  return `${baseSlug}-${counter}`;
}

async function createProduct(_prevState: unknown, formData: FormData) {
  'use server';
  const session = await auth();
  if (!session) return { error: 'Unauthorized' };

  const name = formData.get('name') as string;
  const sku = formData.get('sku') as string;
  const price = formData.get('price') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const isActive = formData.get('isActive') === 'on';
  const isFeatured = formData.get('isFeatured') === 'on';

  const slug = await generateUniqueSlug(slugify(name));

  const [newProduct] = await db.insert(products).values({
    name, sku, slug,
    price, description: description || null,
    isActive, isFeatured,
    createdBy: session.user.id,
  }).returning();

  if (imageUrl) {
    await db.insert(productImages).values({
      productId: newProduct.id,
      imageUrl,
      isPrimary: true,
      altText: name,
    });
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

async function updateProduct(_prevState: unknown, formData: FormData) {
  'use server';
  const session = await auth();
  if (!session) return { error: 'Unauthorized' };

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const sku = formData.get('sku') as string;
  const price = formData.get('price') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const isActive = formData.get('isActive') === 'on';
  const isFeatured = formData.get('isFeatured') === 'on';

  const current = await db.query.products.findFirst({ where: eq(products.id, id) });
  let slug = current?.slug ?? slugify(name);
  if (current && slugify(name) !== current.slug) {
    slug = await generateUniqueSlug(slugify(name));
  }

  await db.update(products).set({
    name, sku, slug,
    price, description: description || null,
    isActive, isFeatured,
    updatedAt: new Date(),
  }).where(eq(products.id, id));

  if (imageUrl) {
    await db.delete(productImages).where(eq(productImages.productId, id));
    await db.insert(productImages).values({
      productId: id,
      imageUrl,
      isPrimary: true,
      altText: name,
    });
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

async function deleteProduct(formData: FormData) {
  'use server';
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const id = formData.get('id') as string;
  await db.update(products).set({ deletedAt: new Date(), isActive: false }).where(eq(products.id, id));
  revalidatePath('/admin/products');
}

function formatUGX(amount: string | number) {
  return `UGX ${Number(amount).toLocaleString('en-UG')}`;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; edit?: string }>;
}) {
  const params = await searchParams;
  const showCreate = params.action === 'create';
  const editId = params.edit;

  const allProducts = await db.query.products.findMany({
    where: isNull(products.deletedAt),
    with: { images: true },
    orderBy: desc(products.createdAt),
  });
  const editProduct = editId ? allProducts.find((p) => p.id === editId) : null;
  const editProductImage = editProduct?.images?.find((i) => i.isPrimary) ?? editProduct?.images?.[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products Management</h2>
          <p className="text-gray-500 text-sm mt-1">{allProducts.length} products</p>
        </div>
        {!showCreate && !editProduct && (
          <Link href="/admin/products?action=create" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
            + Add Product
          </Link>
        )}
      </div>

      {(showCreate || editProduct) && (
        <ProductForm
          action={editProduct ? updateProduct : createProduct}
          editProduct={editProduct ? {
            id: editProduct.id,
            name: editProduct.name,
            sku: editProduct.sku,
            price: editProduct.price,
            description: editProduct.description,
            isActive: editProduct.isActive,
            isFeatured: editProduct.isFeatured,
          } : null}
          editProductImageUrl={editProductImage?.imageUrl}
        />
      )}

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {allProducts.map((product) => {
              const primaryImg = product.images?.find((i) => i.isPrimary) ?? product.images?.[0];
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {primaryImg ? (
                      <img src={primaryImg.imageUrl} alt={product.name} className="h-10 w-14 object-cover rounded" />
                    ) : (
                      <div className="h-10 w-14 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">No img</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      {product.isFeatured && <span className="text-xs text-orange-600">★ Featured</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{product.sku}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatUGX(product.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/products?edit=${product.id}`} className="text-sm text-blue-600 hover:text-blue-800">Edit</Link>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={product.id} />
                        <button type="submit" className="text-sm text-red-600 hover:text-red-800">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
            {allProducts.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No products yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
