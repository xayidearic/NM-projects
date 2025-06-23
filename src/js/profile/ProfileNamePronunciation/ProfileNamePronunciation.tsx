import { createRoot } from 'react-dom/client';
import classNames from 'classnames';
import { Provider } from 'react-redux';
import { useRef, useState } from 'react';

import { registerCustomElement } from '../../app/registerCustomElement';
import store from '../../store';
import { useGetAudioUrlQuery } from '../../dux/audioNameService';
import AudioNamePronunciation from '../../components/NamePronunciation/AudioNamePronunciation';
import ProfileInputField from '../ProfileInputField/ProfileInputField';

import styles from './ProfileNamePronunciation.module.scss';

export interface Model {
  pageType?: string;
  phoneticName?: string;
  lanId?: string;
  audioUrl?: string | null;
}

const ProfileUpdateNamePronunciation = ({ pageType, phoneticName, audioUrl }: Model) => {
  return (
    <div className="row">
      <label className="h4">Name Pronunciation</label>
      <ProfileInputField
        classes="col-12 col-md-3 pe-md-4"
        isDisabled={true}
        fieldId="PhoneticName"
      >
        <AudioNamePronunciation
          pageType={pageType}
          audioUrl={audioUrl}
        />
      </ProfileInputField>

      <ProfileInputField
        classes="col-12 col-md-6 pe-md-0"
        isDisabled={true}
        fieldId="PhoneticName"
        value={phoneticName}
      />
    </div>
  );
};

const ProfileNamePronunciation = ({ pageType, phoneticName, audioUrl }: Model) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hover, setHover] = useState(false);

  const phoneticFont = classNames('p1 weight-brand-bold', styles.phoneticFont, {
    'link--external': audioUrl,
    'text-decoration-underline': hover && audioUrl,
    [styles.cursorPointer]: audioUrl,
  });

  const handlePlay = () => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="d-flex align-items-center mb-2">
      {audioUrl && (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <audio
            ref={audioRef}
            src={audioUrl}
          />
          <AudioNamePronunciation
            pageType={pageType}
            audioUrl={audioUrl}
          />
        </div>
      )}

      {phoneticName && (
        <p
          className={phoneticFont}
          onClick={handlePlay}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          [{phoneticName}]
        </p>
      )}
    </div>
  );
};

export const NamePronunciation = ({ pageType, phoneticName, lanId }: Model) => {
  const { data } = useGetAudioUrlQuery(lanId);
  const audioUrl: string = data?.audioUrl;

  if (pageType === 'profile-page') {
    return (
      <ProfileNamePronunciation
        pageType={pageType}
        phoneticName={phoneticName}
        audioUrl={audioUrl}
      />
    );
  } else {
    return (
      <ProfileUpdateNamePronunciation
        pageType={pageType}
        phoneticName={phoneticName}
        audioUrl={audioUrl}
      />
    );
  }
};

class DCProfileNamePronunciation extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    const pageType = this.getAttribute('page-type') ?? '';
    const phoneticName = this.getAttribute('phonetic-name') ?? '';
    const lanId = this.getAttribute('lan-id') ?? '';

    root.render(
      <Provider store={store}>
        <NamePronunciation
          pageType={pageType}
          phoneticName={phoneticName}
          lanId={lanId}
        />
      </Provider>
    );
  }
}

registerCustomElement('dc-profile-name-pronunciation', DCProfileNamePronunciation);
