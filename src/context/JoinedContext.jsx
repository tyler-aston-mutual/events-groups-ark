import { createContext, useContext, useState, useCallback } from 'react'

const INITIAL_JOINED = new Set([3, 4, 5])

const INITIAL_JOIN_DATES = new Map([
  [3, '02/12/2026'],
  [4, '10/15/2025'],
  [5, '01/08/2026'],
])

const JoinedContext = createContext(null)

export function JoinedProvider({ children }) {
  const [joinedIds, setJoinedIds] = useState(INITIAL_JOINED)
  const [joinDates, setJoinDates] = useState(INITIAL_JOIN_DATES)
  const [newlyJoinedId, setNewlyJoinedId] = useState(null)

  const addJoinedId = useCallback((id) => {
    setJoinedIds(prev => new Set([...prev, id]))
    const now = new Date()
    const dateStr = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${now.getFullYear()}`
    setJoinDates(prev => new Map([...prev, [id, dateStr]]))
    setNewlyJoinedId(id)
  }, [])

  const isJoined = useCallback((id) => joinedIds.has(id), [joinedIds])

  const getJoinDate = useCallback((id) => joinDates.get(id) || null, [joinDates])

  const clearNewlyJoined = useCallback(() => setNewlyJoinedId(null), [])

  return (
    <JoinedContext.Provider value={{
      joinedIds, addJoinedId, isJoined, getJoinDate, newlyJoinedId, clearNewlyJoined,
    }}>
      {children}
    </JoinedContext.Provider>
  )
}

export function useJoined() {
  const ctx = useContext(JoinedContext)
  if (!ctx) throw new Error('useJoined must be used within <JoinedProvider>')
  return ctx
}
