const formatDateForICS = (dateTime: string) => dateTime.replace(/[-:]/g, '');

export interface Event {
  description: string;
  endDate: string;
  fileName: string;
  location: string;
  startDate: string;
  title: string;
}

const buildICSString = (event: Event) => {
  const parts = ['BEGIN:VCALENDAR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'VERSION:2.0', `PRODID:${event.fileName}`, 'BEGIN:VEVENT'];

  parts.push(`UID:${window.crypto.randomUUID()}`);
  parts.push(`DTSTART:${formatDateForICS(event.startDate)}`);
  parts.push(`DTEND:${formatDateForICS(event.endDate)}`);
  parts.push(`LOCATION:${event.location}`);
  parts.push(`SUMMARY:${event.title}`);
  parts.push(`DESCRIPTION:${event.description}`);
  parts.push('END:VEVENT', 'END:VCALENDAR');

  return parts.join('\n');
};

const downloadICSFile = (event: Event) => {
  // Create a new Blob object
  const ics = buildICSString(event);
  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = `${event.fileName}.ics`;
  a.click();

  window.URL.revokeObjectURL(url);
};

interface EventDownloadButtonProps {
  children: React.ReactNode;
  ics: Event;
}

export function EventDownloadButton({ children, ics }: EventDownloadButtonProps) {
  return (
    <button type="button" onClick={() => downloadICSFile(ics)}>
      {children}
    </button>
  );
}
