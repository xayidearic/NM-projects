import { describe, it } from 'vitest';
import { ProfilePage } from './ProfilePage';
import { renderStores } from '../../../test/render-stores';

export const mockUseGetUserDataQuery = vi.fn(() => ({
  data: {
    NMUserModelWorkday: {
      AboutMe: '',
      Budget: '0444',
      BusinessTitle: 'Sr Software Engineer',
      CoworkerLanIds: 'KLI07;MAS19;MOD4703;QLT5506;ROU01;SKC4954;UEM6566;XEA8661;',
      Department: '04 - Enterprise Technology Solutions',
      Division: 'CS Workplace Portal',
      DirectReportsLanIds: '',
      Education: 'DeVry University',
      EmployeeType: 'Regular Full-Time',
      ERGs: 'PRIDE',
      FirstName: 'John',
      Function: 'Engineering',
      IsLeader: false,
      LastName: 'Doe',
      LegalFirstName: 'JOHN',
      LegalLastName: 'DOE',
      ManagerLanId: 'BRE9539',
      ManagerLevel2LanId: 'MAT2934',
      OrgChartLink: 'https://wd5-impl.workday.com/northwesternmutual/d/inst/4547$58830/rel-task/2998$14648.htmld',
      PhoneticName: '',
      PhoneticAudioFlag: false,
      Skills:
        'Agile Workflow,Bootstrap,Cascading Style Sheets (CSS),Coaching \u0026 Mentoring (NM) - Beginner,Data Structures,Digital Libraries,Front End Architecture,Front End Innovation,Front End Programming,Front-End Design,Front-End Engineering,Git,Hyper Text Markup Language (HTML),JavaScript,jQuery,JSON,Project Scheduling,Python (Programming Language),React (NM) - Advanced,React Redux,React.js,Redux (Javascript Library),RESTful APIs,User Experience (UX),User Interfaces (UI),Web Application Development,Web Development,Web Development Services,',
      WorkEmail: 'johndoe@northwesternmutual.com',
      WorkdayServiceOnline: true,
      WorkerProfileUrl: 'https://wd5-impl.workday.com/northwesternmutual/d/inst/1$247/247$21989.htmld',
      WorkerType: 'Employee',
      WorkPhone: '(414) 665-2834',
      LanId: '123456',
    },
    NMUserModelLocalData: {
      ProfileSummary: '',
      AdministrativeAssistantLanId: 'None',
      TimeZone: 'US/Eastern',
    },
    NMUserModelLocation: {
      Location: 'REMOTE',
      Cubicle: 'REMOTE',
    },
  },
}));

// Mock the useGetUserDataQuery hook
vi.mock('../../dux/lanIdApi', () => ({
  useGetUserDataQuery: () => mockUseGetUserDataQuery(),
}));

describe('it renders ProfilePage', () => {
  it('renders the ProfilePage component', () => {
    expect(() => {
      renderStores(
        <ProfilePage
          lanId="123456"
          showEdit={true}
        />
      );
    }).not.toThrowError();
  });

    it('renders the ProfilePage with no data', () => {
      expect(() => {
        renderStores(<ProfilePage lanId="123456"
          showEdit={true} />);
      }).not.toThrowError();
    });
});
