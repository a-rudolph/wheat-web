import type { AppRouter } from '@/pages/api/trpc/[trpc]'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>()
