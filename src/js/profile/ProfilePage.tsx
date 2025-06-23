import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from '../store';
import ProfilePageBanner from './ProfilePageBanner/ProfilePageBanner';
import ProfileInfoColumn from './ProfileInfoColumn/ProfileInfoColumn';
import ProfileAboutSection from './ProfileAboutSection/ProfileAboutSection';
import ProfileTeamsSection from './ProfileTeamsSection/ProfileTeamsSection';
import { registerCustomElement } from './../app/registerCustomElement';
import style from './ProfilePage.module.scss';
import { useGetUserDataQuery } from '../dux/lanIdApi';
import ProfileSkills from './ProfileSkills/ProfileSkills';
import ERGMemberships from './ERGMemberships/ERGMemberships';

export const ProfilePage = ({ lanId, showEdit }: { lanId: string; showEdit: boolean }) => {
  const { data } = useGetUserDataQuery({ lanid: lanId, isCoworkers: false });

  return data && (
      <div data-lwsearch="exclude">
        <ProfilePageBanner data={data} />

        <div
          id="main-content"
          className={`${style.profile} d-flex flex-column position-relative my-6 my-md-7 my-lg-11`}
        >
          <div className="d-flex flex-column flex-md-row">
            <ProfileInfoColumn
              data={data}
              showEdit={showEdit}
            />
            <div className="col-12 col-md-8 flex-column">
              <ProfileAboutSection data={data} />
              <ProfileTeamsSection lanId={lanId} />
              {data.NMUserModelWorkday.Skills ||
                data.NMUserModelWorkday.ERGs ? (
                  <div className={`card mt-6 mt-md-4 mt-lg-8 ${style.bottomPanel}`}>
                    <ProfileSkills data={data} />

                    <ERGMemberships data={data} />
                  </div>
                ) : null}
            </div>
          </div>
        </div>
      </div>
    )
};

class ProfilePageClass extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    const lanId = this.getAttribute('data-lanid') || '';
    const showEdit = this.getAttribute('data-edit') === 'True';

    root.render(
      <Provider store={store}>
        <ProfilePage
          lanId={lanId}
          showEdit={showEdit}
        />
      </Provider>
    );
  }
}

registerCustomElement('dc-profile-page', ProfilePageClass);
