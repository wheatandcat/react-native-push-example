let config: any = {
  projectId: process.env.PROJECT_ID || "test",
  apiEndpoint: process.env.API_ENDPOINT || "http://localhost:8000"
};

if (process.env.NODE_ENV === "production") {
  config = null;
}

export default config;
