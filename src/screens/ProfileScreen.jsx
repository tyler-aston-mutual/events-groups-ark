import { useNavigate, useLocation } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { useTheme } from '../design-system/context/ThemeProvider'

const PROFILE_ATTRIBUTES = [
  [
    { icon: 'children', label: 'No Child(ren)' },
    { icon: 'temple', label: 'As often as possible' },
    { icon: 'photos', label: 'Yes' },
    { icon: 'location', label: 'Genola' },
  ],
  [
    { icon: 'children', label: '1 Child' },
    { icon: 'temple', label: 'Weekly' },
    { icon: 'photos', label: 'Yes' },
    { icon: 'location', label: 'Provo' },
  ],
  [
    { icon: 'children', label: 'No Child(ren)' },
    { icon: 'temple', label: 'Monthly' },
    { icon: 'photos', label: 'No' },
    { icon: 'location', label: 'Salt Lake City' },
  ],
  [
    { icon: 'children', label: 'No Child(ren)' },
    { icon: 'temple', label: 'As often as possible' },
    { icon: 'photos', label: 'Yes' },
    { icon: 'location', label: 'Lehi' },
  ],
  [
    { icon: 'children', label: '2 Children' },
    { icon: 'temple', label: 'Weekly' },
    { icon: 'photos', label: 'Yes' },
    { icon: 'location', label: 'Orem' },
  ],
]

const PROMPTS = [
  { question: 'One thing you should know about me is', answer: '-Disc Golf and that it\'s an important part of my life!\n\n- I\'m fairly quiet until I get to know and trust you. So let\'s go out and get to know each other!\n\n- Good health and exercise is a must.\n\n- Poor communication is a deal breaker.' },
  { question: 'My ideal first date would be', answer: 'Something simple like getting ice cream and going for a walk. I think the best conversations happen when you\'re relaxed and not overthinking things.' },
  { question: 'A fun fact about me is', answer: 'I once hiked the Narrows in Zion in January. It was freezing but absolutely worth it. I love a good adventure!' },
  { question: 'I\'m looking for someone who', answer: 'Values honesty and communication above all else. Someone who is confident in who they are and isn\'t afraid to be themselves.' },
  { question: 'On weekends you\'ll find me', answer: 'Either out on the trails, at a local coffee shop, or trying a new restaurant with friends. I love exploring new spots!' },
]

export default function ProfileScreen() {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const { participant } = location.state || {}

  if (!participant) return null

  const attrs = PROFILE_ATTRIBUTES[participant.id % PROFILE_ATTRIBUTES.length]
  const prompt = PROMPTS[participant.id % PROMPTS.length]
  const extraCount = 6 + (participant.id % 8) // fake "View More" count

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
        WebkitOverflowScrolling: 'touch',
      }}>
        {/* Photo section with floating header */}
        <div style={{ position: 'relative' }}>
          {/* Full-bleed photo */}
          <img
            src={participant.image}
            alt={participant.name}
            style={{
              width: '100%',
              aspectRatio: '3 / 4',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Floating header bar */}
          <div style={{
            position: 'absolute',
            top: 12,
            left: 12,
            right: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
              }}
            >
              <BackArrow />
            </button>

            {/* Name pill */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: 24,
              padding: '6px 16px 6px 6px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
            }}>
              <img
                src={participant.image}
                alt=""
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  objectFit: 'cover',
                }}
              />
              <span style={{
                fontSize: 16,
                fontWeight: 700,
                color: colors.grey1000,
                fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
              }}>
                {participant.name}
              </span>
            </div>

            {/* More button */}
            <button style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
            }}>
              <MoreDots />
            </button>
          </div>
        </div>

        {/* Attributes section */}
        <div style={{
          padding: '12px 16px 0',
        }}>
          <div style={{
            backgroundColor: colors.grey0,
            borderRadius: 14,
            padding: '16px 16px 12px',
          }}>
            {attrs.map((attr, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 0',
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.brandPrimary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <AttributeIcon type={attr.icon} />
                </div>
                <span style={{
                  fontSize: 16,
                  fontWeight: 400,
                  color: colors.grey1000,
                  fontFamily: "'Goldman Sans', sans-serif",
                }}>
                  {attr.label}
                </span>
              </div>
            ))}

            {/* Divider */}
            <div style={{
              height: 1,
              backgroundColor: colors.grey100,
              margin: '4px 0',
            }} />

            {/* View More */}
            <div style={{
              textAlign: 'center',
              padding: '14px 0 6px',
            }}>
              <span style={{
                fontSize: 15,
                fontWeight: 500,
                color: colors.grey400,
                fontFamily: "'Goldman Sans', sans-serif",
              }}>
                View More ({extraCount})
              </span>
            </div>
          </div>
        </div>

        {/* Prompt section */}
        <div style={{
          padding: '12px 16px 32px',
        }}>
          <div style={{
            backgroundColor: colors.grey0,
            borderRadius: 14,
            padding: 20,
          }}>
            <div style={{
              fontSize: 14,
              fontWeight: 400,
              color: colors.grey400,
              fontFamily: "'Goldman Sans', sans-serif",
              marginBottom: 8,
            }}>
              {prompt.question}
            </div>
            <div style={{
              fontSize: 22,
              fontWeight: 700,
              color: colors.grey1000,
              fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
              lineHeight: 1.35,
              whiteSpace: 'pre-line',
            }}>
              {prompt.answer}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Inline icons ──────────────────────────────────────────────── */

function BackArrow() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none"
      stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 1L1 9l8 8" />
    </svg>
  )
}

function MoreDots() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="#1a1a1a">
      <circle cx="4" cy="10" r="2" />
      <circle cx="10" cy="10" r="2" />
      <circle cx="16" cy="10" r="2" />
    </svg>
  )
}

function AttributeIcon({ type }) {
  const iconProps = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'white', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (type) {
    case 'children':
      // Smiley face
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
          <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
        </svg>
      )
    case 'temple':
      // Temple / church
      return (
        <svg {...iconProps}>
          <path d="M12 2L2 9h3v11h14V9h3L12 2Z" />
          <path d="M9 22V12h6v10" />
        </svg>
      )
    case 'photos':
      // Image / photos
      return (
        <svg {...iconProps}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      )
    case 'location':
      // Home / location
      return (
        <svg {...iconProps}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    default:
      return null
  }
}
