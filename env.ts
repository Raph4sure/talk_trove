import { env as loadEnv } from 'custom-env'
import z from 'zod'

process.env.APP_STAGE = process.env.APP_STAGE || 'dev';

const isDevelopment = process.env.APP_STAGE === 'dev';
const isProduction = process.env.APP_STAGE === 'production';
const isTesting = process.env.APP_STAGE === 'tes';

if (isDevelopment) {
    loadEnv()
} else {
    loadEnv('test')
}

const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    APP_STAGE: z.enum(["dev", "test", "production"]).default("dev"),
    PORT: z.coerce.number().positive().default(3000),
    DATABASE_URL: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string()
    
});

export type Env = z.infer<typeof envSchema>
let env: Env

try {
    env = envSchema.parse(process.env)
} catch (e) {
    if (e instanceof z.ZodError) {
        console.log("invalid env var")
        console.error(JSON.stringify(e.flatten().fieldErrors, null, 2))

        e.issues.forEach((err)=> {
            const path = err.path.join('.')
            console.log(`${path}: ${err.message}`)
        })

        process.exit(1)

    }
    throw e
}

export const isProdEnv = () => env.APP_STAGE === "production";
export const isDevEnv = () => env.APP_STAGE === "dev";
export const isTestEnv = () => env.APP_STAGE === "test";

export { env };
export default env;
