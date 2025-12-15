import React from "react";
import OverseasJobsSection from "./OverseasJobsSection";

const OverseasJobsPage: React.FC = () => {
    return (
        <div className="flex flex-col p-4">
            <OverseasJobsSection />
            <div className="h-16">
                <dialog>
                    <form method="dialog" className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Press ESC key or click the button to close</p>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
            <div>potatoes on the tree</div>
            
        </div>
    );
};

export default OverseasJobsPage;
