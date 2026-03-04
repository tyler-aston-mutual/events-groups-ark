import { useState, useEffect, useCallback } from 'react'
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
    description: 'A community for single Latter-day Saints in Utah Valley. We plan weekly activities, service projects, and social events to help you meet new people and build lasting friendships.',
    createdDate: 'September 5, 2025  6:00PM',
    creator: { name: 'McKenna', age: 26, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  },
  {
    id: 3,
    title: 'Y Mountain Group Hike',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=400&fit=crop',
    date: 'February 23, 2026 - 10:00',
    location: 'Y Mountain Trailhead',
    going: 18,
    featured: true,
    description: 'Join us for a group hike up Y Mountain! We\'ll meet at the trailhead and take the main trail to the Y. All fitness levels welcome — we go at a comfortable pace and take plenty of breaks.',
    createdDate: 'February 10, 2026  8:30AM',
    creator: { name: 'Jordan', age: 28, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  },
  {
    id: 4,
    type: 'group',
    title: 'Provo Pickleball',
    image: 'https://images.unsplash.com/photo-1526888935184-a82d2a4b7e67?w=400&h=400&fit=crop',
    location: 'Lehi, UT',
    going: 85,
    featured: true,
    description: 'Weekly pickleball meetups around Utah County. All skill levels welcome! We play at various courts and host tournaments monthly.',
    createdDate: 'October 12, 2025  7:30PM',
    creator: { name: 'Jordan', age: 28, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
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
    description: 'Casual doubles tournament for singles! We\'ll mix up partners each round so you get to meet everyone. Beginners and experienced players alike — come have fun and maybe find a doubles partner for life.',
    createdDate: 'February 15, 2026  12:00PM',
    creator: { name: 'Tanner', age: 24, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop' },
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
    description: 'Evening stroll around Temple Square to enjoy the lights and good company. We\'ll grab hot chocolate afterward at a nearby cafe. Great way to meet people in a relaxed setting.',
    createdDate: 'February 20, 2026  3:00PM',
    creator: { name: 'Emily', age: 25, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  },
  {
    id: 7,
    type: 'group',
    title: 'Utah Valley Hiking',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=400&fit=crop',
    location: 'Provo, UT',
    going: 210,
    description: 'Exploring the best trails in Utah Valley together. We organize group hikes every weekend ranging from easy canyon walks to challenging summit scrambles. New members always welcome!',
    createdDate: 'August 15, 2025  9:00AM',
    creator: { name: 'Dallin', age: 27, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  },
  {
    id: 8,
    title: 'Karaoke Night',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
    date: 'February 26, 2026 - 20:00',
    location: 'Velour Music Gallery',
    going: 8,
    description: 'Sing your heart out at Velour! Whether you\'re a shower singer or the next American Idol, come join us for a fun night of karaoke, laughs, and meeting new friends.',
    createdDate: 'February 18, 2026  5:00PM',
    creator: { name: 'Bri', age: 23, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
  },
  {
    id: 9,
    type: 'group',
    title: 'Foodies',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop',
    location: 'Salt Lake City, UT',
    going: 150,
    description: 'For people who love trying new restaurants and cooking together. We do group dinners at local spots, potlucks, and cooking classes. Come hungry, leave with new friends.',
    createdDate: 'July 22, 2025  6:30PM',
    creator: { name: 'Sophie', age: 26, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop' },
  },
  {
    id: 10,
    title: "Trivia Night at Guru's",
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
    date: 'February 28, 2026 - 19:00',
    location: "Guru's Cafe",
    going: 10,
    description: "Team trivia at Guru's Cafe! We'll form teams of 4-5 and compete for bragging rights. Topics range from pop culture to church history. No trivia experience required — just bring your brain.",
    createdDate: 'February 19, 2026  11:00AM',
    creator: { name: 'Ethan', age: 29, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  },
  {
    id: 11,
    type: 'group',
    title: 'Republicans',
    image: 'https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=400&h=400&fit=crop',
    location: 'Utah County, UT',
    going: 95,
    description: 'A group for politically engaged young adults who lean conservative. We host watch parties, discussion nights, and volunteer for local campaigns together.',
    createdDate: 'November 1, 2025  4:00PM',
    creator: { name: 'Tyler', age: 30, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
  },
  {
    id: 12,
    type: 'group',
    title: 'Eagle Mountain YSA Ward',
    image: 'https://images.unsplash.com/photo-1499988921418-b7df40ff03f9?w=400&h=400&fit=crop',
    location: 'Eagle Mountain, UT',
    going: 45,
    description: 'Connect with members of the Eagle Mountain YSA Ward! Stay updated on ward activities, FHE groups, and service opportunities. A great way to stay in the loop.',
    createdDate: 'January 8, 2026  10:00AM',
    creator: { name: 'Rachel', age: 24, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
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
  distance: 100,
  minParticipants: '',
  maxParticipants: '',
}

function applyFilters(items, filters, typeFilter) {
  return items.filter(item => {
    // Type filter (from pills)
    if (typeFilter === 'events' && item.type === 'group') return false
    if (typeFilter === 'groups' && item.type !== 'group') return false
    // Participants filter
    const min = filters.minParticipants ? Number(filters.minParticipants) : 0
    const max = filters.maxParticipants ? Number(filters.maxParticipants) : Infinity
    if (item.going < min || item.going > max) return false
    return true
  })
}

function hasActiveFilters(filters) {
  return (
    filters.distance !== FILTER_DEFAULTS.distance ||
    filters.minParticipants !== FILTER_DEFAULTS.minParticipants ||
    filters.maxParticipants !== FILTER_DEFAULTS.maxParticipants
  )
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('For You')
  const [typeFilter, setTypeFilter] = useState('all')
  const [activeSort, setActiveSort] = useState('featured')
  const [sortOpen, setSortOpen] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [createVisible, setCreateVisible] = useState(false)
  const { colors } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  // Read filters from route state (set by FilterScreen on Apply)
  const filters = location.state?.filters || FILTER_DEFAULTS
  const filtersActive = hasActiveFilters(filters)

  const openCreate = useCallback(() => {
    setCreateOpen(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setCreateVisible(true)))
  }, [])

  const closeCreate = useCallback(() => {
    setCreateVisible(false)
    setTimeout(() => setCreateOpen(false), 300)
  }, [])

  const isJoined = activeFilter === 'Joined'
  const tabItems = isJoined
    ? ALL_ITEMS.filter(i => JOINED_IDS.includes(i.id))
    : ALL_ITEMS.filter(i => !JOINED_IDS.includes(i.id))
  const baseItems = applyFilters(tabItems, filters, typeFilter)
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
            <IconButton colors={colors} icon={<PlusIcon />} onClick={openCreate} variant="accent" />
            <IconButton
              colors={colors}
              icon={<FilterIcon />}
              onClick={() => navigate('/filters', { state: { filters } })}
              badge={filtersActive}
            />
          </div>
        </div>

        {/* Tab pills + sort */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 8,
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

        {/* Type filter pills */}
        <div style={{ display: 'flex', gap: 8, paddingBottom: 14 }}>
          {[{ id: 'all', label: 'All' }, { id: 'events', label: 'Events' }, { id: 'groups', label: 'Groups' }].map(t => (
            <Chip
              key={t.id}
              text={t.label}
              variant={typeFilter === t.id ? 'primary' : 'light'}
              size="regular"
              onClick={() => setTypeFilter(t.id)}
            />
          ))}
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
            <div
              key={item.id}
              onClick={() => navigate(`/detail/${item.id}`, { state: { item, joined: isJoined } })}
              style={{ cursor: 'pointer' }}
            >
              <EventCard {...item} />
            </div>
          ))}
        </div>
      </div>

      <TabBar activeTab="connect" />

      {/* Create bottom sheet */}
      {createOpen && (
        <>
          {/* Scrim */}
          <div
            onClick={closeCreate}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 100,
              opacity: createVisible ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
          {/* Sheet */}
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.grey50,
            borderRadius: '20px 20px 0 0',
            padding: '24px 20px 40px',
            zIndex: 101,
            transform: createVisible ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s ease',
          }}>
            {/* Drag handle */}
            <div style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              backgroundColor: colors.grey200,
              margin: '0 auto 20px',
            }} />

            <div style={{
              fontSize: 22,
              fontWeight: 700,
              color: colors.grey1000,
              textAlign: 'center',
              fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
              marginBottom: 4,
            }}>
              Create
            </div>
            <div style={{
              fontSize: 15,
              fontWeight: 400,
              color: colors.grey400,
              textAlign: 'center',
              fontFamily: "'Goldman Sans', sans-serif",
              marginBottom: 24,
            }}>
              What would you like to create?
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <CreateOption
                colors={colors}
                icon={<CalendarCreateIcon color={colors.brandPrimary} />}
                title="Create an Event"
                description="Connect with people interested in a specific activity"
              />
              <CreateOption
                colors={colors}
                icon={<GroupCreateIcon color={colors.brandPrimary} />}
                title="Create a Group"
                description="Connect with people who share something in common with you"
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function IconButton({ colors, icon, onClick, badge, variant }) {
  const isAccent = variant === 'accent'
  return (
    <button onClick={onClick} style={{
      width: 36,
      height: 36,
      borderRadius: 10,
      border: isAccent ? 'none' : `1.5px solid ${colors.grey100}`,
      backgroundColor: isAccent ? colors.brandAccent5 : colors.grey0,
      color: isAccent ? '#FFFFFF' : 'inherit',
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

function CreateOption({ colors, icon, title, description }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: 16,
      backgroundColor: colors.grey0,
      borderRadius: 14,
      cursor: 'pointer',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: colors.grey50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 16,
          fontWeight: 700,
          color: colors.grey1000,
          fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
          marginBottom: 2,
        }}>
          {title}
        </div>
        <div style={{
          fontSize: 13,
          fontWeight: 400,
          color: colors.grey400,
          fontFamily: "'Goldman Sans', sans-serif",
          lineHeight: '17px',
        }}>
          {description}
        </div>
      </div>
      <CreateChevron color={colors.grey300} />
    </div>
  )
}

function CreateChevron({ color }) {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 1l6 6-6 6" />
    </svg>
  )
}

function CalendarCreateIcon({ color }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="16" height="14.5" rx="2" />
      <line x1="3" y1="10" x2="19" y2="10" />
      <line x1="8" y1="3" x2="8" y2="6.5" />
      <line x1="14" y1="3" x2="14" y2="6.5" />
      <circle cx="20" cy="20" r="5" fill={color} stroke={color} />
      <line x1="20" y1="17.5" x2="20" y2="22.5" stroke="white" strokeWidth="1.75" />
      <line x1="17.5" y1="20" x2="22.5" y2="20" stroke="white" strokeWidth="1.75" />
    </svg>
  )
}

function GroupCreateIcon({ color }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <path d="M2 21c0-3 3-5.5 6-5.5 1.5 0 2.8.5 3.7 1.3" />
      <path d="M16 15.5c3 0 5.5 2.5 5.5 5.5" />
      <circle cx="20" cy="20" r="5" fill={color} stroke={color} />
      <line x1="20" y1="17.5" x2="20" y2="22.5" stroke="white" strokeWidth="1.75" />
      <line x1="17.5" y1="20" x2="22.5" y2="20" stroke="white" strokeWidth="1.75" />
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
