import { Rating } from "@mui/material";
import { JobPositionFeature, JobPositionRequirement } from "../../models/JobPositionModels";
import { Label } from "reactstrap";
import { MJPCommonUtils } from "../../common/CommonUtils";


function renderJobFeature(req: JobPositionFeature){
   var styles = MJPCommonUtils.getCssStyles(req);
   
   return ( <div className="mt-1">
            { /* Use a rating * instead of <li> */ }
                <Rating size="small" readOnly={true} 
                    className="px-2" max={1}
                    value={1} />

                <span className={ "px-2"} style={ styles }> 
                    {  req.description }
                    
                </span>
            </div>
            );
}

function renderRequirement(req: JobPositionRequirement){

    return (<div className="px-2 py-1">
                    <li>
                    {  req.description }
                    { (req.isMandatory) && (<span className="px-1 red"><b>*</b></span>) }
                  
                    </li>
                </div>);
}

/* Render Application features as item */
export const JobPositionFeaturesView = ( props: { 
        features: Array<JobPositionFeature>
}) => {
    return (<>
        { (props.features.length == 0) ?
        <div>No features </div>:
          <>
          { props.features.map((req) => 
                renderJobFeature(req) 
          )}
          </>
        }
    </>);
}



export const JobPositionRequirementsView = ( props: { 
    requirements: Array<JobPositionRequirement>
}) => {
return (<>
    { (props.requirements.length == 0) ?
    <div>No requirements </div>:
      <div>
      { props.requirements.map((req) => 
             renderRequirement(req) 
      )}
      </div>
    }
</>);


}     