/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      swcPlugins: [
        ['next-superjson-plugin',{}]
      ]
    },
    "images": {
    "remotePatterns": [
      {
        "protocol": "https",
        "hostname": "res.cloudinary.com"  
      },
      {
        "protocol": "https",
        "hostname": "avatars.githubusercontent.com"
      },
      {
        "protocol": "https",
        "hostname": "lh3.googleusercontent.com"   // these are used to import the user images when logging with google or github 
      }
    ]
  }
  };
  
  export default nextConfig;