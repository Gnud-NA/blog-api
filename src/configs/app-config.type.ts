const NodeEnv = {
  development: 'development',
  test: 'test',
  production: 'production',
} as const;

export type NodeEnv = (typeof NodeEnv)[keyof typeof NodeEnv];

export type AppConfig = {
  port: number;
  nodeEnv: string;
};
