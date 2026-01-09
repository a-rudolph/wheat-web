import { appRouter } from './api/trpc/[trpc]'
import BasicLayout from '@/layouts/BasicLayout'
import { createServerSideHelpers } from '@trpc/react-query/server'
import type { InferGetStaticPropsType } from 'next'
import RecipeList from '@/components/RecipeList'
import superjson from 'superjson'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

const Home = ({ recipes }: HomeProps) => {
  return (
    <BasicLayout.Card>
      <RecipeList recipes={recipes} />
    </BasicLayout.Card>
  )
}

export const getStaticProps = async () => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  })

  const data = await helpers['get-all-recipes'].fetch()

  return {
    props: {
      recipes: data.recipes,
    },
  }
}

export default Home
