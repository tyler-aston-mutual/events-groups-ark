import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { EventCard } from '../components/EventCard'
import { SpeedDatingBanner } from '../components/SpeedDatingBanner'
import { Heading3, Chip } from '../design-system'
import { useTheme } from '../design-system/context/ThemeProvider'

const FILTERS = ['For You', 'Joined']

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured First' },
  { id: 'soonest', label: 'Soonest (Events Only)' },
  { id: 'newest', label: 'Newest' },
  { id: 'popular', label: 'Most Popular' },
  { id: 'nearest', label: 'Nearest' },
]

const JOINED_IDS = [3, 4, 5]

const ALL_ITEMS = [
  {
    id: 2,
    type: 'group',
    title: 'Solo Saints',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop',
    location: 'Provo, UT',
    going: 320,
    featured: true,
  },
  {
    id: 3,
    title: 'Y Mountain Group Hike',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=400&fit=crop',
    date: 'February 23, 2026 - 10:00',
    location: 'Y Mountain Trailhead',
    going: 18,
    featured: true,
  },
  {
    id: 4,
    type: 'group',
    title: 'Provo Pickleball',
    image: 'https://images.unsplash.com/photo-1526888935184-a82d2a4b7e67?w=400&h=400&fit=crop',
    location: 'Lehi, UT',
    going: 85,
    featured: true,
  },
  {
    id: 5,
    title: 'Singles Pickleball Tournament',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop',
    date: 'February 27, 2026 - 14:00',
    location: 'Lehi Pickleball Courts',
    going: 12,
    group: { name: 'Provo Pickleball', membersOnly: false },
    featured: true,
  },
  {
    id: 6,
    title: 'Temple Square Lights Walk',
    image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=400&h=400&fit=crop',
    date: 'March 8, 2026 - 19:30',
    location: 'Temple Square, SLC',
    going: 32,
    group: { name: 'SLC Singles', membersOnly: false },
    featured: true,
  },
  {
    id: 7,
    type: 'group',
    title: 'Utah Valley Hiking',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=400&fit=crop',
    location: 'Provo, UT',
    going: 210,
  },
  {
    id: 8,
    title: 'Karaoke Night',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
    date: 'February 26, 2026 - 20:00',
    location: 'Velour Music Gallery',
    going: 8,
  },
  {
    id: 9,
    type: 'group',
    title: 'Foodies',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop',
    location: 'Salt Lake City, UT',
    going: 150,
  },
  {
    id: 10,
    title: "Trivia Night at Guru's",
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
    date: 'February 28, 2026 - 19:00',
    location: "Guru's Cafe",
    going: 10,
  },
  {
    id: 11,
    type: 'group',
    title: 'Republicans',
    image: 'https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=400&h=400&fit=crop',
    location: 'Utah County, UT',
    going: 95,
  },
  {
    id: 12,
    type: 'group',
    title: 'Eagle Mountain YSA Ward',
    image: 'https://images.unsplash.com/photo-1499988921418-b7df40ff03f9?w=400&h=400&fit=crop',
    location: 'Eagle Mountain, UT',
    going: 45,
  },
]

function sortItems(items, sortId) {
  const sorted = [...items]
  switch (sortId) {
    case 'featured':
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    case 'soonest':
      return sorted
        .filter(item => item.type !== 'group' && item.date)
        .sort((a, b) => new Date(a.date.replace(/ - /, ' ')) - new Date(b.date.replace(/ - /, ' ')))
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id)
    case 'popular':
      return sorted.sort((a, b) => b.going - a.going)
    case 'nearest':
      return sorted.reverse()
    default:
      return sorted
  }
}

const FILTER_DEFAULTS = {
  showEvents: true,
  showGroups: true,
  distance: 100,
  minParticipants: '',
  maxParticipants: '',
}

function applyFilters(items, filters) {
  return items.filter(item => {
    // Type filter
    if (!filters.showEvents && item.type !== 'group') return false
    if (!filters.showGroups && item.type === 'group') return false
    // Participants filter
    const min = filters.minParticipants ? Number(filters.minParticipants) : 0
    const max = filters.maxParticipants ? Number(filters.maxParticipants) : Infinity
    if (item.going < min || item.going > max) return false
    return true
  })
}

function hasActiveFilters(filters) {
  return (
    filters.showEvents !== FILTER_DEFAULTS.showEvents ||
    filters.showGroups !== FILTER_DEFAULTS.showGroups ||
    filters.distance !== FILTER_DEFAULTS.distance ||
    filters.minParticipants !== FILTER_DEFAULTS.minParticipants ||
    filters.maxParticipants !== FILTER_DEFAULTS.maxParticipants
  )
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('For You')
  const [activeSort, setActiveSort] = useState('featured')
  const [sortOpen, setSortOpen] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const { colors } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  // Read filters from route state (set by FilterScreen on Apply)
  const filters = location.state?.filters || FILTER_DEFAULTS
  const filtersActive = hasActiveFilters(filters)

  const isJoined = activeFilter === 'Joined'
  const tabItems = isJoined
    ? ALL_ITEMS.filter(i => JOINED_IDS.includes(i.id))
    : ALL_ITEMS.filter(i => !JOINED_IDS.includes(i.id))
  const baseItems = applyFilters(tabItems, filters)
  const items = sortItems(baseItems, activeSort)
  const activeSortLabel = SORT_OPTIONS.find(o => o.id === activeSort)?.label

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
            <IconButton
              colors={colors}
              icon={<FilterIcon />}
              onClick={() => navigate('/filters', { state: { filters } })}
              badge={filtersActive}
            />
          </div>
        </div>

        {/* Filter pills + sort */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 14,
        }}>
          <div style={{ display: 'flex', gap: 8 }}>
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
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontSize: 13,
                fontWeight: 500,
                color: colors.grey600,
                fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
              }}
            >
              {activeSortLabel}
              <SortChevron color={colors.grey600} open={sortOpen} />
            </button>
            {sortOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 6,
                backgroundColor: colors.grey0,
                borderRadius: 12,
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                padding: '4px 0',
                zIndex: 10,
                minWidth: 160,
              }}>
                {SORT_OPTIONS.map(option => (
                  <button
                    key={option.id}
                    onClick={() => { setActiveSort(option.id); setSortOpen(false) }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '10px 16px',
                      background: option.id === activeSort ? colors.grey50 : 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: option.id === activeSort ? 600 : 400,
                      color: option.id === activeSort ? colors.grey1000 : colors.grey600,
                      fontFamily: "'Goldman Sans', sans-serif",
                      textAlign: 'left',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: colors.grey100, flexShrink: 0 }} />

      {/* Content area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: colors.grey50,
        }}
        onClick={() => sortOpen && setSortOpen(false)}
      >
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {!bannerDismissed && !isJoined && (
            <SpeedDatingBanner onDismiss={() => setBannerDismissed(true)} />
          )}
          {items.map(item => (
            <EventCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <TabBar activeTab="connect" />
    </div>
  )
}

function IconButton({ colors, icon, onClick, badge }) {
  return (
    <button onClick={onClick} style={{
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
      position: 'relative',
    }}>
      {icon}
      {badge && (
        <div style={{
          position: 'absolute',
          top: -3,
          right: -3,
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: colors.brandAccent5,
          border: `2px solid ${colors.grey0}`,
        }} />
      )}
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

function SortChevron({ color, open }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
      <path d="M2 4l3 3 3-3" />
    </svg>
  )
}
