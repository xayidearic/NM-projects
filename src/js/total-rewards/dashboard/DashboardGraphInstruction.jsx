/**
 * 
 * @returns Graph instruction
 * Icon + click should only show on lg screens
 * No icon + tap only show on small devices
 */
const DashboardGraphInstruction = () => {
    return (
        <div className="col-12 col-sm-7 col-md-4 col-xl-3 d-flex neutral-windex align-items-center p-4 justify-content-center text-center text-lg-start mb-8 mx-auto mx-lg-0">
            <div className="me-4 d-lg-block d-none">
                <img src="/Content/Images/icons/total-rewards/dashboard/mouse_icon.svg"
                    alt="" />
            </div>
            <div className="legal color-primary d-lg-block d-none">
                Click the icons or use the  arrows to navigate your Total Rewards
            </div>
            <div className="legal color-primary d-lg-none">
                Tap the icons or use the  arrows to navigate your Total Rewards
            </div>
        </div>
    )
}

export default DashboardGraphInstruction;