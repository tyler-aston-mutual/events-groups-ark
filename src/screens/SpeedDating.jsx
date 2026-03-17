import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { Chip, PrimaryButton } from '../design-system'
import { useTheme } from '../design-system/context/ThemeProvider'
import blurPhoto1 from '../assets/people/male/male-06.jpg'
import blurPhoto2 from '../assets/people/female/female-06.jpg'
import blurPhoto3 from '../assets/people/male/male-07.jpg'

const BLURRED_PHOTOS = [blurPhoto1, blurPhoto2, blurPhoto3]

export default function SpeedDating() {
  const { colors } = useTheme()
  const navigate = useNavigate()

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.grey0,
      overflow: 'hidden',
    }}>
      <StatusBar />

      {/* Scrollable content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        {/* Close button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: 56,
            left: 16,
            zIndex: 10,
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: 'rgba(0,0,0,0.35)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          <CloseIcon />
        </button>

        {/* Blurred photo strip */}
        <div style={{
          display: 'flex',
          height: 240,
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          {BLURRED_PHOTOS.map((src, i) => (
            <div key={i} style={{
              flex: 1,
              overflow: 'hidden',
            }}>
              <img
                src={src}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'blur(20px)',
                  transform: 'scale(1.1)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: '20px 20px 0' }}>
          {/* Session badge */}
          <div style={{ marginBottom: 12 }}>
            <Chip text="SESSION IS LIVE!" variant="accent5" size="compact" />
          </div>

          {/* Title */}
          <div style={{
            fontSize: 32,
            fontWeight: 700,
            color: colors.grey1000,
            lineHeight: '36px',
            marginBottom: 12,
          }}>
            Blind Speed Dating
          </div>

          {/* Description */}
          <div style={{
            fontSize: 16,
            fontWeight: 400,
            color: colors.grey600,
            lineHeight: '22px',
            marginBottom: 28,
          }}>
            We'll pair you for a chat. After, you decide if it is a match or to meet someone else
          </div>

          {/* Info rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Conversation Type */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <ChatIcon color={colors.grey400} />
              </div>
              <div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: colors.grey400,
                  lineHeight: '18px',
                }}>
                  Conversation Type
                </div>
                <div style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: colors.grey1000,
                  lineHeight: '20px',
                }}>
                  5 Minute Text Chat
                </div>
              </div>
            </div>

            {/* Filter Preferences */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              cursor: 'pointer',
            }}>
              <div style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <FilterIcon color={colors.grey400} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: colors.grey400,
                  lineHeight: '18px',
                }}>
                  Filter Preferences
                </div>
                <div style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: colors.grey1000,
                  lineHeight: '20px',
                }}>
                  --
                </div>
              </div>
              <ChevronRight color={colors.grey300} />
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Start Matching button */}
        <div style={{ padding: '20px 20px 40px' }}>
          <PrimaryButton
            title="Start Matching"
            size="large"
            isFullWidth
          />
        </div>
      </div>
    </div>
  )
}

// ─── Icons ────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round">
      <line x1="2" y1="2" x2="12" y2="12" />
      <line x1="12" y1="2" x2="2" y2="12" />
    </svg>
  )
}

function ChatIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21l-3 3v-6.5C3.5 15.5 2.5 13 2.5 10.5 2.5 5.8 6.8 2 12 2s9.5 3.8 9.5 8.5c0 1.5-.4 2.9-1 4.1" />
      <circle cx="19" cy="19" r="5.5" />
      <path d="M17.5 19h3M19 17.5v3" />
    </svg>
  )
}

function FilterIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="8" r="4" />
      <circle cx="18" cy="20" r="4" />
      <line x1="14" y1="8" x2="24" y2="8" />
      <line x1="4" y1="8" x2="6" y2="8" />
      <line x1="4" y1="20" x2="14" y2="20" />
      <line x1="22" y1="20" x2="24" y2="20" />
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
