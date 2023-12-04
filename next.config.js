

module.exports = {
    images: {
      domains: [
        "lh3.googleusercontent.com",
        "res.cloudinary.com",
      ]
    },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve = {
          ...config.resolve,
          fallback: {
            
            net: false,
            dns: false,
            tls: false,
            fs: false,
            request: false,
            child_process: false
          },
        };
      }
      return config;
    },
   
    
  };
  