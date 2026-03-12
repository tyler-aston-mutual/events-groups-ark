import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { ThemedDialog } from '../design-system'
import { useTheme } from '../design-system/context/ThemeProvider'

export default function CreateScreen({ type }) {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const isEvent = type === 'event'

  // Form state
  const [name, setName] = useState('')
  const [location, setLocation] = useState(isEvent ? '' : 'Anywhere')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [displayCreator, setDisplayCreator] = useState(true)
  const [ageRangeEnabled, setAgeRangeEnabled] = useState(true)
  const [minAge, setMinAge] = useState(18)
  const [maxAge, setMaxAge] = useState(85)
  const [expirationDate, setExpirationDate] = useState('')

  // Event-only state
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [isVirtual, setIsVirtual] = useState(false)
  const [visibilityRadius, setVisibilityRadius] = useState('50 mi')

  // Tab visibility
  const [showParticipants, setShowParticipants] = useState(true)
  const [showEvents, setShowEvents] = useState(true)

  // Confirmation modal
  const [confirmOpen, setConfirmOpen] = useState(false)

  const canCreate = name.trim().length > 0

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
          fontSize: 18,
          fontWeight: 700,
          color: colors.grey1000,
          fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
        }}>
          Create {isEvent ? 'Event' : 'Group'}
        </div>
        <button
          onClick={() => setConfirmOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            fontSize: 16,
            fontWeight: 700,
            color: colors.brandPrimary,
            fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
            transition: 'color 0.2s ease',
          }}
        >
          Create
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: colors.grey100, flexShrink: 0 }} />

      {/* Scrollable form */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px', paddingBottom: 100 }}>

        {/* 1. Name */}
        <SectionLabel colors={colors} text={isEvent ? 'Event Name' : 'Group Name'} />
        <FormInput
          placeholder="Give it a name"
          value={name}
          onChange={setName}
          colors={colors}
        />

        {/* 2. Photo Upload */}
        <SectionLabel colors={colors} text="Photo" />
        <div style={{
          height: 160,
          borderRadius: 14,
          border: `2px dashed ${colors.grey200}`,
          backgroundColor: colors.grey50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          cursor: 'pointer',
        }}>
          <CameraIcon color={colors.grey400} />
          <div style={{
            fontSize: 14,
            fontWeight: 500,
            color: colors.grey400,
            fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
          }}>
            Add Photo
          </div>
        </div>

        {/* 3. Date & Time (events only) */}
        {isEvent && (
          <>
            <SectionLabel colors={colors} text="Date & Time" />
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1.2 }}>
                <input
                  type={eventDate ? 'date' : 'text'}
                  placeholder="MM/DD/YYYY"
                  value={eventDate}
                  onFocus={e => { e.target.type = 'date' }}
                  onBlur={e => { if (!eventDate) e.target.type = 'text' }}
                  onChange={e => setEventDate(e.target.value)}
                  style={{
                    width: '100%',
                    height: 44,
                    borderRadius: 10,
                    border: `1.5px solid ${colors.grey200}`,
                    backgroundColor: colors.grey0,
                    padding: '0 12px',
                    fontSize: 15,
                    fontWeight: 400,
                    color: eventDate ? colors.grey1000 : colors.grey400,
                    fontFamily: "'Goldman Sans', sans-serif",
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ flex: 0.8 }}>
                <input
                  type={eventTime ? 'time' : 'text'}
                  placeholder="HH:MM"
                  value={eventTime}
                  onFocus={e => { e.target.type = 'time' }}
                  onBlur={e => { if (!eventTime) e.target.type = 'text' }}
                  onChange={e => setEventTime(e.target.value)}
                  style={{
                    width: '100%',
                    height: 44,
                    borderRadius: 10,
                    border: `1.5px solid ${colors.grey200}`,
                    backgroundColor: colors.grey0,
                    padding: '0 12px',
                    fontSize: 15,
                    fontWeight: 400,
                    color: eventTime ? colors.grey1000 : colors.grey400,
                    fontFamily: "'Goldman Sans', sans-serif",
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
            <div style={{
              marginTop: 8,
              display: 'flex',
              gap: 8,
            }}>
              {['MST', 'EST', 'CST', 'PST'].map(tz => (
                <div
                  key={tz}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    backgroundColor: tz === 'MST' ? colors.grey1000 : colors.grey50,
                    color: tz === 'MST' ? colors.grey0 : colors.grey600,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
                    cursor: 'pointer',
                  }}
                >
                  {tz}
                </div>
              ))}
            </div>
          </>
        )}

        {/* 4. Location */}
        <SectionLabel colors={colors} text="Location" optional />
        <FormInput
          placeholder={isEvent && isVirtual ? "Paste a Zoom or meeting link" : "Add a place"}
          value={location}
          onChange={setLocation}
          colors={colors}
        />

        {/* Virtual Meeting checkbox — events only */}
        {isEvent && (
          <div
            onClick={() => setIsVirtual(!isVirtual)}
            style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginTop: 10,
            cursor: 'pointer',
          }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                borderWidth: '1.5px',
                borderStyle: 'solid',
                borderColor: isVirtual ? colors.brandPrimary : colors.grey300,
                backgroundColor: isVirtual ? colors.brandPrimary : colors.grey0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                boxSizing: 'border-box',
              }}
            >
              {isVirtual && (
                <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                  <path d="M1.5 5L5 8.5L11.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{
              fontSize: 15,
              fontWeight: 500,
              color: colors.grey1000,
              fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
            }}>
              Virtual Meeting
            </span>
          </div>
        )}

        {/* Visibility Radius — events only, when location is provided and not virtual */}
        {isEvent && location.trim() && !isVirtual && (
          <div style={{ marginTop: 14 }}>
            <div style={{
              fontSize: 14,
              fontWeight: 700,
              color: colors.grey1000,
              fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
              marginBottom: 2,
            }}>
              Visible To
            </div>
            <div style={{
              fontSize: 13,
              color: colors.grey400,
              fontFamily: "'Goldman Sans', sans-serif",
              marginBottom: 10,
              lineHeight: '17px',
            }}>
              Who can discover this event
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Global', '100 mi', '50 mi'].map(option => (
                <div
                  key={option}
                  onClick={() => setVisibilityRadius(option)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    backgroundColor: visibilityRadius === option ? colors.grey1000 : colors.grey50,
                    color: visibilityRadius === option ? colors.grey0 : colors.grey600,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
                    cursor: 'pointer',
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Description */}
        <SectionLabel colors={colors} text="Description" optional />
        <FormTextarea
          placeholder="What should people know about this?"
          value={description}
          onChange={setDescription}
          colors={colors}
        />

        {/* 6. Link for More Info */}
        <SectionLabel colors={colors} text="Link for More Info" />
        <FormInput
          placeholder="https://"
          value={link}
          onChange={setLink}
          colors={colors}
        />

        {/* 7. Add to Group (events only) */}
        {isEvent && (
          <>
            <SectionLabel colors={colors} text="Add to Group" />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              height: 50,
              borderRadius: 10,
              border: `1.5px solid ${colors.grey200}`,
              backgroundColor: colors.grey0,
              padding: '0 14px',
              cursor: 'pointer',
            }}>
              <GroupLinkIcon color={colors.grey400} />
              <div style={{
                flex: 1,
                fontSize: 15,
                fontWeight: 400,
                color: colors.grey400,
                fontFamily: "'Goldman Sans', sans-serif",
                marginLeft: 12,
              }}>
                Choose a Group
              </div>
              <ChevronRight color={colors.grey300} />
            </div>
          </>
        )}

        {/* Divider before toggles */}
        <div style={{ height: 1, backgroundColor: colors.grey100, marginTop: 24 }} />

        {/* 8. Age Range */}
        <div style={{ padding: '14px 0', borderBottom: `1px solid ${colors.grey100}` }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{
              fontSize: 15,
              fontWeight: 700,
              color: colors.grey1000,
              fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
            }}>
              Age Range
            </div>
            <ToggleSwitch value={ageRangeEnabled} onChange={setAgeRangeEnabled} colors={colors} />
          </div>
          <div style={{
            fontSize: 13,
            color: colors.grey400,
            fontFamily: "'Goldman Sans', sans-serif",
            marginTop: 2,
            lineHeight: '17px',
          }}>
            Optional — set a soft age preference for new members
          </div>

          {ageRangeEnabled && (
            <div style={{
              marginTop: 14,
              backgroundColor: colors.grey50,
              borderRadius: 14,
              padding: '18px 16px 14px',
            }}>
              {/* Minimum Age */}
              <div style={{ marginBottom: 16 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: colors.grey1000,
                    fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
                  }}>
                    Minimum Age
                  </span>
                  <span style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: colors.grey1000,
                    fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
                  }}>
                    {minAge}
                  </span>
                </div>
                <AgeSlider
                  value={minAge}
                  min={18}
                  max={85}
                  onChange={(v) => {
                    setMinAge(v)
                    if (v > maxAge) setMaxAge(v)
                  }}
                  colors={colors}
                />
              </div>

              {/* Maximum Age */}
              <div style={{ marginBottom: 14 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: colors.grey1000,
                    fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
                  }}>
                    Maximum Age
                  </span>
                  <span style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: colors.grey1000,
                    fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
                  }}>
                    {maxAge === 85 ? '85+' : maxAge}
                  </span>
                </div>
                <AgeSlider
                  value={maxAge}
                  min={18}
                  max={85}
                  onChange={(v) => {
                    setMaxAge(v)
                    if (v < minAge) setMinAge(v)
                  }}
                  colors={colors}
                />
              </div>

              {/* Disclaimer */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                marginTop: 4,
              }}>
                <InfoIcon color={colors.grey400} />
                <span style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: colors.grey400,
                  fontFamily: "'Goldman Sans', sans-serif",
                  lineHeight: '16px',
                  flex: 1,
                }}>
                  This is a soft limit. Existing members are never removed if the range changes.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 9. Display Creator */}
        <ToggleRow
          label="Display Creator"
          description="Show who created this on the detail page"
          value={displayCreator}
          onChange={setDisplayCreator}
          colors={colors}
        />

        {/* 9. Expiration Date */}
        <div style={{ padding: '14px 0', borderBottom: `1px solid ${colors.grey100}` }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{
                fontSize: 15,
                fontWeight: 500,
                color: colors.grey1000,
                fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
              }}>
                Expiration Date
              </div>
              <div style={{
                fontSize: 13,
                color: colors.grey400,
                fontFamily: "'Goldman Sans', sans-serif",
                marginTop: 2,
              }}>
                When this listing should expire
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <input
              type="date"
              value={expirationDate}
              onChange={e => setExpirationDate(e.target.value)}
              style={{
                width: '100%',
                height: 44,
                borderRadius: 10,
                border: `1.5px solid ${colors.grey200}`,
                backgroundColor: colors.grey0,
                padding: '0 14px',
                fontSize: 15,
                fontWeight: 400,
                color: expirationDate ? colors.grey1000 : colors.grey400,
                fontFamily: "'Goldman Sans', sans-serif",
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* 10. Tab Visibility */}
        <div style={{ marginTop: 4 }}>
          <div style={{
            fontSize: 13,
            fontWeight: 500,
            color: colors.grey400,
            fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
            padding: '14px 0 4px',
          }}>
            Visible Tabs on Detail Page
          </div>
          <ToggleRow
            label="Participants"
            value={showParticipants}
            onChange={setShowParticipants}
            colors={colors}
          />
          {!isEvent && (
            <ToggleRow
              label="Events"
              value={showEvents}
              onChange={setShowEvents}
              colors={colors}
            />
          )}
        </div>

      </div>

      {/* Confirmation modal */}
      <ThemedDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title={`Submit ${isEvent ? 'Event' : 'Group'}`}
        message="Confirm submission for Mutual to review. Future visibility and appropriate content is up to Mutual."
        buttons={[
          { title: 'Cancel', variant: 'secondary', onClick: () => setConfirmOpen(false) },
          { title: 'Submit', variant: 'primary', onClick: () => {
            setConfirmOpen(false)
            navigate(-1)
          }},
        ]}
      />
    </div>
  )
}

// ─── Form Helpers ────────────────────────────────────────────────

function SectionLabel({ colors, text, optional }) {
  return (
    <div style={{
      fontSize: 14,
      fontWeight: 700,
      color: colors.grey1000,
      fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
      marginBottom: 8,
      marginTop: 20,
    }}>
      {text}
      {optional && (
        <span style={{
          fontWeight: 400,
          color: colors.grey400,
          fontFamily: "'Goldman Sans', sans-serif",
          fontSize: 13,
        }}>
          {' '}(optional)
        </span>
      )}
    </div>
  )
}

function FormInput({ placeholder, value, onChange, colors }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        height: 44,
        borderRadius: 10,
        border: `1.5px solid ${colors.grey200}`,
        backgroundColor: colors.grey0,
        padding: '0 14px',
        fontSize: 15,
        fontWeight: 400,
        color: colors.grey1000,
        fontFamily: "'Goldman Sans', sans-serif",
        outline: 'none',
        boxSizing: 'border-box',
      }}
    />
  )
}

function FormTextarea({ placeholder, value, onChange, colors }) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        minHeight: 100,
        borderRadius: 10,
        border: `1.5px solid ${colors.grey200}`,
        backgroundColor: colors.grey0,
        padding: '12px 14px',
        fontSize: 15,
        fontWeight: 400,
        color: colors.grey1000,
        fontFamily: "'Goldman Sans', sans-serif",
        outline: 'none',
        resize: 'none',
        boxSizing: 'border-box',
        lineHeight: '22px',
      }}
    />
  )
}

function ToggleSwitch({ value, onChange, colors }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 50,
        height: 30,
        borderRadius: 15,
        backgroundColor: value ? colors.brandPrimary : colors.grey200,
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.2s ease',
        flexShrink: 0,
        padding: 0,
      }}
    >
      <div style={{
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: colors.grey0,
        position: 'absolute',
        top: 2,
        left: value ? 22 : 2,
        transition: 'left 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
      }} />
    </button>
  )
}

function ToggleRow({ label, description, value, onChange, colors }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 0',
      borderBottom: `1px solid ${colors.grey100}`,
    }}>
      <div style={{ flex: 1, marginRight: 16 }}>
        <div style={{
          fontSize: 15,
          fontWeight: 500,
          color: colors.grey1000,
          fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
        }}>
          {label}
        </div>
        {description && (
          <div style={{
            fontSize: 13,
            color: colors.grey400,
            fontFamily: "'Goldman Sans', sans-serif",
            marginTop: 2,
            lineHeight: '17px',
          }}>
            {description}
          </div>
        )}
      </div>
      <ToggleSwitch value={value} onChange={onChange} colors={colors} />
    </div>
  )
}

// ─── Icons ───────────────────────────────────────────────────────

function BackArrow({ color }) {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 1L1 9l8 8" />
    </svg>
  )
}

function CameraIcon({ color }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10.5A2.5 2.5 0 0 1 6.5 8h2.38a2 2 0 0 0 1.66-.89L12 5.5a2 2 0 0 1 1.66-.89h4.68A2 2 0 0 1 20 5.5l1.46 1.61A2 2 0 0 0 23.12 8H25.5A2.5 2.5 0 0 1 28 10.5V24a2.5 2.5 0 0 1-2.5 2.5h-19A2.5 2.5 0 0 1 4 24V10.5z" />
      <circle cx="16" cy="17" r="4.5" />
    </svg>
  )
}

function GroupLinkIcon({ color }) {
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

function AgeSlider({ value, min, max, onChange, colors }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div style={{ position: 'relative', height: 30, display: 'flex', alignItems: 'center' }}>
      {/* Track background */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.grey200,
      }} />
      {/* Filled track */}
      <div style={{
        position: 'absolute',
        left: 0,
        width: `${pct}%`,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.brandPrimary,
      }} />
      {/* Native range input — styled transparent, sits on top */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          width: '100%',
          height: 30,
          margin: 0,
          opacity: 0,
          cursor: 'pointer',
          zIndex: 2,
        }}
      />
      {/* Thumb */}
      <div style={{
        position: 'absolute',
        left: `calc(${pct}% - 14px)`,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.grey0,
        boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
        border: `2px solid ${colors.brandPrimary}`,
        pointerEvents: 'none',
        boxSizing: 'border-box',
      }} />
    </div>
  )
}

function InfoIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="8" cy="8" r="6.5" />
      <line x1="8" y1="7" x2="8" y2="11" />
      <circle cx="8" cy="5" r="0.5" fill={color} stroke="none" />
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
