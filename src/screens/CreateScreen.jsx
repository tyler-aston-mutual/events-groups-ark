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
  const [locationType, setLocationType] = useState('ask') // 'ask' | 'anywhere' | 'virtual' | 'map'
  const [locationDetail, setLocationDetail] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [ageRangeEnabled, setAgeRangeEnabled] = useState(true)
  const [minAge, setMinAge] = useState(18)
  const [maxAge, setMaxAge] = useState(85)
  const [expirationDate, setExpirationDate] = useState('')

  // Event-only state
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [visibilityRadius, setVisibilityRadius] = useState('50 mi')

  // Tab visibility
  const [showParticipants, setShowParticipants] = useState(true)
  const [showEvents, setShowEvents] = useState(true)

  // Participant limit
  const [limitEnabled, setLimitEnabled] = useState(false)
  const [participantLimit, setParticipantLimit] = useState('')

  // Photo upload
  const [photoPreview, setPhotoPreview] = useState(null)

  // Details section (events only)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [detailSetting, setDetailSetting] = useState('') // '' | 'indoor' | 'outdoor' | 'both'
  const [detailCost, setDetailCost] = useState('')
  const [detailCostFree, setDetailCostFree] = useState(false)
  const [detailAttire, setDetailAttire] = useState('')
  const [detailBring, setDetailBring] = useState('')
  const [detailSchedule, setDetailSchedule] = useState('')
  const [detailArrival, setDetailArrival] = useState('')
  const [detailParking, setDetailParking] = useState('')
  const [detailRsvp, setDetailRsvp] = useState('')

  // Confirmation modal
  const [confirmOpen, setConfirmOpen] = useState(false)

  const canCreate = name.trim().length > 0 && description.trim().length > 0

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

        {/* 2. Date & Time (events only) */}
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
        <SectionLabel colors={colors} text="Location" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { key: 'ask', label: 'Ask the Creator' },
            { key: 'anywhere', label: 'Global' },
            { key: 'virtual', label: 'Virtual' },
            { key: 'map', label: 'Map Location' },
          ].map(opt => (
            <div
              key={opt.key}
              onClick={() => { setLocationType(opt.key); setLocationDetail('') }}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                backgroundColor: locationType === opt.key ? colors.grey1000 : colors.grey50,
                color: locationType === opt.key ? colors.grey0 : colors.grey600,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>

        {/* Virtual — link input */}
        {locationType === 'virtual' && (
          <div style={{ marginTop: 10 }}>
            <FormInput
              placeholder="Paste a Zoom or meeting link"
              value={locationDetail}
              onChange={setLocationDetail}
              colors={colors}
            />
          </div>
        )}

        {/* Map Location — fake map + address input */}
        {locationType === 'map' && (
          <div style={{ marginTop: 10 }}>
            <div style={{
              height: 120,
              borderRadius: 12,
              backgroundColor: colors.grey100,
              backgroundImage: 'url(https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-111.89,40.76,11,0/400x200@2x?access_token=placeholder)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* Fake map placeholder with pin */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, ${colors.grey100} 0%, ${colors.grey200} 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}>
                <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
                  <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill={colors.brandAccent5 || colors.brandPrimary} />
                  <circle cx="14" cy="14" r="5" fill="white" />
                </svg>
                <span style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: colors.grey500,
                }}>
                  Tap to set pin on map
                </span>
              </div>
            </div>
            <FormInput
              placeholder="Enter address or venue name"
              value={locationDetail}
              onChange={setLocationDetail}
              colors={colors}
            />
          </div>
        )}

        {/* Visibility Radius — events only, when a physical map location is set */}
        {isEvent && locationType === 'map' && (
          <div style={{ marginTop: 14 }}>
            <div style={{
              fontSize: 14,
              fontWeight: 700,
              color: colors.grey1000,
              marginBottom: 2,
            }}>
              Visible To
            </div>
            <div style={{
              fontSize: 13,
              color: colors.grey400,
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
                    cursor: 'pointer',
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Photo Upload */}
        <SectionLabel colors={colors} text="Photo" optional />
        <input
          type="file"
          accept="image/*"
          id="photo-upload"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              const reader = new FileReader()
              reader.onload = (ev) => setPhotoPreview(ev.target.result)
              reader.readAsDataURL(file)
            }
          }}
        />
        {photoPreview ? (
          <div>
            {/* Card preview mockup */}
            <div style={{
              backgroundColor: colors.grey0,
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              border: 'none',
            }}>
              <div style={{ display: 'flex', padding: 12, gap: 12, alignItems: 'center' }}>
                <div style={{
                  width: 80,
                  height: 80,
                  borderRadius: 12,
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: colors.grey100,
                }}>
                  <img
                    src={photoPreview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: colors.grey1000,
                    lineHeight: '22px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {name.trim() || (isEvent ? 'Event Name' : 'Group Name')}
                  </div>
                  {isEvent && (
                    <div style={{
                      fontSize: 13,
                      fontWeight: 400,
                      color: colors.grey400,
                      marginTop: 4,
                    }}>
                      {eventDate || 'March 25, 2026'} {eventTime ? `- ${eventTime}` : '- 19:00'}
                    </div>
                  )}
                  <div style={{
                    fontSize: 13,
                    fontWeight: 400,
                    color: colors.grey400,
                    marginTop: 2,
                  }}>
                    {locationType === 'ask' ? 'Ask the Creator' : locationType === 'anywhere' ? 'Global' : locationDetail || 'Location'}
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{
              display: 'flex',
              gap: 8,
              marginTop: 8,
            }}>
              <button
                onClick={() => document.getElementById('photo-upload').click()}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 10,
                  border: `1px solid ${colors.grey200}`,
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  color: colors.grey1000,
                }}
              >
                Change Photo
              </button>
              <button
                onClick={() => {
                  setPhotoPreview(null)
                  document.getElementById('photo-upload').value = ''
                }}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 10,
                  border: `1px solid ${colors.grey200}`,
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  color: colors.grey400,
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => document.getElementById('photo-upload').click()}
            style={{
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
            }}
          >
            <CameraIcon color={colors.grey400} />
            <div style={{
              fontSize: 14,
              fontWeight: 500,
              color: colors.grey400,
            }}>
              Add Photo
            </div>
          </div>
        )}

        {/* 6. Description */}
        <SectionLabel colors={colors} text="Description" />
        <FormTextarea
          placeholder="What should people know about this?"
          value={description}
          onChange={setDescription}
          colors={colors}
        />

        {/* Add Details — collapsible, events only */}
        {isEvent && (
          <div style={{ marginTop: 20 }}>
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 16px',
                borderRadius: 14,
                backgroundColor: colors.grey50,
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{
                fontSize: 18,
                fontWeight: 600,
                color: colors.brandPrimary,
                lineHeight: 1,
              }}>
                {detailsOpen ? '−' : '+'}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: colors.grey1000,
                }}>
                  Add Details
                  <span style={{
                    fontWeight: 400,
                    color: colors.grey400,
                    fontSize: 13,
                  }}>
                    {' '}(optional)
                  </span>
                </div>
                <div style={{
                  fontSize: 13,
                  color: colors.grey400,
                  marginTop: 2,
                }}>
                  Cost, attire, parking, and more
                </div>
              </div>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                style={{
                  flexShrink: 0,
                  transform: detailsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              >
                <polyline points="6 9 12 15 18 9" stroke={colors.grey400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {detailsOpen && (
              <div style={{
                marginTop: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}>
                {/* Setting — pill selector */}
                <DetailField emoji="🏠" label="Setting" colors={colors}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[
                      { key: 'indoor', label: 'Indoor' },
                      { key: 'outdoor', label: 'Outdoor' },
                      { key: 'both', label: 'Both' },
                    ].map(opt => (
                      <div
                        key={opt.key}
                        onClick={() => setDetailSetting(detailSetting === opt.key ? '' : opt.key)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 8,
                          backgroundColor: detailSetting === opt.key ? colors.grey1000 : colors.grey50,
                          color: detailSetting === opt.key ? colors.grey0 : colors.grey600,
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                          border: detailSetting === opt.key ? 'none' : `1px solid ${colors.grey200}`,
                        }}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                </DetailField>

                {/* Cost — Free chip + text input */}
                <DetailField emoji="💲" label="Cost" colors={colors}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div
                      onClick={() => {
                        setDetailCostFree(!detailCostFree)
                        if (!detailCostFree) setDetailCost('')
                      }}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 8,
                        backgroundColor: detailCostFree ? colors.grey1000 : colors.grey50,
                        color: detailCostFree ? colors.grey0 : colors.grey600,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: detailCostFree ? 'none' : `1px solid ${colors.grey200}`,
                        flexShrink: 0,
                      }}
                    >
                      Free
                    </div>
                    {!detailCostFree && (
                      <input
                        type="text"
                        placeholder="e.g. $10 per person"
                        value={detailCost}
                        onChange={e => setDetailCost(e.target.value)}
                        style={{
                          flex: 1,
                          height: 36,
                          borderRadius: 8,
                          border: `1.5px solid ${colors.grey200}`,
                          backgroundColor: colors.grey0,
                          padding: '0 12px',
                          fontSize: 14,
                          fontWeight: 400,
                          color: colors.grey1000,
                          outline: 'none',
                          boxSizing: 'border-box',
                          minWidth: 0,
                        }}
                      />
                    )}
                  </div>
                </DetailField>

                {/* Attire */}
                <DetailField emoji="👕" label="Attire" colors={colors}>
                  <DetailInput
                    placeholder="e.g. Casual, athletic wear, Sunday best"
                    value={detailAttire}
                    onChange={setDetailAttire}
                    colors={colors}
                  />
                </DetailField>

                {/* What to Bring */}
                <DetailField emoji="🎒" label="What to Bring" colors={colors}>
                  <DetailInput
                    placeholder="e.g. Water, snacks, comfortable shoes"
                    value={detailBring}
                    onChange={setDetailBring}
                    colors={colors}
                  />
                </DetailField>

                {/* Schedule */}
                <DetailField emoji="📅" label="Schedule" colors={colors}>
                  <DetailInput
                    placeholder="e.g. 6pm appetizers, 7pm dinner, 8pm games"
                    value={detailSchedule}
                    onChange={setDetailSchedule}
                    colors={colors}
                  />
                </DetailField>

                {/* Arrival Instructions */}
                <DetailField emoji="📍" label="Arrival Instructions" colors={colors}>
                  <DetailInput
                    placeholder="e.g. Meet at the north entrance"
                    value={detailArrival}
                    onChange={setDetailArrival}
                    colors={colors}
                  />
                </DetailField>

                {/* Parking / Transportation */}
                <DetailField emoji="🚗" label="Parking / Transportation" colors={colors}>
                  <DetailInput
                    placeholder="e.g. Free lot behind the building"
                    value={detailParking}
                    onChange={setDetailParking}
                    colors={colors}
                  />
                </DetailField>

                {/* RSVP */}
                <DetailField emoji="📋" label="RSVP Instructions" colors={colors}>
                  <DetailInput
                    placeholder="e.g. Mark interested to reserve a spot"
                    value={detailRsvp}
                    onChange={setDetailRsvp}
                    colors={colors}
                  />
                </DetailField>
              </div>
            )}
          </div>
        )}

        {/* 6. Link for More Info */}
        <SectionLabel colors={colors} text="Link for More Info" optional />
        <FormInput
          placeholder="https://"
          value={link}
          onChange={setLink}
          colors={colors}
        />

        {/* 7. Add to Group (events only) */}
        {isEvent && (
          <>
            <SectionLabel colors={colors} text="Add to Group" optional />
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
                marginLeft: 12,
              }}>
                Choose a Group
              </div>
              <ChevronRight color={colors.grey300} />
            </div>
            <div style={{
              fontSize: 13,
              color: colors.grey400,
              marginTop: 6,
            }}>
              Link this event to a group you manage. Not required.
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
            }}>
              Age Range
            </div>
            <ToggleSwitch value={ageRangeEnabled} onChange={setAgeRangeEnabled} colors={colors} />
          </div>
          <div style={{
            fontSize: 13,
            color: colors.grey400,
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
                  }}>
                    Minimum Age
                  </span>
                  <span style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: colors.grey1000,
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
                  }}>
                    Maximum Age
                  </span>
                  <span style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: colors.grey1000,
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
                  lineHeight: '16px',
                  flex: 1,
                }}>
                  This is a soft limit. Existing members are never removed if the range changes.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 9. Participant Limit */}
        <div style={{ padding: '14px 0', borderBottom: `1px solid ${colors.grey100}` }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{
                fontSize: 15,
                fontWeight: 600,
                color: colors.grey1000,
              }}>
                Limit Participants
              </div>
              <div style={{
                fontSize: 13,
                fontWeight: 400,
                color: colors.grey400,
                marginTop: 2,
              }}>
                Set a maximum number of people
              </div>
            </div>
            <ToggleSwitch value={limitEnabled} onChange={setLimitEnabled} colors={colors} />
          </div>
          {limitEnabled && (
            <div style={{ marginTop: 12 }}>
              <FormInput
                placeholder="Max participants (e.g. 25)"
                value={participantLimit}
                onChange={setParticipantLimit}
                colors={colors}
                type="number"
                inputMode="numeric"
              />
            </div>
          )}
        </div>

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
              }}>
                Expiration Date
              </div>
              <div style={{
                fontSize: 13,
                color: colors.grey400,
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
        showCloseButton={false}
        title={`Submit ${isEvent ? 'Event' : 'Group'}`}
        message="Confirm submission for Ark to review. Future visibility and appropriate content is up to Ark."
        buttons={[
          { title: 'Submit', variant: 'primary', onClick: () => {
            setConfirmOpen(false)
            navigate(-1)
          }},
          { title: 'Cancel', variant: 'secondary', onClick: () => setConfirmOpen(false) },
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
      marginBottom: 8,
      marginTop: 20,
    }}>
      {text}
      {optional && (
        <span style={{
          fontWeight: 400,
          color: colors.grey400,
          fontSize: 13,
        }}>
          {' '}(optional)
        </span>
      )}
    </div>
  )
}

function FormInput({ placeholder, value, onChange, colors, type = 'text', inputMode }) {
  return (
    <input
      type={type}
      inputMode={inputMode}
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
        outline: 'none',
        resize: 'none',
        boxSizing: 'border-box',
        lineHeight: '22px',
      }}
    />
  )
}

function DetailField({ emoji, label, colors, children }) {
  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
      }}>
        <div style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: colors.grey100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          flexShrink: 0,
        }}>
          {emoji}
        </div>
        <span style={{
          fontSize: 14,
          fontWeight: 600,
          color: colors.grey1000,
        }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}

function DetailInput({ placeholder, value, onChange, colors }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        height: 40,
        borderRadius: 10,
        border: `1.5px solid ${colors.grey200}`,
        backgroundColor: colors.grey0,
        padding: '0 12px',
        fontSize: 14,
        fontWeight: 400,
        color: colors.grey1000,
        outline: 'none',
        boxSizing: 'border-box',
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
        }}>
          {label}
        </div>
        {description && (
          <div style={{
            fontSize: 13,
            color: colors.grey400,
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
