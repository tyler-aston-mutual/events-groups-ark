import { useState, useEffect, useCallback, Fragment } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { EventCard } from '../components/EventCard'
import { SpeedDatingBanner } from '../components/SpeedDatingBanner'
import { Heading3, Chip } from '../design-system'
import { useTheme } from '../design-system/context/ThemeProvider'
import { useJoined } from '../context/JoinedContext'

const FILTERS = ['For You', 'Yours']

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured First' },
  { id: 'soonest', label: 'Soonest (Events)' },
  { id: 'newest', label: 'Newest' },
  { id: 'popular', label: 'Most Popular' },
  { id: 'nearest', label: 'Nearest' },
]

const BASE = import.meta.env.BASE_URL

export const ALL_ITEMS = [
  {
    id: 2,
    type: 'group',
    title: 'Solo Saints',
    image: BASE + 'solo-saints-logo.png',
    imageBg: '#FFFFFF',
    location: 'Provo, UT',
    going: 320,
    featured: true,
    description: 'A community for single Latter-day Saints in Utah Valley. We plan weekly activities, service projects, and social events to help you meet new people and build lasting friendships.',
    createdDate: 'January 14, 2026  6:00PM',
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
    createdDate: 'February 27, 2026  8:30AM',
    creator: { name: 'Tyler', age: 30, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
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
    createdDate: 'February 5, 2026  7:30PM',
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
    createdDate: 'March 1, 2026  12:00PM',
    creator: { name: 'Tanner', age: 24, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop' },
  },
  {
    id: 6,
    title: 'Temple Square Lights Walk',
    image: BASE + 'placeholder_logo.png',
    imageBg: '#FFFFFF',
    date: 'March 8, 2026 - 19:30',
    location: 'Temple Square, SLC',
    going: 32,
    group: { name: 'SLC Singles', membersOnly: false },
    description: 'Evening stroll around Temple Square to enjoy the lights and good company. We\'ll grab hot chocolate afterward at a nearby cafe. Great way to meet people in a relaxed setting.',
    createdDate: 'January 30, 2026  3:00PM',
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
    createdDate: 'March 3, 2026  9:00AM',
    creator: { name: 'Dallin', age: 27, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  },
  {
    id: 8,
    title: 'Friday Date Night',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
    date: 'February 26, 2026 - 20:00',
    location: 'Velour Music Gallery',
    going: 8,
    description: 'Looking for a fun Friday night out? Come join us at Velour for a laid-back evening of good music, great people, and the perfect chance to meet someone new.',
    createdDate: 'February 12, 2026  5:00PM',
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
    createdDate: 'February 20, 2026  6:30PM',
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
    createdDate: 'February 8, 2026  11:00AM',
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
    createdDate: 'December 18, 2025  4:00PM',
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
    createdDate: 'February 25, 2026  10:00AM',
    creator: { name: 'Rachel', age: 24, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
  },
  {
    id: 13,
    title: 'Splash Summit',
    image: BASE + 'splash_summit_logo.png',
    imageBg: '#FFFFFF',
    date: 'June 14, 2026 - 11:00',
    location: 'Splash Summit Waterpark, Provo',
    going: 64,
    featured: true,
    official: true,
    description: 'A full-day YSA waterpark event at Splash Summit! Enjoy water slides, wave pools, and lazy rivers with other single adults from across the valley. Group rates and lunch included.',
    createdDate: 'January 22, 2026  9:00AM',
    creator: { name: 'Tanner', age: 24, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop' },
  },
  {
    id: 14,
    title: 'Utah Area YSA Conference',
    image: BASE + 'ysa_conference_logo.png',
    imageBg: '#FFFFFF',
    date: 'April 25, 2026 - 09:00',
    location: 'Utah Valley Convention Center',
    going: 340,
    featured: true,
    description: 'Together in Christ — the 2026 Utah Area YSA Conference. A day of speakers, workshops, music, and connection. Meet young adults from stakes across Utah in an uplifting, faith-centered setting.',
    createdDate: 'February 15, 2026  2:00PM',
    creator: { name: 'Emily', age: 25, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  },
]

function sortItems(items, sortId) {
  const sorted = [...items]
  switch (sortId) {
    case 'featured':
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    case 'soonest': {
      const events = sorted
        .filter(item => item.type !== 'group' && item.date)
        .sort((a, b) => new Date(a.date.replace(/ - /, ' ')) - new Date(b.date.replace(/ - /, ' ')))
      const groups = sorted.filter(item => item.type === 'group')
      return [...events, ...groups]
    }
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
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

function applyFilters(items, filters, showEvents, showGroups) {
  return items.filter(item => {
    // Type toggles
    if (!showEvents && item.type !== 'group') return false
    if (!showGroups && item.type === 'group') return false
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
  const [showEvents, setShowEvents] = useState(true)
  const [showGroups, setShowGroups] = useState(true)
  const [activeSort, setActiveSort] = useState('newest')
  const [sortOpen, setSortOpen] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [createBannerDismissed, setCreateBannerDismissed] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [createVisible, setCreateVisible] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState(() => {
    // Default all groups with child events to expanded
    const ids = new Set()
    ALL_ITEMS.forEach(item => {
      if (item.group?.name) {
        const parent = ALL_ITEMS.find(g => g.type === 'group' && g.title === item.group.name)
        if (parent) ids.add(parent.id)
      }
    })
    return ids
  })
  const { colors } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const { joinedIds, newlyJoinedId, clearNewlyJoined } = useJoined()

  // Auto-switch to Yours tab when returning from a join action
  useEffect(() => {
    if (location.state?.switchToYours) {
      setActiveFilter('Yours')
      window.history.replaceState({}, '')
    }
  }, [location.state?.switchToYours])

  // Clear animation flag after it plays
  useEffect(() => {
    if (newlyJoinedId && activeFilter === 'Yours') {
      const timer = setTimeout(() => clearNewlyJoined(), 600)
      return () => clearTimeout(timer)
    }
  }, [newlyJoinedId, activeFilter, clearNewlyJoined])

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

  const isYoursTab = activeFilter === 'Yours'
  const tabItems = isYoursTab
    ? ALL_ITEMS.filter(i => joinedIds.has(i.id))
    : ALL_ITEMS.filter(i => !joinedIds.has(i.id))
  const baseItems = applyFilters(tabItems, filters, showEvents, showGroups)
  const items = sortItems(baseItems, activeSort)
  const activeSortLabel = SORT_OPTIONS.find(o => o.id === activeSort)?.label

  // Build map of group title → child events for nesting
  const groupChildrenMap = {}
  const childEventIds = new Set()
  items.forEach(item => {
    if (item.group?.name) {
      const parentGroup = items.find(g => g.type === 'group' && g.title === item.group.name)
      if (parentGroup) {
        if (!groupChildrenMap[parentGroup.id]) groupChildrenMap[parentGroup.id] = []
        groupChildrenMap[parentGroup.id].push(item)
        childEventIds.add(item.id)
      }
    }
  })
  const topLevelItems = items.filter(i => !childEventIds.has(i.id))

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
            <Heading3>Social</Heading3>
            <span style={{
              fontSize: 13,
              fontWeight: 700,
              color: colors.brandAccent5,
              fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
            }}>Beta</span>
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

        {/* Primary tabs — text with underline, 50/50 width */}
        <div style={{
          display: 'flex',
          borderBottom: `1.5px solid ${colors.grey100}`,
        }}>
          {[
            { id: 'For You', label: 'Explore', Icon: ExploreIcon },
            { id: 'Yours', label: 'Joined or Interested', Icon: StartConnectingIcon },
          ].map(tab => {
            const active = activeFilter === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  paddingBottom: 10,
                  paddingTop: 10,
                  background: active ? colors.grey50 : 'none',
                  border: 'none',
                  borderBottom: `2px solid ${active ? colors.grey1000 : 'transparent'}`,
                  marginBottom: -1.5,
                  cursor: 'pointer',
                  borderRadius: '8px 8px 0 0',
                }}
              >
                <tab.Icon color={active ? colors.grey1000 : colors.grey400} />
                <span style={{
                  fontSize: 15,
                  fontWeight: active ? 700 : 500,
                  color: active ? colors.grey1000 : colors.grey400,
                  fontFamily: active ? "'Goldman Sans Bold', 'Goldman Sans', sans-serif" : "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
                  whiteSpace: 'nowrap',
                }}>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Show: toggles + sort */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, paddingBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontSize: 12,
              fontWeight: 500,
              color: colors.grey400,
              fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
              marginRight: 2,
            }}>Show:</span>
            {[
              { id: 'events', label: 'Events', active: showEvents, Icon: CalendarToggleIcon, toggle: () => { if (showEvents && showGroups) setShowEvents(false); else if (!showEvents) setShowEvents(true) } },
              { id: 'groups', label: 'Groups', active: activeSort === 'soonest' ? showGroups : showGroups, Icon: GroupToggleIcon, toggle: () => { if (activeSort === 'soonest') { setShowGroups(!showGroups) } else { if (showGroups && showEvents) setShowGroups(false); else if (!showGroups) setShowGroups(true) } } },
            ].map(t => (
              <button
                key={t.id}
                onClick={t.toggle}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '5px 10px',
                  borderRadius: 20,
                  border: `1.5px solid ${t.active ? colors.brandPrimary : colors.grey200}`,
                  backgroundColor: t.active ? `${colors.brandPrimary}14` : 'transparent',
                  cursor: 'pointer',
                  color: t.active ? colors.brandPrimary : colors.grey400,
                  fontSize: 12,
                  fontWeight: t.active ? 600 : 400,
                  fontFamily: t.active ? "'Goldman Sans Bold', 'Goldman Sans', sans-serif" : "'Goldman Sans', sans-serif",
                }}
              >
                <t.Icon color={t.active ? colors.brandPrimary : colors.grey400} />
                {t.label}
              </button>
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
                    onClick={() => {
                      setActiveSort(option.id)
                      setSortOpen(false)
                      if (option.id === 'soonest') setShowGroups(false)
                      else if (activeSort === 'soonest') setShowGroups(true)
                    }}
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
          {!bannerDismissed && !isYoursTab && (
            <SpeedDatingBanner onDismiss={() => setBannerDismissed(true)} />
          )}

          {/* "You Created" section — Yours tab only */}
          {isYoursTab && (
            <>
              <div style={{
                fontSize: 14,
                fontWeight: 700,
                color: colors.grey600,
                fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
                backgroundColor: colors.grey100,
                borderRadius: 10,
                padding: '10px 14px',
              }}>
                You Created
              </div>
              {/* Placeholder — Create Your Own banner until user creates something */}
              <div
                onClick={openCreate}
                style={{
                  position: 'relative',
                  backgroundColor: colors.grey1000,
                  borderRadius: 16,
                  padding: 16,
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 4 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{
                      fontSize: 28,
                      fontWeight: 300,
                      color: '#FFFFFF',
                      lineHeight: 1,
                      marginTop: -1,
                    }}>+</span>
                  </div>
                  <div>
                    <div style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: '#FFFFFF',
                      fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
                      lineHeight: '26px',
                    }}>
                      Create Your Own
                    </div>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.8)',
                      fontFamily: "'Goldman Sans', sans-serif",
                      marginTop: 4,
                    }}>
                      Create an event or group to connect with your community
                    </div>
                  </div>
                </div>
              </div>

              {/* "Created by Others" section header */}
              <div style={{
                fontSize: 14,
                fontWeight: 700,
                color: colors.grey600,
                fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
                backgroundColor: colors.grey100,
                borderRadius: 10,
                padding: '10px 14px',
                marginTop: 8,
              }}>
                Created by Others
              </div>
            </>
          )}

          {topLevelItems.map((item, index) => {
            const childEvents = groupChildrenMap[item.id]
            const isExpanded = expandedGroups.has(item.id)
            return (
              <Fragment key={item.id}>
              <div
                style={{
                  ...(item.id === newlyJoinedId ? {
                    animation: 'cardSlideIn 0.4s ease-out both',
                  } : {}),
                }}
              >
                <div
                  onClick={() => navigate(`/detail/${item.id}`, { state: { item, joined: joinedIds.has(item.id) } })}
                  style={{ cursor: 'pointer' }}
                >
                  <EventCard {...item} />
                </div>

                {/* Expandable child events section */}
                {childEvents && childEvents.length > 0 && (
                  <div style={{ position: 'relative' }}>
                    {/* Shadow line between parent and child */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 16,
                      right: 16,
                      height: 0,
                      boxShadow: '0 -1px 3px rgba(0,0,0,0.12)',
                    }} />
                    {/* Chevron toggle on the boundary between cards */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setExpandedGroups(prev => {
                          const next = new Set(prev)
                          if (next.has(item.id)) next.delete(item.id)
                          else next.add(item.id)
                          return next
                        })
                      }}
                      style={{
                        position: 'absolute',
                        top: -12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: colors.grey0,
                        boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      <ExpandChevron color={colors.brandPrimary} open={isExpanded} />
                    </button>

                    {isExpanded && (
                      <div style={{ paddingTop: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {childEvents.map(child => (
                          <div
                            key={child.id}
                            onClick={() => navigate(`/detail/${child.id}`, { state: { item: child, joined: joinedIds.has(child.id) } })}
                            style={{
                              position: 'relative',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              padding: 10,
                              backgroundColor: colors.grey0,
                              borderRadius: 12,
                              cursor: 'pointer',
                              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                            }}
                          >
                            <div style={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                            }}>
                              <ChildEventIcon color={colors.brandPrimary} />
                            </div>
                            <img
                              src={child.image}
                              alt={child.title}
                              style={{
                                width: 56,
                                height: 56,
                                borderRadius: 10,
                                objectFit: 'cover',
                                flexShrink: 0,
                              }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: colors.grey1000,
                                fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
                                lineHeight: '18px',
                                marginBottom: 3,
                              }}>
                                {child.title}
                              </div>
                              {child.date && (
                                <div style={{
                                  fontSize: 12,
                                  color: colors.grey600,
                                  fontFamily: "'Goldman Sans', sans-serif",
                                }}>
                                  {child.date}
                                </div>
                              )}
                              <div style={{
                                fontSize: 12,
                                color: colors.grey400,
                                fontFamily: "'Goldman Sans', sans-serif",
                              }}>
                                {child.going} interested
                              </div>
                            </div>
                            <ChevronRightSmall color={colors.grey300} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Create banner — after 5th card */}
              {index === 4 && !createBannerDismissed && !isYoursTab && (
                <div
                  onClick={openCreate}
                  style={{
                    position: 'relative',
                    backgroundColor: colors.grey1000,
                    borderRadius: 16,
                    padding: 16,
                    cursor: 'pointer',
                    marginTop: 12,
                  }}
                >
                  {/* Dismiss X */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setCreateBannerDismissed(true) }}
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: 16,
                      lineHeight: 1,
                      padding: 0,
                    }}
                  >
                    ×
                  </button>

                  {/* Content */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 4 }}>
                    {/* + Icon circle */}
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{
                        fontSize: 28,
                        fontWeight: 300,
                        color: '#FFFFFF',
                        lineHeight: 1,
                        marginTop: -1,
                      }}>+</span>
                    </div>
                    <div>
                      <div style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: '#FFFFFF',
                        fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
                        lineHeight: '26px',
                      }}>
                        Create Your Own
                      </div>
                      <div style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.8)',
                        fontFamily: "'Goldman Sans', sans-serif",
                        marginTop: 4,
                      }}>
                        Create an event or group to connect with your community
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </Fragment>
            )
          })}

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
            left: '50%',
            width: '100%',
            maxWidth: '24rem',
            backgroundColor: colors.grey50,
            borderRadius: '20px 20px 0 0',
            padding: '24px 20px 40px',
            zIndex: 101,
            transform: createVisible
              ? 'translateX(-50%) translateY(0)'
              : 'translateX(-50%) translateY(100%)',
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
                description="Got plans? Make it an event and invite people to join."
                onClick={() => { closeCreate(); navigate('/create/event') }}
              />
              <CreateOption
                colors={colors}
                icon={<GroupCreateIcon color={colors.brandPrimary} />}
                title="Create a Group"
                description="Start a group around an interest and meet new people."
                onClick={() => { closeCreate(); navigate('/create/group') }}
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
      backgroundColor: isAccent ? colors.grey1000 : colors.grey0,
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

// ─── Primary tab icons ───────────────────────────────────────────

function ExploreIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
      stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="7.5" r="5.5" />
      <line x1="12" y1="12" x2="16" y2="16" />
    </svg>
  )
}

function StartConnectingIcon({ color }) {
  // 5-person pyramid: 2 top, 2 sides, 1 bottom-center
  return (
    <svg width="26" height="22" viewBox="0 0 26 22" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {/* Top row: 2 people */}
      <circle cx="8" cy="3.5" r="2" />
      <path d="M4 10c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" />
      <circle cx="18" cy="3.5" r="2" />
      <path d="M14 10c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" />
      {/* Bottom-center: 1 person */}
      <circle cx="13" cy="14" r="2" />
      <path d="M9 21c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" />
    </svg>
  )
}

function YourConnectionsIcon({ color }) {
  // Two people connected by circular arrows with checkmark in center
  return (
    <svg width="26" height="22" viewBox="0 0 26 22" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {/* Left person */}
      <circle cx="4.5" cy="5" r="2" />
      <path d="M1 12c0-1.9 1.6-3.5 3.5-3.5S8 10.1 8 12" />
      {/* Right person */}
      <circle cx="21.5" cy="5" r="2" />
      <path d="M18 12c0-1.9 1.6-3.5 3.5-3.5S25 10.1 25 12" />
      {/* Circular arrows connecting them */}
      <path d="M9 9.5 C10.5 7 15.5 7 17 9.5" strokeDasharray="0" />
      <path d="M17 13.5 C15.5 16 10.5 16 9 13.5" />
      <polyline points="16.5,7.5 17,9.5 15,9.5" />
      <polyline points="9.5,15.5 9,13.5 11,13.5" />
      {/* Checkmark center */}
      <path d="M11 11.5l1.5 1.5 3-3" strokeWidth="1.6" />
    </svg>
  )
}

// ─── Secondary Show: toggle icons ────────────────────────────────

function CalendarToggleIcon({ color }) {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Simplified: body + rings + divider only (cells too small at 13px) */}
      <path d="M4.5,3 H13.5 Q17.5,3 17.5,6.5 V14.5 L13.5,19 H4.5 Q2.5,19 2.5,15.5 V6.5 Q2.5,3 4.5,3Z"/>
      <path d="M13.5,19 L13.5,15.5 L17.5,14.5" fill="none"/>
      <rect x="5.5" y="1.5" width="2" height="3.5" rx="1"/>
      <rect x="11.5" y="1.5" width="2" height="3.5" rx="1"/>
      <line x1="2.5" y1="8" x2="17.5" y2="8"/>
    </svg>
  )
}

function GroupToggleIcon({ color }) {
  return (
    <svg width="15" height="13" viewBox="0 0 16 13" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="4" r="2.2" />
      <circle cx="11.5" cy="4" r="2.2" />
      <path d="M1 12c0-2 2-3.5 4.5-3.5 1.2 0 2.3.4 3.1 1" />
      <path d="M11.5 8.5c2.5 0 4.5 1.5 4.5 3.5" />
    </svg>
  )
}

// ─── Action icons ─────────────────────────────────────────────────

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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="7" cy="5" r="2.5" />
      <circle cx="13" cy="15" r="2.5" />
      <line x1="9.5" y1="5" x2="18" y2="5" />
      <line x1="2" y1="5" x2="4.5" y2="5" />
      <line x1="2" y1="15" x2="10.5" y2="15" />
      <line x1="15.5" y1="15" x2="18" y2="15" />
    </svg>
  )
}

function CreateOption({ colors, icon, title, description, onClick }) {
  return (
    <div onClick={onClick} style={{
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
      <path d="M5,3.5 H16 Q20,3.5 20,7 V15.5 L16,20 H5 Q3,20 3,17 V7 Q3,3.5 5,3.5Z"/>
      <path d="M16,20 L16,16.5 L20,15.5" fill="none"/>
      <rect x="7" y="1.5" width="2.5" height="4" rx="1.25"/>
      <rect x="13" y="1.5" width="2.5" height="4" rx="1.25"/>
      <line x1="3" y1="9" x2="20" y2="9"/>
      {/* Plus badge */}
      <circle cx="21" cy="21" r="4.5" fill={color} stroke={color}/>
      <line x1="21" y1="18.8" x2="21" y2="23.2" stroke="white" strokeWidth="1.75"/>
      <line x1="18.8" y1="21" x2="23.2" y2="21" stroke="white" strokeWidth="1.75"/>
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

function ChildEventIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <path d="M4.5,3 H13.5 Q17.5,3 17.5,6.5 V14.5 L13.5,19 H4.5 Q2.5,19 2.5,15.5 V6.5 Q2.5,3 4.5,3Z"/>
      <path d="M13.5,19 L13.5,15.5 L17.5,14.5" fill="none"/>
      <rect x="5.5" y="1.5" width="2" height="3.5" rx="1"/>
      <rect x="11.5" y="1.5" width="2" height="3.5" rx="1"/>
      <line x1="2.5" y1="8" x2="17.5" y2="8"/>
    </svg>
  )
}

function ExpandChevron({ color, open }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
      <path d="M2 4l4 4 4-4" />
    </svg>
  )
}

function ChevronRightSmall({ color }) {
  return (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <path d="M1 1l4 4-4 4" />
    </svg>
  )
}
