import 'dotenv/config';
import { db } from './index';
import { users } from './schema/auth';
import { blogCategories, blogTags } from './schema/blog';
import { projectTags } from './schema/projects';
import { productCategories } from './schema/products';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { auth } from '../lib/auth';

async function seed() {
  console.log('🌱 Seeding database...\n');

  try {
    // ───────────────────────────────────────────────
    // 1. Super Admin user (bootstrap via Better Auth)
    // ───────────────────────────────────────────────
    console.log('Creating Super Admin user...');
    const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@afridrop.com';

    const existing = await db.query.users.findFirst({
      where: eq(users.email, adminEmail),
    });

    if (!existing) {
      const adminPassword =
        process.env.SEED_ADMIN_PASSWORD ?? randomBytes(12).toString('base64url');

      // Better Auth creates the user + credential account (hashed password).
      // The cookie hook can throw outside a request context — the user row is
      // still written, so we ignore that and promote the role below.
      try {
        await auth.api.signUpEmail({
          body: {
            email: adminEmail,
            password: adminPassword,
            name: 'Afridrop Admin',
            firstName: 'Afridrop',
            lastName: 'Admin',
          },
        });
      } catch {
        // ignore cookie/context errors from the non-HTTP call
      }

      await db
        .update(users)
        .set({ role: 'super_admin', emailVerified: true, isActive: true })
        .where(eq(users.email, adminEmail));

      if (!process.env.SEED_ADMIN_PASSWORD) {
        console.log('  ⚠ Generated a random admin password — save it now, it will NOT be shown again:');
        console.log(`     ${adminPassword}`);
      }
    } else {
      // Never reset an existing account's password on re-seed.
      await db.update(users).set({ isActive: true }).where(eq(users.id, existing.id));
    }
    console.log('  ✓ Super Admin user ready\n');

    // ───────────────────────────────────────────────
    // 2. Blog categories & tags (upsert)
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
    // 3. Project tags (upsert)
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
    // 4. Product categories (upsert)
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
    console.log(`\n📧 Super Admin email: ${adminEmail}`);
    console.log('   Set SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD in your env to control credentials.\n');
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
