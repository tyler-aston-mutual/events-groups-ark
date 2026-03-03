import { useNavigate } from 'react-router-dom'
import { useTheme } from '../design-system/context/ThemeProvider'
import { Chip } from '../design-system'

export function SpeedDatingBanner({ onDismiss }) {
  const { colors } = useTheme()
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate('/speed-dating')}
      style={{
        backgroundColor: colors.brandPrimary,
        borderRadius: 16,
        padding: 16,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Top row: session chip + dismiss */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 14,
      }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          height: 26,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 8,
          backgroundColor: 'rgba(255,255,255,0.15)',
          fontSize: 13,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.85)',
          fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
          whiteSpace: 'nowrap',
        }}>
          Next Session: Wednesday 7PM MST
        </span>

        <button
          onClick={(e) => { e.stopPropagation(); onDismiss(); }}
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            border: 'none',
            backgroundColor: 'rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.85)',
            fontSize: 16,
            fontWeight: 400,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      {/* Content: icon + text */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
      }}>
        <img
          src={import.meta.env.BASE_URL + 'speed-dating.png'}
          alt="Speed Dating"
          style={{
            width: 48,
            height: 48,
            objectFit: 'contain',
            flexShrink: 0,
            opacity: 0.85,
          }}
        />
        <div>
          <div style={{
            fontSize: 22,
            fontWeight: 700,
            color: colors.constantWhite,
            lineHeight: '26px',
            fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
            marginBottom: 4,
          }}>
            Virtual Speed Dating
          </div>
          <div style={{
            fontSize: 14,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: '18px',
            fontFamily: "'Goldman Sans', sans-serif",
          }}>
            Meet new people to talk to.
          </div>
        </div>
      </div>
    </div>
  )
}
