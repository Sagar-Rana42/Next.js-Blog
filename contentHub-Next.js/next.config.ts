import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images:{ // these are getting depreciated
  //   domains:['images.unsplash.com','plus.upsplash.com']
  // }
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:"images.unsplash.com",
      },{
        protocol:'https',
        hostname:"blog.https://www.chitkara.edu.in",
      },{
        protocol:'https',
        hostname:"res.cloudinary.com"
      }
    ]
  }
};

export default nextConfig;
