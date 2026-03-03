import { useState } from 'react'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { Heading3, Chip } from '../design-system'
import { useTheme } from '../design-system/context/ThemeProvider'

const FILTERS = ['For You', 'Joined']

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('For You')
  const { colors } = useTheme()

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.grey0,
      overflow: 'hidden',
    }}>
      <StatusBar />

      {/* Header */}
      <div style={{
        paddingLeft: 20,
        paddingRight: 16,
        paddingTop: 10,
        backgroundColor: colors.grey0,
        flexShrink: 0,
      }}>
        {/* Title row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Heading3>Connect</Heading3>
            <Chip text="Beta" variant="accent5" size="compact" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconButton colors={colors} icon={<PlusIcon />} />
            <IconButton colors={colors} icon={<FilterIcon />} />
          </div>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 8, paddingBottom: 14 }}>
          {FILTERS.map(filter => (
            <Chip
              key={filter}
              text={filter}
              variant={activeFilter === filter ? 'primary' : 'light'}
              size="regular"
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: colors.grey100, flexShrink: 0 }} />

      {/* Content area — cards will go here */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        backgroundColor: colors.grey50,
      }} />

      <TabBar activeTab="connect" />
    </div>
  )
}

function IconButton({ colors, icon }) {
  return (
    <button style={{
      width: 36,
      height: 36,
      borderRadius: 10,
      border: `1.5px solid ${colors.grey100}`,
      backgroundColor: colors.grey0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: 0,
      flexShrink: 0,
    }}>
      {icon}
    </button>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <line x1="8" y1="2" x2="8" y2="14" />
      <line x1="2" y1="8" x2="14" y2="8" />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg width="16" height="13" viewBox="0 0 16 13" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <line x1="0"  y1="1.5"  x2="16" y2="1.5"  />
      <line x1="3"  y1="6.5"  x2="13" y2="6.5"  />
      <line x1="6"  y1="11.5" x2="10" y2="11.5" />
    </svg>
  )
}
