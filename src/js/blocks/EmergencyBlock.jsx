import { createRoot } from 'react-dom/client';
import { registerCustomElement } from '../app/registerCustomElement';
import React, { useState } from 'react';

export const EmergencyBlock = ({ blockData }) => {
    const blockdata = JSON.parse(blockData.replace(/\\(.)/gm, '$1'));    
    const message = blockdata.Message;
    const [closemessage, setclosemessage] = useState(true);
    
    return (
        closemessage && <div id={blockdata.Type} className={`${blockdata.Type} w-100 ${blockdata.ShowFullWidth ? "full-width" : "" }`} data-lwsearch="@exclude" >
            <div className="d-flex align-items-center justify-content-center">
                <div className="d-flex flex-row align-items-center justify-content-center position-relative w-100">
                    <div className="icon--medium me-3 d-block">
                        <img src="/Content/Images/icons/exclamation_icon.svg" className={`${blockdata.Type == "banner-alert" ? "" : "d-none"} w-100`} />
                        <img src="/Content/Images/icons/Utility-Icon_Info_Gray.svg" className={` ${blockdata.Type == "banner-notification" ? "" : "d-none"} w-100`} />
                    </div>
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: message }} />

                        {!blockdata.RemoveExit &&
                        (
                        <button role="button"
                            onClick={() => setclosemessage(false)}
                            className="button--link cursor-pointer align-items-center justify-content-center d-flex close-banner-icon">
                            <div className="close-mobile"><span className="close-icon-banner">&#43;</span></div>
                            </button>
                        )
                    }    
                    </div>
                </div>
            </div>    
        </div>    
    );
};

class EmergencyBlockClass extends HTMLElement {
    connectedCallback() {
        const root = createRoot(this);
        root.render(<EmergencyBlock blockData={this.getAttribute('block-data')} />);
    }
}

registerCustomElement('emergency-block', EmergencyBlockClass);
