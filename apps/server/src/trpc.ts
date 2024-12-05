import { initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export const createContext = async ({
    req, res
}: CreateExpressContextOptions) => {
    const { token } = req.cookies;
    return { token };
}

type TContext = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<TContext>().create();

export const router = t.router;

export const publicProcedure = t.procedure;


export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {

    if (!ctx.token) throw new TRPCError({
        code: "FORBIDDEN",
        message: "User is unauthenticated"
    })
    // const isJwtVerified = await isAuth(ctx.token);

    // if (!isJwtVerified) throw new TRPCError({
    //     code: "FORBIDDEN",
    //     message: "User is unauthenticated"
    // })

    return next();
})