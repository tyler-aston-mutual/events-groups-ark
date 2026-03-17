import { useState, useEffect, useCallback, Fragment } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { EventCard } from '../components/EventCard'
import { SpeedDatingBanner } from '../components/SpeedDatingBanner'
import { Heading3, Chip } from '../design-system'
import { useTheme } from '../design-system/context/ThemeProvider'
import { useJoined } from '../context/JoinedContext'

// Local profile photos for creators
import mckennaImg from '../assets/people/female/female-01.jpg'
import sophieImg from '../assets/people/female/female-02.jpg'
import emilyImg from '../assets/people/female/female-03.jpg'
import rachelImg from '../assets/people/female/female-04.jpg'
import briImg from '../assets/people/female/female-05.jpg'
import tylerImg from '../assets/people/male/male-01.jpg'
import jordanImg from '../assets/people/male/male-02.jpg'
import tannerImg from '../assets/people/male/male-03.jpg'
import dallinImg from '../assets/people/male/male-04.jpg'
import ethanImg from '../assets/people/male/male-05.jpg'

const FILTERS = ['For You', 'Yours']

const SORT_OPTIONS_ALL = [
  { id: 'recommended', label: 'Recommended For You' },
  { id: 'newest', label: 'Newest' },
  { id: 'soonest', label: 'Soonest' },
  { id: 'popular', label: 'Most Popular' },
  { id: 'nearest', label: 'Nearest' },
]

const SORT_OPTIONS_EVENTS = [
  { id: 'recommended', label: 'Recommended For You' },
  { id: 'soonest', label: 'Soonest' },
  { id: 'newest', label: 'Newest' },
  { id: 'popular', label: 'Most Popular' },
  { id: 'nearest', label: 'Nearest' },
]

const SORT_OPTIONS_GROUPS = [
  { id: 'recommended', label: 'Recommended For You' },
  { id: 'nearest', label: 'Nearest' },
  { id: 'newest', label: 'Newest' },
  { id: 'popular', label: 'Most Popular' },
]

const BASE = import.meta.env.BASE_URL

export const ALL_ITEMS = [
  {
    id: 2,
    type: 'group',
    title: 'Faith & Fellowship',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&h=400&fit=crop',
    imageBg: '#FFFFFF',
    location: 'Austin, TX',
    going: 320,
    featured: true,
    description: 'A community for Christian singles in the Austin area. We plan weekly activities, service projects, and social events to help you meet new people and build lasting friendships.',
    createdDate: 'January 14, 2026  6:00PM',
    creator: { name: 'McKenna', age: 26, image: mckennaImg },
  },
  {
    id: 3,
    title: 'Barton Creek Trail Hike',
    date: 'March 23, 2026 - 10:00',
    location: 'Barton Creek Greenbelt',
    going: 18,
    featured: true,
    description: 'Join us for a group hike along Barton Creek! We\'ll meet at the trailhead and explore the greenbelt together. All fitness levels welcome — we go at a comfortable pace and take plenty of breaks.',
    createdDate: 'February 27, 2026  8:30AM',
    creator: { name: 'Tyler', age: 30, image: tylerImg },
  },
  {
    id: 4,
    type: 'group',
    title: 'Austin Pickleball',
    image: 'https://images.unsplash.com/photo-1526888935184-a82d2a4b7e67?w=400&h=400&fit=crop',
    location: 'Austin, TX',
    going: 85,
    featured: true,
    description: 'Weekly pickleball meetups around Austin. All skill levels welcome! We play at various courts and host tournaments monthly.',
    createdDate: 'February 5, 2026  7:30PM',
    creator: { name: 'Jordan', age: 28, image: jordanImg },
  },
  {
    id: 5,
    title: 'Singles Pickleball Tournament',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop',
    date: 'March 27, 2026 - 14:00',
    location: 'Austin Pickleball Courts',
    going: 12,
    group: { name: 'Austin Pickleball', membersOnly: false },
    featured: true,
    description: 'Casual doubles tournament for singles! We\'ll mix up partners each round so you get to meet everyone. Beginners and experienced players alike — come have fun and maybe find a doubles partner for life.',
    createdDate: 'March 1, 2026  12:00PM',
    creator: { name: 'Tanner', age: 24, image: tannerImg },
  },
  {
    id: 15,
    type: 'group',
    title: 'DFW Singles',
    image: BASE + 'slc.png',
    location: 'Dallas, TX',
    going: 175,
    description: 'The go-to community for Christian singles in the Dallas-Fort Worth area. We organize weekly activities, weekend outings, and seasonal events to help you connect with other singles in the metroplex.',
    createdDate: 'December 1, 2025  10:00AM',
    creator: { name: 'Emily', age: 25, image: emilyImg },
  },
  {
    id: 6,
    title: 'Riverwalk Evening Stroll',
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400&h=400&fit=crop',
    imageBg: '#FFFFFF',
    date: 'March 8, 2026 - 19:30',
    location: 'San Antonio Riverwalk',
    going: 32,
    group: { name: 'DFW Singles', membersOnly: false },
    description: 'Evening stroll along the Riverwalk to enjoy the lights and good company. We\'ll grab drinks afterward at a nearby cafe. Great way to meet people in a relaxed setting.',
    createdDate: 'January 30, 2026  3:00PM',
    creator: { name: 'Emily', age: 25, image: emilyImg },
  },
  {
    id: 7,
    type: 'group',
    title: 'Hill Country Hiking',
    location: 'Austin, TX',
    going: 210,
    description: 'Exploring the best trails in Texas Hill Country together. We organize group hikes every weekend ranging from easy creek walks to challenging ridge scrambles. New members always welcome!',
    createdDate: 'March 3, 2026  9:00AM',
    creator: { name: 'Dallin', age: 27, image: dallinImg },
  },
  {
    id: 8,
    title: 'Friday Date Night',
    date: 'March 26, 2026 - 20:00',
    location: 'Ask the Creator',
    going: 8,
    description: 'Looking for a fun Friday night out? Come join us for a laid-back evening of good music, great people, and the perfect chance to meet someone new. Location shared after approval.',
    createdDate: 'February 12, 2026  5:00PM',
    creator: { name: 'Bri', age: 23, image: briImg },
  },
  {
    id: 9,
    type: 'group',
    title: 'Foodies',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop',
    location: 'Houston, TX',
    going: 150,
    description: 'For people who love trying new restaurants and cooking together. We do group dinners at local spots, potlucks, and cooking classes. Come hungry, leave with new friends.',
    createdDate: 'February 20, 2026  6:30PM',
    creator: { name: 'Sophie', age: 26, image: sophieImg },
  },
  {
    id: 10,
    title: 'Trivia Night',
    date: 'March 28, 2026 - 19:00',
    location: 'Ask the Creator',
    going: 10,
    description: "Team trivia night! We'll form teams of 4-5 and compete for bragging rights. Topics range from pop culture to general knowledge. No trivia experience required — just bring your brain. Location shared after approval.",
    createdDate: 'February 8, 2026  11:00AM',
    creator: { name: 'Ethan', age: 29, image: ethanImg },
  },
  {
    id: 11,
    type: 'group',
    title: 'Conservatives',
    location: 'Fort Worth, TX',
    going: 95,
    description: 'A group for politically engaged young adults who lean conservative. We host watch parties, discussion nights, and volunteer for local campaigns together.',
    createdDate: 'December 18, 2025  4:00PM',
    creator: { name: 'Tyler', age: 30, image: tylerImg },
  },
  {
    id: 12,
    type: 'group',
    title: 'Northside Community Church',
    location: 'Plano, TX',
    going: 45,
    description: 'Connect with the young adult community at Northside! Stay updated on small groups, Bible studies, and service opportunities. A great way to stay in the loop.',
    createdDate: 'February 25, 2026  10:00AM',
    creator: { name: 'Rachel', age: 24, image: rachelImg },
  },
  {
    id: 13,
    title: 'Schlitterbahn Day',
    image: BASE + 'splash_summit_logo.png',
    imageBg: '#FFFFFF',
    date: 'August 16, 2025 - 11:00',
    location: 'Schlitterbahn, New Braunfels',
    going: 64,
    featured: true,
    official: true,
    description: 'A full-day waterpark event at Schlitterbahn! Enjoy water slides, wave pools, and lazy rivers with other single adults from across the area. Group rates and lunch included.',
    createdDate: 'June 1, 2025  9:00AM',
    creator: { name: 'Tanner', age: 24, image: tannerImg },
  },
  {
    id: 14,
    title: 'Texas Young Adults Conference',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop',
    imageBg: '#FFFFFF',
    date: 'April 25, 2026 - 09:00',
    location: 'Dallas Convention Center',
    going: 340,
    featured: true,
    description: 'Together in Christ — the 2026 Texas Young Adults Conference. A day of speakers, workshops, worship, and connection. Meet young adults from churches across Texas in an uplifting, faith-centered setting.',
    createdDate: 'February 15, 2026  2:00PM',
    creator: { name: 'Emily', age: 25, image: emilyImg },
  },
  // ── New items added from spreadsheet ──────────────────────────
  {
    id: 16,
    type: 'group',
    title: 'Dinner Club',
    image: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=600&h=400&fit=crop',
    location: 'Rotating Homes in the Neighborhood',
    going: 82,
    men: 36,
    women: 46,
    description: 'A rotating dinner group where singles meet regularly to cook or share meals together. Each gathering may feature a theme, new cuisine, or host, encouraging conversation and friendships in a relaxed setting.',
    createdDate: 'March 10, 2026  10:00AM',
    creator: { name: 'Sophie', age: 26, image: sophieImg },
  },
  {
    id: 17,
    title: 'Game Night',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&h=400&fit=crop',
    date: 'April 12, 2026 - 19:00',
    location: 'Community Room or Hosted Home',
    going: 48,
    men: 29,
    women: 19,
    description: 'An evening of board games, card games, and laughter designed for singles who enjoy friendly competition and easy conversation. Games help break the ice while creating a relaxed environment to meet new neighbors.',
    createdDate: 'March 10, 2026  10:15AM',
    creator: { name: 'Tanner', age: 24, image: tannerImg },
  },
  {
    id: 18,
    title: 'Dessert & Drinks Night',
    date: 'April 18, 2026 - 19:30',
    location: 'Hosted Home or Backyard',
    going: 28,
    men: 13,
    women: 15,
    description: 'A sweet social gathering where singles bring a favorite dessert or drink to share. Guests sample treats, swap recipes, and enjoy a casual evening meeting others in the neighborhood.',
    createdDate: 'March 10, 2026  10:30AM',
    creator: { name: 'McKenna', age: 26, image: mckennaImg },
  },
  {
    id: 19,
    type: 'group',
    title: 'Sunday Brunch Crew',
    location: 'Local Cafes or Rotating Homes',
    going: 35,
    men: 27,
    women: 8,
    description: 'A recurring brunch meetup where singles gather on Sunday mornings to enjoy food, coffee, and conversation. The group rotates locations between homes and nearby cafes while helping neighbors connect regularly.',
    createdDate: 'March 10, 2026  10:45AM',
    creator: { name: 'Jordan', age: 28, image: jordanImg },
  },
  {
    id: 20,
    type: 'group',
    title: 'Walking Group',
    location: 'Neighborhood Trails or Streets',
    going: 42,
    men: 30,
    women: 12,
    description: 'A casual neighborhood walking group for singles who want to stay active while getting to know others. Walks happen regularly in the evenings or weekends and provide an easy setting for conversation.',
    createdDate: 'March 10, 2026  11:00AM',
    creator: { name: 'Dallin', age: 27, image: dallinImg },
  },
  {
    id: 21,
    type: 'group',
    title: 'Book Club',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
    location: 'Rotating Homes',
    going: 53,
    men: 27,
    women: 26,
    description: 'A relaxed book club for singles who enjoy thoughtful conversation. Members read a selected book each month and gather with a glass of wine to share ideas, perspectives, and friendly discussion.',
    createdDate: 'March 10, 2026  11:15AM',
    creator: { name: 'Emily', age: 25, image: emilyImg },
  },
  {
    id: 22,
    title: 'Trivia Night Team',
    date: 'April 9, 2026 - 19:00',
    location: 'Local Pub or Restaurant',
    going: 22,
    men: 16,
    women: 6,
    description: 'Singles from the neighborhood form a team to compete at a local trivia night. It\'s a lively evening of questions, teamwork, and laughs while building friendships over shared knowledge.',
    createdDate: 'March 10, 2026  11:30AM',
    creator: { name: 'Ethan', age: 29, image: ethanImg },
  },
  {
    id: 23,
    title: 'Cooking Night',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop',
    date: 'April 15, 2026 - 18:30',
    location: 'Hosted Home Kitchen',
    going: 26,
    men: 9,
    women: 17,
    description: 'A hands-on cooking event where singles prepare a meal together and enjoy it afterward. Participants collaborate on recipes, learn new kitchen skills, and share a relaxed dinner experience.',
    createdDate: 'March 10, 2026  11:45AM',
    creator: { name: 'Bri', age: 23, image: briImg },
  },
  {
    id: 24,
    title: 'Breakfast & Conversation',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
    date: 'April 6, 2026 - 09:00',
    location: 'Local Coffee Shop',
    going: 31,
    men: 24,
    women: 7,
    description: 'A low-key morning meetup where singles gather for breakfast and easy conversation. It\'s an approachable way to meet neighbors, exchange stories, and start the day with meaningful social connection.',
    createdDate: 'March 10, 2026  12:00PM',
    creator: { name: 'Tyler', age: 30, image: tylerImg },
  },
  {
    id: 25,
    type: 'group',
    title: 'Entrepreneurs & Side Hustles',
    location: 'Coworking Space or Café',
    going: 52,
    men: 23,
    women: 29,
    description: 'A small group of singles interested in business ideas, startups, and side projects. Members meet regularly to share progress, brainstorm solutions, and support each other\'s entrepreneurial ambitions.',
    createdDate: 'March 10, 2026  12:15PM',
    creator: { name: 'Rachel', age: 24, image: rachelImg },
  },
  {
    id: 26,
    type: 'group',
    title: 'Creative Night',
    location: 'Hosted Home or Studio Space',
    going: 33,
    men: 27,
    women: 6,
    description: 'A relaxed gathering for singles who enjoy creative expression. Members bring art, photography, writing, or other projects to work on while sharing inspiration and connecting with other creative neighbors.',
    createdDate: 'March 10, 2026  12:30PM',
    creator: { name: 'McKenna', age: 26, image: mckennaImg },
  },
  {
    id: 27,
    title: 'Music Share Night',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop',
    date: 'April 24, 2026 - 20:00',
    location: 'Hosted Home or Lounge Area',
    going: 49,
    men: 22,
    women: 27,
    description: 'A social evening where singles bring favorite songs, playlists, or artists to share with the group. Guests discover new music while enjoying casual conversation and connecting over shared tastes.',
    createdDate: 'March 10, 2026  12:45PM',
    creator: { name: 'Jordan', age: 28, image: jordanImg },
  },
  {
    id: 28,
    title: 'Volunteer Together',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
    date: 'April 26, 2026 - 10:00',
    location: 'Local Community Organization',
    going: 27,
    men: 8,
    women: 19,
    description: 'Singles come together to give back through a local service project. Whether helping a food bank, park cleanup, or community cause, the event builds connections through meaningful shared work.',
    createdDate: 'March 10, 2026  1:00PM',
    creator: { name: 'Dallin', age: 27, image: dallinImg },
  },
  {
    id: 29,
    title: 'Skill Swap Night',
    date: 'April 28, 2026 - 19:00',
    location: 'Community Room or Hosted Home',
    going: 47,
    men: 14,
    women: 33,
    description: 'A collaborative gathering where singles teach short skills to one another — anything from mixology to budgeting tips or photography basics — creating a fun environment for learning and connection.',
    createdDate: 'March 10, 2026  1:15PM',
    creator: { name: 'Tanner', age: 24, image: tannerImg },
  },
]

function sortItems(items, sortId) {
  const sorted = [...items]
  switch (sortId) {
    case 'recommended':
      // Deterministic "personalized" order — mix of popular + newer items
      return sorted.sort((a, b) => {
        const scoreA = a.going * 0.6 + (a.featured ? 100 : 0) + ((a.id * 17) % 50)
        const scoreB = b.going * 0.6 + (b.featured ? 100 : 0) + ((b.id * 17) % 50)
        return scoreB - scoreA
      })
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
  const [activeNav, setActiveNavRaw] = useState(() => {
    const saved = sessionStorage.getItem('circlesActiveTab')
    // If saved tab was 'all' (now removed), default to 'events'
    return saved && saved !== 'all' ? saved : 'events'
  })
  const setActiveNav = useCallback((tab) => {
    setActiveNavRaw(tab)
    sessionStorage.setItem('circlesActiveTab', tab)
  }, [])
  const [activeSort, setActiveSort] = useState('recommended')
  const [sortOpen, setSortOpen] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [createBannerDismissed, setCreateBannerDismissed] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [createVisible, setCreateVisible] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [createdByYouOpen, setCreatedByYouOpen] = useState(true)
  const [createdByOthersOpen, setCreatedByOthersOpen] = useState(true)
  const [pastActivityOpen, setPastActivityOpen] = useState(false)
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

  // Auto-switch to Mine tab when returning from a join action
  useEffect(() => {
    if (location.state?.switchToYours) {
      setActiveNav('mine')
      window.history.replaceState({}, '')
    }
  }, [location.state?.switchToYours])

  // Clear animation flag after it plays
  useEffect(() => {
    if (newlyJoinedId && activeNav === 'mine') {
      const timer = setTimeout(() => clearNewlyJoined(), 600)
      return () => clearTimeout(timer)
    }
  }, [newlyJoinedId, activeNav, clearNewlyJoined])

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

  const handleGroupClick = useCallback((groupName) => {
    const groupItem = ALL_ITEMS.find(g => g.type === 'group' && g.title === groupName)
    if (groupItem) {
      navigate(`/detail/${groupItem.id}`, { state: { item: groupItem, joined: joinedIds.has(groupItem.id) } })
    }
  }, [navigate, joinedIds])

  const isYoursTab = activeNav === 'mine'
  const showEvents = activeNav === 'events' || activeNav === 'all' || activeNav === 'mine'
  const showGroups = activeNav === 'groups' || activeNav === 'all' || activeNav === 'mine'
  const sortOptions = activeNav === 'groups' ? SORT_OPTIONS_GROUPS : activeNav === 'events' ? SORT_OPTIONS_EVENTS : SORT_OPTIONS_ALL
  const tabItems = isYoursTab
    ? ALL_ITEMS.filter(i => joinedIds.has(i.id))
    : ALL_ITEMS.filter(i => !joinedIds.has(i.id))
  const baseItems = applyFilters(tabItems, filters, showEvents, showGroups)
  const items = sortItems(baseItems, activeSort)
  const activeSortLabel = sortOptions.find(o => o.id === activeSort)?.label

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

  // Split into current vs past items for the My Stuff tab
  const parseItemDate = (item) => {
    if (!item.date) return null
    // Format: "August 16, 2025 - 11:00"
    const [datePart] = item.date.split(' - ')
    return new Date(datePart)
  }
  const now = new Date()
  const currentItems = isYoursTab
    ? topLevelItems.filter(i => { const d = parseItemDate(i); return !d || d >= now })
    : topLevelItems
  const pastItems = isYoursTab
    ? topLevelItems.filter(i => { const d = parseItemDate(i); return d && d < now })
    : []

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgb(245, 245, 245)',
      overflow: 'hidden',
    }}>
      <StatusBar />

      {/* Header */}
      <div style={{
        paddingLeft: 20,
        paddingRight: 16,
        paddingTop: 10,
        backgroundColor: 'rgb(245, 245, 245)',
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
            <Heading3>Events & Groups</Heading3>
            <span style={{
              fontSize: 13,
              fontWeight: 700,
              color: 'rgb(149, 150, 153)',
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

        {/* Navigation pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 4, paddingBottom: 14 }}>
          {[
            // { id: 'all', label: 'All', Icon: ExploreIcon, iconColor: colors.grey1000, inactiveIconColor: colors.grey400 },
            { id: 'events', label: 'Events', Icon: CalendarToggleIcon, iconColor: colors.brandAccent5, inactiveIconColor: `${colors.brandAccent5}BF` },
            { id: 'groups', label: 'Groups', Icon: GroupToggleIcon, iconColor: colors.brandPrimary, inactiveIconColor: `${colors.brandPrimary}BF` },
            { id: 'mine', label: 'My Stuff', Icon: HeartTabIcon, iconColor: colors.grey1000, inactiveIconColor: colors.grey400 },
          ].map(tab => {
            const active = activeNav === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveNav(tab.id)
                  setActiveSort('recommended')
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '6px 12px',
                  borderRadius: 20,
                  border: `0.5px solid ${active ? tab.iconColor : (tab.inactiveIconColor || colors.grey200)}`,
                  backgroundColor: active ? `${tab.iconColor}14` : 'transparent',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  color: active ? tab.iconColor : (tab.inactiveIconColor || colors.grey400),
                  whiteSpace: 'nowrap',
                }}
              >
                <tab.Icon color={active ? tab.iconColor : tab.inactiveIconColor} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

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
          {/* Sort dropdown — hidden on Mine tab */}
          {activeNav !== 'mine' && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', position: 'relative', marginBottom: -4, gap: 10 }}>
            {activeNav === 'all' && (
              <div style={{
                flex: 1,
                height: 36,
                borderRadius: 18,
                border: `1.5px solid ${colors.grey200}`,
                backgroundColor: colors.grey0,
                padding: '0 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.grey400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span style={{
                  fontSize: 14,
                  color: colors.grey400,
                }}>
                  Search
                </span>
              </div>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); setSortOpen(!sortOpen) }}
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
                {sortOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setActiveSort(option.id)
                      setSortOpen(false)
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
          }

          {!bannerDismissed && activeNav !== 'mine' && activeNav !== 'groups' && (
            <div
              onClick={() => navigate('/speed-dating')}
              style={{ cursor: 'pointer' }}
            >
              <EventCard
                type="event"
                title="Blind Speed Dating"
                image={BASE + 'speed-dating.png'}
                imageBg="#FFFFFF"
                date="Wednesday 7PM MST"
                location="Virtual"
                going={0}
              />
            </div>
          )}

          {/* "You Created" section — Yours tab only */}
          {isYoursTab && (
            <>
              <CollapsibleHeader
                label="Created by you"
                open={createdByYouOpen}
                onToggle={() => setCreatedByYouOpen(v => !v)}
                colors={colors}
              />
              {createdByYouOpen && (
                <>
                  {/* Pending event — submitted but awaiting review */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ pointerEvents: 'none', paddingBottom: 24 }}>
                      <EventCard
                        title="Sunset Walk & Talk"
                        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop"
                        date="April 5, 2026 - 6:30 PM"
                        location="Lady Bird Lake Trail"
                        going={0}
                      />
                    </div>
                    {/* Full-card overlay with status text at bottom */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      borderRadius: 16,
                      backgroundColor: 'rgba(255,255,255,0.55)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      paddingBottom: 2,
                      pointerEvents: 'none',
                    }}>
                      <span style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: colors.grey400,
                      }}>
                        Pending Review
                      </span>
                    </div>
                  </div>
                  {/* Create Your Own banner */}
                  <CreateBanner
                    colors={colors}
                    activeNav={activeNav}
                    onTap={openCreate}
                    navigate={navigate}
                  />
                </>
              )}

              {/* "Created by Others" section header */}
              <CollapsibleHeader
                label="Created by Others"
                open={createdByOthersOpen}
                onToggle={() => setCreatedByOthersOpen(v => !v)}
                colors={colors}
                style={{ marginTop: 8 }}
              />
            </>
          )}

          {(!isYoursTab || createdByOthersOpen) && currentItems.map((item, index) => {
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
                  <EventCard {...item} onGroupClick={handleGroupClick} />
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
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 22,
                              height: 22,
                              borderRadius: 14,
                              border: 'none',
                              backgroundColor: 'transparent',
                            }}>
                              <ChildEventIcon color={colors.brandAccent5} size={12} />
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
                                lineHeight: '18px',
                                marginBottom: 3,
                              }}>
                                {child.title}
                              </div>
                              {child.date && (
                                <div style={{
                                  fontSize: 12,
                                  color: colors.grey600,
                                }}>
                                  {child.date}
                                </div>
                              )}
                              <div style={{
                                fontSize: 12,
                                color: colors.grey400,
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
              {index === 3 && !createBannerDismissed && !isYoursTab && (
                <div style={{ position: 'relative', marginTop: 12 }}>
                  {/* Dismiss X */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setCreateBannerDismissed(true) }}
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgb(0, 0, 0)',
                      fontSize: 25,
                      fontWeight: 200,
                      lineHeight: 1,
                      padding: 0,
                      zIndex: 1,
                    }}
                  >
                    ×
                  </button>
                  <CreateBanner
                    colors={colors}
                    activeNav={activeNav}
                    onTap={openCreate}
                    navigate={navigate}
                  />
                </div>
              )}
              </Fragment>
            )
          })}

          {/* Past Activity section — My Stuff tab only */}
          {isYoursTab && pastItems.length > 0 && (
            <>
              <CollapsibleHeader
                label="Past Activity"
                open={pastActivityOpen}
                onToggle={() => setPastActivityOpen(v => !v)}
                colors={colors}
                style={{ marginTop: 8 }}
              />
              {pastActivityOpen && pastItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/detail/${item.id}`, { state: { item, joined: joinedIds.has(item.id) } })}
                  style={{ cursor: 'pointer', opacity: 0.55 }}
                >
                  <EventCard {...item} onGroupClick={handleGroupClick} />
                </div>
              ))}
            </>
          )}

          {/* Help / Contact banner — My Stuff tab only, at the very bottom */}
          {isYoursTab && (
            <div
              onClick={() => setHelpOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                backgroundColor: colors.grey0,
                borderRadius: 16,
                border: `1px solid ${colors.grey100}`,
                padding: '12px 16px',
                cursor: 'pointer',
                marginTop: 8,
              }}
            >
              <div style={{
                width: 80,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <div style={{ transform: 'scale(2.2)' }}>
                  <HelpIcon color={colors.grey600} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: colors.grey900,
                  lineHeight: '20px',
                  marginBottom: 4,
                }}>
                  Questions or Feedback?
                </div>
                <div style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: colors.grey400,
                  lineHeight: '17px',
                }}>
                  Reach out to the Ark team
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <TabBar activeTab="circles" />

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
              marginBottom: 4,
            }}>
              Create
            </div>
            <div style={{
              fontSize: 15,
              fontWeight: 400,
              color: colors.grey400,
              textAlign: 'center',
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

      {/* Help / Contact full-screen overlay */}
      {helpOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 384,
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#F5F5F5',
        }}>
          {/* Blue header */}
          <div style={{
            backgroundColor: '#4E5BF2',
            padding: '48px 20px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {/* Top bar: tabs + close */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              position: 'relative',
              marginBottom: 24,
            }}>
              <div style={{
                display: 'flex',
                gap: 4,
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: 20,
                padding: 3,
              }}>
                <div style={{
                  padding: '6px 16px',
                  borderRadius: 18,
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  FAQ
                </div>
                <div style={{
                  padding: '6px 16px',
                  borderRadius: 18,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Ask
                </div>
              </div>
              <button
                onClick={() => setHelpOpen(false)}
                style={{
                  position: 'absolute',
                  right: 0,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  color: '#FFFFFF',
                  fontSize: 22,
                  fontWeight: 300,
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            {/* Title */}
            <div style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: 6,
            }}>
              How can we help?
            </div>
            <div style={{
              fontSize: 14,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.65)',
            }}>
              We usually respond in a few hours
            </div>
          </div>

          {/* Content area */}
          <div style={{
            flex: 1,
            padding: '20px 20px',
          }}>
            {/* Email Support card */}
            <div
              onClick={() => {
                window.location.href = 'mailto:support@ark.app?subject=Events%20%26%20Groups%20Feedback'
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: '18px 20px',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              {/* Paper plane icon */}
              <div style={{
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4E5BF2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#1A1A1A',
                  lineHeight: '22px',
                }}>
                  Email Support
                </div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#8E8E93',
                  marginTop: 4,
                  lineHeight: '19px',
                }}>
                  No time to wait around? We usually respond within 24 business hours
                </div>
              </div>
            </div>
          </div>
        </div>
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

function CollapsibleHeader({ label, open, onToggle, colors, style = {} }) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 14,
        fontWeight: 700,
        color: colors.grey600,
        backgroundColor: colors.grey100,
        borderRadius: 10,
        padding: '10px 14px',
        cursor: 'pointer',
        ...style,
      }}
    >
      {label}
      <svg
        width="12" height="12" viewBox="0 0 12 12" fill="none"
        stroke={colors.grey400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{
          transition: 'transform 0.2s ease',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        <path d="M2 4l4 4 4-4" />
      </svg>
    </div>
  )
}

// ─── Primary tab icons ───────────────────────────────────────────

function HelpIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
      {/* Back bubble — question mark */}
      <rect x="1" y="1" width="17" height="15" rx="2.5" stroke={color} strokeWidth="2" fill="none" />
      <path d="M7.2 7.5a2.3 2.3 0 0 1 4.5.7c0 1.5-2.3 2-2.3 2" stroke={color} strokeWidth="1.75" strokeLinecap="round" fill="none" />
      <circle cx="9.5" cy="12.5" r="0.75" fill={color} />
      {/* Tail on back bubble */}
      <path d="M4 16l-1.5 3.5L7 16" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
      {/* Front bubble — dots */}
      <rect x="10" y="10" width="17" height="13" rx="2.5" stroke={color} strokeWidth="2" fill="white" />
      <circle cx="15.5" cy="16.5" r="1.2" fill={color} />
      <circle cx="18.5" cy="16.5" r="1.2" fill={color} />
      <circle cx="21.5" cy="16.5" r="1.2" fill={color} />
      {/* Tail on front bubble */}
      <path d="M22 23l2.5 3.5L20 23" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="white" />
    </svg>
  )
}

function ExploreIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
      stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="7.5" r="5.5" />
      <line x1="12" y1="12" x2="16" y2="16" />
    </svg>
  )
}

function HeartTabIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
          marginBottom: 2,
        }}>
          {title}
        </div>
        <div style={{
          fontSize: 13,
          fontWeight: 400,
          color: colors.grey400,
          lineHeight: '17px',
        }}>
          {description}
        </div>
      </div>
      <CreateChevron color={colors.grey300} />
    </div>
  )
}

function SplitCreateIllustration({ colors }) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      {/* Event calendar icon — left side, pink */}
      <g transform="translate(4, 14) scale(1.6)">
        <path d="M4.5,3 H13.5 Q17.5,3 17.5,6.5 V14.5 L13.5,19 H4.5 Q2.5,19 2.5,15.5 V6.5 Q2.5,3 4.5,3Z"
          fill="none" stroke={colors.brandAccent5} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.5,19 L13.5,15.5 L17.5,14.5" fill="none"
          stroke={colors.brandAccent5} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="5.5" y="1.5" width="2" height="3.5" rx="1"
          fill="none" stroke={colors.brandAccent5} strokeWidth="1.5"/>
        <rect x="11.5" y="1.5" width="2" height="3.5" rx="1"
          fill="none" stroke={colors.brandAccent5} strokeWidth="1.5"/>
        <line x1="2.5" y1="8" x2="17.5" y2="8"
          stroke={colors.brandAccent5} strokeWidth="1.5"/>
      </g>
      {/* Group icon — right side, blue */}
      <g transform="translate(38, 8) scale(1.6)">
        <circle cx="7" cy="6.5" r="2.5" fill="none"
          stroke={colors.brandPrimary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="16" cy="6.5" r="2.5" fill="none"
          stroke={colors.brandPrimary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.5 18c0-2.5 2.5-4.5 5.5-4.5 1.5 0 2.8.5 3.7 1.3" fill="none"
          stroke={colors.brandPrimary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 13.5c3 0 5.5 2 5.5 4.5" fill="none"
          stroke={colors.brandPrimary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      {/* Black plus circle — bottom center */}
      <circle cx="48" cy="62" r="10" fill={colors.grey1000} />
      <line x1="48" y1="56" x2="48" y2="68" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="62" x2="54" y2="62" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function CreateBanner({ colors, activeNav, onTap, navigate }) {
  const isEvents = activeNav === 'events'
  const isGroups = activeNav === 'groups'

  // Determine color, text, icon, and action based on active tab
  let accentColor = colors.grey1000
  let label = '+ Create'
  let prompt = 'Add Your Own!'
  let subtitle = 'Create an event or group for the community'
  let handleClick = onTap // default: open bottom sheet
  let illustration = <SplitCreateIllustration colors={colors} />

  if (isEvents) {
    accentColor = colors.brandAccent5
    label = '+ Create Event'
    prompt = 'Have an idea for an event?'
    subtitle = null
    handleClick = () => navigate('/create/event')
    illustration = <CalendarCreateIcon color={colors.brandAccent5} />
  } else if (isGroups) {
    accentColor = colors.brandPrimary
    label = '+ Create Group'
    prompt = 'Looking to start a community?'
    subtitle = null
    handleClick = () => navigate('/create/group')
    illustration = <GroupCreateIcon color={colors.brandPrimary} />
  }

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        backgroundColor: colors.grey0,
        borderRadius: 16,
        border: `1px solid ${colors.grey100}`,
        padding: '12px 16px',
        cursor: 'pointer',
      }}
    >
      {isEvents || isGroups ? (
        <div style={{
          width: 80,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <div style={{ transform: 'scale(2.2)' }}>
            {illustration}
          </div>
        </div>
      ) : illustration}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 15,
          fontWeight: 700,
          color: colors.grey900,
          lineHeight: '20px',
          marginBottom: subtitle ? 4 : 10,
        }}>
          {prompt}
        </div>
        {subtitle && (
          <div style={{
            fontSize: 13,
            fontWeight: 400,
            color: colors.grey600,
            lineHeight: '17px',
            marginBottom: 10,
          }}>
            {subtitle}
          </div>
        )}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          backgroundColor: accentColor,
          color: '#FFFFFF',
          borderRadius: 20,
          padding: '8px 16px',
          fontSize: 13,
          fontWeight: 700,
        }}>
          {label}
        </div>
      </div>
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

function MapIllustration({ accentColor }) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      {/* Background blob */}
      <ellipse cx="40" cy="42" rx="36" ry="32" fill="#F0F0F0" />
      {/* Map folds */}
      <rect x="16" y="22" width="48" height="36" rx="4" fill="#E5E5E5" stroke="#D4D4D4" strokeWidth="1" />
      <line x1="32" y1="22" x2="32" y2="58" stroke="#D4D4D4" strokeWidth="0.75" />
      <line x1="48" y1="22" x2="48" y2="58" stroke="#D4D4D4" strokeWidth="0.75" />
      {/* Dotted path */}
      <path d="M22 50 C28 42, 34 48, 40 38 S52 30, 58 34" stroke={accentColor} strokeWidth="2" strokeDasharray="3 3" fill="none" strokeLinecap="round" />
      {/* Location pin */}
      <g transform="translate(38, 20)">
        <path d="M4 14S-4 7-4 3.5a4 4 0 1 1 8 0C4 7 4 14 4 14z" fill={accentColor} />
        <circle cx="0" cy="3.5" r="1.5" fill="white" />
      </g>
      {/* Small dot markers */}
      <circle cx="22" cy="50" r="2.5" fill={accentColor} opacity="0.5" />
      <circle cx="58" cy="34" r="2.5" fill={accentColor} opacity="0.5" />
    </svg>
  )
}

function ChildEventIcon({ color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
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
