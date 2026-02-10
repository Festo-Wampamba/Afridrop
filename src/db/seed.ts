import 'dotenv/config';
import { db } from './index';
import {
  users,
  roles,
  permissions,
  rolesUsers,
  permissionsRoles,
} from './schema/auth';
import { blogCategories, blogTags } from './schema/blog';
import { projectTags } from './schema/projects';
import { productCategories } from './schema/products';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('🌱 Seeding database...\n');

  try {
    // ───────────────────────────────────────────────
    // 1. Roles (upsert – safe to re-run)
    // ───────────────────────────────────────────────
    console.log('Creating roles...');
    const roleData = [
      { name: 'super_admin', description: 'Full system access' },
      { name: 'admin', description: 'Administrative access' },
      { name: 'manager', description: 'Manager access' },
      { name: 'customer', description: 'Customer access' },
    ];

    const insertedRoles = [];
    for (const role of roleData) {
      const [row] = await db
        .insert(roles)
        .values(role)
        .onConflictDoUpdate({
          target: roles.name,
          set: { description: role.description },
        })
        .returning();
      insertedRoles.push(row);
    }

    const superAdminRole = insertedRoles.find((r) => r.name === 'super_admin')!;
    console.log('  ✓ Roles ready\n');

    // ───────────────────────────────────────────────
    // 2. Permissions (upsert)
    // ───────────────────────────────────────────────
    console.log('Creating permissions...');
    const permissionsData = [
      // Blog
      { name: 'blog.create', resource: 'blog', action: 'create', description: 'Create blog posts' },
      { name: 'blog.read', resource: 'blog', action: 'read', description: 'Read blog posts' },
      { name: 'blog.update', resource: 'blog', action: 'update', description: 'Update blog posts' },
      { name: 'blog.delete', resource: 'blog', action: 'delete', description: 'Delete blog posts' },
      // Product
      { name: 'product.create', resource: 'product', action: 'create', description: 'Create products' },
      { name: 'product.read', resource: 'product', action: 'read', description: 'Read products' },
      { name: 'product.update', resource: 'product', action: 'update', description: 'Update products' },
      { name: 'product.delete', resource: 'product', action: 'delete', description: 'Delete products' },
      // Order
      { name: 'order.create', resource: 'order', action: 'create', description: 'Create orders' },
      { name: 'order.read', resource: 'order', action: 'read', description: 'Read orders' },
      { name: 'order.update', resource: 'order', action: 'update', description: 'Update orders' },
      { name: 'order.delete', resource: 'order', action: 'delete', description: 'Delete orders' },
      // User
      { name: 'user.create', resource: 'user', action: 'create', description: 'Create users' },
      { name: 'user.read', resource: 'user', action: 'read', description: 'Read users' },
      { name: 'user.update', resource: 'user', action: 'update', description: 'Update users' },
      { name: 'user.delete', resource: 'user', action: 'delete', description: 'Delete users' },
      // Quotation
      { name: 'quotation.create', resource: 'quotation', action: 'create', description: 'Create quotations' },
      { name: 'quotation.read', resource: 'quotation', action: 'read', description: 'Read quotations' },
      { name: 'quotation.update', resource: 'quotation', action: 'update', description: 'Update quotations' },
      { name: 'quotation.delete', resource: 'quotation', action: 'delete', description: 'Delete quotations' },
      // Project
      { name: 'project.create', resource: 'project', action: 'create', description: 'Create projects' },
      { name: 'project.read', resource: 'project', action: 'read', description: 'Read projects' },
      { name: 'project.update', resource: 'project', action: 'update', description: 'Update projects' },
      { name: 'project.delete', resource: 'project', action: 'delete', description: 'Delete projects' },
      // Inventory
      { name: 'inventory.create', resource: 'inventory', action: 'create', description: 'Create inventory' },
      { name: 'inventory.read', resource: 'inventory', action: 'read', description: 'Read inventory' },
      { name: 'inventory.update', resource: 'inventory', action: 'update', description: 'Update inventory' },
      { name: 'inventory.delete', resource: 'inventory', action: 'delete', description: 'Delete inventory' },
      // Settings
      { name: 'settings.read', resource: 'settings', action: 'read', description: 'Read settings' },
      { name: 'settings.update', resource: 'settings', action: 'update', description: 'Update settings' },
    ];

    const insertedPermissions = [];
    for (const perm of permissionsData) {
      const [row] = await db
        .insert(permissions)
        .values(perm)
        .onConflictDoUpdate({
          target: permissions.name,
          set: { description: perm.description },
        })
        .returning();
      insertedPermissions.push(row);
    }
    console.log(`  ✓ ${insertedPermissions.length} permissions ready\n`);

    // ───────────────────────────────────────────────
    // 3. Assign ALL permissions to super_admin role
    // ───────────────────────────────────────────────
    console.log('Assigning permissions to super_admin...');
    // Delete existing permission assignments for super_admin, then re-insert
    await db.delete(permissionsRoles).where(eq(permissionsRoles.roleId, superAdminRole.id));
    for (const perm of insertedPermissions) {
      await db
        .insert(permissionsRoles)
        .values({
          permissionId: perm.id,
          roleId: superAdminRole.id,
        });
    }
    console.log('  ✓ All permissions assigned\n');

    // ───────────────────────────────────────────────
    // 4. Super Admin user (upsert)
    // ───────────────────────────────────────────────
    console.log('Creating Super Admin user...');
    const passwordHash = await bcrypt.hash('Queenlove@2026', 12);

    const [adminUser] = await db
      .insert(users)
      .values({
        email: 'festoug2@gmail.com',
        passwordHash,
        firstName: 'Festo',
        lastName: 'Tech',
        emailVerified: true,
        isActive: true,
      })
      .onConflictDoUpdate({
        target: users.email,
        set: {
          passwordHash,
          firstName: 'Festo',
          lastName: 'Tech',
          isActive: true,
        },
      })
      .returning();
    console.log('  ✓ Super Admin user ready\n');

    // ───────────────────────────────────────────────
    // 5. Assign super_admin role to the user
    // ───────────────────────────────────────────────
    console.log('Assigning super_admin role...');
    // Delete existing role assignments for this user, then re-insert
    await db.delete(rolesUsers).where(eq(rolesUsers.userId, adminUser.id));
    await db
      .insert(rolesUsers)
      .values({
        userId: adminUser.id,
        roleId: superAdminRole.id,
      });
    console.log('  ✓ Role assigned\n');

    // ───────────────────────────────────────────────
    // 6. Blog categories & tags (upsert)
    // ───────────────────────────────────────────────
    console.log('Creating blog categories...');
    const categories = [
      { name: 'Pool Maintenance', slug: 'pool-maintenance', description: 'Tips and guides for pool maintenance' },
      { name: 'Pool Design', slug: 'pool-design', description: 'Swimming pool design ideas and trends' },
      { name: 'Company News', slug: 'company-news', description: 'Afridrop company updates and news' },
    ];
    for (const cat of categories) {
      await db.insert(blogCategories).values(cat).onConflictDoNothing();
    }

    console.log('Creating blog tags...');
    const tags = [
      { name: 'Maintenance', slug: 'maintenance' },
      { name: 'Design', slug: 'design' },
      { name: 'Tips', slug: 'tips' },
      { name: 'Tutorial', slug: 'tutorial' },
    ];
    for (const tag of tags) {
      await db.insert(blogTags).values(tag).onConflictDoNothing();
    }

    // ───────────────────────────────────────────────
    // 7. Project tags (upsert)
    // ───────────────────────────────────────────────
    console.log('Creating project tags...');
    const pTags = [
      { name: 'Residential', slug: 'residential' },
      { name: 'Commercial', slug: 'commercial' },
      { name: 'Public', slug: 'public' },
      { name: 'Luxury', slug: 'luxury' },
    ];
    for (const tag of pTags) {
      await db.insert(projectTags).values(tag).onConflictDoNothing();
    }

    // ───────────────────────────────────────────────
    // 8. Product categories (upsert)
    // ───────────────────────────────────────────────
    console.log('Creating product categories...');
    const prodCats = [
      { name: 'Pool Equipment', slug: 'pool-equipment', description: 'Pumps, filters, and pool equipment' },
      { name: 'Pool Chemicals', slug: 'pool-chemicals', description: 'Chlorine and pool treatment chemicals' },
      { name: 'Pool Accessories', slug: 'pool-accessories', description: 'Cleaning tools and accessories' },
      { name: 'Pool Parts', slug: 'pool-parts', description: 'Replacement parts for pools' },
    ];
    for (const cat of prodCats) {
      await db.insert(productCategories).values(cat).onConflictDoNothing();
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📧 Super Admin Credentials:');
    console.log('   Email: festoug2@gmail.com');
    console.log('   Password: Queenlove@2026');
    console.log('\n⚠️  Keep these credentials safe!\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
