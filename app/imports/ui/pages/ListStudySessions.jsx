import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Dropdown } from 'semantic-ui-react';
import { Sessions } from '/imports/api/session/session';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import StudySession from '/imports/ui/components/StudySession';
import { _ } from 'meteor/underscore';

const options = [
    { key: '...', text: '...', value: '...' },
    { key: 'Academy for Creative Media (ACM)', text: 'Academy for Creative Media (ACM)',
      value: 'Academy for Creative Media (ACM)' },
    { key: 'Accounting (ACC)', text: 'Accounting (ACC)', value: 'Accounting (ACC)' },
    { key: 'Aerospace Studies (AS)', text: 'Aerospace Studies (AS)', value: 'Aerospace Studies (AS)' },
    { key: 'Agricultural and Resource Economics (AREC)', text: 'Agricultural and Resource Economics (AREC)',
      value: 'Agricultural and Resource Economics (AREC)' },
    { key: 'American Sign Language (ASL)', text: 'American Sign Language (ASL)',
      value: 'American Sign Language (ASL)' },
    { key: 'American Studies (AMST)', text: 'American Studies (AMST)', value: 'American Studies (AMST)' },
    { key: 'Anatomy (ANAT)', text: 'Anatomy (ANAT)', value: 'Anatomy (ANAT)' },
    { key: 'Animal Sciences (ANSC)', text: 'Animal Sciences (ANSC)', value: 'Animal Sciences (ANSC)' },
    { key: 'Anthropology (ANTH)', text: 'Anthropology (ANTH)', value: 'Anthropology (ANTH)' },
    { key: 'Arabic (ARAB)', text: 'Arabic (ARAB)', value: 'Arabic (ARAB)' },
    { key: 'Architecture (ARCH)', text: 'Architecture (ARCH)', value: 'Architecture (ARCH)' },
    { key: 'Art and Art History (ART)', text: 'Art and Art History (ART)', value: 'Art and Art History (ART)' },
    { key: 'Arts and Sciences (CAS)', text: 'Arts and Sciences (CAS)', value: 'Arts and Sciences (CAS)' },
    { key: 'Asian Studies (ASAN)', text: 'Asian Studies (ASAN)', value: 'Asian Studies (ASAN)' },
    { key: 'Astronomy (ASTR)', text: 'Astronomy (ASTR)', value: 'Astronomy (ASTR)' },
    { key: 'Atmospheric Sciences (ATMO)', text: 'Atmospheric Sciences (ATMO)', value: 'Atmospheric Sciences (ATMO)' },
    { key: 'Biochemistry (BIOC)', text: 'Biochemistry (BIOC)', value: 'Biochemistry (BIOC)' },
    { key: 'Bioengineering (BE)', text: 'Bioengineering (BE)', value: 'Bioengineering (BE)' },
    { key: 'Biology (BIOL)', text: 'Biology (BIOL)', value: 'Biology (BIOL)' },
    { key: 'Biomedical Sciences (BIOM)', text: 'Biomedical Sciences (BIOM)', value: 'Biomedical Sciences (BIOM)' },
    { key: 'Biophysics (BIOP)', text: 'Biophysics (BIOP)', value: 'Biophysics (BIOP)' },
    { key: 'Botany (BOT)', text: 'Botany (BOT)', value: 'Botany (BOT)' },
    { key: 'Business (BUS)', text: 'Business (BUS)', value: 'Business (BUS)' },
    { key: 'Business Law (BLAW)', text: 'Business Law (BLAW)', value: 'Business Law (BLAW)' },
    { key: 'Cambodian (CAM)', text: 'Cambodian (CAM)', value: 'Cambodian (CAM)' },
    { key: 'Cell and Molecular Biology (CMB)', text: 'Cell and Molecular Biology (CMB)',
      value: 'Cell and Molecular Biology (CMB)' },
    { key: 'Chamorro (CHAM)', text: 'Chamorro (CHAM)', value: 'Chamorro (CHAM)' },
    { key: 'Chemistry (CHEM)', text: 'Chemistry (CHEM)', value: 'Chemistry (CHEM)' },
    { key: 'Chinese (CHN)', text: 'Chinese (CHN)', value: 'Chinese (CHN)' },
    { key: 'Civil and Environmental Engineering (CEE)', text: 'Civil and Environmental Engineering (CEE)',
      value: 'Civil and Environmental Engineering (CEE)' },
    { key: 'Classics (CLAS)', text: 'Classics (CLAS)', value: 'Classics (CLAS)' },
          { key: 'Communication (COM)', text: 'Communication (COM)', value: 'Communication (COM)' },
    { key: 'Communication and Information Sciences (CIS)', text: 'Communication and Information Sciences (CIS)',
      value: 'Communication and Information Sciences (CIS)' },
    { key: 'Communication Sciences and Disorders (CSD)', text: 'Communication Sciences and Disorders (CSD)',
      value: 'Communication Sciences and Disorders (CSD)' },
    { key: 'Communicology (COMG)', text: 'Communicology (COMG)', value: 'Communicology (COMG)' },
    { key: 'Complementary and Alternative Medicine (CAAM)', text: 'Complementary and Alternative Medicine(CAAM)',
      value: 'Complementary and Alternative Medicine (CAAM)' },
    { key: 'Curriculum Studies (EDCS)', text: 'Curriculum Studies (EDCS)', value: 'Curriculum Studies (EDCS)' },
    { key: 'Dance (DNCE)', text: 'Dance (DNCE)', value: 'Dance (DNCE)' },
    { key: 'Dental Hygiene (DH)', text: 'Dental Hygiene (DH)', value: 'Dental Hygiene (DH)' },
    { key: 'Developmental and Reproductive Biology (DRB)', text: 'Developmental and Reproductive Biology (DRB)',
      value: 'Developmental and Reproductive Biology (DRB)' },
    { key: 'Disability and Diversity Studies (DIS)', text: 'Disability and Diversity Studies (DIS)',
      value: 'Disability and Diversity Studies (DIS)' },
    { key: 'East Asian Languages and Literatures (EALL)', text: 'East Asian Languages and Literatures (EALL)',
      value: 'East Asian Languages and Literatures (EALL)' },
    { key: 'Economics (ECON)', text: 'Economics (ECON)', value: 'Economics (ECON)' },
    { key: 'Education (EDUC)', text: 'Education (EDUC)', value: 'Education (EDUC)' },
    { key: 'Educational Administration (EDEA)', text: 'Educational Administration (EDEA)',
      value: 'Educational Administration (EDEA)' },
    { key: 'Educational Foundations (EDEF)', text: 'Educational Foundations (EDEF)',
      value: 'Educational Foundations (EDEF)' },
    { key: 'Educational Psychology (EDEP)', text: 'Educational Psychology (EDEP)',
      value: 'Educational Psychology (EDEP)' },
    { key: 'Electrical Engineering (EE)', text: 'Electrical Engineering (EE)', value: 'Electrical Engineering (EE)' },
    { key: 'Engineering (ENGR)', text: 'Engineering (ENGR)', value: 'Engineering (ENGR)' },
    { key: 'English (ENG)', text: 'English (ENG)', value: 'English (ENG)' },
    { key: 'English as a Second Language (ESL)', text: 'English as a Second Language (ESL)',
      value: 'English as a Second Language (ESL)' },
    { key: 'English Language Institute (ELI)', text: 'English Language Institute (ELI)',
      value: 'English Language Institute (ELI)' },
    { key: 'Ethnic Studies (ES)', text: 'Ethnic Studies (ES)', value: 'Ethnic Studies (ES)' },
    { key: 'Exception Students and Elementary Education (ESEE)',
      text: 'Exception Students and Elementary Education (ESEE)',
      value: 'Exception Students and Elementary Education (ESEE)' },
    { key: 'Family Medicine and Community Health (FMCH)', text: 'Family Medicine and Community Health (FMCH)',
      value: 'Family Medicine and Community Health (FMCH)' },
    { key: 'Fashion Design and Merchandising (FDM)', text: 'Fashion Design and Merchandising (FDM)',
      value: 'Fashion Design and Merchandising (FDM)' },
    { key: 'Filipino (FIL)', text: 'Filipino (FIL)', value: 'Filipino (FIL)' },
    { key: 'Finance (FIN)', text: 'Finance (FIN)', value: 'Finance (FIN)' },
    { key: 'Food Science and Human Nutrition (FSHN)', text: 'Food Science and Human Nutrition (FSHN)',
      value: 'Food Science and Human Nutrition (FSHN)' },
    { key: 'French (FR)', text: 'French (FR)', value: 'French (FR)' },
    { key: 'Geography (GEOG)', text: 'Geography (GEOG)', value: 'Geography (GEOG)' },
    { key: 'Geology and Geophysics (GG)', text: 'Geology and Geophysics (GG)', value: 'Geology and Geophysics (GG)' },
    { key: 'Geriatric Medicine (GERI)', text: 'Geriatric Medicine (GERI)', value: 'Geriatric Medicine (GERI)' },
    { key: 'German (GER)', text: 'German (GER)', value: 'German (GER)' },
    { key: 'Global Health Protection & Security (GHPS)', text: 'Global Health Protection & Security (GHPS)',
      value: 'Global Health Protection & Security (GHPS)' },
    { key: 'Greek (GRK)', text: 'Greek (GRK)', value: 'Greek (GRK)' },
    { key: 'Hawaiian (HAW)', text: 'Hawaiian (HAW)', value: 'Hawaiian (HAW)' },
    { key: 'Hawaiian Studies (HWST)', text: 'Hawaiian Studies (HWST)', value: 'Hawaiian Studies (HWST)' },
    { key: 'Health Sciences and Social Welfare (HSSW)', text: 'Health Sciences and Social Welfare (HSSW)',
      value: 'Health Sciences and Social Welfare (HSSW)' },
    { key: 'Hindi (HNDI)', text: 'Hindi (HNDI)', value: 'Hindi (HNDI)' },
    { key: 'History (HIST)', text: 'History (HIST)', value: 'History (HIST)' },
    { key: 'Honors (HON)', text: 'Honors (HON)', value: 'Honors (HON)' },
    { key: 'Human Development and Family Studies (HDFS)', text: 'Human Development and Family Studies (HDFS)',
      value: 'Human Development and Family Studies (HDFS)' },
    { key: 'Human Resources Management (HRM)', text: 'Human Resources Management (HRM)',
      value: 'Human Resources Management (HRM)' },
    { key: 'Ilokano (ILO)', text: 'Ilokano (ILO)', value: 'Ilokano (ILO)' },
    { key: 'Indo-Pacific Languages (IP)', text: 'Indo-Pacific Languages (IP)', value: 'Indo-Pacific Languages (IP)' },
    { key: 'Indonesian (IND)', text: 'Indonesian (IND)', value: 'Indonesian (IND)' },
    { key: 'Information and Computer Sciences (ICS)', text: 'Information and Computer Sciences (ICS)',
      value: 'Information and Computer Sciences (ICS)' },
    { key: 'Information Technology Management (ITM)', text: 'Information Technology Management (ITM)',
      value: 'Information Technology Management (ITM)' },
    { key: 'Institute for Teacher Education (ITE)', text: 'Institute for Teacher Education (ITE)',
      value: 'Institute for Teacher Education (ITE)' },
    { key: 'Insurance (INS)', text: 'Insurance (INS)', value: 'Insurance (INS)' },
    { key: 'Interdisciplinary Studies (IS)', text: 'Interdisciplinary Studies (IS)',
      value: 'Interdisciplinary Studies (IS)' },
    { key: 'International Cultural Studies (CUL)', text: 'Interdisciplinary Studies (IS)',
      value: 'Interdisciplinary Studies (IS)' },
    { key: 'Italian (ITAL)', text: 'Italian (ITAL)', value: 'Italian (ITAL)' },
    { key: 'Japanese (JPN)', text: 'Japanese (JPN)', value: 'Japanese (JPN)' },
    { key: 'Journalism (JOUR)', text: 'Journalism (JOUR)', value: 'Journalism (JOUR)' },
    { key: 'Kinesiology and Rehabilitation Science (KRS)', text: 'Kinesiology and Rehabilitation Science (KRS)',
      value: 'Kinesiology and Rehabilitation Science (KRS)' },
    { key: 'Korean (KOR)', text: 'Korean (KOR)', value: 'Korean (KOR)' },
    { key: 'Languages and Literatures of Europe and the Americas (LLEA)',
      text: 'Languages and Literatures of Europe and the Americas (LLEA)',
      value: 'Languages and Literatures of Europe and the Americas (LLEA)' },
    { key: 'Languages, Linguistics, and Literature (LLL)', text: 'Languages, Linguistics, and Literature (LLL)',
      value: 'Languages, Linguistics, and Literature (LLL)' },
    { key: 'Latin (LATN)', text: 'Latin (LATN)', value: 'Latin (LATN)' },
    { key: 'Latin American and Iberian Studies (LAIS)', text: 'Latin American and Iberian Studies (LAIS)',
      value: 'Latin American and Iberian Studies (LAIS)' },
    { key: 'Law (LAW)', text: 'Law (LAW)', value: 'Law (LAW)' },
    { key: 'Law-Doctor of Juridical Science (LSJD)', text: 'Law-Doctor of Juridical Science (LSJD)',
      value: 'Law-Doctor of Juridical Science (LSJD)' },
    { key: 'Law-Environmental Law (LWEV)', text: 'Law-Environmental Law (LWEV)',
      value: 'Law-Environmental Law (LWEV)' },
    { key: 'Law-Journal and Team Credits (LWJT)', text: 'Law-Journal and Team Credits (LWJT)',
      value: 'Law-Journal and Team Credits (LWJT)' },
    { key: 'Law-Law Research (LWLR)', text: 'Law-Law Research (LWLR)', value: 'Law-Law Research (LWLR)' },
    { key: 'Law-Legal Writing (LWLW)', text: 'Law-Legal Writing (LWLW)', value: 'Law-Legal Writing (LWLW)' },
    { key: 'Law-Master of Law (LWLM)', text: 'Law-Master of Law (LWLM)', value: 'Law-Master of Law (LWLM)' },
    { key: 'Law-Pacific and Asian Law (LWPA)', text: 'Law-Pacific and Asian Law (LWPA)',
      value: 'Law-Pacific and Asian Law (LWPA)' },
    { key: 'Law-Ulu Lehua (LWUL)', text: 'Law-Ulu Lehua (LWUL)', value: 'Law-Ulu Lehua (LWUL)' },
    { key: 'Learning Design and Technology (LTEC)', text: 'Learning Design and Technology (LTEC)',
      value: 'Learning Design and Technology (LTEC)' },
    { key: 'Library and Information Science (LIS)', text: 'Library and Information Science (LIS)',
      value: 'Library and Information Science (LIS)' },
    { key: 'Linguistics (LING)', text: 'Linguistics (LING)', value: 'Linguistics (LING)' },
    { key: 'Management (MGT)', text: 'Management (MGT)', value: 'Management (MGT)' },
    { key: 'Maori (MAO)', text: 'Maori (MAO)', value: 'Maori (MAO)' },
    { key: 'Marine Biology (MBIO)', text: 'Marine Biology (MBIO)', value: 'Marine Biology (MBIO)' },
    { key: 'Marketing (MKT)', text: 'Marketing (MKT)', value: 'Marketing (MKT)' },
    { key: 'Mathematics (MATH)', text: 'Mathematics (MATH)', value: 'Mathematics (MATH)' },
    { key: 'Mechanical Engineering (ME)', text: 'Mechanical Engineering (ME)', value: 'Mechanical Engineering (ME)' },
    { key: 'Medical Education (MDED)', text: 'Medical Education (MDED)', value: 'Medical Education (MDED)' },
    { key: 'Medical History (MDHX)', text: 'Medical History (MDHX)', value: 'Medical History (MDHX)' },
    { key: 'Medical Technology (MEDT)', text: 'Medical Technology (MEDT)', value: 'Medical Technology (MEDT)' },
    { key: 'Medicine (MED)', text: 'Medicine (MED)', value: 'Medicine (MED)' },
    { key: 'Microbiology (MICR)', text: 'Microbiology (MICR)', value: 'Microbiology (MICR)' },
    { key: 'Military Science and Leadership (MSL)', text: 'Military Science and Leadership (MSL)',
      value: 'Military Science and Leadership (MSL)' },
    { key: 'Molecular and Cell Biology (MCB)', text: 'Molecular and Cell Biology (MCB)',
      value: 'Molecular and Cell Biology (MCB)' },
    { key: 'Molecular Biosciences and Bioengineering (MBBE)',
      text: 'Molecular Biosciences and Bioengineering (MBBE)',
      value: 'Molecular Biosciences and Bioengineering (MBBE)' },
    { key: 'Music (MUS)', text: 'Music (MUS)', value: 'Music (MUS)' },
    { key: 'Native Hawaiian Health (NHH)', text: 'Native Hawaiian Health (NHH)',
      value: 'Native Hawaiian Health (NHH)' },
    { key: 'Natural Resources and Environmental Management (NREM)',
      text: 'Natural Resources and Environmental Management (NREM)',
      value: 'Natural Resources and Environmental Management (NREM)' },
    { key: 'Natural Sciences (NSCI)', text: 'Natural Sciences (NSCI)', value: 'Natural Sciences (NSCI)' },
    { key: 'Nursing (NURS)', text: 'Nursing (NURS)', value: 'Nursing (NURS)' },
    { key: 'Obstetrics and Gynecology (OBGN)', text: 'Obstetrics and Gynecology (OBGN)',
      value: 'Obstetrics and Gynecology (OBGN)' },
    { key: 'Ocean and Earth Science and Technology (OEST)', text: 'Ocean and Earth Science and Technology (OEST)',
      value: 'Ocean and Earth Science and Technology (OEST)' },
    { key: 'Ocean and Resources Engineering (ORE)', text: 'Ocean and Resources Engineering (ORE)',
      value: 'Ocean and Resources Engineering (ORE)' },
    { key: 'Oceanography (OCN)', text: 'Oceanography (OCN)', value: 'Oceanography (OCN)' },
    { key: 'Pacific and Asian Studies (PAS)', text: 'Pacific and Asian Studies (PAS)',
      value: 'Pacific and Asian Studies (PAS)' },
    { key: 'Pacific Islands Studies (PACS)', text: 'Pacific Islands Studies (PACS)',
      value: 'Pacific Islands Studies (PACS)' },
    { key: 'Pali (PALI)', text: 'Pali (PALI)', value: 'Pali (PALI)' },
    { key: 'Pathology (PATH)', text: 'Pathology (PATH)', value: 'Pathology (PATH)' },
    { key: 'Peace Studies (PACE)', text: 'Peace Studies (PACE)', value: 'Peace Studies (PACE)' },
    { key: 'Pediatrics (PED)', text: 'Pediatrics (PED)', value: 'Pediatrics (PED)' },
    { key: 'Persian (PERS)', text: 'Persian (PERS)', value: 'Persian (PERS)' },
    { key: 'Pharmacology (PHRM)', text: 'Pharmacology (PHRM)', value: 'Pharmacology (PHRM)' },
    { key: 'Philosophy (PHIL)', text: 'Philosophy (PHIL)', value: 'Philosophy (PHIL)' },
    { key: 'Physics (PHYS)', text: 'Physics (PHYS)', value: 'Physics (PHYS)' },
    { key: 'Physiology (PHYL)', text: 'Physiology (PHYL)', value: 'Physiology (PHYL)' },
    { key: 'Plant and Environmental Protection Sciences (PEPS)',
      text: 'Plant and Environmental Protection Sciences (PEPS)',
      value: 'Plant and Environmental Protection Sciences (PEPS)' },
    { key: 'Political Science (POLS)', text: 'Political Science (POLS)', value: 'Political Science (POLS)' },
    { key: 'Portuguese (PORT)', text: 'Portuguese (PORT)', value: 'Portuguese (PORT)' },
    { key: 'Prakrit (PRAK)', text: 'Prakrit (PRAK)', value: 'Prakrit (PRAK)' },
    { key: 'Psychiatry (PSTY)', text: 'Psychiatry (PSTY)', value: 'Psychiatry (PSTY)' },
    { key: 'Psychology (PSY)', text: 'Psychology (PSY)', value: 'Psychology (PSY)' },
    { key: 'Public Administration (PUBA)', text: 'Public Administration (PUBA)',
      value: 'Public Administration (PUBA)' },
    { key: 'Public Health Sciences (PH)', text: 'Public Health Sciences (PH)', value: 'Public Health Sciences (PH)' },
    { key: 'Public Policy Center (PPC)', text: 'Public Policy Center (PPC)', value: 'Public Policy Center (PPC)' },
    { key: 'Quantitative Health Sciences (QHS)', text: 'Quantitative Health Sciences (QHS)',
      value: 'Quantitative Health Sciences (QHS)' },
    { key: 'Real Estate (RE)', text: 'Real Estate (RE)', value: 'Real Estate (RE)' },
    { key: 'Religion (REL)', text: 'Religion (REL)', value: 'Religion (REL)' },
    { key: 'Reproductive Biology (REPR)', text: 'Reproductive Biology (REPR)', value: 'Reproductive Biology (REPR)' },
    { key: 'Russian (RUS)', text: 'Russian (RUS)', value: 'Russian (RUS)' },
    { key: 'Samoan (SAM)', text: 'Samoan (SAM)', value: 'Samoan (SAM)' },
    { key: 'Sanskrit (SNSK)', text: 'Sanskrit (SNSK)', value: 'Sanskrit (SNSK)' },
    { key: 'Second Language Studies (SLS)', text: 'Second Language Studies (SLS)',
      value: 'Second Language Studies (SLS)' },
    { key: 'Social Sciences (SOCS)', text: 'Social Sciences (SOCS)', value: 'Social Sciences (SOCS)' },
    { key: 'Social Work (SW)', text: 'Social Work (SW)', value: 'Social Work (SW)' },
    { key: 'Sociology (SOC)', text: 'Sociology (SOC)', value: 'Sociology (SOC)' },
    { key: 'Spanish (SPAN)', text: 'Spanish (SPAN)', value: 'Spanish (SPAN)' },
    { key: 'Special Education (SPED)', text: 'Special Education (SPED)', value: 'Special Education (SPED)' },
    { key: 'Surgery (SURG)', text: 'Surgery (SURG)', value: 'Surgery (SURG)' },
    { key: 'Sustainability (SUST)', text: 'Sustainability (SUST)', value: 'Sustainability (SUST)' },
    { key: 'Tahitian (TAHT)', text: 'Tahitian (TAHT)', value: 'Tahitian (TAHT)' },
    { key: 'Thai (THAI)', text: 'Thai (THAI)', value: 'Thai (THAI)' },
    { key: 'Theatre (THEA)', text: 'Theatre (THEA)', value: 'Theatre (THEA)' },
    { key: 'Tongan (TONG)', text: 'Tongan (TONG)', value: 'Tongan (TONG)' },
    { key: 'Translation and Interpretation (TI)', text: 'Translation and Interpretation (TI)',
      value: 'Translation and Interpretation (TI)' },
    { key: 'Travel Industry Management (TIM)', text: 'Travel Industry Management (TIM)',
      value: 'Travel Industry Management (TIM)' },
    { key: 'Tropical Agriculture and Human Resources (TAHR)', text: 'Tropical Agriculture and Human Resources (TAHR)',
      value: 'Tropical Agriculture and Human Resources (TAHR)' },
    { key: 'Tropical Medicine and Medical Microbiology (TRMD)',
      text: 'Tropical Medicine and Medical Microbiology (TRMD)',
      value: 'Tropical Medicine and Medical Microbiology (TRMD)' },
    { key: 'Tropical Plant and Soil Sciences (TPSS)', text: 'Tropical Plant and Soil Sciences (TPSS)',
      value: 'Tropical Plant and Soil Sciences (TPSS)' },
    { key: 'University (UNIV)', text: 'University (UNIV)', value: 'University (UNIV)' },
    { key: 'Urban and Regional Planning (PLAN)', text: 'Urban and Regional Planning (PLAN)',
      value: 'Urban and Regional Planning (PLAN)' },
    { key: 'Urdu (URDU)', text: 'Urdu (URDU)', value: 'Urdu (URDU)' },
    { key: 'Vietnamese (VIET)', text: 'Vietnamese (VIET)', value: 'Vietnamese (VIET)' },
    { key: 'Women’s Studies (WS)', text: 'Women’s Studies (WS)', value: 'Women’s Studies (WS)' },
    { key: 'Zoology (ZOOL)', text: 'Zoology (ZOOL)', value: 'Zoology (ZOOL)' },
];

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStudySessions extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.state = { choices: [] };
  }

  handleChange(event, instance) {
    event.preventDefault();
    console.log(instance.value, this.state);
    this.setState({ choices: instance.value });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    let sessionsToView = this.props.sessions;
    sessionsToView = _.filter(sessionsToView, (session) => {
      if (this.state.choices.length === 0) {
        return true;
      }
      console.log(session.course, this.state.choices)
        return _.contains(this.state.choices, session.course);
    });
    console.log(sessionsToView, this.state);
    return (
        <div className="manoastudyhub-landing-background">
          <Container>
            <Header as="h2" textAlign="center" >List Study Sessions</Header>
            <Dropdown placeholder='Select a Course to Search for...' multiple selection options={options}
                      onChange={this.handleChange}/>
            <Card.Group>
              {sessionsToView.map((session, index) => <StudySession key={index} session={session}/>)}
            </Card.Group>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListStudySessions.propTypes = {
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Sessions');
  return {
    sessions: Sessions.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListStudySessions);
