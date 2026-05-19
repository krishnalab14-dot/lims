# LIMS Architecture (Production-Ready)

## 1. High-Level Architecture

- **Client (Web):** Next.js app with responsive dashboard for desktop/tablet.
- **API Layer:** NestJS REST API with modular domain boundaries.
- **Data Layer:** PostgreSQL for transactional records; Redis for session/token blacklists and queues.
- **Observability:** Structured logs, audit trail, metrics endpoint.

## 2. Core Security & Auth Design

### Authentication
- Secure login/logout using email + password.
- Password hashing via Argon2id.
- JWT access token (short TTL) + refresh token (longer TTL).
- Refresh token rotation and revocation.

### Session Management
- Persist session records in DB + Redis cache.
- Track device/IP/user-agent metadata.
- Invalidate all sessions on password reset (optional configurable policy).

### Forgot Password
- Tokenized one-time reset links with strict expiration.
- Store hashed reset token in DB.
- Rate limiting by email/IP.

### Authorization
- RBAC with granular permissions.
- Route guards on backend + UI gating in frontend.
- Default deny policy for missing permission mappings.

## 3. Required Modules

### A. Authentication & Authorization Module
- Login/logout
- Refresh token endpoint
- Forgot/reset password
- Change password endpoint

### B. RBAC & Permission Module
- Role CRUD (Super Admin only)
- Permission CRUD (system-level)
- Assign role(s) to users
- Role-permission matrix

### C. Activity Log (Audit) Module
- Immutable activity logs for security events:
  - login success/failure
  - password reset requested/completed
  - role and permission changes
  - critical record edits/deletes


### D. Billing & Transactions Module
- Test/package billing
- Invoice generation
- GST/tax and discount handling
- Payment collection (cash/card/UPI/insurance)
- Payment status tracking and refund handling
- Invoice print-ready data generation
- Daily collection reports

### E. Test Management Module
- Test category management
- Test creation and test catalog maintenance
- Parameter definition with units and reference ranges
- Normal value capture
- Test pricing management
- Department management

### F. Sample Collection Module
- Sample collection entry workflow
- Barcode generation and sample tracking
- Collection status management
- Sample rejection handling with reason capture
- Sample transfer status updates
- Collection date/time logging

### G. Laboratory Result Entry Module
- Technician result entry and parameter-wise recording
- Validation rules and auto abnormal flagging
- Remarks and attachment support
- Doctor verification and approval workflow
- Workflow states: Pending, In Progress, Completed, Verified, Approved

### H. Report Printing Module
- PDF report generation and print/download flows
- Hospital/lab branding with logo support
- Doctor signature and QR verification embedding
- Report history access and delivery tracking
- Share channels: Email and WhatsApp

### I. Inventory & Stock Management Module
- Reagent stock and batch management
- Supplier master and purchase entries
- Expiry tracking and low-stock alerts
- Stock inward/outward transactions
- Stock reporting views

## 4. Roles Baseline

1. Super Admin — full system access
2. Admin — operational administration (non-system root)
3. Receptionist — patient intake/registration access
4. Lab Technician — sample processing and result entry
5. Doctor — result review and clinical access
6. Accountant — billing/invoice/report access
7. Store Manager — inventory/procurement control

## 5. Data Model (Security-Focused)

- `users`
- `roles`
- `permissions`
- `user_roles`
- `role_permissions`
- `sessions`
- `password_resets`
- `activity_logs`

## 6. Frontend UX Notes

- Responsive sidebar + top navigation.
- Role-aware menu rendering.
- Dashboard widgets vary by role.
- Tablet-first breakpoints and touch-friendly table actions.

## 7. Production Readiness Checklist

- HTTPS only, secure cookies, CSRF protection for cookie-based flows.
- Input validation (class-validator/zod) and output sanitization.
- Rate limiting and brute-force controls.
- Database backups and migration strategy.
- Centralized error handling.
- Health checks and readiness probes.

