import { useState, useRef, useEffect } from 'react';

// All public photos for the global filmstrip (exclude non-image files)
const ALL_PHOTOS = [
  { url: '/bg.JPG', caption: 'Camp at Wayanad' },
  { url: '/d1.1.JPG', caption: 'Anchoring' },
  { url: '/d1.2.JPG', caption: 'An unexpected pair of guests' },
  { url: '/d1.3.JPG', caption: 'Group dance' },
  { url: '/d1.4.JPG', caption: 'Guitar performance' },
  { url: '/d1.5.JPG', caption: 'Another group dance' },
  { url: '/d2.1.JPG', caption: 'Camp arrival' },
  { url: '/d2.2.JPG', caption: 'Campsite setup' },
  { url: '/DSC00333.JPG', caption: '' },
  { url: '/DSC00334.JPG', caption: '' },
  { url: '/DSC00335.JPG', caption: '' },
  { url: '/DSC00337.JPG', caption: '' },
  { url: '/DSC00967 (2).JPG', caption: '' },
  { url: '/DSC00967 (3).JPG', caption: '' },
  { url: '/DSC00967.JPG', caption: '' },
  { url: '/DSC00975 (2).JPG', caption: '' },
  { url: '/DSC00975 (3).JPG', caption: '' },
  { url: '/DSC00975.JPG', caption: '' },
  { url: '/DSC00977 (2).JPG', caption: '' },
  { url: '/DSC00977 (3).JPG', caption: '' },
  { url: '/DSC00977.JPG', caption: '' },
  { url: '/DSC01046.JPG', caption: '' },
  { url: '/DSC01047.JPG', caption: '' },
  { url: '/DSC01048.JPG', caption: '' },
  { url: '/DSC09601.JPG', caption: '' },
  { url: '/DSC09602.JPG', caption: '' },
  { url: '/DSC09603.JPG', caption: '' },
  { url: '/DSC09604.JPG', caption: '' },
  { url: '/DSC09874.JPG', caption: '' },
  { url: '/DSC09875.JPG', caption: '' },
  { url: '/DSC09876.JPG', caption: '' },
];

const GROUP_DATA = [
  {
    id: 'group-1',
    name: 'Group 01',
    days: [
      { 
        day: 1, 
        title: 'Cultural Programmes', 
        note: 'Successfully rehearsed and performed on the stage as part of the Cultural Day. The group captivated the audience with coordinated dance numbers, live guitar, and energetic anchoring.', 
      },
      {
        day: 2,
        title: 'Morning Exercises & Camp Orientation',
        note: 'Participated in early morning physical conditioning followed by a full campus orientation walk. Group members helped map the boundary perimeters and settle into the routine of camp life.',
      },
      {
        day: 3,
        title: 'Community Work & Field Activities',
        note: 'Joined community outreach activities in the Meppadi area. Assisted in classroom restoration and campus beautification alongside local volunteers.',
      },
      {
        day: 4,
        title: 'Campfire Night & Storytelling',
        note: 'Gathered around the stone fire circle for an evening of acoustic music, folk songs, and campfire stories. Shared reflections from the week with coordinators and faculty.',
      },
      {
        day: 5,
        title: 'Departure & Final Review',
        note: 'Completed the leave-no-trace site sweep and packed all equipment. Attended the closing ceremony and submitted the group evaluation journal before boarding the return convoy.',
      },
    ]
  },
  {
    id: 'group-2',
    name: 'Group 02',
    days: [
      { 
        day: 1, 
        title: 'Reaching the Camp Site', 
        note: 'No duties were assigned for the day, so group members gathered for the cultural camp inauguration in the evening. After dinner, participated in day evaluation at camp and briefing regarding next day\'s duties. Group was dismissed after faculty orientation.',
      },
      {
        day: 2,
        title: 'Morning Assembly & First Duties',
        note: 'Attended the morning roll call and took part in campus upkeep duties. Group members assisted with flagging boundary areas and arranging dormitory furniture.',
      },
      {
        day: 3,
        title: 'Field Work Rotation',
        note: 'Rotated into outdoor field activities at the valley work area. Helped transport construction materials and maintained site safety standards throughout the day.',
      },
      {
        day: 4,
        title: 'Cultural Night Support',
        note: 'Assisted with stage setup, managed audience seating for invited guests, and participated in the campfire cultural gala as performers and attendees.',
      },
      {
        day: 5,
        title: 'Departure & Closing Ceremony',
        note: 'Completed final dormitory cleanup and baggage handling. Attended the closing ceremony, collected certificates, and boarded the return convoy to college.',
      },
    ]
  },
  {
    id: 'group-3',
    name: 'Group 03',
    days: [
      { 
        day: 1, 
        title: 'Assembly & Inauguration', 
        note: 'First roll call and assembly completed. The inaugural ceremony started with a prayer song, welcome speech, followed by inauguration by Panchayat President, concluded with a vote of thanks. An evaluation camp-paper session followed.',
      },
      {
        day: 2,
        title: 'Classroom Cleaning Detail',
        note: 'Deployed to the community school premises for a full morning of classroom cleaning, furniture arrangement, and courtyard sweeping.',
      },
      {
        day: 3,
        title: 'Outdoor Survey & Rope Work',
        note: 'Joined the stream rope-bridge construction team. Carried anchor timber, learned basic knotting techniques, and assisted with tension testing.',
      },
      {
        day: 4,
        title: 'Stage Performances & Campfire',
        note: 'Delivered a folk dance number during the cultural gala and later joined the campfire circle for storytelling and acoustic music.',
      },
      {
        day: 5,
        title: 'Final Evaluation & Departure',
        note: 'Submitted group evaluation forms and individual camp journals. Completed site inspection sweep before boarding buses for the return journey.',
      },
    ]
  },
  {
    id: 'group-4',
    name: 'Group 04',
    days: [
      { 
        day: 1, 
        title: 'Camp & Mess Duty', 
        note: 'Travelled from college to the campsite in Wayanad early in the morning and reached around 2 o\'clock for lunch prepared by pre-campers. Took over kitchen duty: made evening tea, snacks, and dinner for all campers.',
      },
      {
        day: 2,
        title: 'Continuation of Mess Duties',
        note: 'Managed morning breakfast preparation, utensil washing, and procurement runs to the local market. Coordinated with the Finance Committee for daily expense tracking.',
      },
      {
        day: 3,
        title: 'Community Painting Project',
        note: 'Joined the community outreach painting team, repainting classroom walls and corridors at the Meppadi local school.',
      },
      {
        day: 4,
        title: 'Cultural Programme Backstage',
        note: 'Handled backstage coordination for the cultural night — managing costumes, cue sheets, and performer timings.',
      },
      {
        day: 5,
        title: 'Kitchen Handover & Departure',
        note: 'Cleaned and handed over the kitchen and mess equipment to facility management. Joined the final muster and departed with the convoy.',
      },
    ]
  },
  {
    id: 'group-5',
    name: 'Group 05',
    days: [
      { 
        day: 1, 
        title: 'Reaching the Camp Site', 
        note: 'Pre-camp members made breakfast and lunch, washed utensils, cleaned the surroundings, and prepared the premises for the arrival of remaining camp members.',
      },
      {
        day: 2,
        title: 'Tools & Sanitation Management',
        note: 'Received sanitation kits from the Tools Committee and oversaw cleaning equipment distribution to other groups. Maintained the sanitation log throughout the day.',
      },
      {
        day: 3,
        title: 'Valley Stream Work Detail',
        note: 'Participated in the outdoor rope-bridge construction at the valley stream. Assisted with rope tensioning and maintained a safe buddy-system headcount.',
      },
      {
        day: 4,
        title: 'Cultural Performance & Guest Hosting',
        note: 'Performed a group folk number at the cultural stage and hosted visiting Panchayat guests. Participated in the campfire gathering later that evening.',
      },
      {
        day: 5,
        title: 'Sweep & Departure',
        note: 'Led the leave-no-trace sweep of the outdoor areas, cleared personal items from dormitories, and completed the final roll-call before departure.',
      },
    ]
  },
  {
    id: 'group-6',
    name: 'Group 06',
    days: [
      { 
        day: 1, 
        title: 'Cleaning Detail', 
        note: 'Completed cleaning in front of several classrooms on the community school campus. Collected and disposed of debris responsibly.',
      },
      {
        day: 2,
        title: 'Extended Campus Cleaning',
        note: 'Continued cleaning duties covering the school courtyard, restrooms, and surrounding pathways. Tools were signed out from the Tools Committee.',
      },
      {
        day: 3,
        title: 'Fieldwork & Landscaping',
        note: 'Shifted to outdoor landscaping work, removing overgrown vegetation around the campus perimeter and planting saplings.',
      },
      {
        day: 4,
        title: 'Stage Setup & Cultural Night',
        note: 'Assisted with erecting stage risers and managing crowd movement during the cultural gala. Participated in the post-performance campfire session.',
      },
      {
        day: 5,
        title: 'Final Cleanup & Closing',
        note: 'Conducted the final round of campus cleaning, ensured zero waste was left behind, and attended the formal closing ceremony before boarding the convoy.',
      },
    ]
  },
];

const COMMITTEE_REPORTS = [
  {
    id: 'report-1',
    code: 'REP. 01',
    title: 'Discipline Committee',
    officer: 'Camp Discipline In-Charge',
    mandate: 'Campus boundaries, schedule punctuality, night curfew & camper accountability',
    days: [
      {
        day: 1,
        date: 'October 14, 2026',
        author: 'Discipline Committee Convener',
        title: 'Arrival Protocol & Orientation Briefing',
        status: '100% Present / Compliant',
        content: 'Orientation and campsite briefing conducted upon arrival at Meppadi. The first evening roll call was convened at 18:00 hrs with all 100 campers present. Strict protocols regarding campus boundary demarcations and lights-out were announced. Dormitory inspection completed with zero disciplinary issues.',
        highlights: [
          '100% attendance recorded at 18:00 roll call',
          'Camp curfew established at 22:00 hrs',
          'Perimeter boundary markers explained to all 6 groups'
        ]
      },
      {
        day: 2,
        date: 'October 15, 2026',
        author: 'Discipline Committee Convener',
        title: 'Morning Routine & Duty Allocation Decorum',
        status: 'On Schedule',
        content: 'Morning wake-up whistle sounded at 05:30 hrs. All 6 groups reported punctually for physical conditioning and the morning assembly. Monitored group conduct during duty handovers and classroom cleaning tasks. Dining hall queuing and etiquette maintained smoothly.',
        highlights: [
          'All groups punctual for 06:00 assembly',
          'Zero unauthorized absences during work hours',
          'Dining hall decorum strictly observed'
        ]
      },
      {
        day: 3,
        date: 'October 16, 2026',
        author: 'Discipline Committee Convener',
        title: 'Field Work & Waterfront Safety Vigilance',
        status: 'Heightened Supervision',
        content: 'Supervised community outdoor projects and the stream rope knotting exercise. Strict buddy systems and safety perimeters along the valley stream were enforced. Regular headcounts conducted at 2-hour intervals. All campers returned safely to base camp prior to dusk.',
        highlights: [
          'Water safety perimeter enforced along the stream',
          'Full headcounts verified at 10:00, 14:00, and 17:30 hrs',
          'Safe return of all field crews certified'
        ]
      },
      {
        day: 4,
        date: 'October 17, 2026',
        author: 'Discipline Committee Convener',
        title: 'Cultural Gala & Campfire Security Protocol',
        status: 'Orderly Gathering',
        content: 'Oversaw decorum during the evening cultural program and the campfire gathering. Supervised visitor flow for invited local guests and Panchayat representatives. Maintained campfire safety clearance zones. Silent hours commenced at 22:30 hrs.',
        highlights: [
          'Designated seating managed for community guests',
          'Campfire safety buffer zone strictly observed',
          'Quiet hours initiated promptly at 22:30 hrs'
        ]
      },
      {
        day: 5,
        date: 'October 18, 2026',
        author: 'Discipline Committee Convener',
        title: 'Final Dormitory Sweep & Departure Muster',
        status: 'Final Clearance Granted',
        content: 'Final camp inspection conducted across all dormitory wings and common grounds. Supervised the comprehensive leave-no-trace site sweep. Final roll call at 09:30 hrs verified all campers, luggage, and personal kits accounted for prior to bus boarding.',
        highlights: [
          'Leave-no-trace inspection cleared with zero residue',
          'Final roll call: all 100 campers present',
          'Official clearance handover signed with facility management'
        ]
      }
    ]
  },
  {
    id: 'report-2',
    code: 'REP. 02',
    title: 'Tools Committee',
    officer: 'Tools & Logistics Master',
    mandate: 'Equipment inventory, work implements issuance, maintenance & safety returns',
    days: [
      {
        day: 1,
        date: 'October 14, 2026',
        author: 'Tools Committee In-Charge',
        title: 'Store Audit & Pre-Camp Gear Distribution',
        status: 'Inventory Audited',
        content: 'Conducted initial inventory upon arrival at Wayanad camp store. Categorized 42 cleaning implements, 15 cooking vessels, 8 emergency lanterns, and maintenance toolboxes. Distributed sanitation kits to Group 05 for pre-camp site preparation.',
        highlights: [
          'Full inventory verified: 65 equipment items logged',
          'Sanitation kits issued to Group 05',
          'Storehouse check-in ledger initialized'
        ]
      },
      {
        day: 2,
        date: 'October 15, 2026',
        author: 'Tools Committee In-Charge',
        title: 'Classroom Sanitation & Field Implements Issue',
        status: 'All Logged & Maintained',
        content: 'Issued brooms, dustpans, scrubbers, and buckets to Group 06 for local classroom cleaning. Supervised maintenance and sharpening of spades. All equipment returned by 17:00 hrs, washed, and securely locked in the storehouse.',
        highlights: [
          '24 cleaning tools issued and retrieved',
          'Tool integrity check: zero breakages or damages',
          'Storage organized by group tag numbers'
        ]
      },
      {
        day: 3,
        date: 'October 16, 2026',
        author: 'Tools Committee In-Charge',
        title: 'Stream Construction & Rigging Hardware',
        status: 'Heavy Gear Deployed',
        content: 'Dispatched heavy-duty manila ropes, timber cross-binders, wire cutters, and earth-moving implements for the stream bridge construction. Conducted tension safety checks on all ropes prior to deployment. All outdoor gear returned clean and accounted for.',
        highlights: [
          '8 guide ropes and 12 timber clamps deployed',
          'Rope tension and safety inspections passed',
          'Full wash and drying cycle completed for wet equipment'
        ]
      },
      {
        day: 4,
        date: 'October 17, 2026',
        author: 'Tools Committee In-Charge',
        title: 'Stage Rigging, Sound Line & Hearth Equipment',
        status: 'Stage & Safety Cleared',
        content: 'Supported cultural stage setup with heavy-duty cables, mic stands, stage risers, and safety fire extinguishers for the campfire. Fire safety buckets filled with sand and water stationed adjacent to the hearth.',
        highlights: [
          'Acoustic stands and power cables secured safely',
          '2 fire extinguishers + 4 sand buckets positioned',
          'Safe disassembly and dry storage following cultural night'
        ]
      },
      {
        day: 5,
        date: 'October 18, 2026',
        author: 'Tools Committee In-Charge',
        title: 'Final Equipment Audit & Store Handover',
        status: '100% Accounted / Clean',
        content: 'Final physical audit of all tools and equipment borrowed from college stores and local suppliers. All metal tools wiped, oiled, and packed in transit crates. Verified zero loss and zero unreturned items across all 6 groups.',
        highlights: [
          '65/65 tools accounted for (100% return rate)',
          'Metal implements oiled and sealed in transit crates',
          'Handover clearance signed with faculty coordinator'
        ]
      }
    ]
  },
  {
    id: 'report-3',
    code: 'REP. 03',
    title: 'Documentation Committee',
    officer: 'Media & Field Secretary',
    mandate: 'Photography, daily camp gazette publication, audio recording & final archive',
    days: [
      {
        day: 1,
        date: 'October 14, 2026',
        author: 'Documentation Committee Lead',
        title: 'Inaugural Ceremony & Daily Bulletin Vol. 1',
        status: 'Gazette Published',
        content: 'Recorded video footage of the departure and arrival at Wayanad campsite. Photographed the inaugural ceremony attended by the Panchayat President. Drafted, proofread, and displayed the Day 01 Camp Daily Gazette on the main notice board.',
        highlights: [
          '48 archival photographs recorded',
          'Inauguration speech transcribed',
          'Day 1 camp bulletin published at 21:00 hrs'
        ]
      },
      {
        day: 2,
        date: 'October 15, 2026',
        author: 'Documentation Committee Lead',
        title: 'Routine Logs, Faculty Orientation & Vol. 2',
        status: 'Archive Updated',
        content: 'Covered morning exercise assemblies, classroom cleaning operations by Group 06, and kitchen duties by Group 04. Compiled evaluation meeting minutes and published Day 02 Daily Gazette highlighting group contributions.',
        highlights: [
          '62 high-resolution photographs taken',
          'Minutes of group leaders\' meeting compiled',
          'Vol. 2 news bulletin printed and posted'
        ]
      },
      {
        day: 3,
        date: 'October 16, 2026',
        author: 'Documentation Committee Lead',
        title: 'Valley Stream Bridge & Video Journaling',
        status: 'Multi-Media Captured',
        content: 'Documented the outdoor rope bridge construction, fieldwork challenges, and student interviews. Maintained digital backup of all media files on external hard drives. Published Day 03 bulletin focusing on teamwork and environmental awareness.',
        highlights: [
          'Full-length documentary video clips recorded',
          'Storage backup verified at 120GB',
          'Vol. 3 bulletin featuring photo essay released'
        ]
      },
      {
        day: 4,
        date: 'October 17, 2026',
        author: 'Documentation Committee Lead',
        title: 'Cultural Night Coverage & Audio Recordings',
        status: 'Special Edition Live',
        content: 'Full media coverage of the Cultural Programme, including anchoring, folk dances, musical duets, and campfire storytelling. Recorded speeches of community leaders and student feedback. Prepared the draft of the final commemorative volume.',
        highlights: [
          'Complete stage performances recorded in high definition',
          'Audio archives of camp songs digitized',
          'Commemorative photo reel assembled'
        ]
      },
      {
        day: 5,
        date: 'October 18, 2026',
        author: 'Documentation Committee Lead',
        title: 'Final Field Journal Compilation & Handover',
        status: 'Archive Sealed',
        content: 'Conducted final group photo sessions and faculty testimonials. Compiled the comprehensive 5-day camp field journal archive, including statistical summaries, group reports, and high-resolution photo folders for official college submission.',
        highlights: [
          'Consolidated 5-Day Master Archive compiled',
          'Official photo handover completed',
          'Editorial field journal certified and archived'
        ]
      }
    ]
  },
  {
    id: 'report-4',
    code: 'REP. 04',
    title: 'First Aid and Finance Committee',
    officer: 'Health Officer & Camp Treasurer',
    mandate: 'Emergency healthcare, medical post, petty cash, mess expenditure & auditing',
    days: [
      {
        day: 1,
        date: 'October 14, 2026',
        author: 'First Aid & Finance Convener',
        title: 'Dispensary Setup & Initial Treasury Float',
        status: 'Dispensary Active',
        content: 'Established the camp medical station with emergency first-aid kit, ORS sachets, pain relievers, and antiseptic dressings. Initialized the camp treasury ledger with an opening float of ₹15,000 for emergency rations and fuel.',
        highlights: [
          'Medical station operational in quarters room 01',
          'Opening float ₹15,000 verified and logged',
          'Dispensary register logged 1 minor travel sickness case'
        ]
      },
      {
        day: 2,
        date: 'October 15, 2026',
        author: 'First Aid & Finance Convener',
        title: 'Routine Health Checks & Mess Procurements',
        status: 'Normal Operations',
        content: 'Conducted morning temperature and hydration checks. Treated two cases of mild fatigue and minor finger cuts from cleaning tasks. Verified and reimbursed daily vegetable, milk, and provisioning bills from Meppadi local market.',
        highlights: [
          '2 minor abrasions treated and dressed',
          'Mess procurement expenses: ₹6,450 logged',
          'All bills and vouchers audited and stamped'
        ]
      },
      {
        day: 3,
        date: 'October 16, 2026',
        author: 'First Aid & Finance Convener',
        title: 'Mobile Worksite Aid & Field Disbursements',
        status: 'Field Care Active',
        content: 'Stationed a mobile first-aid kit at the outdoor stream work site. Treated three minor leech bites and administered ORS for hydration. Processed equipment transport disbursements and emergency supply receipts.',
        highlights: [
          'Mobile first-aid kit active on-site with emergency kit',
          '3 leech bites treated with antiseptic care',
          'Daily field expenses: ₹4,820 logged and verified'
        ]
      },
      {
        day: 4,
        date: 'October 17, 2026',
        author: 'First Aid & Finance Convener',
        title: 'Hydration Checks & Cultural Hospitality Budget',
        status: 'Budget Reconciled',
        content: 'Monitored camper hydration ahead of evening events. Prepared medical readiness for campfire thermal safety. Handled refreshments and hospitality budget for community guests and Panchayat officials.',
        highlights: [
          'Zero thermal burns or heat exhaustion incidents',
          'Guest hospitality expenditure: ₹3,100 logged',
          'First aid standby maintained until lights-out'
        ]
      },
      {
        day: 5,
        date: 'October 18, 2026',
        author: 'First Aid & Finance Convener',
        title: 'Final Financial Reconciliation & Health Log',
        status: 'Books Balanced (₹0 Variance)',
        content: 'Conducted final reconciliation of mess expenditure, transportation, and contingency funds. Re-packed unused medicines. Balanced all income and vouchers with zero discrepancies. Prepared final financial audit report.',
        highlights: [
          'Total camp expenditure reconciled to zero variance',
          'Medical supplies audited and stored for college return',
          'Final balance sheet signed and verified by coordinators'
        ]
      }
    ]
  },
  {
    id: 'report-5',
    code: 'REP. 05',
    title: 'Travel Committee',
    officer: 'Transit & Transportation Coordinator',
    mandate: 'Bus transit, convoy timing, local supply runs, VIP escorts & luggage logistics',
    days: [
      {
        day: 1,
        date: 'October 14, 2026',
        author: 'Travel Committee Lead',
        title: 'Inward Transit & Campsite Arrival Coordination',
        status: 'On-Time Arrival',
        content: 'Coordinated two chartered buses from college campus to Meppadi, Wayanad. Departed campus at 06:00 hrs with scheduled breakfast and comfort halts. Reached campsite safely at 14:00 hrs. Unloading and luggage transfers completed without damage.',
        highlights: [
          '2 buses arrived safely at 14:00 hrs',
          '100 campers + faculty transit completed smoothly',
          'Luggage unloaded and allocated to quarters'
        ]
      },
      {
        day: 2,
        date: 'October 15, 2026',
        author: 'Travel Committee Lead',
        title: 'Local Market Runs & Panchayat Liaison Conveyance',
        status: 'Local Fleet Operating',
        content: 'Arranged local utility vehicle for the mess committee\'s morning vegetable and ration runs to Meppadi market. Scheduled liaison trips for faculty coordinators to Panchayat office for administrative clearances.',
        highlights: [
          '2 utility trips to local market completed',
          'Faculty liaison conveyance on schedule',
          'Driver accommodations and fuel logs updated'
        ]
      },
      {
        day: 3,
        date: 'October 16, 2026',
        author: 'Travel Committee Lead',
        title: 'Field Survey Shuttles & Heavy Gear Transport',
        status: 'Field Shuttles Active',
        content: 'Coordinated transfer of survey teams and heavy construction implements to the valley work area. Maintained radio contact with vehicle drivers. Safe return of all students and tools to camp base completed by 17:30 hrs.',
        highlights: [
          '4 shuttle rounds between camp and worksite',
          'Timber and rope transfer facilitated',
          'Zero transport bottlenecks recorded'
        ]
      },
      {
        day: 4,
        date: 'October 17, 2026',
        author: 'Travel Committee Lead',
        title: 'Dignitary Reception & Parking Logistics',
        status: 'Protocol Maintained',
        content: 'Provided transit escort for Panchayat dignitaries, local ward members, and guest performers arriving for the cultural gala. Coordinated vehicle parking and safety marshaling along the approach road.',
        highlights: [
          'VIP reception transport managed smoothly',
          'Approach road parking organized with zero congestion',
          'Post-event escort provided for guests'
        ]
      },
      {
        day: 5,
        date: 'October 18, 2026',
        author: 'Travel Committee Lead',
        title: 'Departure Logistics & Homeward Convoy',
        status: 'Safe Return Confirmed',
        content: 'Conducted pre-departure vehicle mechanical checks on both chartered buses. Coordinated systematic luggage loading by groups at 09:30 hrs. Departed Wayanad campsite at 10:30 hrs. Arrived safely back at college campus at 18:30 hrs.',
        highlights: [
          'Pre-trip vehicle safety inspection cleared',
          'Buses departed campsite promptly at 10:30 hrs',
          '100% safe return to college campus confirmed'
        ]
      }
    ]
  }
];

const CAMP_VIDEOS = [
  {
    id: 'vid-1',
    day: 1,
    title: 'Cultural Stage Showcase & Anchoring',
    category: 'Stage & Performance',
    duration: '04:18',
    date: 'Oct 14, 2026',
    thumbnail: '/d1.3.JPG',
    caption: 'Official video recording of the Day 01 inaugural stage performances and anchor introductions.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 'vid-2',
    day: 2,
    title: 'Morning Convoy, Fog Trails & Base Camp Arrival',
    category: 'Field & Trekking',
    duration: '03:45',
    date: 'Oct 15, 2026',
    thumbnail: '/bg.JPG',
    caption: 'Cinematic reel capturing the transit through mist-covered Wayanad pine hills and camp setting.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  {
    id: 'vid-3',
    day: 4,
    title: 'Acoustic Campfire Sessions & Night Melodies',
    category: 'Campfire & Arts',
    duration: '02:50',
    date: 'Oct 17, 2026',
    thumbnail: '/d1.4.JPG',
    caption: 'Guitar acoustic jam, folk tunes, and group singing under the canopy around the stone fire pit.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: 'vid-4',
    day: 3,
    title: 'Community School Grounds & Classroom Restoration',
    category: 'Community Service',
    duration: '05:12',
    date: 'Oct 16, 2026',
    thumbnail: '/d1.5.JPG',
    caption: 'Student field crews repainting classrooms and organizing community premises in Meppadi.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4'
  }
];

export default function App() {
  const [offset, setOffset] = useState(0);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [activeReportIndex, setActiveReportIndex] = useState(0);
  const [activeReportDayIndex, setActiveReportDayIndex] = useState(0);
  const [committeeViewMode, setCommitteeViewMode] = useState('single'); // 'single' or 'all'
  const [isVideoSectionOpen, setIsVideoSectionOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(false);
  
  // fade key: bumped every time group or day changes to retrigger CSS animation
  const [groupFadeKey, setGroupFadeKey] = useState(0);
  const [dayFadeKey, setDayFadeKey] = useState(0);

  const heroRef = useRef(null);
  const journalRef = useRef(null);
  const reportsRef = useRef(null);
  const videoRef = useRef(null);
  const epilogueRef = useRef(null);

  const sectionRefs = [heroRef, journalRef, reportsRef, videoRef, epilogueRef];

  const activeGroup = GROUP_DATA[activeGroupIndex];
  const activeDay = activeGroup.days[activeDayIndex] || activeGroup.days[0];
  const activeReport = COMMITTEE_REPORTS[activeReportIndex];
  const activeReportDay = activeReport.days[activeReportDayIndex] || activeReport.days[0];

  // Parallax scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Switch group with fade
  const switchGroup = (idx) => {
    setActiveGroupIndex(idx);
    setActiveDayIndex(0);
    setGroupFadeKey((k) => k + 1);
    setDayFadeKey((k) => k + 1);
  };

  // Switch day within active group with fade
  const switchDay = (idx) => {
    setActiveDayIndex(idx);
    setDayFadeKey((k) => k + 1);
  };

  // Automated Day & Group Progression
  useEffect(() => {
    if (!isAutoPlayActive) return;

    const timer = setInterval(() => {
      setActiveDayIndex((prevDayIdx) => {
        const currentGroupDays = GROUP_DATA[activeGroupIndex].days;
        if (prevDayIdx < currentGroupDays.length - 1) {
          setDayFadeKey((k) => k + 1);
          return prevDayIdx + 1;
        } else {
          // Reached last day of active group -> advance to next group
          setActiveGroupIndex((prevGroupIdx) => {
            const nextGroupIdx = (prevGroupIdx + 1) % GROUP_DATA.length;
            setGroupFadeKey((k) => k + 1);
            return nextGroupIdx;
          });
          setDayFadeKey((k) => k + 1);
          return 0; // Reset to Day 1
        }
      });
    }, 4000); // Advances every 4 seconds

    return () => clearInterval(timer);
  }, [isAutoPlayActive, activeGroupIndex]);

  // Keyboard Navigation: Up/Down Section Presentation Scroll + Lightbox controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Lightbox / Video Modal Escape
      if (e.key === 'Escape') {
        if (selectedVideo !== null) {
          setSelectedVideo(null);
          return;
        }
        if (selectedPhotoIndex !== null) {
          setSelectedPhotoIndex(null);
          return;
        }
      }

      // Lightbox photo navigation
      if (selectedPhotoIndex !== null) {
        if (e.key === 'ArrowLeft') {
          setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : ALL_PHOTOS.length - 1));
        } else if (e.key === 'ArrowRight') {
          setSelectedPhotoIndex((prev) => (prev < ALL_PHOTOS.length - 1 ? prev + 1 : 0));
        }
        return;
      }

      // Presentation Mode: Up / Down arrow keys scroll smoothly between page sections
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const currentScroll = window.pageYOffset;
        const sectionPositions = sectionRefs.map((ref) => ref.current?.offsetTop || 0);

        if (e.key === 'ArrowDown') {
          const nextTarget = sectionPositions.find((pos) => pos > currentScroll + 50);
          if (nextTarget !== undefined) {
            window.scrollTo({ top: nextTarget, behavior: 'smooth' });
          }
        } else if (e.key === 'ArrowUp') {
          const prevTargets = sectionPositions.filter((pos) => pos < currentScroll - 50);
          if (prevTargets.length > 0) {
            const prevTarget = prevTargets[prevTargets.length - 1];
            window.scrollTo({ top: prevTarget, behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, selectedVideo]);

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

        <div className="anim-fade-in" style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '11px', color: '#E2D4BA', borderBottom: '1px solid rgba(226, 212, 186, 0.2)', paddingBottom: '12px' }}>
          <span style={{ letterSpacing: '1px' }}>✦ FIELD JOURNAL</span>
          <span style={{ letterSpacing: '1px' }}>SAHAYATHRA 2026</span>
        </div>

        <div 
          className="anim-fade-in-up" 
          style={{ 
            position: 'relative', 
            zIndex: 10, 
            maxWidth: '650px', 
            margin: 'auto', 
            textAlign: 'center',
            animation: 'fadeInBlur 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          <span style={{ fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#E2D4BA', display: 'block', marginBottom: '15px' }}>
            5 Days Among the Fog & Pines
          </span>
          <h1 style={{ fontFamily: 'Title', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 'bold', lineHeight: 1.15, marginBottom: '15px', color: '#FBF7EE' }}>
            Where the Forest Kept Our Secrets
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#E2D4BA', fontWeight: 300, fontFamily: 'sans-serif', lineHeight: 1.6 }}>
            A record of cold morning dew, thick mountain fog, and campfire smoke.
          </p>
          <style>{`
            @keyframes fadeInBlur {
              0% {
                opacity: 0;
                filter: blur(14px);
                transform: translateY(20px);
              }
              100% {
                opacity: 1;
                filter: blur(0px);
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#C5B496', fontFamily: 'monospace', fontSize: '9px', letterSpacing: '2px' }}>
          <p style={{ margin: 0 }}>PRESS ↓ OR SCROLL TO OPEN JOURNAL</p>
          <span className="anim-bounce" style={{ display: 'inline-block', marginTop: '6px', fontSize: '13px' }}>↓</span>
        </div>
      </section>


      {/* SECTION 4: GROUP JOURNAL — COMPACT PADDINGS + AUTOMATED LOOP TOGGLE */}
      <section ref={journalRef} style={{ backgroundColor: '#FBF7EE', color: '#2C221E', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>

        {/* GROUP SELECTOR TABS & AUTOMATED PLAY TOGGLE */}
        <div style={{
          borderBottom: '1px solid #E0D4BE',
          padding: '12px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          backgroundColor: '#F4ECD8',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '1px', marginRight: '4px' }}>
              GROUPS:
            </span>
            {GROUP_DATA.map((group, idx) => (
              <button
                key={group.id}
                onClick={() => switchGroup(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  cursor: 'pointer',
                  padding: '4px 8px',
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

          {/* AUTO-PLAY CYCLE TOGGLE SWITCH */}
          <button
            onClick={() => setIsAutoPlayActive((prev) => !prev)}
            style={{
              background: isAutoPlayActive ? '#7A3E29' : 'transparent',
              color: isAutoPlayActive ? '#FBF7EE' : '#7A3E29',
              border: '1px solid #7A3E29',
              fontFamily: 'monospace',
              fontSize: '10px',
              padding: '4px 10px',
              borderRadius: '2px',
              cursor: 'pointer',
              fontWeight: 'bold',
              letterSpacing: '1px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{isAutoPlayActive ? '⏸ AUTO-PLAYING DAYS' : '▶ AUTO-PLAY DAYS & GROUPS'}</span>
          </button>
        </div>

        {/* COMPACT GROUP LOG CONTAINER (REDUCED PADDING TO FIT WITH PHOTO REEL) */}
        <div
          key={groupFadeKey}
          className="anim-fade-in"
          style={{ padding: '24px 40px 10px 40px', maxWidth: '1100px', margin: '0 auto', flex: 1 }}
        >
          {/* GROUP HEADING */}
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Section 04 // Field Journal — {activeGroup.name}
            </span>
            <h2 style={{ fontFamily: 'Title', fontSize: '1.75rem', margin: 0, color: '#2C221E' }}>
              {activeGroup.name} — Daily Log
            </h2>
          </div>

          {/* DAY SELECTOR TABS */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', borderBottom: '1px solid #D0C2A7', paddingBottom: '10px' }}>
            {activeGroup.days.map((d, dIdx) => {
              const isActive = activeDayIndex === dIdx;
              return (
                <button
                  key={d.day}
                  onClick={() => switchDay(dIdx)}
                  style={{
                    background: isActive ? '#2C221E' : 'rgba(255,255,255,0.6)',
                    color: isActive ? '#FBF7EE' : '#52443D',
                    border: '1px solid',
                    borderColor: isActive ? '#2C221E' : '#C5B496',
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    padding: '4px 12px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    fontWeight: isActive ? 'bold' : 'normal',
                    transition: 'all 0.2s ease'
                  }}
                >
                  DAY 0{d.day}
                </button>
              );
            })}
          </div>

          {/* ACTIVE DAY CONTENT — COMPACT LAYOUT */}
          <div
            key={dayFadeKey}
            className="anim-fade-in-up"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(140px, 170px) 1fr',
              gap: '30px',
              alignItems: 'flex-start'
            }}
          >
            {/* LEFT: DAY NUMBER */}
            <div>
              <span style={{
                fontFamily: 'Title',
                fontSize: '3.8rem',
                fontWeight: 'bold',
                color: '#2C221E',
                display: 'block',
                lineHeight: '0.85',
                marginBottom: '8px'
              }}>
                day<br />{String(activeDay.day).padStart(2, '0')}
              </span>
              <div style={{ width: '100%', height: '1px', backgroundColor: '#2C221E', marginBottom: '10px' }} />
              <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#7A3E29', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {activeGroup.name}
              </span>
            </div>

            {/* RIGHT: TITLE + NOTE */}
            <div>
              <h3 style={{
                fontFamily: 'Title',
                fontSize: '1.25rem',
                fontStyle: 'italic',
                color: '#52443D',
                margin: '0 0 12px 0',
                lineHeight: '1.3'
              }}>
                {activeDay.title}
              </h3>
              <p style={{
                fontFamily: 'sans-serif',
                fontSize: '0.9rem',
                color: '#42352F',
                lineHeight: '1.65',
                fontWeight: 300,
                margin: '0 0 16px 0'
              }}>
                {activeDay.note}
              </p>

              {/* DAY STEPPER */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  disabled={activeDayIndex === 0}
                  onClick={() => switchDay(Math.max(0, activeDayIndex - 1))}
                  style={{
                    opacity: activeDayIndex === 0 ? 0.3 : 1,
                    cursor: activeDayIndex === 0 ? 'not-allowed' : 'pointer',
                    background: 'none',
                    border: '1px solid #8C7A70',
                    color: '#2C221E',
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  ← PREV
                </button>
                <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#8C7A70' }}>
                  DAY 0{activeDay.day} OF 0{activeGroup.days.length}
                </span>
                <button
                  disabled={activeDayIndex === activeGroup.days.length - 1}
                  onClick={() => switchDay(Math.min(activeGroup.days.length - 1, activeDayIndex + 1))}
                  style={{
                    opacity: activeDayIndex === activeGroup.days.length - 1 ? 0.3 : 1,
                    cursor: activeDayIndex === activeGroup.days.length - 1 ? 'not-allowed' : 'pointer',
                    background: 'none',
                    border: '1px solid #8C7A70',
                    color: '#2C221E',
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  NEXT →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* GLOBAL PHOTO FILMSTRIP — POSITIONED DIRECTLY WITH REDUCED TOP MARGIN */}
        <div style={{ overflow: 'hidden', marginTop: '16px', borderTop: '1px solid #E0D4BE', borderBottom: '1px solid #E0D4BE', backgroundColor: '#EBE2CC', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '8px', left: '20px', zIndex: 5, fontFamily: 'monospace', fontSize: '9px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', backgroundColor: '#EBE2CC', padding: '2px 8px' }}>
            ✦ PHOTO ARCHIVE
          </div>

          <div
            className="anim-filmstrip"
            style={{ display: 'flex', gap: '10px', padding: '30px 0 12px 0', width: 'max-content' }}
          >
            {[...ALL_PHOTOS, ...ALL_PHOTOS].map((photo, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhotoIndex(idx % ALL_PHOTOS.length)}
                style={{
                  flexShrink: 0,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  boxShadow: '0 4px 10px rgba(44,34,30,0.12)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.04) translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(44,34,30,0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(44,34,30,0.12)';
                }}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  style={{
                    height: '160px',
                    width: 'auto',
                    objectFit: 'cover',
                    display: 'block',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            ))}
          </div>
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
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Section 05 // Archival Records (5-Day Log)
              </span>
              <h2 style={{ fontFamily: 'Title', fontSize: '2.2rem', margin: 0, fontWeight: 'bold', color: '#2C221E' }}>
                Committee Reports
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {COMMITTEE_REPORTS.map((rep, idx) => {
                const isSelected = activeReportIndex === idx;
                return (
                  <button
                    key={rep.id}
                    onClick={() => {
                      setActiveReportIndex(idx);
                    }}
                    style={{
                      background: isSelected ? '#7A3E29' : 'transparent',
                      border: isSelected ? '1px solid #7A3E29' : '1px solid rgba(44,34,30,0.2)',
                      color: isSelected ? '#FBF7EE' : '#52443D',
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      cursor: 'pointer',
                      padding: '6px 12px',
                      borderRadius: '2px',
                      fontWeight: isSelected ? 'bold' : 'normal',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{rep.code}</span>
                    <span style={{ opacity: isSelected ? 0.9 : 0.7 }}>
                      ({rep.title.replace(' Committee', '').replace(' and ', ' & ')})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            backgroundColor: '#EBE2CC',
            padding: '12px 20px',
            borderRadius: '4px',
            marginBottom: '35px',
            border: '1px solid #D5C7AE'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '1px', fontWeight: 'bold', marginRight: '4px' }}>
                LOG ARCHIVE:
              </span>
              {activeReport.days.map((d, dIdx) => {
                const isDayActive = committeeViewMode === 'single' && activeReportDayIndex === dIdx;
                return (
                  <button
                    key={d.day}
                    onClick={() => {
                      setActiveReportDayIndex(dIdx);
                      setCommitteeViewMode('single');
                    }}
                    style={{
                      background: isDayActive ? '#2C221E' : 'rgba(255,255,255,0.7)',
                      color: isDayActive ? '#FBF7EE' : '#52443D',
                      border: '1px solid',
                      borderColor: isDayActive ? '#2C221E' : '#C5B496',
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      padding: '5px 12px',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}>DAY 0{d.day}</span>
                    <span style={{ fontSize: '9px', opacity: 0.8 }}>({d.date.replace(', 2026', '').replace('October ', 'Oct ')})</span>
                  </button>
                );
              })}
            </div>

            <div>
              <button
                onClick={() => setCommitteeViewMode(committeeViewMode === 'all' ? 'single' : 'all')}
                style={{
                  background: committeeViewMode === 'all' ? '#7A3E29' : 'transparent',
                  color: committeeViewMode === 'all' ? '#FBF7EE' : '#7A3E29',
                  border: '1px solid #7A3E29',
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  padding: '6px 14px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  transition: 'all 0.2s ease'
                }}
              >
                {committeeViewMode === 'all' ? '✓ SHOWING ALL 5 DAYS' : '⊞ SPREAD ALL 5 DAYS'}
              </button>
            </div>
          </div>

          {committeeViewMode === 'single' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(280px, 350px) 1fr',
              gap: '50px',
              alignItems: 'flex-start'
            }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '1px' }}>
                    {activeReport.code} // DAY 0{activeReportDay.day}
                  </span>
                  <span style={{
                    backgroundColor: '#E2D4BA',
                    color: '#7A3E29',
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    padding: '2px 6px',
                    borderRadius: '2px',
                    fontWeight: 'bold'
                  }}>
                    {activeReportDay.status}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'Title', fontSize: '1.5rem', fontStyle: 'italic', margin: '0 0 8px 0', lineHeight: '1.25', color: '#2C221E' }}>
                  {activeReport.title}
                </h3>
                
                <h4 style={{ fontFamily: 'Title', fontSize: '1.1rem', margin: '0 0 14px 0', color: '#52443D', fontWeight: 'normal' }}>
                  {activeReportDay.title}
                </h4>

                <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#6B5A52', margin: '0 0 4px 0' }}>
                  Lead: {activeReport.officer}
                </p>
                <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#8C7A70', margin: '0 0 16px 0' }}>
                  Filed: {activeReportDay.date}
                </p>

                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  borderLeft: '2px solid #7A3E29',
                  padding: '10px 14px',
                  marginBottom: '20px'
                }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#8C7A70', display: 'block', textTransform: 'uppercase', marginBottom: '2px' }}>
                    Committee Mandate
                  </span>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.82rem', color: '#52443D', margin: 0, lineHeight: 1.45 }}>
                    {activeReport.mandate}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    disabled={activeReportDayIndex === 0}
                    onClick={() => setActiveReportDayIndex((prev) => Math.max(0, prev - 1))}
                    style={{
                      opacity: activeReportDayIndex === 0 ? 0.35 : 1,
                      cursor: activeReportDayIndex === 0 ? 'not-allowed' : 'pointer',
                      background: 'none',
                      border: '1px solid #8C7A70',
                      color: '#2C221E',
                      fontFamily: 'monospace',
                      fontSize: '10px',
                      padding: '5px 12px',
                      borderRadius: '2px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    ← PREV DAY
                  </button>
                  <button
                    disabled={activeReportDayIndex === activeReport.days.length - 1}
                    onClick={() => setActiveReportDayIndex((prev) => Math.min(activeReport.days.length - 1, prev + 1))}
                    style={{
                      opacity: activeReportDayIndex === activeReport.days.length - 1 ? 0.35 : 1,
                      cursor: activeReportDayIndex === activeReport.days.length - 1 ? 'not-allowed' : 'pointer',
                      background: 'none',
                      border: '1px solid #8C7A70',
                      color: '#2C221E',
                      fontFamily: 'monospace',
                      fontSize: '10px',
                      padding: '5px 12px',
                      borderRadius: '2px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    NEXT DAY →
                  </button>
                </div>
              </div>

              <div style={{ minWidth: 0 }}>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#2C221E', marginBottom: '20px' }}></div>
                
                <p style={{
                  fontFamily: 'Title',
                  fontSize: '1.05rem',
                  color: '#2C221E',
                  lineHeight: '1.85',
                  fontWeight: 300,
                  textAlign: 'left',
                  margin: '0 0 24px 0'
                }}>
                  "{activeReportDay.content}"
                </p>

                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.55)',
                  border: '1px dashed #C5B496',
                  borderRadius: '3px',
                  padding: '16px 20px',
                  marginBottom: '25px'
                }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '1px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                    KEY HIGHLIGHTS & ACTION POINTS:
                  </span>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontFamily: 'sans-serif', fontSize: '0.88rem', color: '#42352F', lineHeight: '1.6' }}>
                    {activeReportDay.highlights.map((hl, hIdx) => (
                      <li key={hIdx}>{hl}</li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '20px',
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
                  <span>VOL. 01 — SEC. 05 — DAY 0{activeReportDay.day}</span>
                </div>
              </div>
            </div>
          )}

          {committeeViewMode === 'all' && (
            <div>
              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#7A3E29', fontWeight: 'bold' }}>
                  ALL 5 DAYS ARCHIVE // {activeReport.title.toUpperCase()}
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#8C7A70' }}>
                  Click any day card to inspect individual day
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                gap: '20px'
              }}>
                {activeReport.days.map((dayItem, dIdx) => (
                  <div
                    key={dayItem.day}
                    onClick={() => {
                      setActiveReportDayIndex(dIdx);
                      setCommitteeViewMode('single');
                    }}
                    style={{
                      backgroundColor: '#FAF5E8',
                      border: '1px solid #D0C2A7',
                      padding: '22px',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#7A3E29';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#D0C2A7';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 'bold', color: '#7A3E29' }}>
                          DAY 0{dayItem.day}
                        </span>
                        <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#8C7A70' }}>
                          {dayItem.date}
                        </span>
                      </div>

                      <h4 style={{ fontFamily: 'Title', fontSize: '1.15rem', margin: '0 0 6px 0', color: '#2C221E', lineHeight: 1.25 }}>
                        {dayItem.title}
                      </h4>

                      <div style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(122, 62, 41, 0.1)',
                        color: '#7A3E29',
                        fontSize: '9px',
                        fontFamily: 'monospace',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        marginBottom: '12px'
                      }}>
                        {dayItem.status}
                      </div>

                      <p style={{
                        fontFamily: 'sans-serif',
                        fontSize: '0.86rem',
                        color: '#42352F',
                        lineHeight: '1.55',
                        margin: '0 0 14px 0'
                      }}>
                        "{dayItem.content}"
                      </p>
                    </div>

                    <div style={{
                      borderTop: '1px solid rgba(208, 194, 167, 0.4)',
                      paddingTop: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#8C7A70' }}>
                        {dayItem.highlights.length} key records logged
                      </span>
                      <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#7A3E29', fontWeight: 'bold' }}>
                        OPEN DAY 0{dayItem.day} →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>


      {/* SECTION: ARCHIVAL VIDEOS */}
      <section ref={videoRef} style={{
        backgroundColor: '#F4ECD8',
        color: '#2C221E',
        padding: '0 60px 40px 60px',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{
            borderTop: '1px solid #2C221E',
            paddingTop: '20px',
            paddingBottom: isVideoSectionOpen ? '28px' : '0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            transition: 'padding 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                color: '#7A3E29',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 'bold'
              }}>
                ✦ SECTION 05.B // ARCHIVAL VIDEO REEL
              </span>
              <span style={{ width: '40px', height: '1px', backgroundColor: '#C5B496' }}></span>
              <span style={{
                fontFamily: 'Title',
                fontSize: '1.25rem',
                color: '#2C221E',
                fontStyle: 'italic'
              }}>
                Expedition Videos & Cultural Recordings
              </span>
            </div>

            <button
              onClick={() => setIsVideoSectionOpen((prev) => !prev)}
              aria-expanded={isVideoSectionOpen}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'monospace',
                fontSize: '11px',
                letterSpacing: '1.5px',
                color: isVideoSectionOpen ? '#7A3E29' : '#2C221E',
                fontWeight: 'bold',
                padding: '6px 10px',
                borderRadius: '2px',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#7A3E29';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isVideoSectionOpen ? '#7A3E29' : '#2C221E';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>{isVideoSectionOpen ? 'HIDE VIDEOS' : 'SHOW VIDEOS (04)'}</span>
              <span style={{
                display: 'inline-block',
                transform: isVideoSectionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontSize: '11px'
              }}>
                ▼
              </span>
            </button>
          </div>

          {isVideoSectionOpen && (
            <div className="anim-fade-in-up" style={{ marginTop: '10px' }}>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
                marginBottom: '35px'
              }}>
                {CAMP_VIDEOS.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    style={{
                      backgroundColor: '#FAF5E8',
                      border: '1px solid #D0C2A7',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 4px 12px rgba(44,34,30,0.04)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#7A3E29';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(44,34,30,0.12)';
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1.06)';
                      const playIcon = e.currentTarget.querySelector('.play-btn-pulse');
                      if (playIcon) playIcon.style.transform = 'translate(-50%, -50%) scale(1.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#D0C2A7';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(44,34,30,0.04)';
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1)';
                      const playIcon = e.currentTarget.querySelector('.play-btn-pulse');
                      if (playIcon) playIcon.style.transform = 'translate(-50%, -50%) scale(1)';
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', height: '170px', overflow: 'hidden', backgroundColor: '#1A1412' }}>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: 0.88,
                          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />
                      
                      <span style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(20, 15, 13, 0.85)',
                        color: '#FBF7EE',
                        fontFamily: 'monospace',
                        fontSize: '9px',
                        padding: '3px 6px',
                        borderRadius: '2px',
                        letterSpacing: '0.5px'
                      }}>
                        {video.duration}
                      </span>

                      <span style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        backgroundColor: '#7A3E29',
                        color: '#FBF7EE',
                        fontFamily: 'monospace',
                        fontSize: '9px',
                        padding: '2px 7px',
                        borderRadius: '2px',
                        fontWeight: 'bold'
                      }}>
                        DAY 0{video.day}
                      </span>

                      <div
                        className="play-btn-pulse anim-pulse-ring"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(244, 236, 216, 0.92)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        <div style={{
                          width: 0,
                          height: 0,
                          borderTop: '7px solid transparent',
                          borderBottom: '7px solid transparent',
                          borderLeft: '11px solid #7A3E29',
                          marginLeft: '3px'
                        }} />
                      </div>
                    </div>

                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                      <div>
                        <span style={{
                          fontFamily: 'monospace',
                          fontSize: '9px',
                          color: '#8C7A70',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          display: 'block',
                          marginBottom: '4px'
                        }}>
                          {video.category}
                        </span>
                        <h4 style={{
                          fontFamily: 'Title',
                          fontSize: '1.05rem',
                          margin: '0 0 8px 0',
                          color: '#2C221E',
                          lineHeight: '1.3'
                        }}>
                          {video.title}
                        </h4>
                        <p style={{
                          fontFamily: 'sans-serif',
                          fontSize: '0.8rem',
                          color: '#52443D',
                          lineHeight: '1.5',
                          margin: 0
                        }}>
                          {video.description}
                        </p>
                      </div>

                      <div style={{
                        marginTop: '14px',
                        paddingTop: '10px',
                        borderTop: '1px solid rgba(208, 194, 167, 0.4)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontFamily: 'monospace',
                        fontSize: '9px'
                      }}>
                        <span style={{ color: '#8C7A70' }}>{video.date}</span>
                        <span style={{ color: '#7A3E29', fontWeight: 'bold' }}>WATCH FOOTAGE ▶</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                textAlign: 'center',
                borderTop: '1px dashed #D0C2A7',
                paddingTop: '16px'
              }}>
                <button
                  onClick={() => setIsVideoSectionOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#7A3E29',
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    padding: '6px 14px',
                    borderRadius: '2px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#2C221E'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#7A3E29'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  ▲ HIDE VIDEO ARCHIVE
                </button>
              </div>

            </div>
          )}

        </div>
      </section>


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
                  <p style={{ margin: 0, lineHeight: 1.5 }}>5 Days Recorded<br />6 Expedition Groups<br />31 High-Res Photographs</p>
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
                transition: 'all 0.25s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(226, 212, 186, 0.15)';
                e.currentTarget.style.borderColor = '#E2D4BA';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(226, 212, 186, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>↑</span>
              <span>RETURN TO TOP</span>
            </button>
          </div>

        </div>
      </section>


      {/* INTERACTIVE PHOTO LIGHTBOX MODAL */}
      {selectedPhotoIndex !== null && ALL_PHOTOS[selectedPhotoIndex] && (
        <div 
          className="anim-fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(20, 15, 13, 0.95)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px'
          }}
        >
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
              letterSpacing: '2px',
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            [ESC / CLOSE]
          </button>

          <img
            src={ALL_PHOTOS[selectedPhotoIndex].url}
            alt={ALL_PHOTOS[selectedPhotoIndex].caption}
            className="anim-scale-up"
            style={{
              maxWidth: '85vw',
              maxHeight: '70vh',
              objectFit: 'contain',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
            }}
          />

          <div style={{ textAlign: 'center', marginTop: '20px', maxWidth: '600px' }}>
            <p style={{ fontFamily: 'Title', fontSize: '15px', fontStyle: 'italic', color: '#FBF7EE', margin: '0 0 6px 0' }}>
              {ALL_PHOTOS[selectedPhotoIndex].caption}
            </p>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#C5B496' }}>
              PHOTO {String(selectedPhotoIndex + 1).padStart(2, '0')} OF {String(ALL_PHOTOS.length).padStart(2, '0')}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '30px', marginTop: '25px' }}>
            <button
              onClick={() => setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : ALL_PHOTOS.length - 1))}
              style={{
                background: 'none',
                border: '1px solid #C5B496',
                color: '#FBF7EE',
                fontFamily: 'monospace',
                fontSize: '10px',
                padding: '6px 14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C5B496'; e.currentTarget.style.color = '#2C221E'; e.currentTarget.style.transform = 'translateX(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FBF7EE'; e.currentTarget.style.transform = 'translateX(0)'; }}
            >
              ← PREVIOUS
            </button>
            <button
              onClick={() => setSelectedPhotoIndex((prev) => (prev < ALL_PHOTOS.length - 1 ? prev + 1 : 0))}
              style={{
                background: 'none',
                border: '1px solid #C5B496',
                color: '#FBF7EE',
                fontFamily: 'monospace',
                fontSize: '10px',
                padding: '6px 14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C5B496'; e.currentTarget.style.color = '#2C221E'; e.currentTarget.style.transform = 'translateX(3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FBF7EE'; e.currentTarget.style.transform = 'translateX(0)'; }}
            >
              NEXT →
            </button>
          </div>
        </div>
      )}


      {/* INTERACTIVE VIDEO PLAYER LIGHTBOX MODAL */}
      {selectedVideo && (
        <div 
          className="anim-fade-in"
          onClick={() => setSelectedVideo(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 12, 10, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 110,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px'
          }}
        >
          <button
            onClick={() => setSelectedVideo(null)}
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
              letterSpacing: '2px',
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            [ESC / CLOSE VIDEO]
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="anim-scale-up"
            style={{
              maxWidth: '850px',
              width: '90vw',
              backgroundColor: '#1E1613',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
              border: '1px solid rgba(226, 212, 186, 0.2)'
            }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#000' }}>
              <video
                src={selectedVideo.videoUrl}
                poster={selectedVideo.thumbnail}
                controls
                autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            <div style={{ padding: '20px 24px', backgroundColor: '#2C221E', color: '#FBF7EE' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#C5B496' }}>
                  DAY 0{selectedVideo.day} // {selectedVideo.category.toUpperCase()} // DURATION: {selectedVideo.duration}
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#E2D4BA' }}>
                  {selectedVideo.date}
                </span>
              </div>
              <h3 style={{ fontFamily: 'Title', fontSize: '1.35rem', margin: '0 0 6px 0', color: '#FBF7EE' }}>
                {selectedVideo.title}
              </h3>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: '#C5B496', margin: 0, lineHeight: 1.5 }}>
                {selectedVideo.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}