interface UserBase {
  FirstName?: string;
  LastName?: string;
  BusinessTitle?: string;
  LanId: string;
  DirectReportsLanIds?: string;
  IsLeader?: boolean;
}

interface NMUserModelWorkday extends UserBase {
  PhoneticAudioFlag?: boolean;
  PhoneticName?: string;
  WorkerType?: string;
  WorkPhone?: string;
  WorkEmail?: string;
  Department?: string;
  Budget: string;
  Division?: string;
  Address?: string;
  ManagerLanId?: string;
  AboutMe?: string;
  ManagerLevel2LanId?: string;
  WorkdayServiceOnline: boolean;
  OrgChartLink: string;
  CoworkerLanIds: string;
  Skills?: string;
  ERGs?: string;
}

interface NMUserModelLocalData {
  TimeZone?: string;
  AdministrativeAssistantLanId?: string;
  ProfileSummary?: string;
}

interface NMUserModelLocation {
  Location?: string;
  Cubicle?: string;
}

export interface ProfileInfoProps {
  data: {
    NMUserModelWorkday: NMUserModelWorkday;
    NMUserModelLocalData: NMUserModelLocalData;
    NMUserModelLocation: NMUserModelLocation;
  };
}

export interface ProfileEditButtonProps {
  data: ProfileInfoProps['data'];
  showEdit: boolean;
}

export interface ProfileOrgChartListProps {
  data: ProfileInfoProps['data'];
  userLanId?: string;
  title?: string;
}

export interface Coworker {
    data: ProfileInfoProps['data'];
    NMUserModelWorkday: NMUserModelWorkday;
    NMUserModelLocalData: NMUserModelLocalData;
    NMUserModelLocation: NMUserModelLocation;
}

export interface ProfileOrgChartProps {
  data: ProfileInfoProps['data'];
  isMainOrgChart?: boolean;
}