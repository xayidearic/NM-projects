import { useState } from 'react';

const copyToClipboard = async (text: string, callback: () => void) => {
  try {
    await navigator.clipboard.writeText(`${window.location.origin}${text}`);
    callback();
  } catch (err) {
    console.error('error', err);
  }
};

export function EventShareTooltip({ eventUrl }: { eventUrl: string }) {
  const [copyText, setCopyText] = useState('Copy Link');
  const clickHandler = () => copyToClipboard(eventUrl, () => setCopyText('Link Copied to clipboard'));

  return (
    <>
      <button
        className="copyTextBtn d-flex align-items-center px-0"
        onClick={clickHandler}
        aria-label="Copy Link"
      >
        <img
          className="icon me-2"
          src="/Content/Images/icons/link_icon.svg"
          alt="copy link"
        />
        <p
          id="copyText"
          className="copyText p2 mb-3 cursor-pointer"
        >
          {copyText}
        </p>
      </button>

      <a
        className="d-flex align-items-center text-decoration-none"
        role="button"
        href={`mailto:?body=${window.location.origin + eventUrl}`}
      >
        <div className="me-2">
          <img
            className="icon--small mx-2"
            src="/Content/Images/icons/mail_icon.svg"
            alt="email event"
          />
        </div>
        <p className="p2">Email</p>
      </a>
    </>
  );
}
