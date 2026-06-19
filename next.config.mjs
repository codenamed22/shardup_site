/** @type {import('next').NextConfig} */
const nextConfig = {
  // On Vercel, serverless functions are created for each dynamic route.
  // This helps Prisma locate the generated client on the serverless layer.
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
};

export default nextConfig;
