/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docker needs standalone. Vercel uses its own Next.js builder.
  ...(process.env.VERCEL ? {} : { output: "standalone" }),
};

module.exports = nextConfig;
