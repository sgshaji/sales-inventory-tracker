'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function SupabaseTestPage() {
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) setError(error.message)
      else setSessionInfo(data.session)
    }

    checkSession()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">🔍 Supabase Connection Test</h1>

      {error ? (
        <p className="text-red-600 mt-4">❌ Error: {error}</p>
      ) : sessionInfo ? (
        <div className="mt-4">
          <p className="text-green-600">✅ Active session detected</p>
          <pre className="bg-gray-100 p-4 mt-2 rounded">
            {JSON.stringify(sessionInfo, null, 2)}
          </pre>
        </div>
      ) : (
        <p className="text-gray-700 mt-4">
          ⚠️ No session found — Supabase is connected, but no user is logged in.
        </p>
      )}
    </div>
  )
}
