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
