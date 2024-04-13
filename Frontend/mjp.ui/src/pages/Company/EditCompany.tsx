import { DropdownList, ListItem, Status, TextBox } from "common";
import React from "react";
import { JobApplicationDetails } from "../../models/JobPositions";
import { Formik, FormikProps } from "formik";
import { MasterService } from "../../services/MasterService";
import { CompanyService } from "../../services/CompanyService";
import { CompanyEditModel } from "../../models/Company";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { Rating } from "@mui/material";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { MJPRouteUtils } from "../../common/MJPRouteUtils";
import { FiCheck } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { PageProcessingStatus, PageTitle } from "../MJPComponents";
import { PageLoader } from "../../common/MJPCommon";
import { MdFollowTheSigns } from "react-icons/md";
import { ChoiceItem, ChoiceList } from "../../common/ChoiceList";
import { MJPConstants } from "../../MJPConstants";

class PropsModel {
    companyId: number;
}

class StateModel {
    status: Status;

    statusMessage: string;
}

export class EditCompany extends React.Component<PropsModel, StateModel> {

    private formState: FormikProps<CompanyEditModel>;
    
    private masterService: MasterService;

    private companyService: CompanyService;

    private model: CompanyEditModel;

    private states: Array<ListItem>;

    private logoReader: FileReader;

    constructor(props: any){
        super(props);

        this.state = { status: Status.Loading,
           statusMessage: "" 
        };

        this.masterService = new MasterService();
        this.companyService = new CompanyService();

        this.logoReader = new FileReader();
        this.logoReader.onload = () => {
            //When the file is read, just save the image content to CmponyLog field
            this.formState.values.companyLogo = this.logoReader.result as string;
        }
    }

    async componentDidMount() {
        
        this.setState({ status: Status.Loading,
            statusMessage: "Loading Company.."});
        
       
        if(this.props.companyId == 0){
            //New company.. 
            this.model = new CompanyEditModel();
            this.model.isActive = null;
            this.model.isRecommended = null;
        }
        else {
            //Load the details
            this.model = await this.companyService.selectCompany(this.props.companyId);
        }

        this.states = await this.masterService.selectAllStates();

        this.setState({ status: Status.None });
    }


    async validateRPSL(){
        //Find RPSAL
        var rpsl = await this.companyService.selectRPSLDetails(this.formState.values.rpslNumber);
        if(rpsl != null){
            //Populate address values
            this.formState.setFieldError("rpslNumber", null);
            
            this.formState.setFieldValue("companyName", rpsl.companyName);
            this.formState.setFieldValue("displayName", rpsl.companyName);

            this.formState.setFieldValue("address1", rpsl.address1);
            this.formState.setFieldValue("address2", rpsl.address2);
            this.formState.setFieldValue("address3", rpsl.address3);

            this.formState.setFieldValue("city", rpsl.city);
            this.formState.setFieldValue("stateId", rpsl.stateId);
            this.formState.setFieldValue("pincode", rpsl.pincode);
            
        }
        else {
            //Set error
            this.formState.setFieldError("rpslNumber", "Invalid RPSL Number");
        }
    }


    renderRPSL()
    {
        return (<><Row>
            <Col xs="9">
                <TextBox fieldName="rpslNumber" isMandatory={true}
                    label="RPSL Number"
                    onChange={this.formState.handleChange}
                    errorMessage={this.formState.errors.rpslNumber}
                    value={this.formState.values.rpslNumber} />
            </Col>  

            <Col xs="3">
                <div className="py-4">
                <Button  color="teal" outline onClick={ () => this.validateRPSL() }>Validate RPSL</Button>
                </div>
            </Col>
        </Row>
        </>);
    }

    renderAddress(){
        return (<>
           
                    <TextBox fieldName="address1" isMandatory={true}
                        label="Address" type="textarea" rows={4}
                        onChange={this.formState.handleChange} 
                        errorMessage={this.formState.errors.address1}
                        value={this.formState.values.address1} />
             
            <div>
                
            <TextBox fieldName="email"
                    label="Email" isMandatory={true}
                    onChange={this.formState.handleChange}
                    errorMessage={this.formState.errors.email}
                    value={this.formState.values.email} />
              
                <TextBox fieldName="contactNumber"
                    label="Contact Number" isMandatory={true}
                    onChange={this.formState.handleChange} 
                    errorMessage={this.formState.errors.contactNumber}
                    value={this.formState.values.contactNumber} />
            </div>
                {/* <Row>
                <Col xs="5"> 
                    <TextBox fieldName="address2"
                        label="Address Line2" type="textarea" rows={2}
                        onChange={this.formState.handleChange}
                        errorMessage={this.formState.errors.address2}
                        value={this.formState.values.address2} />
                </Col>

            </Row> */}

            <Row className="py-1">
               {/*  
                <Col xs="3">
                    <TextBox fieldName="city"
                        label="City" isMandatory={true}
                        onChange={this.formState.handleChange}
                        errorMessage={this.formState.errors.city}
                        value={this.formState.values.city} />
                </Col>

                <Col xs="3">
                    <DropdownList fieldName="stateId"
                        labelText="State" isMandatory={true}
                        addDefaultSelect={true}
                        onChange={this.formState.handleChange}
                        errorMessage={this.formState.errors.stateId as any}
                        value={this.formState.values.stateId} 
                        options={this.states} displayMember="displayText" valueMember="itemId" />
                </Col> */}
               
                {/* <Col xs="2">
                    <TextBox fieldName="pincode"
                        label="Pincode" isMandatory={true}
                        onChange={this.formState.handleChange}
                        errorMessage={this.formState.errors.pincode}
                        value={this.formState.values.pincode} />
                </Col> */}
            </Row>
        </>);
    }


    async updateCompany() {

        MJPCommonUtils.clearErrors(this.formState);
        this.formState.setErrors([] as any);

        this.setState({
            status: Status.Processing,
            statusMessage: "Updating Company.."
        });

        //Set the token..  
        //AuthUtilities.signInUser(cmsUser);

        //Read the compnay LOGO
        var result = await this.companyService.updateCompany(this.formState.values);
      
      
        if (!result.success) {
            //Invalid.Validation errors
            MJPCommonUtils.updateErrors(result, this.formState);
            //Set the failure status
            this.setState({ status: Status.Failure,
               statusMessage: "Save failed. Please fix the validation errors and try again" });
        }
        else {   
            // User registration success...
            //Navigate to LOGIN..
            MJPRouteUtils.navigateToCompanies();
        }
    }

    renderActionButtons(){
        return (     
            <div>
                  <Button outline  color="teal" className="ml-2"
                      onClick={ async (e)=> {
                        //save the details
                        await this.updateCompany();
                    }}> <FiCheck />&nbsp;Confirm</Button>
             
                    <Button outline color="teal" className="ml-2"
                         onClick={ (e) => MJPRouteUtils.navigateToCompanies() } > 
                    <AiOutlineClose /> Cancel</Button>
            </div>);
    }
    
    allStatus = [
        { "value": false, "displayText": "InActive" },
        { "value": true, "displayText": "Active" }
    ]
  
    recommendedOptions = [
        { "value": false, "displayText": "No" },
        { "value": true, "displayText": "Yes" }
    ]

    renderCredentials(){
        return (<>
            <div className="subtitle py-2">Company User Details</div>
            <div>
                <TextBox fieldName="userName"
                    label="User Name" isMandatory={true}
                    onChange={this.formState.handleChange}
                    errorMessage={this.formState.errors.userName}
                    value={this.formState.values.userName} />
               
                <TextBox fieldName="password" type="password"
                        label="Password" isMandatory={true}
                        onChange={this.formState.handleChange}
                        errorMessage={this.formState.errors.password}
                        value={this.formState.values.password} />
            </div>
        </>);
    }
    
    renderCompanyLogo(){
        return (<>
          
            <div>
                <FormGroup className="px-5">
                <Label className="fieldLabel">Company Logo </Label>
                <Input name="companyLogo" type="file" className="no-border"
                        id="companyLogo" 
                
                onChange={
                    /* When the file content is changed, just set the file to local object */
                    async (e) => { 
                        this.formState.values.companyLogoFile = e.target.files[0];
                        //Just load the Logoreader, It will read and update the companylogo
                        this.logoReader.readAsDataURL(this.model.companyLogoFile);
                    }                 
                } />
                </FormGroup>
            </div>
            <div className="px-5">
               
                { this.model.companyLogo &&
                    <>
                         <div className="py-2">Preview</div>
                        <div className="allBorder">
                        <img width={100} height={100} src={this.model.companyLogo}  />  
                        </div>
                    </>
                    
                }
            </div>
        </>);
    }


    renderFields(){
        return (<>
              <TextBox fieldName="companyName"
                    label="Company Name"  isMandatory={true}
                    onChange={this.formState.handleChange}
                    errorMessage={this.formState.errors.companyName}
                    value={this.formState.values.companyName} />
               
                <TextBox fieldName="displayName"
                    label="Display Name"  isMandatory={true}
                    onChange={this.formState.handleChange}
                    errorMessage={this.formState.errors.displayName}
                    value={this.formState.values.displayName} />
  
                
                { this.renderAddress() }
              
               
               <TextBox fieldName="companyProfile"
                    rows={2} type="textarea"
                    label="Company profile" isMandatory={true}
                    onChange={this.formState.handleChange}
                    errorMessage={this.formState.errors.companyProfile}
                    value={this.formState.values.companyProfile} />

                <div>
                <Label className="fieldLabel">Rating </Label>
                </div>
                <Rating size="small" value={this.formState.values.rating}
                    name="rating" id="rating"
                    onChange={ (e)=> this.formState.handleChange(e)} />
                
        
              
                <Row>
                    <Col xs="8" className="nogutters">
                    <DropdownList fieldName="isActive"
                        labelText="Status"   isMandatory={true}
                        addDefaultSelect={true} class="nogutters col-8" 
                        onChange={this.formState.handleChange}
                        errorMessage={this.formState.errors.isActive as any}
                        value={this.formState.values.isActive} 
                        options={this.allStatus} displayMember="displayText" valueMember="value" />
                    </Col>

                    <Col xs="4">
                    <DropdownList fieldName="isRecommended"
                        labelText="Is Recommended"   isMandatory={true}
                        addDefaultSelect={true}
                        onChange={this.formState.handleChange}
                        errorMessage={this.formState.errors.isRecommended as any}
                        value={this.formState.values.isRecommended} 
                        options={this.recommendedOptions} displayMember="displayText" valueMember="value" />
                      </Col>
                </Row>
              
                
        </>);
    }


 

    renderForm(){
        return (  <Formik
            initialValues={this.model }
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(e) => { }}>
            {
              (props) => { 
                
                this.formState = props;
                return (<>
                    <div>
                      
                        <Row>
                            <Col xs="5">
                            { this.renderRPSL() } 
                            { this.renderFields() }
                           
                            </Col>
                            <Col xs="5">
                            {  this.renderCompanyLogo() }
                            </Col>
                        </Row>
                     
                        <Row className="py-2">

                            <Col xs="3">
                         
                            { this.renderCredentials() }
                            </Col>
                        </Row> 
                     
                     
                    </div>
                </>);
              }
            }
          </Formik>);
    }

    renderBody() {

        var title = (this.props.companyId == 0) ? "New Company":
            "Company - " + this.model.companyCode;

        return (<div>
            <div>
                <PageTitle title={title} actionButtons= { this.renderActionButtons() } />
            </div>
            <PageProcessingStatus status={this.state.status} statusMessage={ this.state.statusMessage} />
            {
               this.renderForm()
            }
        </div>);
    }


    render() {
        return (this.state.status == Status.Loading)? 
            <PageLoader loadingMessage="Loading Company.." />:
            this.renderBody();
    }
}