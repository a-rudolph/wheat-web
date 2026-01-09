import { initTRPC, TRPCError } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { recipes } from '@/constants/recipes'
import { z } from 'zod'
import superjson from 'superjson'

// Initialize tRPC
const t = initTRPC.create({
  transformer: superjson,
})

// Create router
const router = t.router
const publicProcedure = t.procedure

export const appRouter = router({
  'get-all-recipes': publicProcedure.query(() => {
    return {
      recipes,
    }
  }),
  'get-recipe': publicProcedure
    .input(z.object({ key: z.string().nullish() }))
    .query(({ input }) => {
      const recipe = recipes.find((recipe) => recipe.key === input.key)

      if (!recipe) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Recipe not found.',
        })
      }

      return {
        recipe,
      }
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})
