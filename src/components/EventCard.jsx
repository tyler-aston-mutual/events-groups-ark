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
    }}>
      <div style={{ display: 'flex', padding: 12, gap: 12, alignItems: 'flex-start' }}>
        {/* Image */}
        <div style={{
          width: 100,
          height: 100,
          borderRadius: 12,
          overflow: 'hidden',
          flexShrink: 0,
          backgroundColor: imageBg || colors.grey100,
          marginTop: 26,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {image && (
            <img
              src={image}
              alt={title}
              style={{
                width: imageBg ? '60%' : '100%',
                height: imageBg ? '60%' : '100%',
                objectFit: imageBg ? 'contain' : 'cover',
              }}
            />
          )}
        </div>

        {/* Details */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Top row: badges + calendar icon */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 8,
            marginBottom: 6,
          }}>
            {tag && (
              <Chip text={tag} variant="constantPrimary" size="compact" />
            )}
            {featured && (
              <Chip text="Featured" variant="accent5" size="compact" />
            )}
            {type === 'group'
              ? <GroupBadgeIcon color={colors.grey400} />
              : <CalendarIcon color={colors.grey400} />
            }
          </div>

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
          <InfoRow icon={<PeopleIcon color={colors.grey400} />} color={colors.grey600}>
            {going} {type === 'group' ? 'members' : 'going'}
          </InfoRow>

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

function CalendarIcon({ color }) {
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
function GroupBadgeIcon({ color }) {
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

function GroupIcon({ color }) {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill={color} stroke="none">
      <circle cx="4" cy="3.5" r="2" />
      <circle cx="8" cy="3.5" r="2" />
      <circle cx="12" cy="3.5" r="2" />
      <path d="M0 12.5c0-2 1.8-3.5 4-3.5 1.2 0 2.3.5 3 1.3" />
      <path d="M5 10.3c.7-.8 1.8-1.3 3-1.3s2.3.5 3 1.3" />
      <path d="M11 10.3c.7-.8 1.8-1.3 3-1.3 2.2 0 4 1.5 4 3.5H12.5" />
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
