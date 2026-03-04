import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { Chip, PrimaryButton, ThemedDialog } from '../design-system'
import { useTheme } from '../design-system/context/ThemeProvider'

const GATED_TABS = ['Participants', 'Events', 'Board', 'Chat']

export default function DetailScreen() {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const { item, joined } = location.state || {}
  const [activeTab, setActiveTab] = useState('About')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [blockedSection, setBlockedSection] = useState('')

  if (!item) return null

  const isGroup = item.type === 'group'
  const tabs = isGroup
    ? ['About', 'Participants', 'Events', 'Board', 'Chat']
    : ['About', 'Participants', 'Board', 'Chat']

  function handleTabTap(tab) {
    if (tab === 'About') {
      setActiveTab('About')
      return
    }
    if (!joined && GATED_TABS.includes(tab)) {
      setBlockedSection(tab.toLowerCase())
      setDialogOpen(true)
      return
    }
    setActiveTab(tab)
  }

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
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        flexShrink: 0,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <BackArrow color={colors.grey1000} />
        </button>
        <div style={{
          flex: 1,
          textAlign: 'center',
          fontSize: 17,
          fontWeight: 700,
          color: colors.grey1000,
          fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          padding: '0 8px',
        }}>
          {item.title} {isGroup ? 'Group' : 'Event'}
        </div>
        <button style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          display: 'flex',
          alignItems: 'center',
        }}>
          <MoreIcon color={colors.grey1000} />
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Hero image */}
        <div style={{
          width: '60%',
          margin: '0 auto',
          aspectRatio: '1',
          overflow: 'hidden',
          borderRadius: 12,
        }}>
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Tab pills */}
        <div style={{
          display: 'flex',
          gap: 8,
          padding: '20px 20px 0',
          overflowX: 'auto',
          flexShrink: 0,
          WebkitOverflowScrolling: 'touch',
        }}>
          {tabs.map(tab => (
            <div key={tab} style={{ flexShrink: 0 }}>
              <Chip
                text={tab}
                variant={activeTab === tab ? 'primary' : 'light'}
                size="regular"
                onClick={() => handleTabTap(tab)}
              />
            </div>
          ))}
        </div>

        {/* About content */}
        {activeTab === 'About' && (
          <div style={{ padding: '20px 20px 0' }}>
            {/* About card */}
            <div style={{
              backgroundColor: colors.grey50,
              borderRadius: 14,
              padding: 16,
              marginBottom: 24,
            }}>
              <div style={{
                fontSize: 16,
                fontWeight: 700,
                color: colors.grey1000,
                fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
                marginBottom: 8,
              }}>
                About
              </div>
              <div style={{
                fontSize: 15,
                fontWeight: 400,
                color: colors.grey600,
                lineHeight: '22px',
                fontFamily: "'Goldman Sans', sans-serif",
              }}>
                {item.description || 'No description available.'}
              </div>
            </div>

            {/* Info rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 24 }}>
              {item.createdDate && (
                <InfoRow
                  icon={<CalendarInfoIcon color={colors.grey600} />}
                  colors={colors}
                >
                  Created - {item.createdDate}
                </InfoRow>
              )}
              <InfoRow
                icon={<LocationInfoIcon color={colors.grey600} />}
                colors={colors}
              >
                {item.location}
              </InfoRow>
              <InfoRow
                icon={<LinkInfoIcon color={colors.grey600} />}
                colors={colors}
              >
                More Info
              </InfoRow>
              <InfoRow
                icon={<PeopleInfoIcon color={colors.grey600} />}
                colors={colors}
              >
                {item.going} {isGroup ? 'Members' : 'Going'}
              </InfoRow>
            </div>

            {/* Created by */}
            {item.creator && (
              <div style={{
                backgroundColor: colors.grey50,
                borderRadius: 14,
                padding: 16,
                marginBottom: 24,
              }}>
                <div style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: colors.grey400,
                  fontFamily: "'Goldman Sans', sans-serif",
                  marginBottom: 12,
                }}>
                  Created by
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img
                    src={item.creator.image}
                    alt={item.creator.name}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      objectFit: 'cover',
                    }}
                  />
                  <div>
                    <span style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: colors.grey1000,
                      fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
                    }}>
                      {item.creator.name}
                    </span>
                    <span style={{
                      fontSize: 17,
                      fontWeight: 400,
                      color: colors.grey400,
                      fontFamily: "'Goldman Sans', sans-serif",
                      marginLeft: 6,
                    }}>
                      {item.creator.age}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom join button — only for non-joined items */}
      {!joined && (
        <div style={{
          padding: '16px 20px 36px',
          flexShrink: 0,
          backgroundColor: colors.grey0,
        }}>
          <PrimaryButton
            title={`Join ${isGroup ? 'Group' : 'Event'}`}
            size="large"
            isFullWidth
          />
        </div>
      )}

      {/* Join gate dialog */}
      <ThemedDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={`Join ${isGroup ? 'Group' : 'Event'} First`}
        message={`You need to join this ${isGroup ? 'group' : 'event'} before you can view ${blockedSection}.`}
        buttons={[{ title: 'OK', variant: 'primary', onClick: () => setDialogOpen(false) }]}
      />
    </div>
  )
}

// ─── Helper ──────────────────────────────────────────────────────

function InfoRow({ icon, colors, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{
        width: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{
        fontSize: 15,
        fontWeight: 500,
        color: colors.grey1000,
        fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
      }}>
        {children}
      </div>
    </div>
  )
}

// ─── Icons ──────────────────────────────────────────────────────

function BackArrow({ color }) {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 1L1 9l8 8" />
    </svg>
  )
}

function MoreIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill={color}>
      <circle cx="4" cy="10" r="2" />
      <circle cx="10" cy="10" r="2" />
      <circle cx="16" cy="10" r="2" />
    </svg>
  )
}

function CalendarInfoIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="16" height="14.5" rx="2" />
      <line x1="3" y1="9" x2="19" y2="9" />
      <line x1="7.5" y1="2" x2="7.5" y2="5.5" />
      <line x1="14.5" y1="2" x2="14.5" y2="5.5" />
    </svg>
  )
}

function LocationInfoIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="9" r="3" />
      <path d="M11 20S4.5 14 4.5 9a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" />
    </svg>
  )
}

function LinkInfoIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 6H7a4 4 0 0 0 0 8h3" />
      <path d="M12 6h3a4 4 0 0 1 0 8h-3" />
      <line x1="8" y1="10" x2="14" y2="10" />
    </svg>
  )
}

function PeopleInfoIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="7" r="3" />
      <circle cx="16" cy="7" r="2.5" />
      <path d="M2 19c0-2.8 2.7-5 6-5s6 2.2 6 5" />
      <path d="M16 14c2.5 0 4.5 2 4.5 5" />
    </svg>
  )
}
