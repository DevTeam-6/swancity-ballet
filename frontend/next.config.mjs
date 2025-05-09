/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE_URL: "http://flask-app:5000", // Replace with your Flask container name and port
    },
};

export default nextConfig;
