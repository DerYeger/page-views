/* eslint-disable tsdoc/syntax */
/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'

import PageViews from '@/main'

const testPage = 'test-page.test-domain:8080/path'

// Won't actually be called
const testBackend = 'https://localhost:8080'

describe('page-views', () => {
  describe('autoSubmitViews', () => {
    it('does not throw an error', async () => {
      PageViews.autoSubmitViews({
        backendUrl: testBackend,
      })
    })
  })

  describe('submitView', () => {
    it('does not throw an error', async () => {
      await PageViews.submitView({
        backendUrl: testBackend,
      })
    })

    it('does not throw an error with override', async () => {
      await PageViews.submitView(
        {
          backendUrl: testBackend,
        },
        testPage
      )
    })
  })

  describe('getViews', () => {
    it('defaults to 0', async () => {
      expect(await PageViews.getViews()).toEqual(0)
    })
  })
})
