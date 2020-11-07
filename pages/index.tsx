/** @jsx jsx */
import { Box, Card, Flex, Grid, Text, jsx } from 'theme-ui'
import Link from 'next/link'
import Logo from '../src/components/Logo'

export default function Home() {
  return (
    <Grid sx={{ height: '100%' }} gap={0}>
      <Box sx={{ position: 'relative', height: '70vh' }}>
        <Box variant='mask' />
        <img
          src='/bg.jpg'
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <span
          sx={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            fontSize: '12px',
          }}
        >
          Photo by{' '}
          <a
            sx={{ color: 'text' }}
            href='https://unsplash.com/@gaellemarcel?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'
          >
            Gaelle Marcel
          </a>{' '}
          on{' '}
          <a
            sx={{ color: 'text' }}
            href='https://unsplash.com/s/photos/wheat?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'
          >
            Unsplash
          </a>
        </span>
      </Box>
      <Box p='3' sx={{ height: '100%' }}>
        <h1>
          <Flex>
            <Logo.Title />
          </Flex>
        </h1>
        <Link href='/saturday-white-bread'>
          <Card sx={{ variant: 'card', cursor: 'pointer' }}>
            <Text>Saturday white bread</Text>
          </Card>
        </Link>
      </Box>
    </Grid>
  )
}
