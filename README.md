# Afridrop Solutions

![Afridrop Banner](/public/assets/Images/hero.png)

## 🌊 Overview

**Afridrop** is Uganda's premier provider of professional swimming pool construction, maintenance, and water treatment solutions. This modern web application serves as the digital storefront and interaction hub for our clients, offering seamless service booking, real-time project updates, and interactive design tools.

This repository contains the source code for the official Afridrop website, completely modernized and built for performance, scalability, and user experience.

---

## 🚀 Purpose

The primary goal of this platform is to revolutionize how customers interact with pool construction services in East Africa.

**Key Features:**

- **Dynamic Pool Configurator**: An interactive tool allowing users to design their dream pool, select features, and get estimated costs in real-time.
- **Client Portal**: A dedicated dashboard for clients to track their ongoing projects, view timelines, and access documents.
- **Service Management**: Detailed breakdowns of our construction process, maintenance packages, and water treatment services.
- **E-Commerce Ready**: Infrastructure for selling pool equipment and chemicals (products, cart, checkout flows).
- **Educational Blog**: A resource center for maintenance tips and industry news.

---

## 🛠️ Technology Stack

This project utilizes cutting-edge web technologies to ensure a fast, SEO-friendly, and maintainable application.

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: PostgreSQL
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [NextAuth.js](https://authjs.dev/)
- **Payment Processing**: Flutterwave

## 🔧 Troubleshooting

### Database Connection Issues

If you encounter `Tenant or user not found` or `ENETUNREACH` errors during `pnpm db:push` or `db:seed`:

1.  **Get the Correct Connection String**:
    - Go to [Supabase Dashboard](https://supabase.com/dashboard) -> Select Project -> Settings -> Database.
    - Scroll to **Connection strings**.
    - Click **"Transaction"** tab (Port 6543).
    - Copy the **ENTIRE** string.

2.  **Update .env.local**:

    ```env
    DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres"
    ```

    - Ensure your password is URL-encoded if it has special characters (e.g., `@` becomes `%40`).
    - **Crucial**: Use the "Transaction" pooler string to support IPv4 execution (fixes `ENETUNREACH`).

3.  **Run Migrations**:
    ```bash
    pnpm db:push
    pnpm db:seed
    ```

### Common Errors

- **`ENETUNREACH`**: You are likely using the direct IPv6 connection string (`db.[project].supabase.co`) on a network/environment that prefers IPv4. Switch to the pooler connection string (port 6543).
- **`Tenant or user not found`**: The project ID, region, or username format in your connection string is incorrect. Copy strictly from the "Transaction" tab in Supabase dashboard.

For a deep dive into the system architecture, database design, and security protocols, please refer to the [Technical Documentation](./TECHNICAL_DOCUMENTATION.md).

---

## 👨‍💻 Developers

Developed and Maintained by:

**Festo Wampamba**  
_Lead Software Engineer_  
[GitHub Profile](https://github.com/Festo-Wampamba)

---

## 📄 License

This project is proprietary software consisting of confidential information. Unauthorized copying, transfer, or use of this file, via any medium is strictly prohibited.
