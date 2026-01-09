import { appRouter } from '@/pages/api/trpc/[trpc]'
import { createServerSideHelpers } from '@trpc/react-query/server'
import superjson from 'superjson'
import RecipePageClient from './RecipePageClient'

type PageProps = {
  params: Promise<{ key: string }>
}

export async function generateStaticParams() {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  })

  const data = await helpers['get-all-recipes'].fetch()

  return data.recipes.map((recipe) => ({
    key: recipe.key,
  }))
}

export default async function Page({ params }: PageProps) {
  const { key } = await params
  
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  })

  const data = await helpers['get-recipe'].fetch({ key })

  return <RecipePageClient recipe={data.recipe} />
}
