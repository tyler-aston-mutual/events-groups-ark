import { useTheme } from '../design-system/context/ThemeProvider'
import { useIsMobile } from '../hooks/useIsMobile'

// ─── Tab Icons ──────────────────────────────────────────────────────

// Ark logo — first tab icon
function ArkLogoIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 175 175" fill={color} xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#ark-clip)">
        <path d="M94.5755 5.07946L88.23 0L81.8565 5.07946C69.0813 15.2667 45.5806 28.6606 25 36.5778V58.6266C46.6476 51.3053 71.861 37.7128 88.2019 26.1635C105.217 38.4222 129.644 51.9296 150 58.6266V36.6345C130.711 29.1998 108.109 15.8627 94.5755 5.07946Z" />
        <path d="M113.471 60.6642C102.83 60.6642 93.7893 65.7436 87.8088 70.3123C81.4634 65.4882 71.7205 60.125 60.3212 60.6642C50.6064 61.1466 41.7059 65.5734 35.2763 73.15C28.5096 81.0387 25.2807 91.6233 26.3477 102.123C29.6889 134.643 62.9043 163.502 84.3272 172.781L88.3704 174.54L92.4135 172.781C116.279 162.452 149.354 130.329 149.354 97.0149C149.354 76.9809 133.238 60.6925 113.443 60.6925L113.471 60.6642ZM88.3704 151.697C71.159 142.503 48.8656 120.341 46.7879 99.9661C46.2825 95.1137 47.7706 90.2896 50.8311 86.6574C53.5546 83.4791 57.2608 81.5779 61.2758 81.4076C61.5004 81.4076 61.697 81.4076 61.9216 81.4076C69.6709 81.4076 77.6729 88.3883 80.1156 91.1125L87.8369 99.9093L95.502 91.1125C95.502 91.1125 104.346 81.4644 113.5 81.4644C121.979 81.4644 128.858 88.4451 128.858 97.0433C128.858 118.241 106.171 142.134 88.3984 151.754L88.3704 151.697Z" />
      </g>
      <defs>
        <clipPath id="ark-clip">
          <rect width="125" height="175" transform="translate(25)" />
        </clipPath>
      </defs>
    </svg>
  )
}

// Two overlapping rings — Circles tab icon
function CirclesIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="12" r="7" />
      <circle cx="15" cy="12" r="7" />
    </svg>
  )
}

const TABS = [
  { id: 'matches',  Icon: ArkLogoIcon },
  { id: 'likes',    image: 'tab_bar_icon_2.png' },
  { id: 'messages', image: 'tab_bar_icon_3.png', badge: 6 },
  { id: 'circles',  Icon: CirclesIcon },
  { id: 'profile',  image: 'tab_bar_icon_5.png' },
]

export function TabBar({ activeTab = 'circles' }) {
  const { colors } = useTheme()
  const isMobile = useIsMobile()

  return (
    <div style={{
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'flex-start',
      paddingTop: 12,
      paddingBottom: 28,
      flexShrink: 0,
    }}>
      {TABS.map(({ id, Icon, image, badge }) => {
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
              {image ? (
                <img
                  src={import.meta.env.BASE_URL + image}
                  alt={id}
                  style={{
                    width: 26,
                    height: 26,
                    objectFit: 'contain',
                    opacity: isActive ? 1 : 0.4,
                  }}
                />
              ) : (
                <Icon color={iconColor} size={26} />
              )}
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
