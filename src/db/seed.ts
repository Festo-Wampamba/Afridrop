import { db } from './index';
import { users, roles, permissions, rolesUsers, permissionsRoles } from './schema/auth';
import { blogCategories, blogTags } from './schema/blog';
import { projectTags } from './schema/projects';
import { productCategories } from './schema/products';
import bcrypt from 'bcrypt';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Create default roles
    console.log('Creating roles...');
    const [adminRole, managerRole, customerRole] = await db
      .insert(roles)
      .values([
        { name: 'super_admin', description: 'Full system access' },
        { name: 'admin', description: 'Administrative access' },
        { name: 'manager', description: 'Manager access' },
        { name: 'customer', description: 'Customer access' },
      ])
      .returning();

    // Create permissions
    console.log('Creating permissions...');
    const permissionsData = [
      // Blog permissions
      { name: 'blog.create', resource: 'blog', action: 'create', description: 'Create blog posts' },
      { name: 'blog.read', resource: 'blog', action: 'read', description: 'Read blog posts' },
      { name: 'blog.update', resource: 'blog', action: 'update', description: 'Update blog posts' },
      { name: 'blog.delete', resource: 'blog', action: 'delete', description: 'Delete blog posts' },
      
      // Product permissions
      { name: 'product.create', resource: 'product', action: 'create', description: 'Create products' },
      { name: 'product.read', resource: 'product', action: 'read', description: 'Read products' },
      { name: 'product.update', resource: 'product', action: 'update', description: 'Update products' },
      { name: 'product.delete', resource: 'product', action: 'delete', description: 'Delete products' },
      
      // Order permissions
      { name: 'order.create', resource: 'order', action: 'create', description: 'Create orders' },
      { name: 'order.read', resource: 'order', action: 'read', description: 'Read orders' },
      { name: 'order.update', resource: 'order', action: 'update', description: 'Update orders' },
      { name: 'order.delete', resource: 'order', action: 'delete', description: 'Delete orders' },
      
      // User permissions
      { name: 'user.create', resource: 'user', action: 'create', description: 'Create users' },
      { name: 'user.read', resource: 'user', action: 'read', description: 'Read users' },
      { name: 'user.update', resource: 'user', action: 'update', description: 'Update users' },
      { name: 'user.delete', resource: 'user', action: 'delete', description: 'Delete users' },
    ];

    const createdPermissions = await db
      .insert(permissions)
      .values(permissionsData)
      .returning();

    // Assign all permissions to admin role
    console.log('Assigning permissions to roles...');
    await db.insert(permissionsRoles).values(
      createdPermissions.map((permission) => ({
        permissionId: permission.id,
        roleId: adminRole!.id,
      }))
    );

    // Create default admin user
    console.log('Creating default admin user...');
    const passwordHash = await bcrypt.hash('admin123', 12);
    const [adminUser] = await db
      .insert(users)
      .values({
        email: 'admin@afridrop.com',
        passwordHash,
        firstName: 'Admin',
        lastName: 'User',
        emailVerified: true,
        isActive: true,
      })
      .returning();

    // Assign admin role to admin user
    await db.insert(rolesUsers).values({
      userId: adminUser!.id,
      roleId: adminRole!.id,
    });

    // Create blog categories
    console.log('Creating blog categories...');
    await db.insert(blogCategories).values([
      { name: 'Pool Maintenance', slug: 'pool-maintenance', description: 'Tips and guides for pool maintenance' },
      { name: 'Pool Design', slug: 'pool-design', description: 'Swimming pool design ideas and trends' },
      { name: 'Company News', slug: 'company-news', description: 'Afridrop company updates and news' },
    ]);

    // Create blog tags
    console.log('Creating blog tags...');
    await db.insert(blogTags).values([
      { name: 'Maintenance', slug: 'maintenance' },
      { name: 'Design', slug: 'design' },
      { name: 'Tips', slug: 'tips' },
      { name: 'Tutorial', slug: 'tutorial' },
    ]);

    // Create project tags
    console.log('Creating project tags...');
    await db.insert(projectTags).values([
      { name: 'Residential', slug: 'residential' },
      { name: 'Commercial', slug: 'commercial' },
      { name: 'Public', slug: 'public' },
      { name: 'Luxury', slug: 'luxury' },
    ]);

    // Create product categories
    console.log('Creating product categories...');
    await db.insert(productCategories).values([
      { name: 'Pool Equipment', slug: 'pool-equipment', description: 'Pumps, filters, and pool equipment' },
      { name: 'Pool Chemicals', slug: 'pool-chemicals', description: 'Chlorine and pool treatment chemicals' },
      { name: 'Pool Accessories', slug: 'pool-accessories', description: 'Cleaning tools and accessories' },
      { name: 'Pool Parts', slug: 'pool-parts', description: 'Replacement parts for pools' },
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('\n📧 Default Admin Credentials:');
    console.log('   Email: admin@afridrop.com');
    console.log('   Password: admin123');
    console.log('\n⚠️  Make sure to change the admin password in production!\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
