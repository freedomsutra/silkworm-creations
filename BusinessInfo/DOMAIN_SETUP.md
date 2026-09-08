# SilkWorm Creation - Custom Domain Setup Guide

## Why a Custom Domain is Critical for SilkWorm Creation

Running a luxury handloom saree brand on a `.vercel.app` subdomain reduces buyer confidence, especially for high-ticket handcrafted items priced between ₹8,000 and ₹12,000. 

A custom domain such as **`silkwormcreation.com`** or **`silkwormcreation.in`**:
1. **Instills High Buyer Trust:** Customers purchasing heirloom sarees expect an authentic brand address on their browser address bar, invoices, and WhatsApp order confirmations.
2. **Improves Tricity & Global Organic SEO:** Google ranks custom domains higher for local search terms like *"pure linen saree store chandigarh"* or *"handloom saree showroom zirakpur"*.
3. **Enhances Social Media Ads & Conversion:** Instagram ad campaigns targeting Chandigarh, Delhi, NRI Punjabis, and diaspora buyers achieve 25–40% higher click-through and purchase conversion rates on branded domains.

---

## Recommended Domains

| Domain | Recommended Purpose | Registrar Pricing (Approx) |
|---|---|---|
| **`silkwormcreation.com`** | Primary global storefront (US, Canada, UK NRI buyers) | ₹800 - ₹1,100 / year |
| **`silkwormcreation.in`** | Primary Indian domain (ideal for local Tricity & pan-India) | ₹450 - ₹650 / year |
| **`silkwormsarees.com`** | Catch-all keyword alternative | ₹800 / year |

Registrars: GoDaddy, Namecheap, Hostinger, or Cloudflare Registrar.

---

## 3-Step Vercel Domain Configuration

Once the domain is purchased, follow these 3 simple steps to connect it to the live Vercel deployment:

### Step 1: Add Domain in Vercel Dashboard
1. Log into your Vercel account at [vercel.com/dashboard](https://vercel.com/dashboard).
2. Open the project: **`silkworm-creations`**.
3. Navigate to **Settings** > **Domains**.
4. Enter your domain (e.g. `silkwormcreation.com`) and click **Add**.
5. Vercel will prompt you to add both the root domain (`silkwormcreation.com`) and the `www` subdomain (`www.silkwormcreation.com`). Accept the recommended redirect (e.g., redirect `www.silkwormcreation.com` to `silkwormcreation.com`).

### Step 2: Configure DNS Records at your Domain Registrar
Log in to your domain registrar (GoDaddy, Namecheap, Google Domains, Hostinger) and navigate to **DNS Management / DNS Records**.

Add the following two DNS records:

#### Record 1: Root Domain (Apex)
* **Type:** `A`
* **Name / Host:** `@`
* **Value / Points To:** `76.76.21.21`
* **TTL:** `Automatic` or `3600` (1 hour)

#### Record 2: Subdomain (WWW)
* **Type:** `CNAME`
* **Name / Host:** `www`
* **Value / Points To:** `cname.vercel-dns.com`
* **TTL:** `Automatic` or `3600` (1 hour)

*(Note: If your registrar supports CNAME flattening or ALIAS/ANAME records on root, you can point `@` directly to `cname.vercel-dns.com`)*.

### Step 3: Automatic SSL & Verification
- Vercel will automatically detect the DNS propagation (usually takes 2 to 15 minutes, maximum 24 hours).
- A free, auto-renewing **Let's Encrypt Wildcard SSL Certificate** will be issued automatically by Vercel.
- Once verified, your status in Vercel will display a green checkmark: **`Valid Configuration`**.

---

## Post-Setup Checklist
- [ ] Test `https://silkwormcreation.com` loads securely with HTTPS lock icon.
- [ ] Test `http://silkwormcreation.com` redirects cleanly to `https://silkwormcreation.com`.
- [ ] Test `www.silkwormcreation.com` redirects seamlessly.
- [ ] Update Google Business Profile ("SilkWorm Creation - Reliance Square Zirakpur") website URL.
- [ ] Update Instagram bio link (`@silkwormcreation`) from Linktree/Vercel to `https://silkwormcreation.com`.
