export const config: Config = {
  projectId: process.env.PROJECT_ID || "test",
  apiEndpoint: process.env.API_ENDPOINT || "http://localhost:8000"
};

interface Config {
  projectId: string;
  apiEndpoint: string;
}
