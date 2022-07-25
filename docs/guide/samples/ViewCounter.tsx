import PageViews from '@yeger/page-views'
import type { FC } from 'react'
import { useEffect, useState } from 'react'

const ViewCounter: FC = () => {
  PageViews.autoSubmitViews()

  const [pageViews, setPageViews] = useState<number>()

  useEffect(() => {
    PageViews.getViews().then(setPageViews)
  })

  if (pageViews === undefined) {
    return <span>Loading...</span>
  }

  return <span>{pageViews} views</span>
}
