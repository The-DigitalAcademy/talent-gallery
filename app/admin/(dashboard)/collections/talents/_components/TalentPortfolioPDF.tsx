import React from 'react';
import path from 'path';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Image,
  Font,
} from '@react-pdf/renderer';

// Register local TTF fonts so the PDF matches the site's typography
const FONTS_DIR = path.join(process.cwd(), 'public', 'fonts');

Font.register({
  family: 'Lexend Deca',
  fonts: [
    { src: path.join(FONTS_DIR, 'LexendDeca-Light.ttf'), fontWeight: 300 },
    { src: path.join(FONTS_DIR, 'LexendDeca-Regular.ttf'), fontWeight: 400 },
    { src: path.join(FONTS_DIR, 'LexendDeca-SemiBold.ttf'), fontWeight: 600 },
    { src: path.join(FONTS_DIR, 'LexendDeca-Bold.ttf'), fontWeight: 700 },
  ],
});

Font.register({
  family: 'Montserrat',
  fonts: [
    { src: path.join(FONTS_DIR, 'Montserrat-Light.ttf'), fontWeight: 300 },
    { src: path.join(FONTS_DIR, 'Montserrat-Regular.ttf'), fontWeight: 400 },
    { src: path.join(FONTS_DIR, 'Montserrat-Medium.ttf'), fontWeight: 500 },
    { src: path.join(FONTS_DIR, 'Montserrat-SemiBold.ttf'), fontWeight: 600 },
    { src: path.join(FONTS_DIR, 'Montserrat-Bold.ttf'), fontWeight: 700 },
  ],
});

const PURPLE_MAIN = '#BE54FA';
const PURPLE_BG = '#B84DF8';
const LILAC_PHOTO_BG = '#E9B8FF';
const DARK_TEXT = '#1F2937';
const MUTED_TEXT = '#4B5563';
const LEFT_ALIGN_X = 24;

const styles = StyleSheet.create({
  page: {
    size: 'A4',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Montserrat',
    margin: 0,
    padding: 0,
    position: 'relative',
    height: '100%',
  },
  bodyContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  // ─── LEFT SIDEBAR ──────────────────────────────────────────────────────────
  sidebar: {
    width: '39%',
    backgroundColor: PURPLE_BG,
    color: '#FFFFFF',
    flexDirection: 'column',
  },
  photoContainer: {
    width: '100%',
    height: 195,
    backgroundColor: LILAC_PHOTO_BG,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  photoPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: PURPLE_MAIN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholderText: {
    color: '#FFFFFF',
    fontSize: 34,
    fontFamily: 'Lexend Deca',
    fontWeight: 700,
  },
  portfolioButton: {
    width: '100%',
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  },
  portfolioButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Montserrat',
    fontWeight: 700,
    letterSpacing: 1.2,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  sidebarContent: {
    paddingLeft: LEFT_ALIGN_X,
    paddingRight: 20,
    paddingVertical: 18,
    flexDirection: 'column',
    gap: 16,
  },
  sidebarSection: {
    marginBottom: 4,
  },
  sidebarSectionTitle: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontFamily: 'Lexend Deca',
    fontWeight: 700,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  sidebarText: {
    color: '#FFFFFF',
    fontSize: 9.2,
    fontFamily: 'Montserrat',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  sidebarParagraph: {
    color: '#FFFFFF',
    fontSize: 8.8,
    fontFamily: 'Montserrat',
    fontWeight: 400,
    lineHeight: 1.45,
  },

  // ─── RIGHT MAIN CONTENT ───────────────────────────────────────────────────
  main: {
    width: '61%',
    backgroundColor: '#FFFFFF',
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 14,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  nameContainer: {
    marginBottom: 4,
  },
  nameFirst: {
    fontSize: 32,
    fontFamily: 'Lexend Deca',
    fontWeight: 700,
    color: '#000000',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    lineHeight: 1.05,
  },
  nameInitial: {
    fontSize: 32,
    fontFamily: 'Lexend Deca',
    fontWeight: 300,
    color: '#000000',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    lineHeight: 1.05,
  },
  roleTitle: {
    fontSize: 11,
    fontFamily: 'Lexend Deca',
    fontWeight: 700,
    color: PURPLE_MAIN,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 4,
    marginBottom: 10,
  },
  bioText: {
    fontSize: 8.8,
    fontFamily: 'Montserrat',
    fontWeight: 400,
    color: DARK_TEXT,
    lineHeight: 1.45,
    marginBottom: 16,
  },

  // ─── SECTIONS IN MAIN COLUMN ──────────────────────────────────────────────
  mainSectionTitle: {
    fontSize: 11.5,
    fontFamily: 'Lexend Deca',
    fontWeight: 700,
    color: '#000000',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 6,
  },
  itemBlock: {
    marginBottom: 14,
  },
  itemTitleContainer: {
    marginBottom: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  itemTitle: {
    fontSize: 10.5,
    fontFamily: 'Lexend Deca',
    fontWeight: 600,
    color: PURPLE_MAIN,
  },
  itemSubtitle: {
    fontSize: 10,
    fontFamily: 'Lexend Deca',
    fontWeight: 700,
    color: '#000000',
  },
  itemMeta: {
    fontSize: 8.8,
    fontFamily: 'Montserrat',
    fontWeight: 400,
    color: MUTED_TEXT,
    marginTop: 3,
    marginBottom: 6,
  },
  itemDescription: {
    fontSize: 8.5,
    fontFamily: 'Montserrat',
    fontWeight: 400,
    color: DARK_TEXT,
    lineHeight: 1.42,
    marginBottom: 6,
  },
  subSectionLabel: {
    fontSize: 8.8,
    fontFamily: 'Montserrat',
    fontWeight: 700,
    color: '#000000',
    marginTop: 4,
    marginBottom: 2,
  },
  techUsedText: {
    fontSize: 8.4,
    fontFamily: 'Montserrat',
    fontWeight: 400,
    color: DARK_TEXT,
    lineHeight: 1.35,
    marginBottom: 4,
  },

  // ─── SHAPER REVIEW ────────────────────────────────────────────────────────
  reviewSection: {
    backgroundColor: '#FFFFFF',
    paddingLeft: LEFT_ALIGN_X,
    paddingRight: 24,
    paddingTop: 10,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  reviewTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
    gap: 6,
  },
  reviewTitle: {
    fontSize: 11,
    fontFamily: 'Lexend Deca',
    fontWeight: 700,
    color: '#000000',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  reviewEndorser: {
    fontSize: 8.8,
    fontFamily: 'Montserrat',
    fontWeight: 400,
    color: MUTED_TEXT,
  },
  reviewText: {
    fontSize: 8.6,
    fontFamily: 'Montserrat',
    fontWeight: 400,
    color: DARK_TEXT,
    lineHeight: 1.42,
  },

  // ─── FOOTER ───────────────────────────────────────────────────────────────
  footer: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: LEFT_ALIGN_X,
    paddingRight: 24,
    paddingVertical: 10,
    width: '100%',
  },
  footerContacts: {
    flexDirection: 'column',
    gap: 1.5,
  },
  footerContactText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontFamily: 'Montserrat',
    fontWeight: 400,
    lineHeight: 1.3,
  },
  footerBrand: {
    fontSize: 18,
    fontFamily: 'Lexend Deca',
    fontWeight: 700,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});

interface TalentPortfolioPDFProps {
  talent: any;
}

export default function TalentPortfolioPDF({ talent }: TalentPortfolioPDFProps) {
  // Name: first name bold + last initial light — matches TalentProfile.tsx online display
  const nameParts = (talent?.fullname || 'Talent').trim().split(/\s+/);
  const firstName = (nameParts[0] || 'TALENT').toUpperCase();
  const lastInitial = nameParts.length > 1
    ? nameParts[nameParts.length - 1].charAt(0).toUpperCase() + '.'
    : '';

  // Role Title (only from DB)
  const roleTitle = talent?.role?.name ? talent.role.name.toUpperCase() : null;

  // Technical skills (strictly from talent_capabilities in DB)
  const skillsList: string[] =
    talent?.capabilities && Array.isArray(talent.capabilities)
      ? talent.capabilities
          .slice()
          .sort((a: any, b: any) => (a.sortPosition ?? 0) - (b.sortPosition ?? 0))
          .map((c: any) => c.capability?.name || c.name)
          .filter(Boolean)
      : [];

  // Education (strictly from DB: educations relation or talent.education)
  const educationItems: string[] =
    talent?.educations && Array.isArray(talent.educations) && talent.educations.length > 0
      ? talent.educations
          .map((e: any) => e.qualification || e.institution || e.degree)
          .filter(Boolean)
      : [];

  // Projects (strictly from projects in DB)
  const projects = talent?.projects && Array.isArray(talent.projects) ? talent.projects : [];

  // Work Experiences (strictly from work_experiences in DB)
  const workExperiences =
    talent?.work_experiences && Array.isArray(talent.work_experiences) ? talent.work_experiences : [];

  // Endorsement / Review (strictly from endorsements in DB)
  const firstEndorsement =
    talent?.endorsements && Array.isArray(talent.endorsements) && talent.endorsements.length > 0
      ? talent.endorsements[0]
      : null;

  // Portfolio URL
  const portfolioUrl =
    talent?.portfolio_url ||
    (talent?.slug
      ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://talent.shaper.co.za'}/talent/${talent.slug}`
      : null);

  const hasValidImageUrl =
    Boolean(talent?.profile_image_url) &&
    (typeof talent.profile_image_url === 'string'
      ? talent.profile_image_url.trim().length > 0
      : Boolean(talent.profile_image_url?.data || talent.profile_image_url?.uri));

  return (
    <Document title={`${talent?.fullname || 'Talent'} - Portfolio`} author="Shaper Talent Gallery">
      <Page size="A4" style={styles.page}>
        {/* Main Body Columns */}
        <View style={styles.bodyContainer}>
          {/* ── LEFT PURPLE SIDEBAR ── */}
          <View style={styles.sidebar}>
            {/* Candidate Photo */}
            <View style={styles.photoContainer}>
              {hasValidImageUrl ? (
                <Image src={talent.profile_image_url} style={styles.profilePhoto} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoPlaceholderText}>{firstName.charAt(0) || 'T'}</Text>
                </View>
              )}
            </View>

            {/* View My Portfolio Button */}
            {portfolioUrl && (
              <Link src={portfolioUrl} style={styles.portfolioButton}>
                <Text style={styles.portfolioButtonText}>VIEW MY PORTFOLIO</Text>
              </Link>
            )}

            {/* Sidebar Details (Only render sections that exist in the DB) */}
            <View style={styles.sidebarContent}>
              {/* Education (only if exists in DB) */}
              {educationItems.length > 0 && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarSectionTitle}>EDUCATION</Text>
                  {educationItems.map((edu: string, idx: number) => (
                    <Text key={idx} style={styles.sidebarText}>
                      {edu}
                    </Text>
                  ))}
                </View>
              )}

              {/* Technical Skills (pipe separated per PR review) */}
              {skillsList.length > 0 && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarSectionTitle}>TECHNICAL SKILLS</Text>
                  <Text style={styles.sidebarText}>{skillsList.join(' | ')}</Text>
                </View>
              )}

              {/* Core Technical Capabilities (rendered as paragraph per PR review) */}
              {talent?.capabilities_summary && talent.capabilities_summary.trim().length > 0 && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarSectionTitle}>CORE TECHNICAL{'\n'}CAPABILITIES</Text>
                  <Text style={styles.sidebarParagraph}>
                    {talent.capabilities_summary.trim()}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* ── RIGHT MAIN COLUMN ── */}
          <View style={styles.main}>
            {/* Header / Name: first name (bold) + last initial (light) — matches online profile */}
            <View style={styles.nameContainer}>
              <Text style={styles.nameFirst}>{firstName}</Text>
              {lastInitial ? <Text style={styles.nameInitial}>{lastInitial}</Text> : null}
            </View>

            {/* Role Title */}
            {roleTitle && <Text style={styles.roleTitle}>{roleTitle}</Text>}

            {/* Bio / Summary */}
            {talent?.bio && <Text style={styles.bioText}>{talent.bio}</Text>}

            {/* Selected Projects (strictly from DB) */}
            {projects.length > 0 && (
              <View>
                <Text style={styles.mainSectionTitle}>SELECTED PROJECT EXPERIENCE</Text>
                {projects.slice(0, 2).map((project: any, idx: number) => {
                  const techList =
                    project.capabilities && Array.isArray(project.capabilities)
                      ? project.capabilities.map((c: any) => c.capability?.name || c.name).filter(Boolean).join(', ')
                      : '';

                  return (
                    <View key={project.id || idx} style={styles.itemBlock}>
                      <View style={styles.itemTitleContainer}>
                        <Text style={styles.itemTitle}>
                          {project.name}
                          <Text style={styles.itemSubtitle}> | Project</Text>
                        </Text>
                      </View>
                      {talent?.program?.name && (
                        <Text style={styles.itemMeta}>{talent.program.name}</Text>
                      )}
                      {project.description && (
                        <Text style={styles.itemDescription}>{project.description}</Text>
                      )}
                      {techList.length > 0 && (
                        <View>
                          <Text style={styles.subSectionLabel}>Technology Used</Text>
                          <Text style={styles.techUsedText}>{techList}</Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            )}

            {/* Work Experience (strictly from DB) */}
            {workExperiences.length > 0 && (
              <View>
                <Text style={styles.mainSectionTitle}>WORK EXPERIENCE</Text>
                {workExperiences.slice(0, 2).map((exp: any, idx: number) => (
                  <View key={exp.id || idx} style={styles.itemBlock}>
                    <View style={styles.itemTitleContainer}>
                      <Text style={styles.itemTitle}>
                        {exp.role}
                        {exp.company && (
                          <Text style={styles.itemSubtitle}> | {exp.company}</Text>
                        )}
                      </Text>
                    </View>
                    {exp.duration && <Text style={styles.itemMeta}>{exp.duration}</Text>}
                    {exp.description && (
                      <Text style={styles.itemDescription}>{exp.description}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* ── SHAPER REVIEW BANNER (Only rendered if an endorsement exists in DB) ── */}
        {firstEndorsement && firstEndorsement.message && (
          <View style={styles.reviewSection}>
            <View style={styles.reviewTitleRow}>
              <Text style={styles.reviewTitle}>SHAPER REVIEW</Text>
              {firstEndorsement.endorser_name && (
                <Text style={styles.reviewEndorser}>• {firstEndorsement.endorser_name}</Text>
              )}
            </View>
            <Text style={styles.reviewText}>{firstEndorsement.message}</Text>
          </View>
        )}

        {/* ── BLACK FOOTER ── */}
        <View style={styles.footer}>
          <View style={styles.footerContacts}>
            <Text style={styles.footerContactText}>info@shaper.co.za</Text>
            <Text style={styles.footerContactText}>+27 11 568 6887</Text>
          </View>
          <Text style={styles.footerBrand}>Shaper</Text>
        </View>
      </Page>
    </Document>
  );
}
