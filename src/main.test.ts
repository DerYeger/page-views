import type { Mock } from 'vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import PageViews from '@/main'

const testPage = 'test-page.test-domain:8080/path'

// Won't actually be called
const testBackend = 'https://localhost:8080'

describe('page-views', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  describe('autoSubmitViews', () => {
    it('can be set up once', async () => {
      PageViews.autoSubmitViews({
        backendUrl: testBackend,
        trackPopState: true,
      })

      // It submits immediately
      expect(global.fetch).toBeCalledWith(`${testBackend}/localhost:3000`, {
        method: 'POST',
      })

      // It listens to pushState
      history.pushState({}, '', '/test')
      expect(global.fetch).toBeCalledWith(
        `${testBackend}/localhost:3000/test`,
        {
          method: 'POST',
        }
      )

      // It ignores a second call
      expect(global.fetch as Mock).toHaveBeenCalledTimes(2)
      PageViews.autoSubmitViews({
        backendUrl: testBackend,
      })
      expect(global.fetch as Mock).toHaveBeenCalledTimes(2)
    })
  })

  describe('submitView', () => {
    it('submits immediately', async () => {
      await PageViews.submitView(
        {
          backendUrl: testBackend,
        },
        testPage
      )
      expect(global.fetch).toBeCalledWith(`${testBackend}/${testPage}`, {
        method: 'POST',
      })
    })

    it('can be filtered', async () => {
      const filterSpy = vi.fn().mockImplementation((_: string) => false)
      await PageViews.submitView(
        {
          backendUrl: testBackend,
          filter: filterSpy,
        },
        testPage
      )
      expect(filterSpy).toBeCalledWith(testPage)
    })

    it('can be throttled', async () => {
      const submitPage = async () =>
        PageViews.submitView(
          {
            backendUrl: testBackend,
          },
          testPage
        )

      await submitPage()
      expect(global.fetch).toBeCalledWith(`${testBackend}/${testPage}`, {
        method: 'POST',
      })

      await submitPage()
      expect(global.fetch).toHaveBeenCalledOnce()
    })

    it('can be throttled', async () => {
      const throttleTime = 60 * 1000
      const submitPage = async () =>
        PageViews.submitView(
          {
            backendUrl: testBackend,
            throttle: throttleTime,
          },
          testPage
        )

      await submitPage()
      expect(global.fetch).toBeCalledWith(`${testBackend}/${testPage}`, {
        method: 'POST',
      })
      expect(global.fetch as Mock).toHaveBeenCalledOnce()

      await submitPage()
      expect(global.fetch as Mock).toHaveBeenCalledOnce()

      vi.setSystemTime(Date.now() + throttleTime + 100)
      await submitPage()
      expect(global.fetch).toBeCalledWith(`${testBackend}/${testPage}`, {
        method: 'POST',
      })
      expect(global.fetch as Mock).toBeCalledTimes(2)
    })

    it('fails silently', async () => {
      global.fetch = vi
        .fn()
        .mockImplementation(() => Promise.reject(new Error('Should be caught')))
      await PageViews.submitView(
        {
          backendUrl: testBackend,
        },
        testPage
      )
      expect(global.fetch).toBeCalledWith(`${testBackend}/${testPage}`, {
        method: 'POST',
      })
    })
  })

  describe('getViews', () => {
    const testViews = 42

    beforeEach(() => {
      global.fetch = vi.fn().mockResolvedValue({
        text: () => Promise.resolve(testViews.toString()),
      })
    })

    it('submits immediately', async () => {
      const views = await PageViews.getViews(
        {
          backendUrl: testBackend,
          filter: () => true,
        },
        testPage
      )
      expect(views).toEqual(testViews)
      expect(global.fetch).toBeCalledWith(`${testBackend}/${testPage}`, {
        method: 'GET',
      })
    })
  })
})
