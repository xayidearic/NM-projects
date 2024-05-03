/**
 * Tooltip component.
 * 
 * Renders a tooltip with an icon and provided content.
 * 
 * @component
 * @param {Object} props - Properties passed to the component.
 * @param {ReactNode} props.children - The content to be displayed inside the tooltip.
 * @param {string} [props.targetClass] - Additional class name for styling.
 * @param {string} [props.targetContent] - Additional class name for styling the content.
 * @returns {ReactElement} Tooltip React element.
 */
const Tooltip = ({ children, targetClass, targetContent, bottom = false }) => {
    return (
        <span className={`tool-tip ${targetClass ? targetClass : undefined}`}>
            <div className="tool-tip__icon">
                <img className="mb-1" src="/Content/Images/icons/help-blue__icon.svg" alt="tool tip" />
            </div>
            <div className={`tool-tip__content ${targetContent ? targetContent : undefined}`}>
                <div className={`tool-tip__carrot ${bottom ? 'tool-tip__carrot--bottom' : undefined}`}>
                    <img src="/Content/Images/icons/tooltip-carrot-top_icon.svg" alt="top arrow" />
                </div>
                <div className="tool-tip__text metadata">
                    {children}
                </div>
            </div>
        </span>
    )
}

export default Tooltip;