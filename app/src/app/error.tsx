'use client'

import { useEffect } from 'react'
import { GeneralError } from '@/components/features/errors/general-error'

export default function Error({
  error,
  reset: _reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <GeneralError />
}

