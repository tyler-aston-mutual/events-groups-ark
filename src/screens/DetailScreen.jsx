import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { Chip, PrimaryButton, ThemedDialog } from '../design-system'
import { useTheme } from '../design-system/context/ThemeProvider'

const GATED_TABS = ['Participants', 'Events', 'Chat']

const FAKE_PARTICIPANTS = [
  {
    id: 1,
    name: 'Marcus',
    age: 28,
    location: 'Salt Lake City, UT',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=530&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Jordan',
    age: 25,
    location: 'Provo, UT',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=530&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Ethan',
    age: 31,
    location: 'Draper, UT',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=530&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Ryan',
    age: 27,
    location: 'Lehi, UT',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=530&fit=crop&crop=face',
  },
]

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
    ? ['About', 'Participants', 'Events', 'Chat']
    : ['About', 'Participants', 'Chat']

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
          <ShareIcon color={colors.grey1000} />
        </button>
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
        {/* Compact card header: photo + title + icons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px 8px',
          gap: 16,
          position: 'relative',
        }}>
          {/* Photo with featured overlay */}
          <div style={{
            width: 120,
            height: 120,
            borderRadius: 14,
            overflow: 'hidden',
            flexShrink: 0,
            position: 'relative',
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
            {item.featured && (
              <div style={{
                position: 'absolute',
                bottom: 8,
                left: 8,
              }}>
                <Chip text="Featured" variant="accent5" size="compact" />
              </div>
            )}
          </div>

          {/* Title */}
          <div style={{
            flex: 1,
            fontSize: 22,
            fontWeight: 700,
            color: colors.grey1000,
            lineHeight: '26px',
            fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
          }}>
            {item.title}
          </div>

          {/* Type icon — top right */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 20,
          }}>
            {isGroup
              ? <GroupTypeIcon color={colors.grey400} />
              : <CalendarTypeIcon color={colors.grey400} />
            }
          </div>
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
                {item.going} {isGroup ? 'Members' : 'Interested'}
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

        {/* Participants content */}
        {activeTab === 'Participants' && (
          <div style={{ padding: '20px 20px 0' }}>
            {/* Search bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              height: 40,
              borderRadius: 12,
              backgroundColor: colors.grey50,
              padding: '0 14px',
              marginBottom: 20,
            }}>
              <SearchIcon color={colors.grey400} />
              <input
                type="text"
                placeholder="Search"
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'none',
                  outline: 'none',
                  fontSize: 15,
                  fontWeight: 400,
                  color: colors.grey1000,
                  fontFamily: "'Goldman Sans', sans-serif",
                }}
              />
            </div>

            {/* Header row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}>
              <div style={{
                fontSize: 16,
                fontWeight: 700,
                color: colors.grey1000,
                fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
              }}>
                {isGroup ? 'Group Members (Men)' : 'Event Attendees (Men)'}
              </div>
              <div style={{
                fontSize: 13,
                fontWeight: 500,
                color: colors.grey400,
                fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
                cursor: 'pointer',
              }}>
                Recently Active First ›
              </div>
            </div>

            {/* 2-column photo grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              marginBottom: 20,
            }}>
              {FAKE_PARTICIPANTS.map(p => (
                <div key={p.id} style={{
                  position: 'relative',
                  borderRadius: 14,
                  overflow: 'hidden',
                  aspectRatio: '3 / 4',
                }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  {/* Dark gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
                  }} />
                  {/* Name + info */}
                  <div style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 12,
                    right: 12,
                  }}>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#FFFFFF',
                      fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
                      lineHeight: '20px',
                    }}>
                      {p.name}, {p.age}
                    </div>
                    <div style={{
                      fontSize: 13,
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.75)',
                      fontFamily: "'Goldman Sans', sans-serif",
                      marginTop: 2,
                    }}>
                      {p.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer banner */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              backgroundColor: colors.grey50,
              borderRadius: 14,
              padding: '14px 16px',
              marginBottom: 24,
            }}>
              <InfoCircleIcon color={colors.grey400} />
              <div style={{
                flex: 1,
                fontSize: 13,
                fontWeight: 400,
                color: colors.grey600,
                fontFamily: "'Goldman Sans', sans-serif",
                lineHeight: '18px',
              }}>
                Recently Active List limited to 50 profiles.
              </div>
              <button style={{
                background: colors.brandPrimary,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}>
                View Full List
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom join button — only for non-joined items */}
      {!joined && (
        <div style={{
          padding: '12px 20px 28px',
          flexShrink: 0,
          backgroundColor: colors.grey0,
        }}>
          <PrimaryButton
            title={isGroup ? 'Join Group' : 'Interested'}
            size="medium"
            isFullWidth
          />
        </div>
      )}

      {/* Join gate dialog */}
      <ThemedDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={isGroup ? 'Join Group First' : 'Mark Interest First'}
        message={isGroup
          ? `You need to join this group before you can view ${blockedSection}.`
          : `You need to mark interest in this event before you can view ${blockedSection}.`
        }
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

function ShareIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v10" />
      <path d="M6 6l4-4 4 4" />
      <path d="M4 10v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" />
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

function CalendarTypeIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4" width="15" height="13.5" rx="2" />
      <line x1="2.5" y1="8.5" x2="17.5" y2="8.5" />
      <line x1="6.5" y1="2" x2="6.5" y2="5.5" />
      <line x1="13.5" y1="2" x2="13.5" y2="5.5" />
    </svg>
  )
}

function GroupTypeIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="6.5" r="2.5" />
      <circle cx="13" cy="6.5" r="2.5" />
      <path d="M1.5 18c0-2.5 2.5-4.5 5.5-4.5 1.5 0 2.8.5 3.7 1.3" />
      <path d="M13 13.5c3 0 5.5 2 5.5 4.5" />
    </svg>
  )
}

function SearchIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="7.5" r="5.5" />
      <line x1="12" y1="12" x2="16" y2="16" />
    </svg>
  )
}

function InfoCircleIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8" />
      <line x1="10" y1="9" x2="10" y2="14" />
      <circle cx="10" cy="6.5" r="0.75" fill={color} stroke="none" />
    </svg>
  )
}
