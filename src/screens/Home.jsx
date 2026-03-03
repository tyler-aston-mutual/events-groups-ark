import { useState } from 'react'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { EventCard } from '../components/EventCard'
import { Heading3, Chip } from '../design-system'
import { useTheme } from '../design-system/context/ThemeProvider'

const FILTERS = ['For You', 'Joined']

const FEATURED_EVENTS = [
  {
    id: 1,
    title: 'Blind Speed Dating',
    image: 'https://images.unsplash.com/photo-1529543544282-ea61407b3569?w=400&h=400&fit=crop',
    date: 'February 20, 2026 - 19:00',
    location: 'Virtual Speed Dating Session',
    going: 1032,
    tag: 'Mutual Event',
    featured: true,
  },
  {
    id: 2,
    title: 'Y Mountain Group Hike',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=400&fit=crop',
    date: 'February 23, 2026 - 10:00',
    location: 'Y Mountain Trailhead',
    going: 18,
    featured: true,
  },
  {
    id: 3,
    title: 'Singles Pickleball Tournament',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop',
    date: 'February 27, 2026 - 14:00',
    location: 'Lehi Pickleball Courts',
    going: 12,
    group: { name: 'Provo Pickleball', membersOnly: false },
    featured: true,
  },
  {
    id: 4,
    title: 'Temple Square Lights Walk',
    image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=400&h=400&fit=crop',
    date: 'March 8, 2026 - 19:30',
    location: 'Temple Square, SLC',
    going: 32,
    group: { name: 'SLC Singles', membersOnly: false },
    featured: true,
  },
]

const UPCOMING_EVENTS = [
  {
    id: 5,
    title: 'Karaoke Night',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
    date: 'February 26, 2026 - 20:00',
    location: 'Velour Music Gallery',
    going: 8,
  },
  {
    id: 6,
    title: "Trivia Night at Guru's",
    image: 'https://images.unsplash.com/photo-1577702112390-17c1987bd5ac?w=400&h=400&fit=crop',
    date: 'February 28, 2026 - 19:00',
    location: "Guru's Cafe",
    going: 10,
  },
]

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

      {/* Content area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        backgroundColor: colors.grey50,
      }}>
        {/* Featured section */}
        <div style={{ padding: '16px 16px 8px' }}>
          <div style={{
            fontSize: 14,
            fontWeight: 500,
            color: colors.grey400,
            marginBottom: 10,
            fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Featured
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FEATURED_EVENTS.map(event => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>

        {/* Upcoming section */}
        <div style={{ padding: '8px 16px 16px' }}>
          <div style={{
            fontSize: 14,
            fontWeight: 500,
            color: colors.grey400,
            marginBottom: 10,
            fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Upcoming
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {UPCOMING_EVENTS.map(event => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </div>

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
