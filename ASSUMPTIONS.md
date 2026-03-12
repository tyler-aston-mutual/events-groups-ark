# Circles Tab — Assumptions Log

This document tracks the assumptions baked into the Circles tab prototype. Each assumption should be validated or invalidated through user research. Keeping these explicit helps us avoid building toward conclusions the research never actually tested.

**How to use this doc:**
- Review before each interview round — know what you're testing
- Update the Status column as evidence comes in
- If an assumption is invalidated, note what you learned and how the design should change

---

## Status Key

| Status | Meaning |
|---|---|
| Untested | No research data yet |
| Supported | Evidence leans toward this being true |
| Challenged | Mixed signals or weak evidence |
| Invalidated | Evidence suggests this is wrong |

---

## 1. Demand Assumptions

_Will people actually want this? Will they come back?_

| # | Assumption | Confidence | Risk if Wrong | How We Test It | Status |
|---|---|---|---|---|---|
| D1 | Members want a dedicated space to find in-person meetups beyond 1-on-1 dating | Medium | The entire tab has no reason to exist | Interview: Do participants express excitement about the concept before seeing it? Do they say they'd visit this tab? | Untested |
| D2 | Seeing other people's content creates desire to return ("what's new?") | Medium | Tab becomes a ghost town after first visit — no re-engagement loop | Observe: After browsing, do participants talk about checking back? Do they ask about notifications? | Untested |
| D3 | Featured and official content seeds enough trust to bootstrap an empty tab | Low | Cold-start problem — nobody posts because nobody else has posted | Interview: Do participants find the featured items compelling enough to engage, or do they feel the tab is empty? | Untested |
| D4 | Events and groups serve different enough needs to warrant separate categories | Medium | Unnecessary complexity — users just want "things to do" without caring about the container | Observe: Do participants use the Events/Groups toggle? Do they understand the difference without explanation? | Untested |
| D5 | Geographic locality is the primary discovery factor — people want nearby things | High | Distance filter is over-weighted; people would travel for the right event | Observe: Do participants use the distance filter? Do they pass on far-away items or express willingness to travel? | Untested |

---

## 2. Behavior Assumptions

_Will people create content, or only consume? What drives action?_

| # | Assumption | Confidence | Risk if Wrong | How We Test It | Status |
|---|---|---|---|---|---|
| B1 | Members will create events/groups if they see others doing it first (social proof) | Medium | Consumption-only behavior — the tab depends on a tiny creator class and most users are passive | Interview: After browsing, ask if they'd create something. What would motivate them? What holds them back? | Untested |
| B2 | "Interested" is the right commitment level for events (lower friction than "Going") | Medium | Too low — people mark interest but never show up, making counts meaningless | Interview: What does "Interested" mean to participants? Would they actually attend something they marked interested in? | Untested |
| B3 | Joining a group feels like a reasonable ask before seeing participants | Low | Too much friction — people want to peek before committing, and gating drives them away | Observe: Do participants try to view participants before joining? Do they express frustration at the gate? | Untested |
| B4 | The creation flow is simple enough that members would complete it | Medium | Too many fields, too much effort — people abandon mid-flow | Observe: Walk participants through creating an event. Where do they hesitate? What feels unnecessary? | Untested |
| B5 | Content moderation by Mutual (review before publishing) is acceptable to creators | Medium | Creators feel disempowered — "why bother if Mutual might reject it?" | Interview: How do participants react to the submission confirmation about Mutual review? | Untested |
| B6 | Members want to see a mix of events and groups in a single feed (not siloed) | Medium | Mixing types is confusing — users want dedicated views | Observe: In the default "All" view, do participants seem overwhelmed or comfortable? Do they immediately filter? | Untested |

---

## 3. Design Assumptions

_Do the UI patterns, information hierarchy, and interactions make sense?_

| # | Assumption | Confidence | Risk if Wrong | How We Test It | Status |
|---|---|---|---|---|---|
| A1 | Gender breakdown (X men / Y women) is important information for join decisions | Medium | It's irrelevant, invasive, or off-putting — members don't care or find it weird | Interview: Do participants notice the gender split? Does it factor into their interest? Do any find it uncomfortable? | Untested |
| A2 | Creator identity (name, age, photo) legitimizes content and builds trust | High | Nobody cares who created it — the content/activity matters, not the person | Observe: Do participants look at the creator card? Do they comment on who made something? | Untested |
| A3 | Age range filtering is a useful soft preference for members | Medium | Either too important (people want hard limits) or irrelevant (nobody uses it) | Observe: Do participants engage with age filters? Do they understand "soft limit"? | Untested |
| A4 | The "For You" / "Yours" tab split makes sense as a mental model | Medium | Confusing — people don't understand the distinction or expect different behavior | Observe: Do participants switch between tabs? Do they understand what "Yours" means without explanation? | Untested |
| A5 | Photo-forward card design (large images) drives browse engagement | High | Photos are generic and unhelpful — people scan titles and skip images | Observe: Do participants comment on or respond to photos? Do they help or hurt scanning speed? | Untested |
| A6 | Sort options (Soonest, Nearest, Popular, Newest) cover the primary discovery needs | Medium | Missing a key sort dimension — maybe "friends going" or "recommended" matters more | Interview: After browsing, ask how they'd want to find things. Does their mental model match the sort options? | Untested |
| A7 | Showing 8 participant previews (photo grid) is the right sample size to convey "who's here" | Medium | Too few (feels empty) or too many (overwhelming) — or the wrong people are shown | Observe: Do participants react to the participant grid? Do they want to see more or fewer? | Untested |
| A8 | "Blind Speed Dating" as a distinct feature (separate from events/groups) resonates | Low | Confusing — users don't understand why it's different, or it feels gimmicky | Interview: How do participants react to the speed dating card? Is it exciting or confusing? | Untested |

---

## 4. Safety & Trust Assumptions

_Do members feel comfortable meeting strangers through this? What signals matter?_

| # | Assumption | Confidence | Risk if Wrong | How We Test It | Status |
|---|---|---|---|---|---|
| T1 | The Mutual brand provides enough baseline trust for in-person meetups | Medium | Members trust Mutual for dating but not for group gatherings — different risk profile | Interview: Do participants feel safe using this? What would make them more/less comfortable? | Untested |
| T2 | Gating participants behind "join" creates reciprocal visibility that feels safe | Low | It feels controlling, not safe — users want transparency before commitment | Observe: How do participants react when they can't see who's going until they join? Safe or frustrated? | Untested |
| T3 | The disclaimer ("not endorsed by Mutual") is sufficient to separate user content from official content | Medium | Users don't read it, or it undermines trust — "if Mutual doesn't endorse it, why is it here?" | Observe: Do participants notice the disclaimer? Does it help or hurt confidence? | Untested |
| T4 | Easy reporting (visible Report button) is a meaningful trust signal | Medium | Nobody notices it, or it's not enough — people want preventive measures, not reactive reporting | Interview: What would make them feel safe? Do they notice/value the report option? | Untested |
| T5 | Showing the "Display Creator" option gives creators enough privacy control | Medium | Creators want more granular control — or hiding the creator undermines trust for joiners | Interview: Would participants use the anonymous creator option? How do they feel about events with hidden creators? | Untested |
| T6 | Gender breakdown data helps members feel safe (no surprise gender-skewed events) | Low | It feels reductive, or members from non-binary backgrounds feel excluded | Interview: Does knowing the gender split make participants feel more or less comfortable? Any negative reactions? | Untested |
| T7 | Participant photos (real faces) make events feel safer than anonymous lists | High | Photos create different concerns — "who's looking at my profile?" or stalking worries | Observe: Do participant photos increase or decrease comfort? Do any participants express concern about their own photo being shown? | Untested |

---

## Change Log

| Date | Change | By |
|---|---|---|
| 2026-03-12 | Initial assumptions log created from prototype analysis | Tyler / Claude |
