import { useQuery } from '@tanstack/react-query'
import { featuredQueryOptions } from '../api/queries/catalogue'
import { Carousel } from '../components/core/Carousel'
import { FeaturedBanner } from '../components/FeaturedBanner'

export function HomePage() {
  const { data: featured } = useQuery(featuredQueryOptions)

  return (
    <div>
      {featured && (
        <Carousel
          items={featured}
          getKey={(movie) => movie.id}
          renderSlide={(movie) => <FeaturedBanner movie={movie} />}
          className="-mt-28 h-190"
        />
      )}
    </div>
  )
}
