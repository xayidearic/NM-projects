import { createComponents } from '@dwwp/create-components';

/**
 * Uses createComponents from workplace portals
 * takes a HTML string into React Elements to avoid using dangerouslySetInnerHTML
 * @param {{ content: string; }} props
 * @returns authored content
 */
const AuthoredContentHandler = ({ content = '' }) => <div className='authored-content'>{createComponents(content)}</div>;

export default AuthoredContentHandler;
