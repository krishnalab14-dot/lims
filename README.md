# LIMS (Laboratory Information Management System)

Production-ready starter architecture for a full web-based LIMS with responsive dashboard UX and strict role-based security.

## Tech Stack

- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS
- **Backend API:** NestJS + TypeScript
- **Database:** PostgreSQL
- **Cache/Queue:** Redis + BullMQ
- **Auth:** JWT access/refresh tokens, secure session tracking
- **Infra:** Docker Compose (local), Terraform-ready structure for cloud

## Required Modules Covered

- Authentication & Authorization
- Forgot password flow
- Role-based access control
- Permission management
- Session management
- Password hashing
- Activity logs

## Roles

- Super Admin
- Admin
- Receptionist
- Lab Technician
- Doctor
- Accountant
- Store Manager

## Monorepo Layout

```
apps/
  web/              # Next.js responsive UI
  api/              # NestJS backend
packages/
  shared/           # Shared types/constants/role-permission matrix
infra/
  docker/           # Local development infrastructure
docs/
  architecture.md   # Detailed architecture and module breakdown
```

## Quick Start (scaffold level)

1. Install Node.js 20+ and pnpm 9+
2. Run `pnpm install`
3. Start services with `docker compose -f infra/docker/docker-compose.yml up -d`
4. Run API and web apps in separate terminals:
   - `pnpm --filter @lims/api dev`
   - `pnpm --filter @lims/web dev`


## Dashboard Module

Dashboard includes the following widgets and analytics blocks:

- Daily patient count
- Pending samples
- Pending reports
- Completed reports
- Revenue summary
- Inventory alerts
- Recent activities
- Graphs and statistics


## Patient Registration Module

Features implemented in scaffold:

- Auto-generated patient ID
- Patient registration form
- Edit/update patient details
- Patient search
- Visit history
- Gender, DOB, age calculation
- Doctor reference
- Mobile number
- Address
- Emergency contact
- Barcode/QR support

Database tables:

- `patients`
- `patient_visits`


## Billing & Transactions Module

Features implemented in scaffold:

- Test/package billing
- Invoice generation
- GST/tax support
- Discount handling
- Payment methods: Cash, Card, UPI, Insurance
- Payment status tracking
- Refund handling
- Invoice printing flow (scaffold note)
- Daily collection report

Database tables:

- `invoices`
- `invoice_items`
- `payments`


## Test Management Module

Features implemented in scaffold:

- Test category management
- Test creation
- Test parameters
- Reference ranges
- Units
- Normal values
- Test pricing
- Department management

Database tables:

- `test_categories`
- `tests`
- `test_parameters`
- `departments`


## Sample Collection Module

Features implemented in scaffold:

- Sample collection entry
- Barcode generation
- Sample tracking
- Collection status
- Sample rejection handling
- Sample transfer status
- Collection date/time

Database tables:

- `samples`
- `sample_collections`


## Laboratory Result Entry Module

Features implemented in scaffold:

- Technician result entry
- Parameter-wise result entry
- Validation rules
- Auto abnormal flag
- Approval workflow
- Doctor verification
- Remarks
- Attachments support

Workflow states:

- Pending
- In Progress
- Completed
- Verified
- Approved

Database tables:

- `test_results`
- `result_parameters`
- `result_approvals`
