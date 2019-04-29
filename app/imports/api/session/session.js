import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Sessions = new Mongo.Collection('Sessions');

/** Create a schema to constrain the structure of documents associated with this collection. */
const SessionSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  date: String,
  location: String,
  owner: String,
  description: String,
  attending: Array,
  'attending.$': String,
  course: {
    type: String,
    allowedValues: ['...',
      'Academy for Creative Media (ACM)',
    'Accounting (ACC)',
    'Aerospace Studies (AS)',
    'Agricultural and Resource Economics (AREC)',
    'American Sign Language (ASL)',
    'American Studies (AMST)',
    'Anatomy (ANAT)',
    'Animal Sciences (ANSC)',
    'Anthropology (ANTH)',
    'Arabic (ARAB)',
    'Architecture (ARCH)',
    'Art and Art History (ART)',
    'Arts and Sciences (CAS)',
    'Asian Studies (ASAN)',
    'Astronomy (ASTR)',
    'Atmospheric Sciences (ATMO)',
    'Biochemistry (BIOC)',
    'Bioengineering (BE)',
    'Biology (BIOL)',
    'Biomedical Sciences (BIOM)',
    'Biophysics (BIOP)',
    'Botany (BOT)',
    'Business (BUS)',
    'Business Law (BLAW)',
    'Cambodian (CAM)',
    'Cell and Molecular Biology (CMB)',
    'Chamorro (CHAM)',
    'Chemistry (CHEM)',
    'Chinese (CHN)',
    'Civil and Environmental Engineering (CEE)',
    'Classics (CLAS)',
    'Communication (COM)',
    'Communication and Information Sciences (CIS)',
    'Communication Sciences and Disorders (CSD)',
    'Communicology (COMG)',
    'Complementary and Alternative Medicine (CAAM)',
    'Curriculum Studies (EDCS)',
    'Dance (DNCE)',
    'Dental Hygiene (DH)',
    'Developmental and Reproductive Biology (DRB)',
    'Disability and Diversity Studies (DIS)',
    'East Asian Languages and Literatures (EALL)',
    'Economics (ECON)',
    'Education (EDUC)',
    'Educational Administration (EDEA)',
    'Educational Foundations (EDEF)',
    'Educational Psychology (EDEP)',
    'Electrical Engineering (EE)',
    'Engineering (ENGR)',
    'English (ENG)',
    'English as a Second Language (ESL)',
    'English Language Institute (ELI)',
    'Ethnic Studies (ES)',
    'Exception Students and Elementary Education (ESEE)',
    'Family Medicine and Community Health (FMCH)',
    'Fashion Design and Merchandising (FDM)',
    'Filipino (FIL)',
    'Finance (FIN)',
    'Food Science and Human Nutrition (FSHN)',
    'French (FR)',
    'Geography (GEOG)',
    'Geology and Geophysics (GG)',
    'Geriatric Medicine (GERI)',
    'German (GER)',
    'Global Health Protection & Security (GHPS)',
  'Greek (GRK)',
  'Hawaiian (HAW)',
  'Hawaiian Studies (HWST)',
  'Health Sciences and Social Welfare (HSSW)',
  'Hindi (HNDI)',
  'History (HIST)',
  'Honors (HON)',
  'Human Development and Family Studies (HDFS)',
  'Human Resources Management (HRM)',
  'Ilokano (ILO)',
  'Indo-Pacific Languages (IP)',
  'Indonesian (IND)',
  'Information and Computer Sciences (ICS)',
  'Information Technology Management (ITM)',
  'Institute for Teacher Education (ITE)',
  'Insurance (INS)',
  'Interdisciplinary Studies (IS)',
  'International Cultural Studies (CUL)',
  'Italian (ITAL)',
  'Japanese (JPN)',
  'Journalism (JOUR)',
  'Kinesiology and Rehabilitation Science (KRS)',
  'Korean (KOR)',
  'Languages and Literatures of Europe and the Americas (LLEA)',
  'Languages, Linguistics, and Literature (LLL)',
  'Latin (LATN)',
  'Latin American and Iberian Studies (LAIS)',
  'Law (LAW)',
  'Law-Doctor of Juridical Science (LSJD)',
  'Law-Environmental Law (LWEV)',
  'Law-Journal and Team Credits (LWJT)',
  'Law-Law Research (LWLR)',
  'Law-Legal Writing (LWLW)',
  'Law-Master of Law (LWLM)',
  'Law-Pacific and Asian Law (LWPA)',
  'Law-Ulu Lehua (LWUL)',
  'Learning Design and Technology (LTEC)',
  'Library and Information Science (LIS)',
  'Linguistics (LING)',
  'Management (MGT)',
  'Maori (MAO)',
  'Marine Biology (MBIO)',
  'Marketing (MKT)',
  'Mathematics (MATH)',
  'Mechanical Engineering (ME)',
  'Medical Education (MDED)',
  'Medical History (MDHX)',
  'Medical Technology (MEDT)',
  'Medicine (MED)',
  'Microbiology (MICR)',
  'Military Science and Leadership (MSL)',
  'Molecular and Cell Biology (MCB)',
  'Molecular Biosciences and Bioengineering (MBBE)',
  'Music (MUS)',
  'Native Hawaiian Health (NHH)',
  'Natural Resources and Environmental Management (NREM)',
  'Natural Sciences (NSCI)',
  'Nursing (NURS)',
  'Obstetrics and Gynecology (OBGN)',
  'Ocean and Earth Science and Technology (OEST)',
  'Ocean and Resources Engineering (ORE)',
  'Oceanography (OCN)',
  'Pacific and Asian Studies (PAS)',
  'Pacific Islands Studies (PACS)',
  'Pali (PALI)',
  'Pathology (PATH)',
  'Peace Studies (PACE)',
  'Pediatrics (PED)',
  'Persian (PERS)',
  'Pharmacology (PHRM)',
  'Philosophy (PHIL)',
  'Physics (PHYS)',
  'Physiology (PHYL)',
  'Plant and Environmental Protection Sciences (PEPS)',
  'Political Science (POLS)',
  'Portuguese (PORT)',
  'Prakrit (PRAK)',
  'Psychiatry (PSTY)',
  'Psychology (PSY)',
  'Public Administration (PUBA)',
  'Public Health Sciences (PH)',
  'Public Policy Center (PPC)',
  'Quantitative Health Sciences (QHS)',
  'Real Estate (RE)',
  'Religion (REL)',
  'Reproductive Biology (REPR)',
  'Russian (RUS)',
  'Samoan (SAM)',
  'Sanskrit (SNSK)',
  'Second Language Studies (SLS)',
  'Social Sciences (SOCS)',
  'Social Work (SW)',
  'Sociology (SOC)',
  'Spanish (SPAN)',
  'Special Education (SPED)',
  'Surgery (SURG)',
  'Sustainability (SUST)',
  'Tahitian (TAHT)',
  'Thai (THAI)',
  'Theatre (THEA)',
  'Tongan (TONG)',
  'Translation and Interpretation (TI)',
  'Travel Industry Management (TIM)',
  'Tropical Agriculture and Human Resources (TAHR)',
  'Tropical Medicine and Medical Microbiology (TRMD)',
  'Tropical Plant and Soil Sciences (TPSS)',
  'University (UNIV)',
  'Urban and Regional Planning (PLAN)',
  'Urdu (URDU)',
  'Vietnamese (VIET)',
  'Women’s Studies (WS)',
'Zoology (ZOOL)',
],
    defaultValue: '...',
  },
  courseNum: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Sessions.attachSchema(SessionSchema);

/** Make the collection and schema available to other code. */
export { Sessions, SessionSchema };
