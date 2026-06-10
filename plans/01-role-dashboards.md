# Afridrop Role-Based Dashboards — Implementation Plan

**Goal:** Every staff role owns its own dashboard, sees only what its role permits, per the company hierarchy: Super Admin > Director > Manager > (Sales Manager / Accountant / Receptionist) > Technicians. Customers keep `/portal`.

**Delivery model (user-approved):** Phased. This plan = role foundation + all 7 dashboards wired to data that **exists today**. Missing business modules (invoices, leads pipeline, appointments, time-logs, payroll, full approvals engine) ship as separate later plans; their dashboard sections render clean "Module coming" cards for now.

**Flowstep reference design:** Super Admin dashboard — fileId `f219ca84-1065-42d6-924b-ccae6c269d68`, screenId `fa6bef2e-3190-4ca7-9885-f28e8851c78c` (use `mcp__flowstep__get-screen-image` / `get-screen` to view layout + JSX).

---

## Locked Decisions (from owner, 2026-06-10)

1. **Final roles (8):** `super_admin`, `director`, `manager`, `sales_manager`, `accountant`, `receptionist`, `technician`, `customer`.
2. **Old roles:** `attendant` → renamed `technician` (data migration). Generic `admin` role **removed from code**; existing admin users get reassigned manually by Super Admin via the Users page.
3. **Director approvals** (later approvals module; Phase 3 starts with quotation approval only, since `quotations.status` already supports it): all quotations, expenses & payments, new staff accounts, purchases, project contracts, client onboarding.
4. **Finance depth:** invoices + expenses first (later plan); payroll deferred; "Payroll — coming soon" card.
5. **Job dispatch:** Manager assigns technicians (unchanged). Receptionist will only *book* appointments (later module) feeding the Manager's queue.
6. **Technician UX:** mobile-first task list + big status buttons + client contact. Map routing later.
7. **Leads:** extend `clients` table later (pipelineStage, source, estimatedValue, salesOwnerId) — NOT a separate leads table.
8. **Accounts:** migrate existing users only; Super Admin creates new staff accounts himself.

## Access Matrix (enforce in every phase)

| Role | Owns (create/edit) | Views read-only | Never sees |
|---|---|---|---|
| super_admin | settings, users, roles | everything, audit logs | — |
| director | approvals (quotations now) | all company data, revenue, staff metrics | system settings/users CRUD |
| manager | job assignment, client status, staff messages | team schedules, dept metrics | super-admin settings |
| sales_manager | leads (clients w/ status=lead), quotations | overall revenue | salaries, settings, audit logs |
| accountant | (invoices/expenses later) payments view | job statuses, client list | settings, sales pipeline detail |
| receptionist | (appointments later) basic client contact info | technician availability, contact lists | ALL financials, employee data |
| technician | own job status updates | own assigned jobs, basic client contact | ALL financials (incl. quotation amounts), other techs' jobs |

---

## Phase 0 — Discovery Findings (consolidated; verified 2026-06-10)

**Stack:** Next.js 16.1.6, better-auth 1.6.15 (admin plugin), Drizzle/Postgres (Neon), Tailwind v4 + shadcn/ui, lucide-react.

**Allowed APIs / patterns (copy these, do not invent):**
- Role list: `src/lib/permissions.ts:18-26` — currently `super_admin, admin, manager, attendant, customer`.
- Auth config: `src/lib/auth.ts` — `adminRoles: ["admin","super_admin"]` at lines 52 & 68; default role `customer` line 51.
- Post-login routing: `homeForRole()` in `src/lib/roles.ts:1-17`.
- Session-cookie middleware: `src/proxy.ts` (named `proxy` export, Next 16) — cookie presence check only; matcher `["/admin/:path*","/portal/:path*","/manager/:path*","/attendant/:path*","/auth/:path*"]`. Real role checks live in layouts.
- Layout role-guard pattern (COPY THIS): `src/app/manager/layout.tsx:14-22` — `getSession()` → check `session.user.role` → `redirect(homeForRole(role))`.
- Role-scoped data layer (COPY THIS): `src/lib/work.ts` — `roleOf()`, `scopedCustomerIds()` (null = unrestricted, array = manager scope via `clients.assignedManagerId`), `getJobs(scope)`, `getThreads(scope)`, `getActiveAttendants()`.
- Guarded mutations (COPY THIS): `src/lib/work-actions.ts` — `requireRole(WORK_ROLES)` + `assertJobInScope()` before every write.
- Role-specific page data: `src/app/manager/actions.ts` — `requireRole(['manager'])` per function.
- Dashboard nav component: `src/components/dashboard/ManagerNav.tsx` (sticky tabs). Admin sidebar: `src/app/admin/layout.tsx`.
- Jobs = `quotations` table (`src/db/schema/quotations.ts`), status lifecycle in `src/lib/work.ts:9-20`: `pending, assigned, in_progress, completed, verified, cancelled`; quotation approval statuses: `pending, reviewed, approved, rejected, converted`.
- Existing tables: users/sessions/accounts/verifications, clients (has `assignedManagerId`, `latitude/longitude`, `status: lead|active|inactive`), quotations(+items), orders(+items, cartItems), products(+categories/images/variants), messages, blog*, projects*, payments, inventoryStock/Transactions, **auditLogs** (`src/db/schema/payments.ts`).
- **Tables that DO NOT exist** (do not query, do not invent): invoices, payroll, expenses, leads, visitorLogs, appointments, timeLogs.

**Anti-patterns (global):**
- ❌ Never rely on `proxy.ts` for role auth — it only checks cookie existence. Every dashboard needs layout guard + `requireRole` in its data layer.
- ❌ Never select `quotations.totalAmount`/`estimatedBudget` or `payments` columns in receptionist/technician queries.
- ❌ No better-auth `accessControl` statements — project uses plain role strings + `requireRole`; keep that pattern.
- ❌ Don't scaffold pages for data that doesn't exist; render a shared `<ComingSoon module="..." />` card instead.
- UI work: invoke `ui-ux-pro-max` skill before building screens; brand colors `#009FCE` / `#00477A`; follow manager layout conventions.

---

## Phase 1 — Role Foundation & Migration

**Implement:**
1. `src/lib/permissions.ts`: replace role list with the 8 final roles (remove `admin`, `attendant`; add `director`, `sales_manager`, `accountant`, `receptionist`, `technician`).
2. `src/lib/auth.ts`: `adminRoles: ["super_admin"]` (both occurrences, lines ~52/68). Default role stays `customer`.
3. `src/lib/roles.ts` `homeForRole`: `customer→/portal`, `technician→/technician`, `manager→/manager`, `sales_manager→/sales`, `accountant→/accounts`, `receptionist→/reception`, `director→/director`, `super_admin→/admin`, default `/`.
4. `src/proxy.ts`: matcher + protected-prefix check → add `/director`, `/sales`, `/accounts`, `/reception`, `/technician`; remove `/attendant`.
5. Data migration (Drizzle migration or one-off SQL): `UPDATE users SET role='technician' WHERE role='attendant';`. Leave `admin` rows untouched — they land on `/` until Super Admin reassigns them (note this in PR description).
6. Rename route dir `src/app/attendant` → `src/app/technician`; update its layout guard to `role === 'technician'` (copy guard pattern from manager layout).
7. Scaffold stub route groups so `homeForRole` never 404s: `src/app/director`, `src/app/sales`, `src/app/accounts`, `src/app/reception` — each with layout (role guard, copy `src/app/manager/layout.tsx:14-22`) + minimal page ("dashboard coming in next phase").
8. `src/lib/work.ts`: update `Role` type; rename `getActiveAttendants` → `getActiveTechnicians` (query `role='technician'`); fix all call sites (`src/app/manager/actions.ts`, manager pages, `work-actions.ts`).
9. `src/app/admin/users/page.tsx`: assignable roles → `['director','manager','sales_manager','accountant','receptionist','technician','customer']` (super_admin still not assignable via UI).
10. Shared `src/components/dashboard/ComingSoon.tsx` card component (used by later phases).

**Verify:**
- `npm run build` passes (catches every stale `attendant`/`admin` role reference).
- `grep -rn "'attendant'" src/` → zero hits. `grep -rn "'admin'" src/lib src/app` → only legit better-auth plugin strings, no role comparisons.
- Login as each existing user type → lands on correct home; manager dashboard still works (regression).
- Direct URL to another role's dashboard redirects away (test technician → `/manager`).

**Anti-pattern guards:** don't add an `admin` fallback case in `homeForRole`; don't drop the route-rename migration for attendants; don't touch portal/customer flows.

---

## Phase 2 — Super Admin Dashboard (Flowstep design)

**Implement** (layout per Flowstep screen `fa6bef2e…` — fetch image/JSX for reference):
1. Restructure `src/app/admin/layout.tsx` sidebar: top group **Overview, Users & Roles (/admin/users), Audit Logs (/admin/audit), System Settings (/admin/settings)**; collapsible **All Data** group (Clients, Jobs, Orders, Products, Projects, Blog, Messages — existing pages unchanged). Header: role badge "Super Admin", sign out.
2. Rebuild `src/app/admin/page.tsx` overview as system-health view: cards (active users count, live sessions from `sessions` table, failed logins — see note, DB status), "Users by Role" bar chart (count users grouped by role; simple CSS/SVG bars, no chart lib unless one already installed), Quick Actions (Create User → /admin/users, Reset Password, Manage Roles), Recent Audit Logs table (from `auditLogs`).
3. New `src/app/admin/audit/page.tsx`: paginated `auditLogs` table (user, action, resource, time). super_admin-only data layer (`requireRole(['super_admin'])`).
4. **Failed logins note:** auth failures are not currently written to `auditLogs`. If trivial, add a better-auth hook/log on failed sign-in writing to `auditLogs`; otherwise omit the card — do NOT fake the number.
5. Restrict `/admin` layout guard to `super_admin` only (was admin|super_admin; `admin` role is gone).

**Verify:** build passes; super_admin sees new overview + audit page; users-by-role chart matches `SELECT role, count(*) FROM users GROUP BY role`; non-super_admin redirected from `/admin/*`.

**Anti-pattern guards:** no invented metrics (uptime/storage from the mock are decorative — skip unless real source); no new chart dependency without checking package.json first.

---

## Phase 3 — Director Dashboard (`/director`)

Macro view, read-everything, owns approvals. No daily task lists.

**Implement:**
1. `src/app/director/actions.ts` data layer, every fn `requireRole(['director','super_admin'])`:
   - `getCompanyOverview()`: total revenue (sum `payments` where status='completed'), revenue by month (last 6), active jobs count by status (quotations), orders count, clients by status.
   - `getDepartmentPerformance()`: jobs completed per technician/manager, quotation conversion (approved+converted vs total), sales (orders/mo).
   - `getPendingApprovals()`: quotations with status `pending`/`reviewed` (the only approval type that exists today).
2. `src/app/director/approvals-actions.ts`: `approveQuotation(id)` / `rejectQuotation(id)` server actions — `requireRole(['director','super_admin'])`, update `quotations.status`. Write an `auditLogs` row per decision.
3. Pages: `/director` (overview: revenue chart, active projects, dept performance cards), `/director/approvals` (pending quotations w/ approve/reject), `/director/reports` (staff metrics read-only). Nav via a `DirectorNav` copied from `ManagerNav.tsx` pattern.
4. ComingSoon cards: "Expense approvals", "Contract approvals", "Client onboarding approvals" (approvals engine = later plan).

**Verify:** director login → `/director`; approving a quotation changes status + audit row exists; director CANNOT reach `/admin/users` or `/admin/settings` (redirect); revenue figure matches manual SQL sum.

**Anti-pattern guards:** director gets NO edit access to users/settings; don't build the generic approvals table yet — quotation status only.

---

## Phase 4 — Technician Dashboard (`/technician`, mobile-first)

**Implement:**
1. `src/app/technician/actions.ts` — `requireRole(['technician'])`:
   - `getMyJobs()`: quotations where `assignedTo = session.user.id`, statuses `assigned|in_progress`, ordered by date — select ONLY: id, quotationNumber, customerName, location, projectDescription, status, client phone/address (join clients by customerId where available). **Exclude all money columns.**
   - `updateMyJobStatus(jobId, status)`: allowed transitions only `assigned→in_progress→completed`; verify `assignedTo === session.user.id` before update (copy `assertJobInScope` shape from `work-actions.ts`).
2. Page `/technician`: mobile-first single column — "My Tasks for Today" cards: client name, phone (tel: link), address, job description, big full-width status button (Start Job / Mark Complete), status badge. Completed-today section below. ComingSoon: "Map navigation", "Time logs & field notes".
3. Layout: lightweight header (no sidebar), `role === 'technician'` guard.
4. Manager terminology sweep: team page / JobsBoard / TeamGrid labels "Attendant" → "Technician".

**Verify:** technician sees only own jobs (create 2 technicians, cross-check); `grep -n "totalAmount\|estimatedBudget" src/app/technician/` → zero hits; status button transitions persist and reflect on manager's JobsBoard; page usable at 375px width.

**Anti-pattern guards:** no financial fields in any technician query/component; no other technicians' schedules; no desktop-style sidebar.

---

## Phase 5 — Sales Manager Dashboard (`/sales`)

**Implement:**
1. `src/app/sales/actions.ts` — `requireRole(['sales_manager','super_admin'])`:
   - `getLeads()`: clients where status='lead' (full edit on these); `updateLeadStatus()` mutation (lead→active = "won").
   - `getQuotationPipeline()`: quotations grouped by status (pending/reviewed/approved/rejected/converted) — this IS the pipeline until leads module lands.
   - `getRevenueReadonly()`: monthly totals from completed payments — display-only.
2. Pages: `/sales` (pipeline columns by quotation status + conversion rate + revenue card), `/sales/leads` (lead list w/ status edit), ComingSoon: "Pipeline stages & lead sources" (clients-table extension, later plan).

**Verify:** sales_manager login → `/sales`; can edit lead status, cannot reach `/admin`, `/director`, `/accounts`; `grep` confirms no users-table salary-ish or audit-log queries in `src/app/sales/`.

**Anti-pattern guards:** read-only revenue (no payment mutations); no separate leads table.

---

## Phase 6 — Accountant Dashboard (`/accounts`)

**Implement:**
1. `src/app/accounts/actions.ts` — `requireRole(['accountant','super_admin'])`:
   - `getPayments()`: payments table w/ order + customer join (table-driven, filter by status/method).
   - `getReceivables()`: orders where paymentStatus='pending' + approved/converted quotations totals.
   - `getJobStatusesReadonly()` and `getClientListReadonly()` (names/contacts, no edit).
2. Pages: `/accounts` (cash-position cards: collected this month, pending, by payment method + payments table), `/accounts/payments` (full filterable table). ComingSoon: "Invoices", "Expenses", "Payroll" (next finance plan).

**Verify:** accountant login → `/accounts`; payment totals match SQL; cannot reach `/admin/settings` or `/sales` (redirects); read-only — no mutation actions exported.

**Anti-pattern guards:** no invoices/expenses/payroll tables; no settings or pipeline access.

---

## Phase 7 — Receptionist Dashboard (`/reception`)

**Implement:**
1. `src/app/reception/actions.ts` — `requireRole(['receptionist','super_admin'])`:
   - `getContactList()`: clients — name, phone, email, address, status ONLY (no pool budget/financial joins). `updateClientContact()` for basic contact-info edits.
   - `getTechnicianAvailability()`: technicians + count of active jobs each (reuse `getActiveTechnicians` + jobs count; NO job financial detail).
   - `getRecentInquiries()`: latest inbound `messages` rows.
2. Pages: `/reception` (today panel: technician availability grid, recent inquiries, quick contact search), `/reception/contacts` (client directory). ComingSoon: "Appointments calendar", "Visitor log", "Call log" (appointments plan; bookings will feed Manager queue per decision #5).

**Verify:** receptionist login → `/reception`; `grep -n "payments\|totalAmount\|orders" src/app/reception/` → zero hits; cannot reach any other dashboard.

**Anti-pattern guards:** zero financial data; no employee personal data beyond name + active-job count; receptionist does NOT assign technicians.

---

## Phase 8 — Final Verification (whole plan)

1. `npm run build` clean.
2. Role-matrix walk: log in as one user per role (create test users via `/admin/users`) → correct home, correct nav, every cross-role URL redirects.
3. Greps: `grep -rn "'attendant'\|role === 'admin'" src/` → 0; `grep -rn "totalAmount" src/app/technician src/app/reception` → 0.
4. Data spot-checks: director revenue vs SQL; technician job isolation between two technician accounts; manager scope regression (`assignedManagerId`).
5. Confirm `auditLogs` rows written for quotation approvals and user-management actions.
6. Deploy preview → repeat role-matrix walk on Vercel preview before production.

---

## Later Plans (out of scope here, in priority order)
1. **Approvals engine** — generic approvals table (expenses, payments, purchases, contracts, staff accounts, client onboarding) + Director inbox.
2. **Invoices + expenses** module (Accountant). Payroll after.
3. **Appointments + visitor/call log** (Receptionist books → Manager assigns).
4. **Leads pipeline** — extend clients (pipelineStage, source, estimatedValue, salesOwnerId) + Sales kanban.
5. **Technician field tools** — map deep-links (lat/long exists), time-logs, field notes.
6. Flowstep designs for remaining 6 dashboards (same file `f219ca84…`, one screen per role) before each UI phase.
