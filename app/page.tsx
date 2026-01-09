import { appRouter } from '@/pages/api/trpc/[trpc]'
import BasicLayout from '@/layouts/BasicLayout'
import { createServerSideHelpers } from '@trpc/react-query/server'
import RecipeList from '@/components/RecipeList'
import superjson from 'superjson'

export default async function Home() {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  })

  const data = await helpers['get-all-recipes'].fetch()

  return (
    <BasicLayout.Card>
      <RecipeList recipes={data.recipes} />
    </BasicLayout.Card>
  )
}
