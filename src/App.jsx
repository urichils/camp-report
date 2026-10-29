import photoManifest from './photoManifest.json';
import { useState, useRef, useEffect } from 'react';
import './App.css';
import sahayatraLogo from './assets/sahayatra-logo.png';
import bestCamper from './assets/Best_camper.jpg';
import bestCampgirl from './assets/Best_campgirl.jpg';
import kannanChettan from './assets/Kannan_chettan.JPG';
import abhijithChettan from './assets/Abhijith_chettan.jpg';
import benjamin from './assets/Benjamin.JPG';
import bestGroup from './assets/Best_group.JPG';
import { Bus, Utensils } from 'lucide-react';
import endImg from './assets/end.png';

// All public photos for the global filmstrip
// ALL_PHOTOS dynamically loaded from public/photos via photoManifest
const ALL_PHOTOS = photoManifest.map((item) => ({
  url: item.url,
  caption: item.caption || item.filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
}));

// FACULTY & ADVISORY DATA STRUCTURES
const CAMP_DIRECTORS = [
  { name: 'Dr. Sister Suni Rose I. P.', title: 'Camp Director' },
  { name: 'Dr. Rajeev S. P.', title: 'Camp Director' }
];

const CAMP_COORDINATORS = [
  'Dev Anand K',
  'Diljith K. Benny',
  'Priyanka E. Thampi',
  'Dr. Lijo K. J.',
  'Lakshmi Jayaraj',
  'Keerthana Mohandas'
];

const CAMP_ADVISERS = [
  { name: 'Dr. Kiran Thampi', designation: 'Head, Social Work Department' },
  { name: 'Dr. Bindiya M. Varghese', designation: 'Dean, Computer Science Department' },
  { name: 'Dr. Dais George', designation: 'Head, Statistics Department' },
  { name: 'Sunu Mary Abraham', designation: 'Head, Computer Science Department' },
  { name: 'Dr. Rashmi P.', designation: 'Head, Psychology Department' }
];

// STUDENT OFFICE BEARERS DATA
const STUDENT_OFFICE_BEARERS = [
  'Kevin J',
  'Parvathy Krishna',
  'Annet Treesa Joy',
  'Sangeeth M.',
  'Anna S. Biju',
  'Laya V. Unni',
  'Sara Shaiju'
];

// GROUP LEADERS DATA
const GROUP_LEADERS = [
  { group: 'Group 1', leader: 'Abhishek Vincent', deputy: 'Annamol Joseph' },
  { group: 'Group 2', leader: 'Anna Maria Varghese', deputy: 'Christine Binu' },
  { group: 'Group 3', leader: 'Ashwin P.', deputy: 'Anannya Raghunath K.' },
  { group: 'Group 4', leader: 'Sayana Das', deputy: 'Ajo K. Biju' },
  { group: 'Group 5', leader: 'Maria Biju', deputy: 'James Manuel' },
  { group: 'Group 6', leader: 'Athulya Madhav', deputy: 'Annsteve Jaison' }
];

// COMMITTEE CONVENERS DATA
const COMMITTEE_CONVENERS = [
  { code: 'COM 01', committee: 'Publicity, Documentation and Camp Paper', convener: 'Athul John Joseph', coConvener: 'Meghana Annup' },
  { code: 'COM 02', committee: 'Food and Waste Management', convener: 'Nidhi Grace', coConvener: 'Jiss Abraham' },
  { code: 'COM 03', committee: 'Programme and Cultural', convener: 'Ahmed Shameer', coConvener: 'Aysha Sana V.' },
  { code: 'COM 04', committee: 'Discipline', convener: 'Abhijith Biju', coConvener: 'Don Savio' },
  { code: 'COM 05', committee: 'Travel and Accommodation', convener: 'Pragathi Raj', coConvener: 'Akhil' },
  { code: 'COM 06', committee: 'Tools and Work', convener: 'Thejaswini Nair', coConvener: 'Abhinav B. T.' },
  { code: 'COM 07', committee: 'Finance, First Aid and Medical', convener: 'Aleena K. Ani', coConvener: 'Nikhil Paul' }
];

const GROUP_DATA = [
  {
    id: 'group-1',
    name: 'Group 01',
    days: [
      {
        day: 1,
        title: 'Cultural Programmes & Duty Planning',
        points: [
          'Rehearsed and performed culturals',
          "Discussed tomorrow's cleaning duty"
        ],
        note: "Rehearsed and performed culturals. Discussed tomorrow's cleaning duty."
      },
      {
        day: 2,
        title: 'Camp Premises Cleaning & Township Visit',
        points: [
          'Cleaned the inner and outer camp premises',
          'Visited Township — visited 53 houses and planted 275 saplings',
          'Interacted with the local community'
        ],
        note: 'Cleaned the inner and outer camp premises. Visited Township — visited 53 houses and planted 275 saplings. Interacted with the local community.'
      },
      {
        day: 3,
        title: 'Arunamala Material Transportation',
        points: [
          'Reached Arunamala early in the morning and engaged in material transportation.',
          'Transported over 75 bricks'
        ],
        note: 'Reached Arunamala early in the morning and engaged in material transportation. Transported over 75 bricks.'
      },
      {
        day: 4,
        title: 'Full Camp Meal Preparation & Waste Management',
        points: [
          'Prepared meals for the whole camp and managed waste disposals for the day.',
          'Breakfast — idly, sambar, boiled egg',
          'Lunch — fried rice, chilli chicken, gobi manchurian',
          'Dinner — tomato rice, soya curry'
        ],
        note: 'Prepared meals for the whole camp and managed waste disposals for the day. Breakfast — idly, sambar, boiled egg. Lunch — fried rice, chilli chicken, gobi manchurian. Dinner — tomato rice, soya curry.'
      },
      {
        day: 5,
        title: 'Meppadi Town Public Cleaning & Township Culturals',
        points: [
          'Collected tools and travelled to Meppadi Town for cleaning of the public premises allocated by the Town Panchayat',
          'Cleaned the wall and school premises of Meppadi L.P. School',
          'Performed cultural programmes at Township'
        ],
        note: 'Collected tools and travelled to Meppadi Town for cleaning of the public premises allocated by the Town Panchayat. Cleaned the wall and school premises of Meppadi L.P. School. Performed cultural programmes at Township.'
      }
    ]
  },
  {
    id: 'group-2',
    name: 'Group 02',
    days: [
      {
        day: 1,
        title: 'Campsite Settlement, Inauguration & Briefing',
        points: [
          'Settled into campsite',
          'Gathered for camp inauguration and cultural programmes',
          'Participated in camp evaluation and briefing'
        ],
        note: 'Settled into campsite. Gathered for camp inauguration and cultural programmes. Participated in camp evaluation and briefing.'
      },
      {
        day: 2,
        title: 'Poolakkunnu Material Transport & Camp Paper',
        points: [
          'Visited Poolakkunnu for material transportation — moved M-sand and mud bricks to construction site',
          'Presented camp paper during camp evaluation',
          'Washed and prepared items for next day’s food preparation'
        ],
        note: 'Visited Poolakkunnu for material transportation — moved M-sand and mud bricks to construction site. Presented camp paper during camp evaluation. Washed and prepared items for next day’s food preparation.'
      },
      {
        day: 3,
        title: 'Camp Food Preparation & Principal Welcome Dinner',
        points: [
          'Food preparation for the whole camp and overall waste disposal for the day.',
          'Dinner was specially prepared to warmly welcome our principal to the campsite'
        ],
        note: 'Food preparation for the whole camp and overall waste disposal for the day. Dinner was specially prepared to warmly welcome our principal to the campsite.'
      },
      {
        day: 4,
        title: 'Arunamala Material Transportation & Culturals',
        points: [
          'Visited Arunamala for material transportation',
          'Rehearsal and performance of cultural programme',
          'Discussed objectives for next day’s cleaning'
        ],
        note: 'Visited Arunamala for material transportation. Rehearsal and performance of cultural programme. Discussed objectives for next day’s cleaning.'
      },
      {
        day: 5,
        title: 'Campsite Cleaning, Meppadi Town Service & Final Evaluation',
        points: [
          'Fulfilled cleaning duties throughout the campsite',
          'Visited Meppadi Town — participated in an inauguration ceremony headed by Panchayat President and cleaned assigned public premises',
          'Engaged in final camp evaluation'
        ],
        note: 'Fulfilled cleaning duties throughout the campsite. Visited Meppadi Town — participated in an inauguration ceremony headed by Panchayat President and cleaned assigned public premises. Engaged in final camp evaluation.'
      }
    ]
  },
  {
    id: 'group-3',
    name: 'Group 03',
    days: [
      {
        day: 1,
        title: 'Camp Inauguration, Camp Paper & Member Meeting',
        points: [
          'Participated in camp inauguration',
          'Presented camp paper during camp evaluation',
          'Conducted meeting with all members'
        ],
        note: 'Participated in camp inauguration. Presented camp paper during camp evaluation. Conducted meeting with all members.'
      },
      {
        day: 2,
        title: 'Chulukka School Ground & Premises Cleaning',
        points: [
          'Assigned to Chulukka for cleaning the ground and premises of a school',
          'Discussed about next day’s cultural activities'
        ],
        note: 'Assigned to Chulukka for cleaning the ground and premises of a school. Discussed about next day’s cultural activities.'
      },
      {
        day: 3,
        title: 'Arunamala Material Transport & Cultural Performance',
        points: [
          'Visited Arunamala for material transportation to construction site',
          'Rehearsed and performed cultural programme'
        ],
        note: 'Visited Arunamala for material transportation to construction site. Rehearsed and performed cultural programme.'
      },
      {
        day: 4,
        title: 'Campsite Cleaning & Arunamala Brick Hauling (300+)',
        points: [
          'Cleaned the inner and outer premises of the campsite',
          'Visited Arunamala for material transportation to construction site — transported over 300 bricks',
          'Cleaned and arranged items for next day’s food preparation'
        ],
        note: 'Cleaned the inner and outer premises of the campsite. Visited Arunamala for material transportation to construction site — transported over 300 bricks. Cleaned and arranged items for next day’s food preparation.'
      },
      {
        day: 5,
        title: 'Joint Food Preparation (Chicken Biriyani) & Waste Disposal',
        points: [
          'Food preparation for the whole camp and overall waste disposal for the day along with group 6',
          'Prepared chicken biriyani'
        ],
        note: 'Food preparation for the whole camp and overall waste disposal for the day along with group 6. Prepared chicken biriyani.'
      }
    ]
  },
  {
    id: 'group-4',
    name: 'Group 04',
    days: [
      {
        day: 1,
        title: 'Campsite Settlement & Full Camp Dinner Preparation',
        points: [
          'Settled into campsite',
          'Prepared dinner for the whole camp'
        ],
        note: 'Settled into campsite. Prepared dinner for the whole camp.'
      },
      {
        day: 2,
        title: 'Early Arunamala Material Transport & Daily Evaluation',
        points: [
          'Made an early start to Arunamala for material transportation',
          'Participated in daily camp evaluation'
        ],
        note: 'Made an early start to Arunamala for material transportation. Participated in daily camp evaluation.'
      },
      {
        day: 3,
        title: 'Township House Visits & 5-Variety Sapling Distribution',
        points: [
          'Assigned to township — conducted house visits, distributed five varieties of saplings',
          'Participated in daily camp evaluation',
          'Conducted meeting to discuss next day’s duties'
        ],
        note: 'Assigned to township — conducted house visits, distributed five varieties of saplings. Participated in daily camp evaluation. Conducted meeting to discuss next day’s duties.'
      },
      {
        day: 4,
        title: 'Poolakkunnu Material Transport & Cultural Performances',
        points: [
          'Assigned to Poolakkunnu for material transportation — transported M-sand and mud bricks',
          'Rehearsed and participated in the day’s cultural performances'
        ],
        note: 'Assigned to Poolakkunnu for material transportation — transported M-sand and mud bricks. Rehearsed and participated in the day’s cultural performances.'
      },
      {
        day: 5,
        title: 'Panchayat President Gathering, Meppadi Cleaning & Camp Paper',
        points: [
          'Participated in an inaugural gathering headed by Panchayat President',
          'Visited Meppadi Town for cleaning the assigned public premises',
          'Presented camp paper during camp evaluation'
        ],
        note: 'Participated in an inaugural gathering headed by Panchayat President. Visited Meppadi Town for cleaning the assigned public premises. Presented camp paper during camp evaluation.'
      },
      {
        day: 6,
        title: 'Final Campsite Sweep & Premises Cleaning',
        points: [
          'Conducted a final cleaning of the inner and outer premises of the campsite.'
        ],
        note: 'Conducted a final cleaning of the inner and outer premises of the campsite.'
      }
    ]
  },
  {
    id: 'group-5',
    name: 'Group 05',
    days: [
      {
        day: 1,
        title: 'Pre-Camp Food Preparation, Setup & Premises Cleaning',
        points: [
          'Pre-camp members made breakfast and lunch for the rest of the campers',
          'Cleaned and arranged premises for the campers',
          'Arranged items for next day’s food preparation duty'
        ],
        note: 'Pre-camp members made breakfast and lunch for the rest of the campers. Cleaned and arranged premises for the campers. Arranged items for next day’s food preparation duty.'
      },
      {
        day: 2,
        title: 'Full Camp Food Preparation & Experience Sharing',
        points: [
          'Prepared food for the whole camp',
          'Participated in the camp evaluation and shared experiences',
          'Conducted meeting for next day’s duties'
        ],
        note: 'Prepared food for the whole camp. Participated in the camp evaluation and shared experiences. Conducted meeting for next day’s duties.'
      },
      {
        day: 3,
        title: 'Campsite Cleaning & Poolakkunnu Material Transport',
        points: [
          'Assigned cleaning duties — cleaned the inner and outer premises of the campsite',
          'Visited Poolakkunnu for material transportation — transported M-sand and mud bricks'
        ],
        note: 'Assigned cleaning duties — cleaned the inner and outer premises of the campsite. Visited Poolakkunnu for material transportation — transported M-sand and mud bricks.'
      },
      {
        day: 4,
        title: 'Arunamala Mud Brick Transport & Camp Paper Presentation',
        points: [
          'Assigned to Arunamala for material transportation — transported mud bricks',
          'Presented camp paper during camp evaluation',
          'Conducted meeting to discuss next day’s culturals'
        ],
        note: 'Assigned to Arunamala for material transportation — transported mud bricks. Presented camp paper during camp evaluation. Conducted meeting to discuss next day’s culturals.'
      },
      {
        day: 5,
        title: 'Meppadi Town Public Cleaning & Cultural Showcase',
        points: [
          'Participated in inauguration function and spent time at Meppadi Town for cleaning the assigned public premises',
          'Rehearsed and performed the cultural events'
        ],
        note: 'Participated in inauguration function and spent time at Meppadi Town for cleaning the assigned public premises. Rehearsed and performed the cultural events.'
      }
    ]
  },
  {
    id: 'group-6',
    name: 'Group 06',
    days: [
      {
        day: 1,
        title: 'Campsite Settlement & Corridor Cleaning Duties',
        points: [
          'Settled into the camp site',
          'Performed cleaning duties — corridors and open areas'
        ],
        note: 'Settled into the camp site. Performed cleaning duties — corridors and open areas.'
      },
      {
        day: 2,
        title: 'Arunamala Mud Brick Transport & Culturals',
        points: [
          'Visited Arunamala to transport mud bricks',
          'Rehearsed and performed cultural activities'
        ],
        note: 'Visited Arunamala to transport mud bricks. Rehearsed and performed cultural activities.'
      },
      {
        day: 3,
        title: 'Poolakkunnu Material Transport & Review Meeting',
        points: [
          'Visited Poolakkunnu for material transportation',
          'Presented camp paper during camp evaluation',
          'Conducted a meeting to review the day’s activities'
        ],
        note: 'Visited Poolakkunnu for material transportation. Presented camp paper during camp evaluation. Conducted a meeting to review the day’s activities.'
      },
      {
        day: 4,
        title: 'Arunamala Team Brick Haul (300+ Bricks)',
        points: [
          'Visited Arunamala to complete the assigned tasks — transported over 300 bricks as a team',
          'Participated in daily camp evaluation',
          'Cleaned and arranged items for next day’s food preparation and waste disposal'
        ],
        note: 'Visited Arunamala to complete the assigned tasks — transported over 300 bricks as a team. Participated in daily camp evaluation. Cleaned and arranged items for next day’s food preparation and waste disposal.'
      },
      {
        day: 5,
        title: 'Joint Kitchen Duty (Food & Waste), Final Review & Campfire',
        points: [
          'Food preparation for the whole camp and managed waste disposal for the day along with group 3',
          'Participated in the final camp evaluation and campfire'
        ],
        note: 'Food preparation for the whole camp and managed waste disposal for the day along with group 3. Participated in the final camp evaluation and campfire.'
      }
    ]
  }
];

const COMMITTEE_REPORTS = [
  {
    id: 'com-prog',
    code: 'COM 01',
    name: 'Programme & Culturals',
    title: 'Programme, Reception, and Culturals',
    days: [
      {
        day: 1,
        points: [
          'Arranged equipments for the inaugural function - auditorium and stage settings, generator for power supply',
          'Committee members took care of the lighting and sound of the entire event'
        ]
      },
      {
        day: 2,
        points: [
          'Conducted sound check for the cultural event',
          'Ensured smooth conduction of culturals - setting mic, and ensuring order of songs'
        ]
      },
      {
        day: 3,
        points: [
          'Cultural event delayed due to late arrival from worksite (Arunamala)',
          'Received Principal Prof. Dr. Fr. Saju M.D. as part of reception duty',
          'Arranged equipment and conducted sound check for the cultural events'
        ]
      },
      {
        day: 4,
        points: [
          'Cultural event of two groups together - prepared and ensured audio',
          'Event got delayed due to late arrival from worksite',
          'Issues faced with feeder speaker later resolved'
        ]
      },
      {
        day: 5,
        points: [
          'Had three programmes to coordinate',
          'Street play at 3 PM',
          'Cultural event at Township at 5 PM',
          'De Paul School Students event at 5:30 PM',
          'Campers’ culturals at 6:30 PM',
          'Campfire',
          'By 4:30 PM, the team went to township to clear the area for the event',
          'Campfire was set in the school ground, which was conducted at 12 AM'
        ]
      }
    ]
  },
  {
    id: 'com-travel',
    code: 'COM 02',
    name: 'Accommodation & Travel',
    title: 'Accommodation and Travel',
    days: [
      {
        day: 1,
        points: [
          'Campers reached the campsite safely and on time',
          'Cleared out luggage from the bus spaces'
        ]
      },
      {
        day: 2,
        points: [
          'Arranged buses to and from the respective areas: Chulukka, Arunamala, Poolakkunnu',
          'Conducted meeting - discussed duties for the next day and conducted briefing'
        ]
      },
      {
        day: 3,
        points: [
          'Arranged buses for the respective areas: Arunamala, Poolakkunnu',
          'Addressed the reported missing items from the buses'
        ]
      },
      {
        day: 4,
        points: [
          'Arranged buses to and from Arunamala',
          'Buses left to campsite on time',
          'Group meeting and debriefing'
        ]
      },
      {
        day: 5,
        points: [
          'Arranged buses to and from Town Panchayat Office',
          'Shared updates during final camp evaluation'
        ]
      },
      {
        day: 6,
        points: [
          'Buses left from campsite to Kalamassery - slightly delayed due to logistical issues'
        ]
      }
    ]
  },
  {
    id: 'com-doc',
    code: 'COM 03',
    name: 'Publicity & Documentation',
    title: 'Publicity, Documentation, and Camp Paper',
    days: [
      {
        day: 1,
        points: [
          'Captured geotagged photographs, untagged photographs, and videos for the inauguration and cultural event',
          'Distributed flyers of the camp to all the campers',
          'Oriented the group assigned to present the camp paper',
          'Distributed daily reports to group and committee leaders'
        ]
      },
      {
        day: 2,
        points: [
          'Captured geotagged photographs, untagged photographs, and videos at Poolakkunnu, Arunamala, Chulukka, and Township',
          'Conducted meeting with members - discussed seeking permission for electronic device access, and allocated duties to members to take initiative within their own groups'
        ]
      },
      {
        day: 3,
        points: [
          'Oriented Group 2 on their camp paper presentation',
          'Reviewed documented media taken at work sites',
          'Reviewed daily reports received from committees and groups'
        ]
      },
      {
        day: 4,
        points: [
          'Captured geotagged photographs, untagged photographs, and videos at Poolakkunnu, Arunamala, and Township',
          'Took photographs of the campsite and the surrounding premises.',
          'Conducted meeting - instructed to compile all documented media into a drive link once the team returns to Kalamassery'
        ]
      },
      {
        day: 5,
        points: [
          'Captured geotagged photographs, untagged photographs, and videos at Meppadi Town',
          'Compiled daily reports and noted the groups and committees yet to submit their reports',
          'Shared overall updates and conveyed thanks to everyone involved, during the final camp evaluation'
        ]
      }
    ]
  },
  {
    id: 'com-finance',
    code: 'COM 04',
    name: 'Finance & First Aid',
    title: 'Finance, First Aid, and Crisis Management',
    days: [
      {
        day: 1,
        points: [
          'Reached campsite and prepared first aid kits to be distributed',
          'Conducted meeting - allocated duties within committee members'
        ]
      },
      {
        day: 2,
        points: [
          'Prepared dettol mixes for work site',
          'Provided first aid kits to all the group representatives within the committee',
          'Discussed and noted today’s total finance spending'
        ]
      },
      {
        day: 3,
        points: [
          'Prepared dettol mixes for work site',
          'Provided money to the group representatives within the committee for their necessary needs; collected the bills later',
          'Updated some medical equipment'
        ]
      },
      {
        day: 4,
        points: [
          'Distributed money to the group representatives within the committee for their necessary needs; collected the bills later',
          'Took campers who were in need of medical attention to the hospital'
        ]
      },
      {
        day: 5,
        points: [
          'Prepared the day-to-day final account committee-wise and presented it during the camp evaluation',
          'Provided first aid to those in need and took the campers who were in need of medical attention to the hospital',
          'Conducted final meeting on-site - Return extra medical supplies to the college and settle the remaining accounts as soon as possible'
        ]
      }
    ]
  },
  {
    id: 'com-food',
    code: 'COM 05',
    name: 'Food & Waste',
    title: 'Food and Waste Management',
    days: [
      {
        day: 1,
        points: [
          'Stocked the kitchen and ordered utensils',
          'Checked kitchen appliances and other equipment before use',
          'Finalized food menu, and served food to the whole camp'
        ]
      },
      {
        day: 2,
        points: [
          'Checked the condition of utensils and availability of groceries for the day’s menu',
          'Supported and supervised Group 5',
          'Cleaned the kitchen and ordered the next day’s menu items'
        ]
      },
      {
        day: 3,
        points: [
          'Checked the condition of utensils and availability of groceries for the day’s menu',
          'Supported and supervised Group 2',
          'Prepared to welcome Principal to the camp with special menu'
        ]
      },
      {
        day: 4,
        points: [
          'Checked the condition of utensils and availability of groceries for the day’s menu',
          'Supported and supervised Group 1',
          'Sent food to the campers going for on-site duty'
        ]
      },
      {
        day: 5,
        points: [
          'Checked the condition of utensils and availability of groceries for the day’s menu',
          'Supported and supervised Group 3 & 6',
          'Sent food to the campers going for on-site duty'
        ]
      }
    ]
  },
  {
    id: 'com-disc',
    code: 'COM 06',
    name: 'Discipline & Monitoring',
    title: 'Discipline and Monitoring',
    days: [
      {
        day: 1,
        points: [
          'Figured out the rules and regulations for maintaining order',
          'Supported with room allocation and maintaining order',
          'Conducted meeting - distributed bedtime and wake-up duties and other responsibilities among the members'
        ]
      },
      {
        day: 2,
        points: [
          'Adequately managed time in between and throughout the day’s activities; ensured smooth flow of overall group activities',
          'Informed the overall rules and regulations during the morning assembly',
          'Conducted meeting - coordination of work between members'
        ]
      },
      {
        day: 3,
        points: [
          'Managed proper wake-up time and prompt attendance during morning assembly',
          'Managed discipline during field duties: committee members within groups took charge',
          'Conducted meeting - took suggestions from group members regarding maintaining discipline within their own groups'
        ]
      },
      {
        day: 4,
        points: [
          'Managed proper wake-up time and prompt attendance during morning assembly',
          'Ensured smooth flow of activities both at campsite and work sites',
          'Conducted meeting - members must ensure their group members follow decorum during next day’s field work'
        ]
      },
      {
        day: 5,
        points: [
          'Morning assembly and departure to work site occurred smoothly',
          'Conducted final review meeting',
          'Shared updates and suggestions during final camp evaluation'
        ]
      }
    ]
  },
  {
    id: 'com-tools',
    code: 'COM 07',
    name: 'Tools & Work',
    title: 'Tools and Work',
    days: [
      {
        day: 1,
        points: [
          'Reached campsite and scheduled work to be divided among different groups',
          'Cleaned and arranged the necessary for next day’s field work',
          'Conducted meeting - how to instruct maintenance and cleanliness of tools to group members'
        ]
      },
      {
        day: 2,
        points: [
          'Tools were set out for each group; groups collect their tools and record them in the log book',
          'Ensured the tools were brought back clean and in proper count. Recorded some damages.',
          'Conducted meeting - divided work among the groups for the next day'
        ]
      },
      {
        day: 3,
        points: [
          'Explained the work site and duties during the morning assembly',
          'Distributed the tools and ensured their signatures in the log book; ensured return of all tools and examined for any damage',
          'Conducted meeting - planned and organized tool distribution like how and who will be doing it, etc.'
        ]
      },
      {
        day: 4,
        points: [
          'Gave the camp an overview of the tools and their appropriate needs',
          'Ensured the tools were brought back clean and in proper count. Recorded some damages.',
          'Conducted meeting - divided work among the groups for the next day'
        ]
      },
      {
        day: 5,
        points: [
          'Distributed tools as per the group, and supported students at Meppadi Gram Panchayat and Meppadi L.P. School',
          'Checked for any loss or damage of tools before loading them into the buses',
          'Conducted the overall review of the group and conveyed thanks to everyone in involved, during the camp evaluation'
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

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : null;
};

const FINAL_CAMP_VIDEO = {
  id: 'final-camp-film',
  title: 'Sahayathra 2026 — A Journey Towards Change.',
  category: 'Official Presentation Film',
  duration: '06:16',
  date: 'SAHAYATHRA 2026',
  thumbnail: 'https://i.ytimg.com/vi/VcXdd2t63Dg/maxresdefault.jpg',
  caption: 'Official camp representation film capturing the spirit, hard work, community service, and unforgettable memories of our journey in Wayanad.',
  videoUrl: 'https://youtu.be/VcXdd2t63Dg'
};

const CAMP_TIMETABLE = [
  { time: '4:30 AM', activity: 'Morning wake-up' },
  { time: '6:00 AM', activity: 'Assembly' },
  { time: '7:00 AM', activity: 'Morning prayer / devotional session' },
  { time: '7:30 AM', activity: 'Voluntary labour' },
  { time: '9:00 AM', activity: 'Voluntary labour continues' },
  { time: '11:00 AM', activity: 'Refreshments' },
  { time: '11:15 AM', activity: 'Voluntary labour continues' },
  { time: '1:00 PM', activity: 'Lunch' },
  { time: '2:00 PM', activity: 'Household visits' },
  { time: '4:30 PM', activity: 'Break' },
  { time: '6:00 PM', activity: 'Cultural programmes' },
  { time: '8:15 PM', activity: 'Dinner' },
  { time: '9:15 PM', activity: 'Club evaluation' },
  { time: '10:00 PM', activity: 'Good night' },
];

export default function App() {
  const [offset, setOffset] = useState(0);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [activeReportIndex, setActiveReportIndex] = useState(0);
  const [activeReportDayIndex, setActiveReportDayIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(false);
  const [activeArchiveSection, setActiveArchiveSection] = useState(null);
  const [isArchiveCollapsed, setIsArchiveCollapsed] = useState(false);

  
  // fade keys for content transitions
  const [groupFadeKey, setGroupFadeKey] = useState(0);
  const [dayFadeKey, setDayFadeKey] = useState(0);

  const heroRef = useRef(null);
  const facultyRef = useRef(null);
  const leadersRef = useRef(null);
  const journalRef = useRef(null);
  const reportsRef = useRef(null);
  const videoRef = useRef(null);
  const finalVideoRef = useRef(null);
  const thanksRef = useRef(null);
  const epilogueRef = useRef(null);
  const preCampRef = useRef(null);
  const postCampRef = useRef(null);
  const dePaulThanksRef = useRef(null);
  const campTimetableRef = useRef(null);
  const endRef = useRef(null);
  const awardsRef = useRef(null);
  const helpingHandsRef = useRef(null);



  const activeGroup = GROUP_DATA[activeGroupIndex];
  const activeDay = activeGroup.days[activeDayIndex] || activeGroup.days[0];
  const activeReport = COMMITTEE_REPORTS[activeReportIndex];
  const activeReportDay = activeReport.days[activeReportDayIndex] || activeReport.days[0];

  // Smooth Parallax listener with requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffset(window.pageYOffset);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchGroup = (idx) => {
    setActiveGroupIndex(idx);
    setActiveDayIndex(0);
    setGroupFadeKey((k) => k + 1);
    setDayFadeKey((k) => k + 1);
  };

  const switchDay = (idx) => {
    setActiveDayIndex(idx);
    setDayFadeKey((k) => k + 1);
  };

  // Sequential side-arrow navigation for groups (Group 1 Day1 -> ... -> Group 6 Day5, wraps)
  const advanceGroup = (dir) => {
    if (dir > 0) {
      if (activeDayIndex < activeGroup.days.length - 1) {
        switchDay(activeDayIndex + 1);
      } else if (activeGroupIndex < GROUP_DATA.length - 1) {
        switchGroup(activeGroupIndex + 1);
      } else {
        switchGroup(0);
      }
    } else {
      if (activeDayIndex > 0) {
        switchDay(activeDayIndex - 1);
      } else if (activeGroupIndex > 0) {
        const prevGroup = GROUP_DATA[activeGroupIndex - 1];
        setActiveGroupIndex(activeGroupIndex - 1);
        setActiveDayIndex(prevGroup.days.length - 1);
        setGroupFadeKey((k) => k + 1);
        setDayFadeKey((k) => k + 1);
      } else {
        const lastGroup = GROUP_DATA[GROUP_DATA.length - 1];
        setActiveGroupIndex(GROUP_DATA.length - 1);
        setActiveDayIndex(lastGroup.days.length - 1);
        setGroupFadeKey((k) => k + 1);
        setDayFadeKey((k) => k + 1);
      }
    }
  };

  // Sequential side-arrow navigation for committee reports
  const advanceReport = (dir) => {
    if (dir > 0) {
      if (activeReportDayIndex < activeReport.days.length - 1) {
        setActiveReportDayIndex((i) => i + 1);
      } else if (activeReportIndex < COMMITTEE_REPORTS.length - 1) {
        setActiveReportIndex((i) => i + 1);
        setActiveReportDayIndex(0);
      } else {
        setActiveReportIndex(0);
        setActiveReportDayIndex(0);
      }
    } else {
      if (activeReportDayIndex > 0) {
        setActiveReportDayIndex((i) => i - 1);
      } else if (activeReportIndex > 0) {
        setActiveReportIndex((i) => i - 1);
        setActiveReportDayIndex(COMMITTEE_REPORTS[activeReportIndex - 1].days.length - 1);
      } else {
        setActiveReportIndex(COMMITTEE_REPORTS.length - 1);
        setActiveReportDayIndex(COMMITTEE_REPORTS[COMMITTEE_REPORTS.length - 1].days.length - 1);
      }
    }
  };

  const selectedPhotoIndexRef = useRef(selectedPhotoIndex);
  const selectedVideoRef = useRef(selectedVideo);
  useEffect(() => { selectedPhotoIndexRef.current = selectedPhotoIndex; }, [selectedPhotoIndex]);
  useEffect(() => { selectedVideoRef.current = selectedVideo; }, [selectedVideo]);

  // Show the shared photo archive only while the group journal or committee reports
  // is the section occupying the middle of the viewport.
  useEffect(() => {
    const updateActiveArchive = () => {
      const viewportCenter = window.innerHeight / 2;
      const journalEl = journalRef.current;
      const reportsEl = reportsRef.current;

      const isAtSection = (element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= viewportCenter && rect.bottom > viewportCenter;
      };

      if (isAtSection(reportsEl)) {
        setActiveArchiveSection('committees');
      } else if (isAtSection(journalEl)) {
        setActiveArchiveSection('groups');
      } else {
        setActiveArchiveSection(null);
      }
    };

    updateActiveArchive();
    window.addEventListener('scroll', updateActiveArchive, { passive: true });
    window.addEventListener('resize', updateActiveArchive);
    return () => {
      window.removeEventListener('scroll', updateActiveArchive);
      window.removeEventListener('resize', updateActiveArchive);
    };
  }, []);

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
          setActiveGroupIndex((prevGroupIdx) => {
            const nextGroupIdx = (prevGroupIdx + 1) % GROUP_DATA.length;
            setGroupFadeKey((k) => k + 1);
            return nextGroupIdx;
          });
          setDayFadeKey((k) => k + 1);
          return 0;
        }
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlayActive, activeGroupIndex]);

  // Keyboard Navigation: Smooth Up/Down Section Presentation Scroll + Modal controls
  useEffect(() => {
    const handleKeyDown = (e) => {
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

      if (selectedPhotoIndex !== null) {
        if (e.key === 'ArrowLeft') {
          setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : ALL_PHOTOS.length - 1));
        } else if (e.key === 'ArrowRight') {
          setSelectedPhotoIndex((prev) => (prev < ALL_PHOTOS.length - 1 ? prev + 1 : 0));
        }
        return;
      }

      // Side-arrow sequential navigation for groups and committee reports
      if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && selectedVideo === null) {
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const scrollY = window.pageYOffset;
        const journalTop = journalRef.current?.offsetTop || 0;
        const reportsTop = reportsRef.current?.offsetTop || 0;
        if (Math.abs(scrollY - journalTop) <= Math.abs(scrollY - reportsTop)) {
          advanceGroup(dir);
        } else {
          advanceReport(dir);
        }
        return;
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const currentScroll = window.pageYOffset;
        const sectionPositions = Array.from(document.querySelectorAll('#sahayatra-root > section')).map((section) => section.offsetTop);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPhotoIndex, selectedVideo, activeGroupIndex, activeDayIndex, activeReportIndex, activeReportDayIndex]);


  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-snap-type: y mandatory;
          scroll-padding-top: 0;
        }

        body {
          margin: 0;
          overscroll-behavior-y: contain;
        }

        #sahayatra-root > section {
          box-sizing: border-box;
          min-height: 100vh;
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }

        /* Keep short sections the same full-slide height as the rest.
           Long sections can still grow naturally to fit their content. */
        #sahayatra-root > section > div {
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          #sahayatra-root > section {
            min-height: 100svh;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }

        @media (max-width: 768px) {
          html {
            scroll-snap-type: y proximity;
          }
        }
      `}</style>
      <div id="sahayatra-root" style={{ backgroundColor: '#2C221E', minHeight: '100vh', color: '#FBF7EE', fontFamily: 'serif' }}>
      
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
          transform: `translate3d(0, ${offset * 0.35}px, 0)`,
          willChange: 'transform',
          transition: 'transform 0.1s linear'
        }} />

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '11px', color: '#E2D4BA', borderBottom: '1px solid rgba(226, 212, 186, 0.2)', paddingBottom: '12px' }}>
          <span style={{ letterSpacing: '1px' }}>✦ FIELD JOURNAL</span>
          <span style={{ letterSpacing: '1px' }}>SAHAYATHRA 2026</span>
        </div>

        <div 
          style={{ 
            position: 'relative', 
            zIndex: 10, 
            maxWidth: '650px', 
            margin: 'auto', 
            textAlign: 'center',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <span style={{
            fontSize: '12px',
            letterSpacing: '3px',
            color: '#E2D4BA',
            display: 'block',
            marginBottom: '20px'
          }}>
            SOCIAL SENSITISATION CAMP
          </span>

          <img
            src={sahayatraLogo}
            alt="Sahayathra 2026 Logo"
            style={{
              width: '100%',
              maxWidth: '850px',
              height: 'auto',
              display: 'block',
              margin: '0 auto 20px',
              objectFit: 'contain'
            }}
          />

          <h2 style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
            color: '#FBF7EE',
            lineHeight: 1.5,
            margin: 0
          }}>
            സമൂഹത്തോടൊപ്പം മാറ്റത്തിലേക്ക് ഒരു യാത്ര
          </h2>
        </div>

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#C5B496', fontFamily: 'monospace', fontSize: '9px', letterSpacing: '2px' }}>
          <p style={{ margin: 0 }}>PRESS ↓ OR SCROLL TO OPEN JOURNAL</p>
          <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '13px' }}>↓</span>
        </div>
      </section>


      {/* SECTION 2: FACULTY, COORDINATORS & ADVISERS */}
      <section ref={facultyRef} style={{
        backgroundColor: '#FBF7EE',
        color: '#2C221E',
        padding: '80px 60px',
        borderTop: '1px solid #E0D4BE'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ borderBottom: '1px solid #2C221E', paddingBottom: '16px', marginBottom: '36px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Section 02 // Faculty & Advisory Leadership
            </span>
            <h2 style={{ fontFamily: 'Title', fontSize: '2.2rem', margin: 0, fontWeight: 'bold', color: '#2C221E' }}>
              Camp Mentors & Directors
            </h2>
          </div>

          {/* 2A. CAMP DIRECTORS */}
          <div style={{ marginBottom: '40px' }}>
            <span style={{ backgroundColor: '#7A3E29', color: '#FBF7EE', fontFamily: 'monospace', fontSize: '9px', padding: '3px 8px', borderRadius: '2px', fontWeight: 'bold', letterSpacing: '1px', display: 'inline-block', marginBottom: '14px' }}>
              CAMP DIRECTORS
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {CAMP_DIRECTORS.map((dir, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#FAF5E8',
                  border: '1px solid #7A3E29',
                  borderRadius: '3px',
                  padding: '20px 24px',
                  boxShadow: '0 3px 8px rgba(122,62,41,0.06)'
                }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#7A3E29', letterSpacing: '1px', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
                    {dir.title}
                  </span>
                  <h3 style={{ fontFamily: 'Title', fontSize: '1.25rem', margin: 0, color: '#2C221E', fontWeight: 'bold' }}>
                    {dir.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* 2B. CAMP COORDINATORS */}
          <div style={{ marginBottom: '40px' }}>
            <span style={{ backgroundColor: '#2C221E', color: '#FBF7EE', fontFamily: 'monospace', fontSize: '9px', padding: '3px 8px', borderRadius: '2px', fontWeight: 'bold', letterSpacing: '1px', display: 'inline-block', marginBottom: '14px' }}>
              CAMP COORDINATORS
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {CAMP_COORDINATORS.map((coord, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#FAF5E8',
                  border: '1px solid #D0C2A7',
                  borderRadius: '3px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#7A3E29', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'sans-serif', fontSize: '0.92rem', fontWeight: 600, color: '#2C221E' }}>
                    {coord}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2C. CAMP ADVISERS */}
          <div>
            <span style={{ backgroundColor: '#2C221E', color: '#FBF7EE', fontFamily: 'monospace', fontSize: '9px', padding: '3px 8px', borderRadius: '2px', fontWeight: 'bold', letterSpacing: '1px', display: 'inline-block', marginBottom: '14px' }}>
              CAMP ADVISERS
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {CAMP_ADVISERS.map((adv, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#FAF5E8',
                  border: '1px solid #D0C2A7',
                  borderRadius: '3px',
                  padding: '18px 20px',
                  transition: 'border-color 0.2s ease'
                }}>
                  <h4 style={{ fontFamily: 'Title', fontSize: '1.1rem', margin: '0 0 4px 0', color: '#2C221E', fontWeight: 'bold' }}>
                    {adv.name}
                  </h4>
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', display: 'block', fontWeight: '500' }}>
                    {adv.designation}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 3: STUDENT OFFICE BEARERS, GROUP LEADERS & COMMITTEE LEADERS */}
      <section ref={leadersRef} style={{
        backgroundColor: '#F4ECD8',
        color: '#2C221E',
        padding: '80px 60px',
        borderTop: '1px solid #D0C2A7'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ borderBottom: '1px solid #2C221E', paddingBottom: '16px', marginBottom: '36px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Section 03 // Student Leadership & Governance
            </span>
            <h2 style={{ fontFamily: 'Title', fontSize: '2.2rem', margin: 0, fontWeight: 'bold', color: '#2C221E' }}>
              Office Bearers, Group & Committee Leaders
            </h2>
          </div>

          {/* 3A. STUDENT OFFICE BEARERS */}
          <div style={{ marginBottom: '45px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ backgroundColor: '#7A3E29', color: '#FBF7EE', fontFamily: 'monospace', fontSize: '9px', padding: '3px 8px', borderRadius: '2px', fontWeight: 'bold' }}>
                EXECUTIVE
              </span>
              <h3 style={{ fontFamily: 'Title', fontSize: '1.35rem', margin: 0, color: '#2C221E' }}>
                Student Office Bearers
              </h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px'
            }}>
              {STUDENT_OFFICE_BEARERS.map((bearer, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FAF5E8',
                    border: '1px solid #D0C2A7',
                    borderRadius: '3px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', fontWeight: 'bold' }}>
                    0{idx + 1}.
                  </span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '0.92rem', fontWeight: 600, color: '#2C221E' }}>
                    {bearer}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3B. GROUP LEADERS */}
          <div style={{ marginBottom: '45px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ backgroundColor: '#2C221E', color: '#FBF7EE', fontFamily: 'monospace', fontSize: '9px', padding: '3px 8px', borderRadius: '2px', fontWeight: 'bold' }}>
                GROUPS 1–6
              </span>
              <h3 style={{ fontFamily: 'Title', fontSize: '1.35rem', margin: 0, color: '#2C221E' }}>
                Group Leaders
              </h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              {GROUP_LEADERS.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FAF5E8',
                    border: '1px solid #D0C2A7',
                    borderRadius: '3px',
                    padding: '18px 20px',
                    transition: 'border-color 0.2s ease',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#7A3E29', fontWeight: 'bold', letterSpacing: '1px' }}>
                      {item.group}
                    </span>
                    <span style={{ backgroundColor: 'rgba(122, 62, 41, 0.1)', color: '#7A3E29', fontFamily: 'monospace', fontSize: '9px', padding: '2px 6px', borderRadius: '2px' }}>
                      LEADERS
                    </span>
                  </div>

                  <div>
                    <p style={{ fontFamily: 'sans-serif', fontSize: '0.92rem', margin: '0 0 4px 0', color: '#2C221E', fontWeight: 600 }}>
                      {item.leader}
                    </p>
                    {item.deputy && (
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.92rem', margin: 0, color: '#52443D', fontWeight: 600 }}>
                        {item.deputy}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3C. COMMITTEE CONVENERS */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ backgroundColor: '#2C221E', color: '#FBF7EE', fontFamily: 'monospace', fontSize: '9px', padding: '3px 8px', borderRadius: '2px', fontWeight: 'bold' }}>
                COMMITTEES
              </span>
              <h3 style={{ fontFamily: 'Title', fontSize: '1.35rem', margin: 0, color: '#2C221E' }}>
                Committee Leaders
              </h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              {COMMITTEE_CONVENERS.map((comm, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FAF5E8',
                    border: '1px solid #D0C2A7',
                    borderRadius: '3px',
                    padding: '20px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '10px', backgroundColor: '#7A3E29', color: '#FBF7EE', padding: '2px 6px', borderRadius: '2px', fontWeight: 'bold' }}>
                      {comm.code}
                    </span>
                    <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#8C7A70' }}>
                      LEADS
                    </span>
                  </div>

                  <h4 style={{ fontFamily: 'Title', fontSize: '1.1rem', margin: '0 0 10px 0', color: '#2C221E', fontWeight: 'bold' }}>
                    {comm.committee}
                  </h4>

                  <div style={{ fontFamily: 'sans-serif', fontSize: '0.9rem', color: '#2C221E' }}>
                    <p style={{ margin: '0 0 3px 0', fontWeight: 600 }}>
                      {comm.convener}
                    </p>
                    {comm.coConvener && (
                      <p style={{ margin: 0, fontWeight: 600, color: '#52443D' }}>
                        {comm.coConvener}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* SECTION: THANKS TO DE PAUL SCHOOL */}
      <section ref={dePaulThanksRef} style={{
        backgroundColor: '#EBE2CC',
        color: '#2C221E',
        padding: '120px 60px',
        borderTop: '2px solid #7A3E29',
        borderBottom: '2px solid #7A3E29',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'monospace',
            fontSize: '11px',
            color: '#7A3E29',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            <span>✦ ✦ ✦</span>
            <span>ACKNOWLEDGEMENT</span>
            <span>✦ ✦ ✦</span>
          </div>

          <h2 style={{
            fontFamily: 'Title',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 'bold',
            lineHeight: '1.05',
            color: '#2C221E',
            margin: '0 0 24px 0',
            letterSpacing: '-0.5px'
          }}>
            Special Thanks to <br></br>
            De Paul School
          </h2>

          <div style={{ width: '100px', height: '2px', backgroundColor: '#7A3E29', margin: '0 auto 32px auto' }} />

          <p style={{
            fontFamily: 'Title',
            fontSize: 'clamp(1.25rem, 2.8vw, 2rem)',
            fontStyle: 'italic',
            color: '#3D302A',
            lineHeight: '1.6',
            fontWeight: 400,
            margin: '0 auto',
            maxWidth: '820px'
          }}>
            "We express our sincere gratitude to De Paul School for their support and cooperation in making Sahayathra 2026 a success."
          </p>
        </div>
      </section>


      {/* SECTION: PRE-CAMP */}
      <section ref={preCampRef} style={{
        backgroundColor: '#FBF7EE',
        color: '#2C221E',
        padding: '80px 60px',
        borderTop: '1px solid #D0C2A7'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ borderBottom: '1px solid #2C221E', paddingBottom: '16px', marginBottom: '36px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Section 03.5 // Pre-Camp
            </span>
            <h2 style={{ fontFamily: 'Title', fontSize: '2.2rem', margin: 0, fontWeight: 'bold', color: '#2C221E' }}>
              Pre-Camp Preparation and Arrangements
            </h2>
          </div>
          <div className="camp-cards">
            <div className="camp-card">
              <span className="camp-number">01</span>
              <h3>Preparation for Departure</h3>
              <ul>
                <li>Bus arranged at college</li>
                <li>Tools, food and gas cylinders loaded</li>
                <li>Team departed early morning</li>
              </ul>
            </div>
            <div className="camp-card">
              <span className="camp-number">02</span>
              <h3>Campsite Setup</h3>
              <ul>
                <li>Kitchen and tarpaulins arranged</li>
                <li>Flagpole and waste pit prepared</li>
                <li>Lighting arranged despite rain and power failure</li>
              </ul>
            </div>
            <div className="camp-card">
              <span className="camp-number">03</span>
              <h3>Accommodation</h3>
              <ul>
                <li>Classrooms, auditorium and toilets inspected</li>
                <li>Rooms allocated to participants</li>
              </ul>
            </div>
            <div className="camp-card">
              <span className="camp-number">04</span>
              <h3>Food and Logistics</h3>
              <ul>
                <li>Kitchen and cooking supplies organised</li>
                <li>Generator and lighting arranged</li>
                <li>Dinner prepared</li>
              </ul>
            </div>
            <div className="camp-card">
              <span className="camp-number">05</span>
              <h3>Main Camp Preparation</h3>
              <ul>
                <li>Breakfast and lunch arranged</li>
                <li>Auditorium decorated and seating arranged</li>
                <li>Inauguration coordinated</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: CAMP TIMETABLE */}
      <section ref={campTimetableRef} style={{
        backgroundColor: '#FBF7EE',
        color: '#2C221E',
        padding: '80px 60px',
        borderTop: '1px solid #D0C2A7'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ borderBottom: '1px solid #2C221E', paddingBottom: '16px', marginBottom: '12px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              SECTION 04 // DAILY ROUTINE
            </span>
            <h2 style={{ fontFamily: 'Title', fontSize: '2.2rem', margin: 0, fontWeight: 'bold', color: '#2C221E' }}>
              Daily Timetable
            </h2>
          </div>
          <p style={{ fontFamily: 'sans-serif', fontSize: '1rem', color: '#52443D', fontStyle: 'italic', margin: '0 0 32px 0' }}>
            A day of service, reflection, and community
          </p>

          <div>
            {CAMP_TIMETABLE.map((entry, idx) => (
              <div
                key={idx}
                className="camp-timetable-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(110px, 140px) 1fr',
                  gap: '24px',
                  padding: '18px 0',
                  borderBottom: idx < CAMP_TIMETABLE.length - 1 ? '1px solid rgba(44, 34, 30, 0.12)' : 'none',
                  alignItems: 'baseline'
                }}
              >
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '0.95rem',
                  color: '#7A3E29',
                  letterSpacing: '0.5px',
                  fontWeight: 600
                }}>
                  {entry.time}
                </span>
                <span style={{
                  fontFamily: 'sans-serif',
                  fontSize: '1rem',
                  color: '#2C221E',
                  lineHeight: 1.5
                }}>
                  {entry.activity}
                </span>
              </div>
            ))}
          </div>

          <style>{`
            @media (max-width: 600px) {
              .camp-timetable-row {
                grid-template-columns: 1fr !important;
                gap: 4px !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* SECTION 4: GROUP JOURNAL */}
      <section ref={journalRef} style={{ backgroundColor: '#FBF7EE', color: '#2C221E', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>

        {/* GROUP SELECTOR TABS & AUTOMATED PLAY TOGGLE */}
        <div style={{
          borderBottom: '1px solid #E0D4BE',
          padding: '14px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          backgroundColor: '#F4ECD8',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#7A3E29', letterSpacing: '1px', fontWeight: 'bold', marginRight: '4px' }}>
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
                  padding: '4px 10px',
                  color: activeGroupIndex === idx ? '#7A3E29' : '#8C7A70',
                  fontWeight: activeGroupIndex === idx ? 'bold' : 'normal',
                  borderBottom: activeGroupIndex === idx ? '2px solid #7A3E29' : '2px solid transparent',
                  transition: 'color 0.2s ease, border-color 0.2s ease'
                }}
              >
                {group.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAutoPlayActive((prev) => !prev)}
            style={{
              background: isAutoPlayActive ? '#7A3E29' : 'transparent',
              color: isAutoPlayActive ? '#FBF7EE' : '#7A3E29',
              border: '1px solid #7A3E29',
              fontFamily: 'monospace',
              fontSize: '10px',
              padding: '5px 12px',
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

        {/* GROUP LOG CONTAINER */}
        <div
          key={groupFadeKey}
          style={{ padding: '36px 40px 180px 40px', maxWidth: '1100px', margin: '0 auto', width: '100%', boxSizing: 'border-box', flex: 1, transition: 'opacity 0.3s ease' }}
        >
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Section 04 // Field Journal — {activeGroup.name}
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2.4rem', margin: 0, fontWeight: 'bold', color: '#2C221E' }}>
              {activeGroup.name} — Daily Field Log
            </h2>
          </div>

          {/* DAY SELECTOR TABS */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px', borderBottom: '1px solid #D0C2A7', paddingBottom: '12px' }}>
            {activeGroup.days.map((d, dIdx) => {
              const isActive = activeDayIndex === dIdx;
              return (
                <button
                  key={d.day}
                  onClick={() => switchDay(dIdx)}
                  style={{
                    background: isActive ? '#2C221E' : 'rgba(255,255,255,0.7)',
                    color: isActive ? '#FBF7EE' : '#52443D',
                    border: '1px solid',
                    borderColor: isActive ? '#2C221E' : '#C5B496',
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    padding: '5px 14px',
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

          {/* ACTIVE DAY CONTENT */}
          <div
            key={dayFadeKey}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(140px, 170px) 1fr',
              gap: '36px',
              alignItems: 'flex-start',
              transition: 'opacity 0.3s ease'
            }}
          >
            <div>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '4.2rem',
                fontWeight: 'bold',
                color: '#2C221E',
                display: 'block',
                lineHeight: '0.88',
                marginBottom: '10px'
              }}>
                day<br />{String(activeDay.day).padStart(2, '0')}
              </span>
              <div style={{ width: '100%', height: '1px', backgroundColor: '#2C221E', marginBottom: '10px' }} />
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                {activeGroup.name}
              </span>
            </div>

            <div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.75rem',
                fontWeight: '600',
                color: '#2C221E',
                margin: '0 0 16px 0',
                lineHeight: '1.25'
              }}>
                {activeDay.title}
              </h3>

              <div style={{
                backgroundColor: '#FAF5E8',
                border: '1px solid #D0C2A7',
                borderLeft: '3px solid #7A3E29',
                borderRadius: '4px',
                padding: '22px 26px',
                marginBottom: '22px',
                boxShadow: '0 2px 8px rgba(44,34,30,0.04)'
              }}>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: '#7A3E29',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  display: 'block',
                  marginBottom: '14px'
                }}>
                  RECORDED ACTIVITIES & TASKS
                </span>

                <ul style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {(activeDay.points || [activeDay.note]).map((item, pIdx) => {
                    const isMealItem = item.startsWith('Breakfast') || item.startsWith('Lunch') || item.startsWith('Dinner');
                    return (
                      <li
                        key={pIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                          fontSize: isMealItem ? '0.92rem' : '0.96rem',
                          color: isMealItem ? '#6B5A52' : '#332722',
                          lineHeight: '1.6',
                          marginLeft: isMealItem ? '24px' : '0'
                        }}
                      >
                        <span style={{
                          color: '#7A3E29',
                          fontSize: isMealItem ? '10px' : '14px',
                          lineHeight: '1.6',
                          userSelect: 'none',
                          flexShrink: 0
                        }}>
                          {isMealItem ? '▪' : '✦'}
                        </span>
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

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
                    padding: '5px 12px',
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
                    padding: '5px 12px',
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

      </section>


      {/* SECTION 5: COMMITTEE REPORTS */}
      <section ref={reportsRef} style={{ backgroundColor: '#F4ECD8', color: '#2C221E', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>

        {/* COMMITTEE SELECTOR TABS */}
        <div style={{
          borderBottom: '1px solid #E0D4BE',
          padding: '14px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          backgroundColor: '#EBE2CC',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#7A3E29', letterSpacing: '1px', fontWeight: 'bold', marginRight: '4px' }}>
              COMMITTEES:
            </span>
            {COMMITTEE_REPORTS.map((rep, idx) => (
              <button
                key={rep.id}
                onClick={() => {
                  setActiveReportIndex(idx);
                  setActiveReportDayIndex(0);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  cursor: 'pointer',
                  padding: '4px 10px',
                  color: activeReportIndex === idx ? '#7A3E29' : '#8C7A70',
                  fontWeight: activeReportIndex === idx ? 'bold' : 'normal',
                  borderBottom: activeReportIndex === idx ? '2px solid #7A3E29' : '2px solid transparent',
                  transition: 'color 0.2s ease, border-color 0.2s ease'
                }}
              >
                {rep.name}
              </button>
            ))}
          </div>

          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '1px', fontWeight: 'bold' }}>
            {activeReport.code}
          </span>
        </div>

        {/* COMMITTEE LOG CONTAINER — EXACT SAME SIZE & PROPORTIONS AS GROUP REPORT */}
        <div
          style={{ padding: '36px 40px 240px 40px', maxWidth: '1100px', margin: '0 auto', width: '100%', boxSizing: 'border-box', flex: 1, transition: 'opacity 0.3s ease' }}
        >
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Section 05 // Archival Records — {activeReport.title}
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2.4rem', margin: 0, fontWeight: 'bold', color: '#2C221E' }}>
              {activeReport.title} — Daily Activities
            </h2>
          </div>

          {/* DAY SELECTOR TABS */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px', borderBottom: '1px solid #D0C2A7', paddingBottom: '12px' }}>
            {activeReport.days.map((d, dIdx) => {
              const isActive = activeReportDayIndex === dIdx;
              return (
                <button
                  key={d.day}
                  onClick={() => setActiveReportDayIndex(dIdx)}
                  style={{
                    background: isActive ? '#2C221E' : 'rgba(255,255,255,0.7)',
                    color: isActive ? '#FBF7EE' : '#52443D',
                    border: '1px solid',
                    borderColor: isActive ? '#2C221E' : '#C5B496',
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    padding: '5px 14px',
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

          {/* ACTIVE DAY CONTENT — EXACT SAME 2-COLUMN STRUCTURE AS GROUP REPORT */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(140px, 170px) 1fr',
              gap: '36px',
              alignItems: 'flex-start',
              transition: 'opacity 0.3s ease'
            }}
          >
            <div>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '4.2rem',
                fontWeight: 'bold',
                color: '#2C221E',
                display: 'block',
                lineHeight: '0.88',
                marginBottom: '10px'
              }}>
                day<br />{String(activeReportDay.day).padStart(2, '0')}
              </span>
              <div style={{ width: '100%', height: '1px', backgroundColor: '#2C221E', marginBottom: '10px' }} />
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                {activeReport.code}
              </span>
            </div>

            <div>
              {/* RECORDED ACTIVITIES CARD — ONLY THE EXACT RAW POINTS */}
              <div style={{
                backgroundColor: '#FAF5E8',
                border: '1px solid #D0C2A7',
                borderLeft: '3px solid #7A3E29',
                borderRadius: '4px',
                padding: '22px 26px',
                marginBottom: '22px',
                boxShadow: '0 2px 8px rgba(44,34,30,0.04)'
              }}>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: '#7A3E29',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  display: 'block',
                  marginBottom: '14px'
                }}>
                  COMMITTEE ACTIVITIES // {activeReport.title.toUpperCase()}
                </span>

                <ul style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {activeReportDay.points.map((item, pIdx) => {
                    const isSubItem = item.startsWith('Street play') || item.startsWith('Cultural event at Township') || item.startsWith('De Paul School') || item.startsWith('Campers’ culturals') || item.startsWith('Campfire');
                    return (
                      <li
                        key={pIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                          fontSize: isSubItem ? '0.92rem' : '0.96rem',
                          color: isSubItem ? '#6B5A52' : '#332722',
                          lineHeight: '1.6',
                          marginLeft: isSubItem ? '24px' : '0'
                        }}
                      >
                        <span style={{
                          color: '#7A3E29',
                          fontSize: isSubItem ? '10px' : '14px',
                          lineHeight: '1.6',
                          userSelect: 'none',
                          flexShrink: 0
                        }}>
                          {isSubItem ? '▪' : '✦'}
                        </span>
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* NAVIGATION BUTTONS */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  disabled={activeReportDayIndex === 0}
                  onClick={() => setActiveReportDayIndex(Math.max(0, activeReportDayIndex - 1))}
                  style={{
                    opacity: activeReportDayIndex === 0 ? 0.3 : 1,
                    cursor: activeReportDayIndex === 0 ? 'not-allowed' : 'pointer',
                    background: 'none',
                    border: '1px solid #8C7A70',
                    color: '#2C221E',
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    padding: '5px 12px',
                    borderRadius: '2px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  ← PREV
                </button>
                <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#8C7A70' }}>
                  DAY 0{activeReportDay.day} OF 0{activeReport.days.length}
                </span>
                <button
                  disabled={activeReportDayIndex === activeReport.days.length - 1}
                  onClick={() => setActiveReportDayIndex(Math.min(activeReport.days.length - 1, activeReportDayIndex + 1))}
                  style={{
                    opacity: activeReportDayIndex === activeReport.days.length - 1 ? 0.3 : 1,
                    cursor: activeReportDayIndex === activeReport.days.length - 1 ? 'not-allowed' : 'pointer',
                    background: 'none',
                    border: '1px solid #8C7A70',
                    color: '#2C221E',
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    padding: '5px 12px',
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

      </section>

      {/* SECTION: POST-CAMP */}
      <section ref={postCampRef} style={{
        backgroundColor: '#FBF7EE',
        color: '#2C221E',
        padding: '80px 60px',
        borderTop: '1px solid #D0C2A7'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ borderBottom: '1px solid #2C221E', paddingBottom: '16px', marginBottom: '36px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Section 06.5 // Post-Camp
            </span>
            <h2 style={{ fontFamily: 'Title', fontSize: '2.2rem', margin: 0, fontWeight: 'bold', color: '#2C221E' }}>
              Post-Camp Activities and Return Journey
            </h2>
          </div>
          <div className="camp-cards">
            <div className="camp-card">
              <span className="camp-number">01</span>
              <h3>Packing and Cleanup</h3>
              <ul>
                <li>Tools and equipment packed</li>
                <li>Kitchen and campsite cleaned</li>
                <li>Waste disposed of properly</li>
              </ul>
            </div>
            <div className="camp-card">
              <span className="camp-number">02</span>
              <h3>Return Journey</h3>
              <ul>
                <li>Materials loaded onto the bus</li>
                <li>Departure from campsite</li>
                <li>Return to college</li>
              </ul>
            </div>
            <div className="camp-card">
              <span className="camp-number">03</span>
              <h3>Equipment Handover</h3>
              <ul>
                <li>Tools and supplies returned</li>
                <li>Accounts and materials checked</li>
              </ul>
            </div>
            <div className="camp-card">
              <span className="camp-number">04</span>
              <h3>Review and Reflection</h3>
              <ul>
                <li>Group and committee evaluation</li>
                <li>Experiences and feedback shared</li>
              </ul>
            </div>
            <div className="camp-card">
              <span className="camp-number">05</span>
              <h3>Community Follow-up</h3>
              <ul>
                <li>Camp outcomes documented</li>
                <li>Community engagement reviewed</li>
              </ul>
            </div>
          </div>
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
            paddingBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
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
          </div>

          <div style={{ marginTop: '10px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginBottom: '20px'
            }}>
              {CAMP_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  onClick={() => { setSelectedVideo(video); setVideoError(false); }}
                  style={{
                    backgroundColor: '#FAF5E8',
                    border: '1px solid #D0C2A7',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 4px 12px rgba(44,34,30,0.04)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#7A3E29';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(44,34,30,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#D0C2A7';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(44,34,30,0.04)';
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
                        opacity: 0.88
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
                      borderRadius: '2px'
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
                        boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
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
                        {video.caption}
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
          </div>

        </div>
      </section>

                  {/* SECTION: AWARDS & RECOGNITION */}
      <section ref={awardsRef} style={{
        backgroundColor: '#FBF7EE',
        color: '#2C221E',
        padding: '90px 60px 100px',
        borderTop: '1px solid #D0C2A7',
        minHeight: '100vh',
        height: 'auto',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ borderBottom: '1px solid #2C221E', paddingBottom: '16px', marginBottom: '40px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              SAHAYATHRA 2026 // HONOURS & MERIT
            </span>
            <h2 style={{ fontFamily: 'Title', fontSize: '2.5rem', margin: 0, fontWeight: 'bold', color: '#2C221E' }}>
              Awards & Recognition
            </h2>
          </div>

          {/* 01 — INDIVIDUAL RECOGNITION */}
          <div style={{ marginBottom: '64px' }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                01 — INDIVIDUAL RECOGNITION
              </span>
              <h3 style={{ fontFamily: 'Title', fontSize: '1.8rem', color: '#2C221E', margin: 0 }}>
                Best Camper & Best Camp Girl
              </h3>
            </div>

            <div className="awards-grid">
              <article className="award-card award-featured">
                <img src={bestCamper} alt="Jiss Abraham, Best Camper" />
                <span className="award-label">BEST CAMPER</span>
                <h3>Jiss Abraham</h3>
              </article>
              <article className="award-card award-featured">
                <img src={bestCampgirl} alt="Parvathy Krishna, Best Camp Girl" />
                <span className="award-label">BEST CAMP GIRL</span>
                <h3>Parvathy Krishna</h3>
              </article>
            </div>
          </div>

          {/* 02 — APPRECIATION */}
          <div style={{ marginBottom: '64px' }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                02 — APPRECIATION
              </span>
              <h3 style={{ fontFamily: 'Title', fontSize: '1.8rem', color: '#2C221E', margin: 0 }}>
                With Gratitude
              </h3>
            </div>

            <div className="awards-grid-three">
              <article className="award-card">
                <img src={kannanChettan} alt="Kannan Chetan" />
                <span className="award-label">APPRECIATION</span>
                <h3>Kannan Chetan</h3>
              </article>
              <article className="award-card">
                <img src={abhijithChettan} alt="Abhijith Chetan" />
                <span className="award-label">APPRECIATION</span>
                <h3>Abhijith Chetan</h3>
              </article>
              <article className="award-card">
                <img src={benjamin} alt="Benjamin" />
                <span className="award-label">APPRECIATION</span>
                <h3>Benjamin</h3>
              </article>
            </div>
          </div>

          {/* 03 — TEAM RECOGNITION */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                03 — TEAM RECOGNITION
              </span>
              <h3 style={{ fontFamily: 'Title', fontSize: '1.8rem', color: '#2C221E', margin: 0 }}>
                Best Group — Group 5
              </h3>
            </div>

            <div className="award-group-feature">
              <article className="award-card award-card-wide">
                <img src={bestGroup} alt="Best Group — Group 5" className="award-img-wide" />
                <span className="award-label">BEST GROUP — GROUP 5</span>
                <h3>Group 5</h3>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: HELPING HANDS */}
      <section ref={helpingHandsRef} style={{
        backgroundColor: '#FAF5E8',
        color: '#2C221E',
        padding: '90px 60px 100px',
        borderTop: '1px solid #D0C2A7',
        minHeight: '100vh',
        height: 'auto',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ borderBottom: '1px solid #2C221E', paddingBottom: '16px', marginBottom: '36px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              SAHAYATHRA 2026 // LOGISTICS & SUPPORT
            </span>
            <h2 style={{ fontFamily: 'Title', fontSize: '2.5rem', margin: 0, fontWeight: 'bold', color: '#2C221E' }}>
              Helping Hands
            </h2>
          </div>

          <div className="helping-hands-grid">
            <article className="helping-hand-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span className="award-label" style={{ margin: 0 }}>
                  HELPING HANDS · 01
                </span>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(122, 62, 41, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7A3E29'
                }}>
                  <Bus size={22} strokeWidth={1.8} />
                </div>
              </div>
              <h3 style={{ margin: '0 0 12px 0', color: '#2C221E', fontFamily: 'Title, serif', fontSize: '1.8rem' }}>
                Abel Travels
              </h3>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.95rem', color: '#42352F', lineHeight: 1.7, margin: 0 }}>
                With gratitude for supporting the journey and transportation arrangements of Sahayathra 2026.
              </p>
            </article>

            <article className="helping-hand-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span className="award-label" style={{ margin: 0 }}>
                  HELPING HANDS · 02
                </span>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(122, 62, 41, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7A3E29'
                }}>
                  <Utensils size={22} strokeWidth={1.8} />
                </div>
              </div>
              <h3 style={{ margin: '0 0 12px 0', color: '#2C221E', fontFamily: 'Title, serif', fontSize: '1.8rem' }}>
                Pallathu Caterings
              </h3>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.95rem', color: '#42352F', lineHeight: 1.7, margin: 0 }}>
                With gratitude for contributing to the food and hospitality arrangements of the camp.
              </p>
            </article>
          </div>
        </div>
      </section>

{/* SECTION 6: SPECIAL THANKS TO */}
      <section ref={thanksRef} className="acknowledgement" style={{
        backgroundColor: '#EBE2CC',
        color: '#2C221E',
        padding: '120px 60px',
        borderTop: '2px solid #7A3E29',
        borderBottom: '2px solid #7A3E29',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'Title',
          fontSize: 'clamp(5rem, 15vw, 12rem)',
          fontWeight: 'bold',
          color: 'rgba(122, 62, 41, 0.04)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0
        }}>
          GRATITUDE
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'monospace',
            fontSize: '11px',
            color: '#7A3E29',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            <span>✦ ✦ ✦</span>
            <span>ACKNOWLEDGEMENT</span>
            <span>✦ ✦ ✦</span>
          </div>

          <h2 style={{
            fontFamily: 'Title',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 'bold',
            lineHeight: '1.05',
            color: '#2C221E',
            margin: '0 0 24px 0',
            letterSpacing: '-0.5px'
          }}>
            Special Thanks to <br></br>
            Rajagiri College of Social Sciences
          </h2>

          <div style={{ width: '100px', height: '2px', backgroundColor: '#7A3E29', margin: '0 auto 32px auto' }} />

          <p style={{
            fontFamily: 'Title',
            fontSize: 'clamp(1.25rem, 2.8vw, 2rem)',
            fontStyle: 'italic',
            color: '#3D302A',
            lineHeight: '1.6',
            fontWeight: 400,
            margin: '0 auto',
            maxWidth: '820px'
          }}>
            "We express our sincere gratitude to our college management, faculty, and administration for their invaluable support, guidance, and backing in making Sahayathra 2026 a resounding success."
          </p>
        </div>
      </section>

            {/* SECTION 5.C: FINAL CAMP REPRESENTATION FILM */}
      <section ref={finalVideoRef} style={{
        backgroundColor: '#EBE2CC',
        color: '#2C221E',
        padding: '50px 60px 60px 60px',
        borderTop: '1px solid #D0C2A7'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            borderBottom: '1px solid #2C221E',
            paddingBottom: '16px',
            marginBottom: '32px'
          }}>
            <span style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              color: '#7A3E29',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              ✦ SECTION 05.C // OFFICIAL CAMP FILM
            </span>
            <span style={{ width: '40px', height: '1px', backgroundColor: '#C5B496' }}></span>
            <span style={{
              fontFamily: 'Title',
              fontSize: '1.25rem',
              color: '#2C221E',
              fontStyle: 'italic'
            }}>
              Sahayathra 2026 Representation Video
            </span>
          </div>

          <div
            onClick={() => { setSelectedVideo(FINAL_CAMP_VIDEO); setVideoError(false); }}
            style={{
              backgroundColor: '#FAF5E8',
              border: '2px solid #7A3E29',
              borderRadius: '4px',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(44,34,30,0.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '0',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(44,34,30,0.16)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,34,30,0.08)';
            }}
          >
            <div style={{ position: 'relative', minHeight: '260px', backgroundColor: '#1A1412' }}>
              <img
                src={FINAL_CAMP_VIDEO.thumbnail}
                alt={FINAL_CAMP_VIDEO.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.85,
                  display: 'block'
                }}
              />
              
              <span style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: '#7A3E29',
                color: '#FBF7EE',
                fontFamily: 'monospace',
                fontSize: '10px',
                padding: '4px 10px',
                borderRadius: '2px',
                fontWeight: 'bold',
                letterSpacing: '1px'
              }}>
                FEATURED DOCUMENTARY
              </span>

              <span style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                backgroundColor: 'rgba(20, 15, 13, 0.9)',
                color: '#FBF7EE',
                fontFamily: 'monospace',
                fontSize: '10px',
                padding: '4px 8px',
                borderRadius: '2px'
              }}>
                {FINAL_CAMP_VIDEO.duration}
              </span>

              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(244, 236, 216, 0.95)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.4)'
                }}
              >
                <div style={{
                  width: 0,
                  height: 0,
                  borderTop: '9px solid transparent',
                  borderBottom: '9px solid transparent',
                  borderLeft: '14px solid #7A3E29',
                  marginLeft: '4px'
                }} />
              </div>
            </div>

            <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: '#7A3E29',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  fontWeight: 'bold',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  {FINAL_CAMP_VIDEO.category}
                </span>

                <h3 style={{
                  fontFamily: 'Title',
                  fontSize: '1.75rem',
                  margin: '0 0 12px 0',
                  color: '#2C221E',
                  lineHeight: '1.2'
                }}>
                  {FINAL_CAMP_VIDEO.title}
                </h3>

                <p style={{
                  fontFamily: 'sans-serif',
                  fontSize: '0.92rem',
                  color: '#42352F',
                  lineHeight: '1.65',
                  margin: 0
                }}>
                  {FINAL_CAMP_VIDEO.caption}
                </p>
              </div>

              <div style={{
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(122, 62, 41, 0.2)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'monospace',
                fontSize: '10px'
              }}>
                <span style={{ color: '#8C7A70' }}>RELEASED: {FINAL_CAMP_VIDEO.date}</span>
                <span style={{
                  backgroundColor: '#7A3E29',
                  color: '#FBF7EE',
                  padding: '6px 14px',
                  borderRadius: '2px',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px'
                }}>
                  PLAY FULL FILM ▶
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* SECTION: CLOSING / END */}
      <section ref={endRef} className="closing-section">
        <div className="closing-container">
          <img
            src={endImg}
            alt="The journey ends, but the change continues"
            className="closing-image"
          />
          <div className="closing-text-overlay">
            <span className="closing-quote-primary">The journey ends,</span>
            <span className="closing-quote-secondary">but the change continues.</span>
          </div>
        </div>
      </section>

      {activeArchiveSection && (
        <div className="shared-photo-archive" style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          backgroundColor: '#EBE2CC',
          borderTop: '2px solid #D0C2A7',
          boxShadow: '0 -4px 16px rgba(44,34,30,0.12)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 24px',
              backgroundColor: '#E2D4BA',
              borderBottom: isArchiveCollapsed ? 'none' : '1px solid #D0C2A7'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#7A3E29', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  ✦ PHOTO ARCHIVE // 31 FIELD JOURNAL PHOTOGRAPHS
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#6B5A52' }}>
                  (Click any photo to open full-screen lightbox)
                </span>
              </div>

              <button
                onClick={() => setIsArchiveCollapsed((prev) => !prev)}
                style={{
                  background: 'none',
                  border: '1px solid #7A3E29',
                  color: '#7A3E29',
                  fontFamily: 'monospace',
                  fontSize: '9px',
                  padding: '3px 10px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>{isArchiveCollapsed ? '▴ EXPAND FILMSTRIP' : '▾ MINIMIZE FILMSTRIP'}</span>
              </button>
            </div>

            {!isArchiveCollapsed && (
              <div style={{ width: '100%', overflow: 'hidden', padding: '14px 0 10px 0' }}>
                <div
                  className="anim-filmstrip"
                  style={{ display: 'flex', gap: '10px', width: 'max-content' }}
                  aria-label="Moving camp photo archive"
                >
                  {[...ALL_PHOTOS, ...ALL_PHOTOS].map((photo, idx) => {
                    const photoIndex = idx % ALL_PHOTOS.length;
                    return (
                      <div
                        key={photo.url + '-' + idx}
                        onClick={() => setSelectedPhotoIndex(photoIndex)}
                        style={{
                          flexShrink: 0,
                          cursor: 'pointer',
                          overflow: 'hidden',
                          borderRadius: '2px',
                          boxShadow: '0 4px 10px rgba(44,34,30,0.12)',
                          transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.03) translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 18px rgba(44,34,30,0.2)';
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
                            height: '135px',
                            width: 'auto',
                            objectFit: 'cover',
                            display: 'block',
                            pointerEvents: 'none'
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
                  <p style={{ margin: 0, lineHeight: 1.5 }}>5 Days Recorded<br />6 Expedition Groups<br />{ALL_PHOTOS.length} High-Res Photographs</p>
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
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C5B496'; e.currentTarget.style.color = '#2C221E'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FBF7EE'; }}
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
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C5B496'; e.currentTarget.style.color = '#2C221E'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FBF7EE'; }}
            >
              NEXT →
            </button>
          </div>
        </div>
      )}


      {/* INTERACTIVE VIDEO PLAYER LIGHTBOX MODAL */}
      {selectedVideo && (
        <div 
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
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {getYouTubeEmbedUrl(selectedVideo.videoUrl) ? (
                <iframe
                  src={getYouTubeEmbedUrl(selectedVideo.videoUrl)}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              ) : videoError ? (
                <div style={{ padding: '24px 30px', textAlign: 'center', color: '#FBF7EE', maxWidth: '520px' }}>
                  <div style={{ color: '#E3D3B0', fontSize: '28px', marginBottom: '8px' }}>⚠</div>
                  <h4 style={{ fontFamily: 'Title, serif', fontSize: '1.3rem', margin: '0 0 8px 0', color: '#FAF5E8' }}>
                    Video Source Blocked (HTTP 403 Forbidden)
                  </h4>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: '#C5B496', lineHeight: 1.6, margin: '0 0 14px 0' }}>
                    The remote sample video bucket is returning <strong>HTTP 403 Forbidden</strong> on public media requests.
                  </p>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(226, 212, 186, 0.2)', padding: '12px 16px', borderRadius: '4px', fontSize: '0.8rem', textAlign: 'left', color: '#E2D4BA', fontFamily: 'monospace' }}>
                    ✦ <strong>To play your camp footage:</strong><br />
                    1. Save your MP4 video into <code>public/</code> or use a YouTube URL<br />
                    2. Set <code>videoUrl</code> in <code>src/App.jsx</code>
                  </div>
                </div>
              ) : (
                <video
                  src={selectedVideo.videoUrl}
                  poster={selectedVideo.thumbnail}
                  controls
                  autoPlay
                  onError={() => setVideoError(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              )}
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
    </>
  );
}