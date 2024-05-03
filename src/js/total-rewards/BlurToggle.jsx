import { useState } from 'react';

import { CookieManager } from '../app/cookieManager.js';

/**
 * Get toggled from cookie
 * @param {string} name
 */
export const GetBlurChoices = (name) => {
  if (!CookieManager.hasCookie(name)) {
    CookieManager.setCookie(name, true);

    return true;
  }

  return CookieManager.getCookie(name);
};

/**
 *
 * Resuable component
 * 11/2/23 - add logic to update mupltiple toggles within same landing page
 * Update: add landing page flag as a prop
 *   the slide state & setter come from slides parent component
 *   updates to the state will update the other toggles within landing page
 */
export const BlurToggle = ({ cookName, refetch, landingPage, blurSlide, setBlurSlide }) => {
  const [isBlurred, setIsBlurred] = useState(GetBlurChoices(cookName));

  const landingPageToggle = () => {
    setBlurSlide(!blurSlide);
    CookieManager.setCookie(cookName, !blurSlide);
    if (refetch) {
      refetch();
    }
  };

  const pageToggle = () => {
    setIsBlurred(!isBlurred);

    CookieManager.setCookie(cookName, !isBlurred);
    if (refetch) {
      refetch();
    }
  };

  return (
    <div className="blur-toggle d-flex justify-content-center">
      {landingPage ? (
        <button
          onClick={blurSlide ? undefined : landingPageToggle}
          className={`blur-toggle__text mb-0 eyebrow button--link 
          ${blurSlide ? ' blur-toggle__text--blue' : ''}`}
        >
          HIDE DATA
        </button>
      ) : (
        <button
          onClick={isBlurred ? undefined : pageToggle}
          className={`blur-toggle__text mb-0 eyebrow button--link 
          ${isBlurred ? ' blur-toggle__text--blue' : ''}`}
        >
          HIDE DATA
        </button>
      )}
      {landingPage ? (
        <input
          id="blur-check"
          type="checkbox"
          onClick={landingPageToggle}
          tabIndex="-1"
          className={blurSlide ?
            'blur-toggle__blur-checkbox' :
            'blur-toggle__blur-checkbox blur-toggle__blur-checkbox--selected'}
          aria-invalid="false"
        />
      ) : (
        <input
          id="blur-check"
          type="checkbox"
          onClick={pageToggle}
          tabIndex="-1"
          className={isBlurred ?
            'blur-toggle__blur-checkbox' :
            'blur-toggle__blur-checkbox blur-toggle__blur-checkbox--selected'}
          aria-invalid="false"
        />
      )}

      <label id="blur-label" tabIndex="0" htmlFor="blur-check">
        <div className="d-none">Hide/Show toggle</div>
      </label>

      {landingPage ? (
        <button
          onClick={!blurSlide ? undefined : landingPageToggle}
          className={`blur-toggle__text mb-0 eyebrow button--link 
          ${blurSlide ? '' : ' blur-toggle__text--blue'}`}
        >
          SHOW DATA
        </button>
      ) : (
        <button
          onClick={!isBlurred ? undefined : pageToggle}
          className={`blur-toggle__text mb-0 eyebrow button--link 
          ${isBlurred ? '' : ' blur-toggle__text--blue'}`}
        >
          SHOW DATA
        </button>
      )}
    </div>
  );
};
