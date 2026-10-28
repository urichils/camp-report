import React, { useState, useRef, useEffect } from 'react';

const GROUP_DATA = [
  {
    id: 'group-1',
    name: 'Group 01',
    days: [
      { 
        day: 1, 
        title: 'Cultural Programmes', 
        note: 'Successfully rehearsed and performed on the stage as part of the Cultural Day.', 
        photos: [
          { id: '1-1', url: '/d1.1.JPG', caption: 'Anchoring' },
          { id: '2-1', url: '/d1.2.JPG', caption: 'An unexpected pair of guests' },
          { id: '3-1', url: '/d1.3.JPG', caption: 'Group dance' },
          { id: '4-1', url: '/d1.4.JPG', caption: 'Guitar performance' },
          { id: '5-1', url: '/d1.5.JPG', caption: 'Another group dance' },
        ]
      },
      // { 
      //   day: 2, 
      //   title: 'Ridge Trail Hike', 
      //   note: 'Navigated the upper ridge line surrounded by morning dew and towering pine trees. Every step felt heavier in the damp air, but the view of the sea of clouds below made it worth every breath.', 
      //   photos: [
      //     { id: '1-2', url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=900&q=80', caption: 'Checking magnetic declination near the ridge line' },
      //     { id: '2-2', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80', caption: 'Ascending through the dense pine cloud line' },
      //     { id: '3-2', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80', caption: 'Hydration break under ancient evergreen canopy' },
      //     { id: '4-2', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80', caption: 'Reaching the eastern summit survey marker' }
      //   ]
      // },
      // { 
      //   day: 3, 
      //   title: 'Stream & Rope Bridge', 
      //   note: 'Constructed an outdoor wooden knot line across the fast-moving valley stream. A few boots got soaked, but teamwork prevailed.', 
      //   photos: [
      //     { id: '1-3', url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=80', caption: 'Laying anchor logs across the fast-moving creek' },
      //     { id: '2-3', url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80', caption: 'Testing tension on the main guide ropes' },
      //     { id: '3-3', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80', caption: 'First successful crossing with supply crates' },
      //     { id: '4-3', url: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=900&q=80', caption: 'Gathering along the wet gravel bank' }
      //   ]
      // },
      // { 
      //   day: 4, 
      //   title: 'Campfire Gathering', 
      //   note: 'Shared acoustic songs and stories as evening mist settled in around the embers. The fire popped, throwing sparks up into the dark canopy.', 
      //   photos: [
      //     { id: '1-4', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80', caption: 'Acoustic songs around the stone fire circle' },
      //     { id: '2-4', url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=900&q=80', caption: 'Late night embers throwing sparks into canopy' }
      //   ]
      // },
      // { 
      //   day: 5, 
      //   title: 'Final Journaling & Departure', 
      //   note: 'Packed camp completely clean. Left zero trace behind in the hills except for the quiet echoes of our time there.', 
      //   photos: [
      //     { id: '1-5', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80', caption: 'Final group photo before descent' },
      //     { id: '2-5', url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80', caption: 'Leave-no-trace site inspection sweep' }
      //   ]
      // }
    ]
  },
  {
    id: 'group-2',
    name: 'Group 02',
    days: [
      { 
        day: 1, 
        title: 'Reaching the camp site', 
        note: 'No duties were assigned for the day, so group members gathered for the cultural camp inauguration in the evening. After dinner, participated in day evaluation at camp and briefing regarding next day\'s duties. Group was dismissed after faculty orientation.', 
        photos: [
          { id: '1-1', url: '/d2.1.JPG', caption: '' },
          { id: '2-1', url: '/d2.2.JPG', caption: '' },
        ]
      },
    ]
  },
  {
    id: 'group-3',
    name: 'Group 03',
    days: [
      { 
        day: 1, 
        title: 'Assembly and inauguration', 
        note: 'First roll call and assembly were completed. The inaugural ceremony started with a prayer song, welcome speech, followed by inauguration by Panchayat President, concluded with a vote of thanks. After cultural events a meeting (students with coordinators) was conducted, concluded by an evaluation — camp paper.', 
        photos: [
          { id: '1-1', url: '/d2.1.JPG', caption: '' },
          { id: '2-1', url: '/d2.2.JPG', caption: '' },
        ]
      },
    ]
  },
  {
    id: 'group-4',
    name: 'Group 04',
    days: [
      { 
        day: 1, 
        title: 'Camp and mess duty', 
        note: 'Today we travelled from our college to our campsite in Wayanad. We left early in the morning and reached the campsite around 2 o\'clock, in time for lunch, which was prepared by our pre-campers. Today our group had the mess duty. After lunch, the kitchen duty was given to us. We made evening tea/coffee and snacks, and also dinner for the campers.', 
        photos: [
          { id: '1-1', url: '/d2.1.JPG', caption: '' },
          { id: '2-1', url: '/d2.2.JPG', caption: '' },
        ]
      },
    ]
  },
  {
    id: 'group-5',
    name: 'Group 05',
    days: [
      { 
        day: 1, 
        title: 'Reaching the camp site', 
        note: 'Members in the pre-camp group made breakfast and lunch.They also washed utensils, washed vegetables, and cleaned the surroundings and premises. Made arrangements and preparations for the rest of the camp members coming from home. Lunch was served.', 
        photos: [
          { id: '1-1', url: '/d2.1.JPG', caption: '' },
          { id: '2-1', url: '/d2.2.JPG', caption: '' },
        ]
      },
    ]
  },
  {
    id: 'group-6',
    name: 'Group 06',
    days: [
      { 
        day: 1, 
        title: 'Cleaning', 
        note: 'Completed cleaning in front of a few classrooms.', 
        photos: [
          { id: '1-1', url: '/d2.1.JPG', caption: '' },
          { id: '2-1', url: '/d2.2.JPG', caption: '' },
        ]
      },
    ]
  }
];

const COMMITTEE_REPORTS = [
  {
    id: 'report-1',
    code: 'REP. 01',
    title: 'Discipline Committee',
    author: '...',
    date: 'October 14, 2026',
    content: '-'
  },
  {
    id: 'report-2',
    code: 'REP. 02',
    title: 'Tools Committee',
    author: '...',
    date: 'October 16, 2026',
    content: '-'
  },
  {
    id: 'report-3',
    code: 'REP. 03',
    title: 'Documentation Committee',
    author: '...',
    date: 'October 18, 2026',
    content: '-'
  },
  {
    id: 'report-4',
    code: 'REP. 04',
    title: 'First Aid and Finance Committee',
    author: '...',
    date: 'October 14, 2026',
    content: '-'
  },
  {
    id: 'report-5',
    code: 'REP. 05',
    title: 'Travel Committee',
    author: '...',
    date: 'October 14, 2026',
    content: '-'
  },
];

export default function App() {
  const [offset, setOffset] = useState(0);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [activeReportIndex, setActiveReportIndex] = useState(0);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const heroRef = useRef(null);
  const journalRef = useRef(null);
  const reportsRef = useRef(null);
  const epilogueRef = useRef(null);
  const horizontalTrackRef = useRef(null);

  const activeGroup = GROUP_DATA[activeGroupIndex];
  const activeDay = activeGroup.days[activeDayIndex] || activeGroup.days[0];
  const activeReport = COMMITTEE_REPORTS[activeReportIndex];

  // Parallax scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync horizontal scroll position with the dial indicator
  const handleHorizontalScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const cardWidth = e.target.offsetWidth;
    const currentIdx = Math.round(scrollLeft / cardWidth);
    if (currentIdx !== activeDayIndex && currentIdx >= 0 && currentIdx < activeGroup.days.length) {
      setActiveDayIndex(currentIdx);
    }
  };

  const scrollToDay = (idx) => {
    setActiveDayIndex(idx);
    if (horizontalTrackRef.current) {
      const cardWidth = horizontalTrackRef.current.offsetWidth;
      horizontalTrackRef.current.scrollTo({
        left: idx * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Keyboard navigation & Lightbox shortcut handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Lightbox open: Left / Right navigation & Escape to close
      if (selectedPhotoIndex !== null) {
        if (e.key === 'ArrowLeft') {
          setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : activeDay.photos.length - 1));
        } else if (e.key === 'ArrowRight') {
          setSelectedPhotoIndex((prev) => (prev < activeDay.photos.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'Escape') {
          setSelectedPhotoIndex(null);
        }
        return;
      }

      // Main journal horizontal keyboard navigation
      if (e.key === 'ArrowLeft') {
        if (activeDayIndex > 0) scrollToDay(activeDayIndex - 1);
      } else if (e.key === 'ArrowRight') {
        if (activeDayIndex < activeGroup.days.length - 1) scrollToDay(activeDayIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, activeDayIndex, activeGroup.days.length, activeDay.photos.length]);

  return (
    <div style={{ backgroundColor: '#2C221E', minHeight: '100vh', color: '#FBF7EE', fontFamily: 'serif' }}>
      
      {/* SECTION 1: HERO PARALLAX */}
      <section ref={heroRef} style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px 60px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.35,
          backgroundImage: `url('/bg.JPG')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${offset * 0.35}px)`
        }} />

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '11px', color: '#E2D4BA', borderBottom: '1px solid rgba(226, 212, 186, 0.2)', paddingBottom: '12px' }}>
          <span>✦ FIELD JOURNAL</span>
          <span>SAHAYATHRA 2026</span>
        </div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '650px', margin: 'auto', textAlign: 'center' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#E2D4BA', display: 'block', marginBottom: '15px' }}>
            5 Days Among the Fog & Pines
          </span>
          <h1 style={{ fontFamily: 'Title', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 'bold', lineHeight: 1.15, marginBottom: '15px', color: '#FBF7EE' }}>
            Where the Forest Kept Our Secrets
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#E2D4BA', fontWeight: 300, fontFamily: 'sans-serif' }}>
            A record of cold morning dew, thick mountain fog, and campfire smoke.
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#C5B496', fontFamily: 'monospace', fontSize: '9px', letterSpacing: '2px' }}>
          <p style={{ margin: 0 }}>SCROLL TO OPEN JOURNAL</p>
          <span>↓</span>
        </div>
      </section>


      {/* SECTION 4: HORIZONTAL SPREAD (GROUP JOURNEYS) */}
      <section ref={journalRef} style={{ backgroundColor: '#FBF7EE', color: '#2C221E', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* TOP GROUP TABS */}
        <div style={{
          borderBottom: '1px solid #E0D4BE',
          padding: '16px 30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          backgroundColor: '#F4ECD8'
        }}>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '1px', marginRight: '8px' }}>
            GROUPS:
          </span>
          {GROUP_DATA.map((group, idx) => (
            <button
              key={group.id}
              onClick={() => {
                setActiveGroupIndex(idx);
                scrollToDay(0);
              }}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'monospace',
                fontSize: '11px',
                cursor: 'pointer',
                padding: '3px 8px',
                color: activeGroupIndex === idx ? '#7A3E29' : '#8C7A70',
                fontWeight: activeGroupIndex === idx ? 'bold' : 'normal',
                borderBottom: activeGroupIndex === idx ? '2px solid #7A3E29' : '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              {group.name}
            </button>
          ))}
        </div>


        {/* STICKY TICKING DIAL RULER */}
        <div style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#FBF7EE',
          zIndex: 40,
          padding: '16px 30px',
          borderBottom: '1px solid #D0C2A7',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '1px' }}>
            DIAL INDEX:
          </span>

          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            {activeGroup.days.map((d, idx) => {
              const isActive = activeDayIndex === idx;
              return (
                <button
                  key={d.day}
                  onClick={() => scrollToDay(idx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'Title',
                    fontSize: isActive ? '18px' : '13px',
                    fontWeight: isActive ? 'bold' : 'normal',
                    color: isActive ? '#7A3E29' : '#8C7A70',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '3px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>0{d.day}</span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <div style={{ width: '1px', height: isActive ? '6px' : '3px', backgroundColor: isActive ? '#7A3E29' : '#C5B496' }} />
                    <div style={{ width: '1px', height: isActive ? '10px' : '5px', backgroundColor: isActive ? '#7A3E29' : '#C5B496' }} />
                    <div style={{ width: '1px', height: isActive ? '6px' : '3px', backgroundColor: isActive ? '#7A3E29' : '#C5B496' }} />
                  </div>
                </button>
              );
            })}
          </div>

          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#8C7A70' }}>
            {activeGroup.name}
          </span>
        </div>


        {/* HORIZONTAL SWIPE/SCROLL CONTAINER */}
        <div
          ref={horizontalTrackRef}
          onScroll={handleHorizontalScroll}
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            flex: 1,
            width: '100%',
            alignItems: 'center'
          }}
        >
          {activeGroup.days.map((dayData) => (
            <div
              key={dayData.day}
              style={{
                minWidth: '100vw',
                width: '100vw',
                boxSizing: 'border-box',
                padding: '40px 60px',
                scrollSnapAlign: 'start',
                flexShrink: 0,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <div style={{ maxWidth: '1100px', width: '100%', display: 'flex', gap: '60px', alignItems: 'flex-start' }}>
                
                {/* LEFT SIDE: EDITORIAL TEXT */}
                <div style={{ width: '35%', flexShrink: 0 }}>
                  <span style={{
                    fontFamily: 'Title',
                    fontSize: '3.5rem',
                    fontWeight: 'bold',
                    color: '#2C221E',
                    display: 'block',
                    lineHeight: '0.9',
                    marginBottom: '10px'
                  }}>
                    day {dayData.day}
                  </span>

                  <div style={{ width: '100%', height: '1px', backgroundColor: '#2C221E', marginBottom: '16px' }}></div>

                  <h3 style={{
                    fontFamily: 'Title',
                    fontSize: '1.2rem',
                    fontStyle: 'italic',
                    color: '#52443D',
                    margin: '0 0 14px 0',
                    lineHeight: '1.3'
                  }}>
                    {dayData.title}
                  </h3>

                  <p style={{
                    fontFamily: 'sans-serif',
                    fontSize: '0.9rem',
                    color: '#42352F',
                    lineHeight: '1.7',
                    fontWeight: 300,
                    margin: 0
                  }}>
                    {dayData.note}
                  </p>
                </div>


                {/* RIGHT SIDE: PHOTO REEL WITH VISIBLE CAPTIONS & LIGHTBOX CLICK */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    overflowX: 'auto',
                    paddingBottom: '15px',
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none'
                  }}>
                    {dayData.photos.map((p, pIdx) => (
                      <div 
                        key={p.id} 
                        onClick={() => setSelectedPhotoIndex(pIdx)}
                        style={{ minWidth: '260px', maxWidth: '260px', flexShrink: 0, cursor: 'pointer' }}
                      >
                        <img
                          src={p.url}
                          alt={p.caption}
                          style={{
                            width: '100%',
                            height: '240px',
                            objectFit: 'cover',
                            display: 'block',
                            boxShadow: '0 6px 20px rgba(44,34,30,0.1)'
                          }}
                        />
                        {/* Clear, visible photo captions below each image */}
                        <p style={{
                          fontFamily: 'Title',
                          fontSize: '11px',
                          color: '#6B5A52',
                          marginTop: '10px',
                          fontStyle: 'italic',
                          lineHeight: '1.4'
                        }}>
                          {p.caption}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* RULER FOOTER */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '16px',
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    color: '#8C7A70'
                  }}>
                    <span>SWIPE HORIZONTALLY →</span>
                    <div style={{ flex: 1, display: 'flex', gap: '3px', alignItems: 'center' }}>
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: '1px',
                            height: i % 5 === 0 ? '8px' : '3px',
                            backgroundColor: i % 5 === 0 ? '#7A3E29' : '#C5B496'
                          }}
                        />
                      ))}
                    </div>
                    <span>DAY 0{dayData.day} OF 05</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </section>


      {/* SECTION 5: COMMITTEE REPORTS */}
      <section ref={reportsRef} style={{
        backgroundColor: '#F4ECD8',
        color: '#2C221E',
        padding: '80px 60px',
        borderTop: '1px solid #D0C2A7'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderBottom: '1px solid #2C221E',
            paddingBottom: '16px',
            marginBottom: '50px'
          }}>
            <div>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Section 05 // Archival Records
              </span>
              <h2 style={{ fontFamily: 'Title', fontSize: '2.2rem', margin: 0, fontWeight: 'bold', color: '#2C221E' }}>
                Committee Reports
              </h2>
            </div>

            {/* REPORT SELECTION TABS */}
            <div style={{ display: 'flex', gap: '20px' }}>
              {COMMITTEE_REPORTS.map((rep, idx) => (
                <button
                  key={rep.id}
                  onClick={() => setActiveReportIndex(idx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    cursor: 'pointer',
                    paddingBottom: '4px',
                    color: activeReportIndex === idx ? '#7A3E29' : '#8C7A70',
                    fontWeight: activeReportIndex === idx ? 'bold' : 'normal',
                    borderBottom: activeReportIndex === idx ? '2px solid #7A3E29' : '2px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {rep.code}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIVE REPORT SPREAD */}
          <div style={{
            display: 'flex',
            gap: '60px',
            alignItems: 'flex-start'
          }}>
            <div style={{ width: '38%', flexShrink: 0 }}>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                {activeReport.code} // OFFICIAL LOG
              </span>
              <h3 style={{ fontFamily: 'Title', fontSize: '1.4rem', fontStyle: 'italic', margin: '0 0 12px 0', lineHeight: '1.3', color: '#2C221E' }}>
                {activeReport.title}
              </h3>
              <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#6B5A52', margin: '0 0 4px 0' }}>
                {activeReport.author}
              </p>
              <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#8C7A70', margin: 0 }}>
                Filed: {activeReport.date}
              </p>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ width: '100%', height: '1px', backgroundColor: '#2C221E', marginBottom: '20px' }}></div>
              <p style={{
                fontFamily: 'Title',
                fontSize: '1rem',
                color: '#2C221E',
                lineHeight: '1.8',
                fontWeight: 300,
                textAlign: 'left',
                margin: 0
              }}>
                "{activeReport.content}"
              </p>

              {/* RULER DECORATION */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '30px',
                fontFamily: 'monospace',
                fontSize: '9px',
                color: '#8C7A70'
              }}>
                <span>ARCHIVAL AUTHENTICATION VERIFIED</span>
                <div style={{ flex: 1, display: 'flex', gap: '3px', alignItems: 'center' }}>
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: '1px',
                        height: i % 5 === 0 ? '8px' : '3px',
                        backgroundColor: i % 5 === 0 ? '#7A3E29' : '#C5B496'
                      }}
                    />
                  ))}
                </div>
                <span>VOL. 01 — SEC. 05</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      
        {/* SECTION 6: GROUP OVERVIEW / MATRIX (COMMENTED OUT PLACEHOLDER)
        ------------------------------------------------------------- */}
        {/* <section style={{ backgroundColor: '#FBF7EE', color: '#2C221E', padding: '80px 60px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2>Group Overview Matrix</h2>
            <p>A comparative log of distances, elevations, and member counts across all 6 groups.</p>
          </div>
        </section> */}
     


      {/* SECTION 7: EPILOGUE & COLOPHON */}
      <section ref={epilogueRef} style={{
        backgroundColor: '#2C221E',
        color: '#FBF7EE',
        padding: '100px 60px',
        borderTop: '1px solid rgba(226, 212, 186, 0.2)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{
            display: 'flex',
            gap: '80px',
            alignItems: 'flex-start',
            borderBottom: '1px solid rgba(226, 212, 186, 0.2)',
            paddingBottom: '60px',
            marginBottom: '40px'
          }}>
            <div style={{ width: '40%', flexShrink: 0 }}>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#E2D4BA', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                Section 07 // Concluding Notes
              </span>
              <h2 style={{ fontFamily: 'Title', fontSize: '2.5rem', margin: '0 0 20px 0', lineHeight: 1.1 }}>
                Epilogue
              </h2>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.95rem', color: '#E2D4BA', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
                The retreat concluded under clear skies on the fifth day. All six groups finished their duties in Meppadi Panchayat.
              </p>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#E2D4BA', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                Colophon & Technical Data
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', fontFamily: 'monospace', fontSize: '11px', color: '#C5B496' }}>
                <div>
                  <p style={{ color: '#FBF7EE', margin: '0 0 6px 0', fontWeight: 'bold' }}>TYPOGRAPHY</p>
                  <p style={{ margin: 0, lineHeight: 1.5 }}>Primary Serif: Modern Editorial<br />Monospace: System Technical</p>
                </div>
                <div>
                  <p style={{ color: '#FBF7EE', margin: '0 0 6px 0', fontWeight: 'bold' }}>ARCHIVE METRICS</p>
                  <p style={{ margin: 0, lineHeight: 1.5 }}>5 Days Recorded<br />6 Expedition Groups<br />24 High-Res Photographs</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'monospace', fontSize: '10px', color: '#8C7A70' }}>
            <span>END OF FIELD JOURNAL</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                background: 'none',
                border: '1px solid rgba(226, 212, 186, 0.3)',
                color: '#E2D4BA',
                fontFamily: 'monospace',
                fontSize: '10px',
                padding: '6px 14px',
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'all 0.2s ease'
              }}
            >
              ↑ RETURN TO TOP
            </button>
          </div>

        </div>
      </section>


      {/* INTERACTIVE LIGHTBOX MODAL */}
      {selectedPhotoIndex !== null && activeDay.photos[selectedPhotoIndex] && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(20, 15, 13, 0.95)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px'
        }}>
          {/* Close button */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            style={{
              position: 'absolute',
              top: '30px',
              right: '40px',
              background: 'none',
              border: 'none',
              color: '#FBF7EE',
              fontFamily: 'monospace',
              fontSize: '12px',
              cursor: 'pointer',
              letterSpacing: '2px'
            }}
          >
            [ESC / CLOSE]
          </button>

          {/* Expanded photo */}
          <img
            src={activeDay.photos[selectedPhotoIndex].url}
            alt={activeDay.photos[selectedPhotoIndex].caption}
            style={{
              maxWidth: '85vw',
              maxHeight: '70vh',
              objectFit: 'contain',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}
          />

          {/* Caption overlay */}
          <div style={{ textAlign: 'center', marginTop: '20px', maxWidth: '600px' }}>
            <p style={{ fontFamily: 'Title', fontSize: '15px', fontStyle: 'italic', color: '#FBF7EE', margin: '0 0 6px 0' }}>
              {activeDay.photos[selectedPhotoIndex].caption}
            </p>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#C5B496' }}>
              DAY 0{activeDay.day} — PHOTO 0{selectedPhotoIndex + 1} OF 0{activeDay.photos.length}
            </span>
          </div>

          {/* Navigation helpers */}
          <div style={{ display: 'flex', gap: '30px', marginTop: '25px' }}>
            <button
              onClick={() => setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : activeDay.photos.length - 1))}
              style={{
                background: 'none',
                border: '1px solid #C5B496',
                color: '#FBF7EE',
                fontFamily: 'monospace',
                fontSize: '10px',
                padding: '6px 14px',
                cursor: 'pointer'
              }}
            >
              ← PREVIOUS
            </button>
            <button
              onClick={() => setSelectedPhotoIndex((prev) => (prev < activeDay.photos.length - 1 ? prev + 1 : 0))}
              style={{
                background: 'none',
                border: '1px solid #C5B496',
                color: '#FBF7EE',
                fontFamily: 'monospace',
                fontSize: '10px',
                padding: '6px 14px',
                cursor: 'pointer'
              }}
            >
              NEXT →
            </button>
          </div>
        </div>
      )}

    </div>
  );
}