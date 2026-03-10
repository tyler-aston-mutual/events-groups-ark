import { useTheme } from '../design-system/context/ThemeProvider'
import { Chip } from '../design-system'

export function EventCard({
  type = 'event',
  title,
  image,
  date,
  location,
  going,
  group,
  featured = false,
  official = false,
  tag,
  imageBg,
}) {
  const { colors } = useTheme()

  return (
    <div style={{
      backgroundColor: colors.grey0,
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      border: 'none',
      position: 'relative',
    }}>
      {/* Type pill — top-right corner (icon only) */}
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 20,
        border: `1.5px solid ${type === 'group' ? colors.brandPrimary : colors.brandAccent5}`,
        backgroundColor: type === 'group' ? `${colors.brandPrimary}14` : `${colors.brandAccent5}14`,
      }}>
        {type === 'group'
          ? <GroupBadgeIcon color={colors.brandPrimary} size={14} />
          : <CalendarIcon color={colors.brandAccent5} size={14} />
        }
      </div>

      <div style={{ display: 'flex', padding: 12, gap: 12, alignItems: 'center' }}>
        {/* Image */}
        {image && (
          <div style={{
            position: 'relative',
            width: 100,
            height: 100,
            borderRadius: 12,
            overflow: 'hidden',
            flexShrink: 0,
            backgroundColor: imageBg || colors.grey100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src={image}
              alt={title}
              style={imageBg ? {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                objectFit: 'contain',
              } : {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

        {/* Details */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Top row: tag chip */}
          {tag && (
            <div style={{ marginBottom: 6 }}>
              <Chip text={tag} variant="constantPrimary" size="compact" />
            </div>
          )}

          {/* Title */}
          <div style={{
            fontSize: 17,
            fontWeight: 700,
            color: colors.grey1000,
            lineHeight: '21px',
            marginBottom: 8,
            fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
          }}>
            {title}
          </div>

          {/* Date (events only) */}
          {type !== 'group' && date && (
            <InfoRow icon={<DateIcon color={colors.grey400} />} color={colors.grey600}>
              {date}
            </InfoRow>
          )}

          {/* Location */}
          <InfoRow icon={<LocationIcon color={colors.grey400} />} color={colors.grey600}>
            {location}
          </InfoRow>

          {/* Attendance */}
          {going > 0 && (
            <InfoRow icon={<PeopleIcon color={colors.grey400} />} color={colors.grey600}>
              {going} {type === 'group' ? 'members' : 'interested'}
            </InfoRow>
          )}

          {/* Group tag */}
          {group && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 4,
            }}>
              <GroupIcon color={colors.brandPrimary} />
              <span style={{
                fontSize: 13,
                fontWeight: 700,
                color: colors.brandPrimary,
                fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
              }}>
                {group.name}
              </span>
              {group.membersOnly && (
                <span style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: colors.grey400,
                  fontFamily: "'Goldman Sans', sans-serif",
                }}>
                  · Members Only
                </span>
              )}
            </div>
          )}
        </div>

        {/* Chevron */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'stretch',
          flexShrink: 0,
          paddingLeft: 4,
        }}>
          <ChevronRight color={colors.grey200} />
        </div>
      </div>
    </div>
  )
}

// ─── Helper: Info Row ─────────────────────────────────────────────

function InfoRow({ icon, color, children }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 4,
    }}>
      <span style={{ display: 'flex', flexShrink: 0 }}>{icon}</span>
      <span style={{
        fontSize: 13,
        fontWeight: 400,
        color,
        lineHeight: '17px',
        fontFamily: "'Goldman Sans', sans-serif",
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {children}
      </span>
    </div>
  )
}

// ─── Icons ────────────────────────────────────────────────────────

function CalendarIcon({ color, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5,3 H13.5 Q17.5,3 17.5,6.5 V14.5 L13.5,19 H4.5 Q2.5,19 2.5,15.5 V6.5 Q2.5,3 4.5,3Z"/>
      <path d="M13.5,19 L13.5,15.5 L17.5,14.5" fill="none"/>
      <rect x="5.5" y="1.5" width="2" height="3.5" rx="1"/>
      <rect x="11.5" y="1.5" width="2" height="3.5" rx="1"/>
      <line x1="2.5" y1="8" x2="17.5" y2="8"/>
    </svg>
  )
}

function DateIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" />
      <line x1="1.5" y1="5.5" x2="12.5" y2="5.5" />
      <line x1="4.5" y1="1" x2="4.5" y2="3.5" />
      <line x1="9.5" y1="1" x2="9.5" y2="3.5" />
    </svg>
  )
}

function LocationIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="6" r="2" />
      <path d="M7 13S2.5 9 2.5 5.75a4.5 4.5 0 0 1 9 0C11.5 9 7 13 7 13z" />
    </svg>
  )
}

function PeopleIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="4.5" r="2" />
      <circle cx="9.5" cy="4.5" r="1.75" />
      <path d="M1 12.5c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" />
      <path d="M9.5 9c2.2 0 3.5 1.5 3.5 3.5" />
    </svg>
  )
}

// Two-person silhouette — stroke-based, matches CalendarIcon style
function GroupBadgeIcon({ color, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="6.5" r="2.5" />
      <circle cx="13" cy="6.5" r="2.5" />
      <path d="M1.5 18c0-2.5 2.5-4.5 5.5-4.5 1.5 0 2.8.5 3.7 1.3" />
      <path d="M13 13.5c3 0 5.5 2 5.5 4.5" />
    </svg>
  )
}

function GroupIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="6.5" r="2.5" />
      <circle cx="13" cy="6.5" r="2.5" />
      <path d="M1.5 18c0-2.5 2.5-4.5 5.5-4.5 1.5 0 2.8.5 3.7 1.3" />
      <path d="M13 13.5c3 0 5.5 2 5.5 4.5" />
    </svg>
  )
}

function VerifiedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1l1.8 1.2 2.1-.3.7 2 1.7 1.3-.3 2.1L15.2 8 14 9.8l.3 2.1-2 .7-1.3 1.7-2.1-.3L8 15.2 6.2 14l-2.1.3-.7-2-1.7-1.3.3-2.1L.8 8 2 6.2l-.3-2.1 2-.7L5 1.7l2.1.3L8 1z" fill="white" />
      <path d="M5.5 8.2l1.7 1.7 3.3-3.4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight({ color }) {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 1l6 6-6 6" />
    </svg>
  )
}
