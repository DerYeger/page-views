import { describe, expect, it, vi } from 'vitest'

import PageViews from '@/main'

const testPage = 'test-page.test-domain:8080/path'

// Won't actually be called
const testBackend = 'https://localhost:8080'

describe('page-views', () => {
  describe('autoSubmitViews', () => {
    it('submits immediately', async () => {
      const filterSpy = vi.fn().mockImplementation((_: string) => false)
      PageViews.autoSubmitViews({
        backendUrl: testBackend,
        filter: filterSpy,
        trackPopState: true,
      })
      expect(filterSpy).toBeCalledWith('localhost:3000')
    })
  })

  describe('submitView', () => {
    it('submits immediately', async () => {
      const filterSpy = vi.fn().mockImplementation((_: string) => false)
      await PageViews.submitView(
        {
          backendUrl: testBackend,
          filter: filterSpy,
          trackPopState: true,
        },
        testPage
      )
      expect(filterSpy).toBeCalledWith(testPage)
    })
  })

  describe('getViews', () => {
    it('submits immediately', async () => {
      const testViews = 42
      global.fetch = vi.fn().mockResolvedValue({
        text: () => Promise.resolve(testViews.toString()),
      })
      const views = await PageViews.getViews(
        {
          backendUrl: testBackend,
          filter: () => true,
          trackPopState: true,
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
