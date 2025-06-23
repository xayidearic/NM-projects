import { ProfileInfoProps } from '../utils';
import styles from './ERGMemberships.module.scss';

type ERGName = 'African-American' | 'disABILITY Alliance' | 'Hispanic' | 'PRIDE' | 'Asian' | 'Generations' | 'Military Veterans' | "Women's";

const ERG_LINKS: Record<ERGName, string> = {
  'African-American': 'https://nmfco.sharepoint.com/sites/aa-erg/',
  'disABILITY Alliance': 'https://nmfco.sharepoint.com/sites/ERG-daerg/',
 'Hispanic': 'https://nmfco.sharepoint.com/sites/ERG-herg/',
  'PRIDE': 'https://nmfco.sharepoint.com/sites/ERG-LGBTAERG/',
  'Asian': 'https://nmfco.sharepoint.com/sites/ERG-Asian/',
  'Generations': 'https://nmfco.sharepoint.com/sites/ERG-generational/',
  'Military Veterans': 'https://nmfco.sharepoint.com/sites/MVERG/',
  "Women's": 'https://nmfco.sharepoint.com/sites/ERG-werg/',
};

const ergImages = {
  'African-American': {
    src: '/Content/Images/icons/ERG/erg_african-american_icon.png',
    alt: 'african american erg',
  },
  'disABILITY Alliance': {
    src: '/Content/Images/icons/ERG/erg_disability-alliance_icon.png',
    alt: 'disability alliance erg',
  },
  'Hispanic': {
    src: '/Content/Images/icons/ERG/erg_hispanic_icon.png',
    alt: 'hispanic erg',
  },
  'PRIDE': {
    src: '/Content/Images/icons/ERG/erg_pride_icon.png',
    alt: 'pride erg',
  },
  'Asian': {
    src: '/Content/Images/icons/ERG/erg_asian_icon.png',
    alt: 'asian erg',
  },
  'Generations': {
    src: '/Content/Images/icons/ERG/erg_generations_icon.png',
    alt: 'generations erg',
  },
  'Military Veterans': {
    src: '/Content/Images/icons/ERG/erg_military-veteran_icon.png',
    alt: 'veterans erg',
  },
  "Women's": {
    src: '/Content/Images/icons/ERG/erg_womens_icon.png',
    alt: 'womens erg',
  },
};

const ERGMemberships = ({ data }: ProfileInfoProps) => {
  const membershipsString = data?.NMUserModelWorkday?.ERGs ?? '';
  if (!membershipsString) return null;
  
  const membershipsList = membershipsString
    .split(';')
    .map(erg => erg.trim())
    .filter(Boolean);

  return (
    <>
      <h2 className="mb-2 mt-9">ERG Memberships</h2>
      <div className="row g-5">
        {membershipsList.map((erg, index) => (
            <a
              className={`text-decoration-none col-12 col-md-6 ${styles.ergMembership}`}
              href={ERG_LINKS[erg as ERGName]}
              target="_blank"
              key={index}
            >
              <div className="d-flex align-items-center">
                <div className={styles.icon}>
                  {ergImages[erg as ERGName] && (
                    <img
                      src={ergImages[erg as ERGName].src}
                      alt={ergImages[erg as ERGName].alt}
                    />
                  )}
                </div>
                <div className="d-flex flex-column ms-5 ms-md-2 ms-lg-6">
                  <h4 className={`color-primary ${styles.name}`}>{erg}</h4>
                  <p className="link link--external">
                    View ERG
                    <span className="ms-3">
                      <img src="/Content/Images/icons/chevron-right_icon.svg" />
                    </span>
                  </p>
                </div>
              </div>
            </a>
        ))}
      </div>
    </>
  );
};

export default ERGMemberships;
