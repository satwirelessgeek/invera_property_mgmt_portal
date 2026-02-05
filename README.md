This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Backend setup (Supabase + Razorpay)

1. Create a Supabase project.
2. Run the SQL in `supabase/schema.sql` (includes media captions, leads, and timeline).
3. Run the SQL in `supabase/rls.sql`.
4. Run the SQL in `supabase/storage.sql`.
5. Run the SQL in `supabase/search.sql` (lead search index).
6. Create a storage bucket named `property-media`.
7. Add these environment variables in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
EMAIL_WEBHOOK_URL=
SMS_WEBHOOK_URL=
WHATSAPP_WEBHOOK_URL=
WHATSAPP_TEMPLATE_NAME=
WHATSAPP_TEMPLATE_LANGUAGE=en
```

8. In Razorpay, create a key pair for test mode and use those values.
9. Create a Razorpay webhook pointing to `/api/payments/webhook` with the same
   webhook secret.
10. (Optional) Set `EMAIL_WEBHOOK_URL` and `SMS_WEBHOOK_URL` to receive lead
   notifications.
11. (Optional) Set `WHATSAPP_WEBHOOK_URL` for WhatsApp lead notifications.
12. (Optional) Set `WHATSAPP_TEMPLATE_NAME` and `WHATSAPP_TEMPLATE_LANGUAGE`
    for WhatsApp template payloads.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
#hi i will change here