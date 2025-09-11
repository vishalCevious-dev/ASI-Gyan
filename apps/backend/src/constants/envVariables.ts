import "@dotenvx/dotenvx/config";

export enum EApplicationEnviroment {
  PRODUCTION = "PRODUCTION",
  DEVELOPMENT = "DEVELOPMENT",
}

class EnvSecret {
  public static readonly PORT: number = process.env.PORT
    ? Number(process.env.PORT)
    : 3001;
  public static readonly JWT_SECRET: string =
    process.env.JWT_SECRET || this.throwMissingEnv("JWT_SECRET");

  public static readonly DATABASE_URL: string =
    process.env.DATABASE_URL! || this.throwMissingEnv("DATABASE_URL");

  public static readonly NODE_ENV: EApplicationEnviroment =
    (process.env.NODE_ENV as EApplicationEnviroment) || this.validateNodeEnv();

  public static readonly SUPER_ADMIN_KEY: string =
    process.env.SUPER_ADMIN_KEY || this.throwMissingEnv("SUPER_ADMIN_KEY");

    public static readonly BASE_URL: string =
    process.env.BASE_URL || this.throwMissingEnv("BASE_URL");

  // Method to handle missing env variables
  private static throwMissingEnv(name: string): never {
    throw new Error(`Environment variable ${name} is missing`);
  }

  // Method to validate NODE_ENV
  private static validateNodeEnv(): EApplicationEnviroment {
    const nodeEnv = process.env.NODE_ENV as EApplicationEnviroment;
    if (!Object.values(EApplicationEnviroment).includes(nodeEnv)) {
      throw new Error(`Invalid value for NODE_ENV: ${process.env.NODE_ENV}`);
    }
    return nodeEnv;
  }
}

export default EnvSecret;
