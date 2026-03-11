import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { Chip, PrimaryButton, ThemedDialog } from '../design-system'
import { useTheme } from '../design-system/context/ThemeProvider'
import { useJoined } from '../context/JoinedContext'
import { EventCard } from '../components/EventCard'
import { ALL_ITEMS } from './Home'

const GATED_TABS = ['Participants', 'Events', 'Chat']

// Pool of 232 unique participants — interleaved female/male for a natural mix per item
const PARTICIPANT_POOL = (() => {
  const fNames = [
    'McKenna','Sophie','Emily','Rachel','Bri','Hannah','Lauren','Mia',
    'Olivia','Ava','Ella','Grace','Lily','Chloe','Emma','Abby',
    'Kate','Sarah','Jessica','Ashley','Madison','Hailey','Brooklyn','Savannah',
    'Natalie','Camille','Ellie','Aubrey','Claire','Stella',
    'Aria','Riley','Zoey','Layla','Penelope','Nora',
    'Hazel','Luna','Nova','Aurora','Ivy','Willow',
    'Emery','Evelyn','Isla','Piper','Ruby','Jade',
    'Summer','Autumn','Scarlett','Violet','Harper','Quinn',
    'Kinsley','Addison','Paisley','Naomi','Elena','Lyla',
    'Raegan','Brynn','Sienna','Daisy','Juniper','Margot',
    'Sage','Wren','Rosie','Thea','Maeve','Freya',
    'Ada','Leah','Lucy','Paige','Reese','Gemma',
    'Alina','Tessa','Finley','Kira','Fiona','Esme',
    'Clara','Vera','Lena','June','Cora','Daphne',
    'Sloane','Maren','Hadley','Sutton','Andie','Blair',
    'Poppy','Millie','Willa','Lennon','Palmer','Shea',
    'Jolie','Rory','Indie','Briar','Harlow','Marlowe',
    'Elsie','Darcy','Liv','Gwen','Mabel','Lydia',
    'Iris','Pearl','Nia','Zara','Tatum','Haven',
    'Ainsley','Teagan','Remi','Collins','Oakley','Amara',
  ]
  const mNames = [
    'Tyler','Jordan','Tanner','Ethan','Dallin','Jake',
    'Mason','Liam','Noah','Logan','Ben','Caleb',
    'Owen','Luke','Jack','Ryan','Nate','Will',
    'Sam','Carter','Gavin','Dylan','Bryce','Colton',
    'Hunter','Jaxon','Landon','Wyatt','Cooper','Chase',
    'Kai','Asher','Leo','Ezra','Finn','Miles',
    'Theo','Beckett','Austin','Blake','Reed','Grant',
    'Eli','Parker','Max','Cole','Milo','Axel',
    'Zane','Cruz','Silas','Atlas','Knox','Jude',
    'Hayes','Dean','Brooks','Cash','Griffin','Rhett',
    'Beau','Porter','Gage','Dawson','Emmett','Jasper',
    'Roman','Archer','Weston','Nash','Rowan','Sterling',
    'Flynn','Callum','Nolan','Trevor','Kendrick','Holden',
    'Wells','Barrett','Soren','Lennox','Bridger','Bowen',
    'Tate','Sullivan','Cade','Paxton','Ryder','Keaton',
    'Arlo','Jensen','Hugo','Maddox','Crew','Hendrix',
    'Thatcher','Pierce','Cannon','Everett','Walsh','Shepherd',
    'Briggs','Otto','Leif','Magnus','Heath','Forrest',
    'Quincy','Vaughn','Clyde','Ellis','Ren','Foster',
    'Irving','Calder','Boyd','Mercer','Stetson','Harlan',
  ]
  const fPhotos = [
    '1494790108377-be9c29b29330','1534528741775-53994a69daeb',
    '1438761681033-6461ffad8d80','1517841905240-472988babdf9',
    '1544005313-94ddf0286df2','1524504388940-b1c1722653e1',
    '1488426862026-3ee34a7d66df','1531746020798-e6953c6e8e04',
    '1502823403499-6ccfcf4fb453','1529626455594-4ff0802cfb7e',
    '1487412720507-e7ab37603c6f','1524250502761-1ac6f2e30d43',
    '1519699047748-de8e457a634e','1542206395-9feb3edaa68d',
    '1580489944761-15a19d654956','1557555187-23d685287bc3',
    '1573496359142-b8d87734a5a2','1567532939604-b6b5b0db2604',
  ]
  const mPhotos = [
    '1506794778202-cad84cf45f1d','1507003211169-0a1dd7228f2d',
    '1539571696357-5a69c17a67c6','1500648767791-00dcc994a43e',
    '1472099645785-5658abf4ff4e','1519345182560-3f2917c472ef',
    '1492562080023-ab3db95bfbce','1504257432389-52343af06ae3',
    '1519085360753-af0119f7cbe7','1531891437562-4301cf35b7e4',
    '1463453091185-61582044d556','1500048993953-d23a436266cf',
    '1556157382-97eda2d62296','1522075469751-3a6694fb2f61',
    '1530268729831-4b0b9e170218','1560250097-0b93528c311a',
    '1504593811423-6dd665756598','1603415526960-f7e0328c63b1',
  ]
  const locs = [
    'Salt Lake City, UT','Provo, UT','Lehi, UT','Draper, UT',
    'Orem, UT','Sandy, UT','American Fork, UT','Eagle Mountain, UT',
  ]
  const pool = []
  const max = Math.max(fNames.length, mNames.length)
  for (let i = 0; i < max; i++) {
    if (i < fNames.length) {
      pool.push({
        id: pool.length + 1, name: fNames[i],
        age: 20 + ((i * 3 + 2) % 13),
        location: locs[(i * 2) % locs.length],
        image: `https://images.unsplash.com/photo-${fPhotos[i % fPhotos.length]}?w=400&h=530&fit=crop&crop=face`,
      })
    }
    if (i < mNames.length) {
      pool.push({
        id: pool.length + 1, name: mNames[i],
        age: 21 + ((i * 3 + 5) % 12),
        location: locs[(i * 2 + 1) % locs.length],
        image: `https://images.unsplash.com/photo-${mPhotos[i % mPhotos.length]}?w=400&h=530&fit=crop&crop=face`,
      })
    }
  }
  return pool
})()

const ITEM_IDS_SORTED = ALL_ITEMS.map(i => i.id).sort((a, b) => a - b)

function getParticipantsForItem(itemId) {
  const idx = ITEM_IDS_SORTED.indexOf(itemId)
  if (idx === -1) return PARTICIPANT_POOL.slice(0, 8)
  return PARTICIPANT_POOL.slice(idx * 8, idx * 8 + 8)
}

export default function DetailScreen() {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const { isJoined: checkJoined, addJoinedId, getJoinDate } = useJoined()
  const { item } = location.state || {}
  const joined = item ? checkJoined(item.id) : false
  const [activeTab, setActiveTab] = useState('About')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [blockedSection, setBlockedSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  if (!item) return null

  const isGroup = item.type === 'group'
  const tabs = isGroup
    ? ['About', 'Participants', 'Events']
    : ['About', 'Participants']

  function handleTabTap(tab) {
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
        <div style={{ flex: 1 }} />
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
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MoreIcon color={colors.grey1000} />
          </button>
          {menuOpen && (
            <>
              {/* Invisible overlay to close menu on outside tap */}
              <div
                onClick={() => setMenuOpen(false)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 9,
                }}
              />
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 6,
                backgroundColor: colors.grey0,
                borderRadius: 12,
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                padding: '4px 0',
                zIndex: 10,
                minWidth: 180,
              }}>
                {joined && (
                  <button
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '10px 16px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 400,
                      color: colors.grey600,
                      fontFamily: "'Goldman Sans', sans-serif",
                      textAlign: 'left',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Leave
                  </button>
                )}
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '10px 16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 400,
                    color: colors.brandAccent5,
                    fontFamily: "'Goldman Sans', sans-serif",
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Report
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Compact card header: photo + title + icons */}
        <div style={{
          display: 'flex',
          alignItems: item.image ? 'center' : 'center',
          justifyContent: item.image ? 'flex-start' : 'center',
          padding: '0 20px 8px',
          gap: 16,
          position: 'relative',
        }}>
          {/* Photo */}
          {item.image && (
            <div style={{
              width: 120,
              height: 120,
              borderRadius: 14,
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
              backgroundColor: item.imageBg || colors.grey100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src={item.image}
                alt={item.title}
                style={item.imageBg ? {
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

          {/* Title */}
          <div style={{
            flex: item.image ? 1 : undefined,
            fontSize: 22,
            fontWeight: 700,
            color: colors.grey1000,
            lineHeight: '26px',
            fontFamily: "'Goldman Sans Bold', 'Goldman Sans', sans-serif",
            textAlign: item.image ? 'left' : 'center',
            paddingRight: 40,
          }}>
            {item.title} <span style={{ fontWeight: 400, fontSize: 18, color: isGroup ? colors.brandPrimary : colors.brandAccent5 }}>{isGroup ? 'Group' : 'Event'}</span>
          </div>

          {/* Type icon pill — top right */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: 20,
            border: `1.5px solid ${isGroup ? colors.brandPrimary : colors.brandAccent5}`,
            backgroundColor: isGroup ? `${colors.brandPrimary}14` : `${colors.brandAccent5}14`,
          }}>
            {isGroup
              ? <GroupTypeIcon color={colors.brandPrimary} />
              : <CalendarTypeIcon color={colors.brandAccent5} />
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
              {item.date && (
                <InfoRow
                  icon={<CalendarClockIcon color={colors.brandPrimary} />}
                  colors={colors}
                  tappable
                  onTap={() => {}}
                >
                  {item.date}
                </InfoRow>
              )}
              {item.createdDate && (
                <InfoRow
                  icon={<StopwatchIcon color={colors.grey600} />}
                  colors={colors}
                >
                  Created - {item.createdDate}
                </InfoRow>
              )}
              <InfoRow
                icon={<LocationInfoIcon color={colors.brandPrimary} />}
                colors={colors}
                tappable
                onTap={() => {}}
              >
                {item.location}
              </InfoRow>
              <InfoRow
                icon={<LinkInfoIcon color={colors.brandPrimary} />}
                colors={colors}
                tappable
                onTap={() => {}}
              >
                More Info
              </InfoRow>
              <InfoRow
                icon={<HeartInfoIcon color={colors.grey600} />}
                colors={colors}
              >
                <GenderBreakdown total={item.going} itemId={item.id} men={item.men} women={item.women} colors={colors} />
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

            {/* 2-column photo grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              marginBottom: 20,
            }}>
              {getParticipantsForItem(item.id).map(p => (
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

        {/* Events content */}
        {activeTab === 'Events' && (() => {
          const groupEvents = ALL_ITEMS.filter(
            i => i.type !== 'group' && i.group?.name === item.title
          )
          return (
            <div style={{ padding: '20px 20px 0' }}>
              {groupEvents.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 0',
                  fontSize: 15,
                  color: colors.grey400,
                  fontFamily: "'Goldman Sans', sans-serif",
                }}>
                  No events yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {groupEvents.map(event => (
                    <div
                      key={event.id}
                      onClick={() => navigate(`/detail/${event.id}`, { state: { item: event } })}
                      style={{ cursor: 'pointer' }}
                    >
                      <EventCard {...event} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })()}

      </div>

      {/* Bottom action — join button or "You're in" confirmation + disclaimer */}
      <div style={{
        padding: '12px 20px 20px',
        flexShrink: 0,
        backgroundColor: colors.grey0,
        borderTop: `1px solid ${colors.grey100}`,
      }}>
        {joined ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '12px 0',
          }}>
            <HeartFilledIcon color={colors.brandAccent5} />
            <span style={{
              fontSize: 15,
              fontWeight: 400,
              color: colors.grey400,
              fontFamily: "'Goldman Sans', sans-serif",
            }}>
              Added {getJoinDate(item.id) || '—'}
            </span>
          </div>
        ) : (
          <PrimaryButton
            title={isGroup ? 'Join Group' : 'Interested'}
            leadingIcon={<HeartButtonIcon />}
            size="medium"
            isFullWidth
            onClick={() => {
              addJoinedId(item.id)
              setTimeout(() => {
                navigate('/', { state: { switchToYours: true } })
              }, 300)
            }}
          />
        )}
        <p style={{
          fontSize: 11,
          fontWeight: 400,
          color: colors.grey400,
          fontFamily: "'Goldman Sans', sans-serif",
          lineHeight: '15px',
          margin: '12px 0 0',
          textAlign: 'center',
        }}>
          This {isGroup ? 'group' : 'event'} wasn't made by and is not endorsed by Mutual LLC. Please report anything that doesn't meet your expectations for our community.
        </p>
      </div>

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

// ─── Gender Breakdown ────────────────────────────────────────────

function GenderBreakdown({ total, itemId, men, women, colors }) {
  let guys, girls
  if (men !== undefined && women !== undefined) {
    guys = men; girls = women
  } else {
    // Deterministic split based on item id for consistent fake data
    const ratio = 0.4 + ((itemId * 7) % 20) / 100 // 0.40–0.59
    guys = Math.round(total * ratio)
    girls = total - guys
  }
  return (
    <span><span style={{ color: colors.brandPrimary, fontWeight: 600 }}>{guys} men</span> · <span style={{ color: colors.brandAccent5, fontWeight: 600 }}>{girls} women</span></span>
  )
}

// ─── Helper ──────────────────────────────────────────────────────

function InfoRow({ icon, colors, children, tappable, onTap }) {
  const Wrapper = tappable ? 'button' : 'div'
  return (
    <Wrapper
      onClick={tappable ? onTap : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        ...(tappable ? {
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
        } : {}),
      }}
    >
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
        flex: 1,
        fontSize: 15,
        fontWeight: 500,
        color: tappable ? colors.brandPrimary : colors.grey1000,
        fontFamily: "'Goldman Sans Medium', 'Goldman Sans', sans-serif",
        ...(tappable ? {
          textDecoration: 'underline',
          textDecorationStyle: 'dotted',
          textUnderlineOffset: 3,
        } : {}),
      }}>
        {children}
      </div>
      {tappable && <ChevronRight color={colors.brandPrimary} />}
    </Wrapper>
  )
}

function ChevronRight({ color }) {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
      stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 1l6 6-6 6" />
    </svg>
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
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5,3 H13.5 Q17.5,3 17.5,6.5 V14.5 L13.5,19 H4.5 Q2.5,19 2.5,15.5 V6.5 Q2.5,3 4.5,3Z"/>
      <path d="M13.5,19 L13.5,15.5 L17.5,14.5" fill="none"/>
      <rect x="5.5" y="1.5" width="2" height="3.5" rx="1"/>
      <rect x="11.5" y="1.5" width="2" height="3.5" rx="1"/>
      <line x1="2.5" y1="8" x2="17.5" y2="8"/>
    </svg>
  )
}

function CalendarClockIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Calendar body — same as our event icon but no curl */}
      <rect x="2.5" y="3" width="15" height="14" rx="2.5"/>
      {/* Binding rings */}
      <rect x="5.5" y="1.5" width="2" height="3.5" rx="1"/>
      <rect x="11.5" y="1.5" width="2" height="3.5" rx="1"/>
      {/* Divider */}
      <line x1="2.5" y1="8" x2="17.5" y2="8"/>
      {/* Clock circle in body */}
      <circle cx="10" cy="13" r="3.5"/>
      {/* Clock hands — hour pointing to ~10 o'clock, minute to 12 */}
      <line x1="10" y1="13" x2="10" y2="11" strokeWidth="1.5"/>
      <line x1="10" y1="13" x2="8.5" y2="12" strokeWidth="1.5"/>
    </svg>
  )
}

function StopwatchIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Main circle */}
      <circle cx="11" cy="12.5" r="7.5"/>
      {/* Top button */}
      <line x1="11" y1="2" x2="11" y2="5"/>
      <line x1="9" y1="2" x2="13" y2="2"/>
      {/* Side button */}
      <line x1="17" y1="7" x2="18.5" y2="5.5"/>
      {/* Clock hands */}
      <line x1="11" y1="12.5" x2="11" y2="9"/>
      <line x1="11" y1="12.5" x2="14" y2="12.5"/>
    </svg>
  )
}

function HeartInfoIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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
      <path d="M4.5,3 H13.5 Q17.5,3 17.5,6.5 V14.5 L13.5,19 H4.5 Q2.5,19 2.5,15.5 V6.5 Q2.5,3 4.5,3Z"/>
      <path d="M13.5,19 L13.5,15.5 L17.5,14.5" fill="none"/>
      <rect x="5.5" y="1.5" width="2" height="3.5" rx="1"/>
      <rect x="11.5" y="1.5" width="2" height="3.5" rx="1"/>
      <line x1="2.5" y1="8" x2="17.5" y2="8"/>
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

function VerifiedBadgeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1l1.8 1.2 2.1-.3.7 2 1.7 1.3-.3 2.1L15.2 8 14 9.8l.3 2.1-2 .7-1.3 1.7-2.1-.3L8 15.2 6.2 14l-2.1.3-.7-2-1.7-1.3.3-2.1L.8 8 2 6.2l-.3-2.1 2-.7L5 1.7l2.1.3L8 1z" fill="white" />
      <path d="M5.5 8.2l1.7 1.7 3.3-3.4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HeartButtonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function HeartFilledIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function CheckCircleIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1.5" />
      <path d="M6.5 10.5l2.5 2.5 5-5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

function MaleIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6.5" cy="9.5" r="4" />
      <line x1="9.5" y1="6.5" x2="14" y2="2" />
      <polyline points="10,2 14,2 14,6" />
    </svg>
  )
}

function FemaleIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="6" r="4" />
      <line x1="8" y1="10" x2="8" y2="15" />
      <line x1="6" y1="13" x2="10" y2="13" />
    </svg>
  )
}
