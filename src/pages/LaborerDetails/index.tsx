import LaborerEducation from "./LaborerEducation";
import LaborerExperience from "./LaborerExperience";
import LaborerGeneralInfo from "./LaborerGeneralInfo";
import LaborerJobInfo from "./LaborerJobInfo";
import LaborerObjective from "./LaborerObjective";
import LaborerOtherInfo from "./LaborerOtherInfo";
import LaborerSkills from "./LaborerSkills";
const LaborerDetailPage = () => {
    return (
        <div className="m-4">
            <LaborerGeneralInfo />
            <LaborerEducation />
            <LaborerJobInfo />
            <LaborerExperience />
            <LaborerObjective />
            <LaborerSkills />
            <LaborerOtherInfo />
        </div>
    );
};

export default LaborerDetailPage;
