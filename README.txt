BloodBank Pro

What this project includes
- Real authentication with JWT
- Register / login / profile update
- Forgot password with reset token flow
- Email verification token flow (real-ready, mocked until SMTP is configured)
- Mobile OTP verification flow (real-ready, mocked until SMS provider is configured)
- Blood inventory search
- Nearby donor search with distance
- Blood request creation and tracking
- Request statuses: pending, approved, rejected, completed
- Donor availability toggle with eligibility lock
- Admin inventory add / update / delete
- Admin user block / unblock / delete
- Admin charts and dashboards
- Notifications
- Contact links and legal pages
- Map integration with Leaflet
- Receipt PDF download with jsPDF
- Dark / light mode
- Toasts and loader

Default seeded accounts
- Admin: admin@bloodbank.com / Admin@123
- Manager: manager@bloodbank.com / Manager@123
- Donor: donor@bloodbank.com / Donor@123
- Acceptor: acceptor@bloodbank.com / Acceptor@123

Setup
1. Copy .env.example to .env
2. Put your MongoDB URI in .env
3. Run:
   npm install
   npm run seed
   npm run dev
4. Open http://localhost:5000

Important note
- Email verification currently logs tokens and also returns them in API response for demo use.
- Mobile OTP currently logs OTP and also returns it in API response for demo use.
- To make those truly live, connect SMTP and an SMS provider like Twilio in production.
