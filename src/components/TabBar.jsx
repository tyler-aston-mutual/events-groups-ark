import { useTheme } from '../design-system/context/ThemeProvider'

const TABS = [
  { id: 'matches',  Icon: MutualLogoIcon },
  { id: 'likes',    Icon: HeartIcon      },
  { id: 'messages', Icon: MessagesIcon, badge: 6 },
  { id: 'connect',  Icon: ConnectIcon    },
  { id: 'profile',  Icon: ProfileIcon    },
]

export function TabBar({ activeTab = 'connect' }) {
  const { colors } = useTheme()

  return (
    <div style={{
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'flex-start',
      paddingTop: 12,
      paddingBottom: 28,
      flexShrink: 0,
    }}>
      {TABS.map(({ id, Icon, badge }) => {
        const isActive = id === activeTab
        const iconColor = isActive ? '#FFFFFF' : 'rgba(255,255,255,0.4)'

        return (
          <div key={id} style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            position: 'relative',
          }}>
            {/* Active indicator — red bar at top */}
            {isActive && (
              <div style={{
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 24,
                height: 3,
                borderRadius: 1.5,
                backgroundColor: colors.brandAccent5,
              }} />
            )}
            <div style={{ position: 'relative' }}>
              <Icon color={iconColor} size={26} />
              {badge && (
                <div style={{
                  position: 'absolute',
                  top: -5,
                  right: -8,
                  backgroundColor: colors.brandAccent5,
                  color: '#FFFFFF',
                  borderRadius: 10,
                  minWidth: 18,
                  height: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  padding: '0 4px',
                  boxSizing: 'border-box',
                }}>
                  {badge}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Tab Icons ──────────────────────────────────────────────────────

// Open box / container icon — events tab
function MutualLogoIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" />
      <path d="M2 8l3-5h14l3 5" />
    </svg>
  )
}

function HeartIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

// Two overlapping speech bubbles
function MessagesIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H9l-4 4V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
      <path d="M3 15V5a2 2 0 0 1 2-2h12" />
    </svg>
  )
}

// Two people side by side — represents connecting with others in person
function ConnectIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8"  cy="7" r="3" />
      <circle cx="16" cy="7" r="3" />
      <path d="M1 21c0-3 3.1-5.5 7-5.5s7 2.5 7 5.5" />
      <path d="M16 15.5c3.9 0 7 2.5 7 5.5" />
    </svg>
  )
}

// Single person silhouette
function ProfileIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20v-1a8 8 0 0 1 16 0v1" />
    </svg>
  )
}
