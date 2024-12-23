interface Config {
  api: {
    host: string;
    baseUrl: string;
  };
  app: {
    name: string;
    contentMaxWidth: number;
  };
  storage: {
    authTokenKey: string;
    refreshTokenKey: string;
  };
}

const config: Config = {
  api: {
    host: import.meta.env.VITE_API_HOST || '',
    baseUrl: '',
  },
  app: {
    name: 'WeStars Fighter Admin',
    contentMaxWidth: 1200,
  },
  storage: {
    authTokenKey: 'authToken',
    refreshTokenKey: 'refreshToken',
  },
};

export default config;
