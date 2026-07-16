# LIMS (Laboratory Information Management System) Architecture

## Overview
Enterprise-grade Cloud Laboratory Information Management System built with modern web technologies for managing laboratory workflows, sample tracking, and test result management.

## Technology Stack

### Frontend
- **Framework**: React 19.0.1
- **Build Tool**: Vite 6.2.3
- **Styling**: Tailwind CSS 4.1.14
- **UI Components**: Lucide React (icons)
- **Animations**: Motion 12.23.24
- **Routing**: React Router DOM 7.18.1

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express 4.21.2
- **Language**: TypeScript 5.8.2

### AI Integration
- **AI SDK**: Google Generative AI (@google/genai 2.4.0)
- **Authentication**: Google Auth Library 10.3.0

### Development Tools
- **Package Manager**: Bun / npm
- **Build Tool**: Vite with React plugin
- **Language**: TypeScript with strict type checking
- **CSS Framework**: Tailwind CSS with autoprefixer
- **Code Quality**: ESLint (typescript)

## Project Structure

```
.
├── src/
│   ├── main.tsx              # React entry point
│   ├── App.tsx               # Root component
│   ├── components/           # Reusable React components
│   ├── pages/                # Page components
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Utility functions
│   ├── services/             # API/Business logic services
│   └── styles/               # Global styles
├── public/                   # Static assets
├── server.js                 # Express server entry
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
├── index.html                # HTML entry point
└── .env*                     # Environment variables
```

## Core Features

### 1. **Laboratory Sample Management**
- Track samples from collection to analysis
- Maintain comprehensive sample metadata
- Support multiple test types and parameters

### 2. **Workflow Management**
- Automated laboratory workflow processing
- Status tracking for different stages
- Integration with testing protocols

### 3. **AI-Powered Insights**
- Google Generative AI integration for:
  - Data analysis and recommendations
  - Report generation
  - Anomaly detection in test results

### 4. **Real-time Dashboard**
- Live monitoring of laboratory status
- Sample status tracking
- Analytics and reporting

### 5. **User Management**
- Role-based access control
- Authentication & authorization
- User activity logging

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Frontend (React + Vite)               │
│  ├─ Dashboard                                           │
│  ├─ Sample Management                                   │
│  ├─ Test Result Viewer                                  │
│  ├─ Reports & Analytics                                 │
│  └─ AI Insights Panel                                   │
└──────────────┬──────────────────────────────────────────┘
               │ HTTP/REST API
┌──────────────▼──────────────────────────────────────────┐
│              Backend (Express + TypeScript)             │
│  ├─ Authentication Service                              │
│  ├─ Sample Management API                               │
│  ├─ Test Result Processing                              │
│  ├─ Report Generation                                   │
│  ├─ AI Integration Service                              │
│  └─ Database Service                                    │
└──────────────┬──────────────────────────────────────────┘
               │
       ┌───────┴──────────┐
       │                  │
┌──────▼─────┐  ┌──────────▼──────┐
│  Database  │  │ Google Gemini   │
│            │  │ API             │
└────────────┘  └─────────────────┘
```

## API Endpoints (To be implemented)

### Samples
- `GET /api/samples` - List all samples
- `POST /api/samples` - Create new sample
- `GET /api/samples/:id` - Get sample details
- `PUT /api/samples/:id` - Update sample
- `DELETE /api/samples/:id` - Delete sample

### Test Results
- `GET /api/tests/:sampleId` - Get tests for sample
- `POST /api/tests` - Create test record
- `PUT /api/tests/:testId` - Update test result
- `GET /api/reports/:sampleId` - Generate report

### AI Services
- `POST /api/ai/analyze` - Analyze test results
- `POST /api/ai/insights` - Generate AI insights
- `POST /api/ai/report` - Generate AI-powered report

## Authentication & Security

- **JWT Token-based authentication**
- **Google OAuth integration available**
- **Environment variables for sensitive data**
- **HTTPS enforced in production**
- **CORS configuration for API security**

## Environment Variables

Create `.env` file in project root:

```env
# Server Configuration
VITE_API_BASE_URL=http://localhost:3000
PORT=3000
NODE_ENV=development

# Google Generative AI
GOOGLE_API_KEY=your_google_api_key_here

# Database (if using external DB)
DATABASE_URL=your_database_url

# Authentication
JWT_SECRET=your_jwt_secret_key
```

## Development Workflow

### Setup
```bash
# Install dependencies
npm install
# or
bun install

# Create .env file with required variables
```

### Running Locally
```bash
# Development mode
npm run dev

# Type checking
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview

# Clean build artifacts
npm run clean
```

### Build Process
1. Vite builds React frontend to `dist/`
2. TypeScript compilation for backend (if needed)
3. Static assets optimized
4. Code splitting for optimal performance

## Database Schema (Planned)

### Tables
- **users** - User accounts and credentials
- **samples** - Laboratory samples
- **tests** - Test records linked to samples
- **results** - Detailed test results
- **reports** - Generated reports
- **audit_log** - Activity tracking

## Performance Considerations

- **Frontend Optimization**
  - React code splitting with Vite
  - Lazy loading of components
  - Image optimization
  - CSS-in-JS optimization

- **Backend Optimization**
  - Request rate limiting
  - Database query optimization
  - Caching strategies
  - API response compression

## Security Best Practices

- Input validation on all endpoints
- SQL injection prevention (parameterized queries)
- XSS protection via React's built-in sanitization
- CSRF token validation
- Secure password hashing
- Regular security audits

## Deployment

### Recommended Platforms
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, DigitalOcean, AWS
- **Database**: PostgreSQL/MongoDB (cloud providers)

### Docker Support (To be added)
```dockerfile
# Future: Dockerfile for containerized deployment
```

## Testing Strategy

- **Unit Tests**: Jest for React components and utilities
- **Integration Tests**: Testing API endpoints
- **E2E Tests**: Playwright/Cypress for user workflows

## Monitoring & Logging

- Application performance monitoring (APM)
- Error tracking and reporting
- User activity logging
- Performance metrics collection

## Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Real-time notifications (WebSocket)
- [ ] Advanced analytics dashboard
- [ ] Machine learning for result predictions
- [ ] Multi-language support
- [ ] HIPAA compliance features
- [ ] Integration with laboratory equipment APIs
- [ ] Blockchain for sample chain-of-custody

## Contributing Guidelines

1. Create feature branches from `main`
2. Follow TypeScript strict mode
3. Write meaningful commit messages
4. Submit PRs with comprehensive descriptions
5. Ensure all tests pass before merging

## Support & Documentation

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Google Generative AI Documentation](https://ai.google.dev)
- [Express Documentation](https://expressjs.com)

## License

Specify your license here

## Contact

For questions or support, contact the development team
