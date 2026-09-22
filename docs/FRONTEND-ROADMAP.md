# NoShop Frontend Roadmap

## Phase 1 - Build and integrate
- Angular 21 + TypeScript + Tailwind CSS
- Login with JWT
- HTTP interceptor
- Admin route guard
- Admin dashboard
- Product Catalog CRUD against the real backend through API Gateway
- Search, status filtering and pagination
- Simple customer catalog screen

## Phase 2 - B2C/B2B catalogue behaviour
- Test the same Angular catalog with ROLE_USER and ROLE_B2B JWTs
- Keep audience visibility enforced by the backend
- Add only the UI that the business requirement actually needs

## Phase 3 - Product images
- Use the existing Product Service presigned-upload endpoints
- Upload from Angular to S3
- Confirm image metadata through Product Service
- Render the returned CloudFront URL

## Phase 4 - Deploy both sides
- Build and containerize the Angular app
- Deploy frontend and backend separately
- Use environment-specific API base URLs
- Verify gateway, CORS, JWT and S3/CloudFront behaviour

## Phase 5 - Simulated company dev cycle
- Create a stable baseline and a separate dev environment/branch
- Introduce one controlled bug at a time
- Reproduce it from the application
- Create a realistic ticket with impact, steps and acceptance criteria
- Debug across frontend -> gateway -> service -> database/cache/Kafka where relevant
- Fix the smallest safe change
- Add a regression test
- Raise a PR, review it, merge it and redeploy

The UI stays intentionally simple so the learning focus remains on Angular fundamentals, backend integration and the development lifecycle.
