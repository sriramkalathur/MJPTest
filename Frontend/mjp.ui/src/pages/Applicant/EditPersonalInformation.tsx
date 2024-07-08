import { TabContext, TabPanel, timelineSeparatorClasses } from "@mui/lab";
import { Box, Step, StepButton, StepContent, InputLabel, FormControl, StepLabel, Stepper, Select, Tab, Tabs, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { CommonUtils, DateField, DropdownList, FieldLabel, ListItem, Status, TextBox } from "common";
import React from "react";
import { MdAddToHomeScreen, MdCheckBox } from "react-icons/md";
import { SiTrustedshops } from "react-icons/si";
import { Button, Card, Col, FormGroup, Input, Label, Row } from "reactstrap";

import { UserProfileMasters } from "../../models/UserModels";
import { PageLoader } from "../../common/MJPCommon";
import { Formik, FormikProps } from "formik";
import { PageProcessingStatus, PageTitle } from "../MJPComponents";
import { FiCheck } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { MasterService } from "../../services/MasterService";
import { ApplicantService } from "../../services/ApplicantService";
import { Address, PersonalInformation } from "../../models/ApplicantModels";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { ChoiceItem, ChoiceList } from "../../common/ChoiceList";
import { MJPConstants } from "../../MJPConstants";
import { UserContext } from "../../authentication/UserContext";
import { MJPRouteUtils } from "../../common/MJPRouteUtils";
import { JobPositionMasters } from "../../models/JobPositionModels";

class PropsModel {

    //The model will be pre-populated in main profile info
    applicantId: number;

    masters: UserProfileMasters;
}


class StateModel {

    status: Status;

    statusMessage: string;
}


export class EditPersonalInformation extends React.Component<PropsModel, StateModel> {

    private formState: FormikProps<PersonalInformation>;

    //private masters: UserProfileMasters;

    private model: PersonalInformation;

    private masterService: MasterService;


    private applicantService: ApplicantService;


    private allStatus : ChoiceItem[];

    private allJobStatus : ChoiceItem[];

    //This is used to load category and grades/ranks
    private masters: JobPositionMasters;

    constructor(props: any) {
        super(props);

        this.masterService = new MasterService();
        this.applicantService = new ApplicantService();

        this.state = {
            status: Status.Loading,
            statusMessage: "Loading.."
        };
  
        this.allStatus = [
            new ChoiceItem("New",  MJPConstants.APPLICANT_STATUS_NEW, "teal"),
            new ChoiceItem("Profile Submitted",  MJPConstants.APPLICANT_STATUS_PROFILE_SUBMITTED, "teal"),
            new ChoiceItem("Active",  MJPConstants.APPLICANT_STATUS_ACTIVE1, "teal"),
            new ChoiceItem("InActive",  MJPConstants.APPLICANT_STATUS_INACTIVE, "teal"),
        ];

        this.allJobStatus = [
            new ChoiceItem("Available for Job",  MJPConstants.JOB_AVAILABILTY_STATUS_AVAILABLE, "teal"),
            new ChoiceItem("Not Available",  MJPConstants.JOB_AVAILABILTY_STATUS_NOTAVAILABLE, "teal"),
        ];
    } 


    async loadPersonalDetails() {
        this.model = await this.applicantService.selectPersonalInfo(this.props.applicantId);

         //If Personal info not created, create default values for current & permanbet address
        //Create default values
        if (this.model.permanentAddress == null) {
            this.model.permanentAddress = new Address();
        }
        
        if (this.model.currentAddress == null) {
            this.model.currentAddress = new Address();
            //By default set this flag to true
            this.model.permanentAddressSameAsCurrent = true;
        }
    }

    async componentDidMount() {

        this.setState({ status: Status.Loading });
        //this.masters = await this.masterService.selectUserProfileMasters();

          //load the masters
        this.masters = await this.masterService.selectJobPositionMasters();

        await this.loadPersonalDetails();
        this.setState({ status: Status.None });
    }
  
    renderEmailAndPhone() {
        return (<>
            <div className="subtitle">Contact Details</div>
            <Row className="py-2">

                <Col xs="6">
                    { /* EMail should be updted by user */}
                    <TextBox label="Email" isMandatory={true} fieldName="email"
                        errorMessage={this.formState.errors.email}
                        isReadOnly={true}
                        onChange={this.formState.handleChange}
                        value={this.formState.values.email} />
                </Col>
                <Col xs="6">
                    <TextBox label="Alternate Email" fieldName="alernateEmail"
                        errorMessage={this.formState.errors.alernateEmail}
                        onChange={this.formState.handleChange}
                        value={this.formState.values.alernateEmail} />
                </Col>

            </Row>
            <Row>
                <Col xs="6">
                    <TextBox label="Mobile Number" isMandatory={true} fieldName="mobileNumber"
                        errorMessage={this.formState.errors.mobileNumber}
                        onChange={this.formState.handleChange}
                        value={this.formState.values.mobileNumber} />
                </Col>
                <Col xs="6">
                    <TextBox label="Alternate Mob. Number" fieldName="alternateContactNumber"
                        errorMessage={this.formState.errors.alternateContactNumber}
                        onChange={this.formState.handleChange}
                        value={this.formState.values.alternateContactNumber} />
                </Col>
            </Row>
        </>);
    }


    renderStatus(){
        return (<ChoiceList choices={this.allStatus}
                onChoiceChanged={(itemId) => {
                    this.formState.values.statusId = itemId;
                } }
            selectedChoiceId={this.formState.values.statusId} 
            /* Status should not be edited by applicant */
            label={"Status"} disabled={UserContext.isApplicant()} />);
    }


    renderJobAvailabiltyStatus(){
        
        return (<ChoiceList choices={this.allJobStatus}
                onChoiceChanged={(itemId) => { 
                    this.formState.values.availabilityStatusId = itemId;
                } }
        selectedChoiceId={this.formState.values.availabilityStatusId} 
        label={"Job Availability"} disabled={false} />);
    }

    renderBasicInformation() {

        return (<div>
          
            <div className="float-right"> <small> Last Updated On { CommonUtils.getDisplayDateTime(this.model.lastUpdatedDate) } </small></div>
            <div className="subtitle">Personal Information</div>
      
            <div className="clear">
            <Row className="py-2">

                <Col xs="6">
                    <TextBox label="First Name" isMandatory={true} fieldName="firstName"
                        errorMessage={this.formState.errors.firstName}
                        onChange={this.formState.handleChange}
                        value={this.formState.values.firstName} />
                </Col>
                <Col xs="6">
                    <TextBox label="Last Name" isMandatory={true} fieldName="lastName"
                        errorMessage={this.formState.errors.lastName}
                        onChange={this.formState.handleChange}
                        value={this.formState.values.lastName} />
                </Col>
              </Row>
              <Row>  
                <Col xs="6">
                    <TextBox label="Father's Name" fieldName="fatherName"
                        errorMessage={this.formState.errors.fatherName}
                        onChange={this.formState.handleChange}
                        value={this.formState.values.fatherName} />
                </Col>
          
                <Col xs="6">
                    <DateField fieldName="dateOfBirth" class="col-6"
                        onChange={this.formState.handleChange} isMandatory={true}
                        errorMessage={this.formState.errors.dateOfBirth as string}
                        date={this.formState.values.dateOfBirth} label="Date of Birth" />
                </Col>
            </Row>
            <Row>
                <Col xs="6">
                    <DropdownList labelText="Nationality" fieldName="nationalityId"
                        onChange={this.formState.handleChange} addDefaultSelect={true}
                        errorMessage={this.formState.errors.nationalityId} class="col-10"
                        value={this.formState.values.nationalityId} isMandatory={true}
                        options={this.props.masters.nationality}
                        displayMember="displayText" valueMember="itemId" />
                </Col> 
                <Col xs="6">
                    <DropdownList labelText="Marital Status" fieldName="maritalStatusId"
                        onChange={this.formState.handleChange} addDefaultSelect={true}
                        errorMessage={this.formState.errors.maritalStatusId} class="col-10"
                        value={this.formState.values.maritalStatusId} isMandatory={true}
                        options={this.props.masters.maritalStatus}
                        displayMember="displayText" valueMember="itemId" />

                </Col>
            </Row>

            <Row>
                <Col xs="6">
                { this.renderStatus() }
                </Col>

                <Col xs="6">
                { this.renderJobAvailabiltyStatus() }
                </Col>
            </Row>

            
            <Row>
                <Col xs="8">
                    <TextBox label="Languages known" fieldName="languagesKnown"
                        errorMessage={this.formState.errors.languagesKnown}
                        onChange={this.formState.handleChange}
                        value={this.formState.values.languagesKnown} />
                </Col>
            </Row>


            <Row>
                <Col xs="8">
                    <TextBox label="Educational Qualification" fieldName="educationalQualification"
                        errorMessage={this.formState.errors.educationalQualification}
                        onChange={this.formState.handleChange}
                        value={this.formState.values.educationalQualification} />
                </Col>
            </Row>
            <Row>
                <Col xs="8">
                    <TextBox label="Technical Qualification" fieldName="technicalQualification"
                        errorMessage={this.formState.errors.technicalQualification}
                        onChange={this.formState.handleChange}
                        value={this.formState.values.technicalQualification} />
                </Col>

            </Row>
            </div>
        </div>);
    }


    renderPermanentAddress() {
        return (<>
            <div className="subtitle">Permanent Address</div>
            <div>
                <FormGroup check inline>
                    <Input type="checkbox" checked={this.formState.values.permanentAddressSameAsCurrent} onChange={(e) => {
                        this.formState.setFieldValue("permanentAddressSameAsCurrent", e.target.checked);
                        this.setState({});
                    }} />
                    <Label>
                        Same as current address
                    </Label>
                </FormGroup>
            </div>  

            {!this.formState.values.permanentAddressSameAsCurrent &&
                (<>
                    <Row className="py-2">
                        <Col xs="6">
                            <TextBox label="Address Line1" fieldName="permanentAddress.address1"
                                errorMessage={MJPCommonUtils.getError(this.formState, "permanentAddress.address1")}
                                onChange={this.formState.handleChange} isMandatory={true}
                                value={this.model.permanentAddress.address1} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <TextBox label="Address Line2" fieldName="permanentAddress.address2"
                                errorMessage={MJPCommonUtils.getError(this.formState, "permanentAddress.address2")}
                                onChange={this.formState.handleChange}
                                value={this.model.permanentAddress.address2} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <TextBox label="City" fieldName="permanentAddress.city" isMandatory={true}
                                errorMessage={MJPCommonUtils.getError(this.formState, "permanentAddress.city")}
                                onChange={this.formState.handleChange}
                                value={this.model.permanentAddress.city} />
                        </Col>
                    </Row>
                    <Row>
                        
                        <Col xs="4">
                            <TextBox label="Pincode" fieldName="permanentAddress.pincode" isMandatory={true}
                                errorMessage={MJPCommonUtils.getError(this.formState, "permanentAddress.pincode")}
                                onChange={this.formState.handleChange}
                                value={this.model.permanentAddress.pincode} />
                        </Col>
                    </Row>
                </>)
            }
        </>);
    }


    renderCurrentAddress() {
      
        return (<>
            <div className="subtitle">Current Address</div>
            <Row>
                <Col xs="6">
                    <TextBox label="Address Line" value={this.formState.values.currentAddress.address1}
                        onChange={this.formState.handleChange} isMandatory={true}
                        
                        errorMessage={MJPCommonUtils.getError(this.formState, "currentAddress.address1")}
                        fieldName="currentAddress.address1" />
                </Col>
            </Row>
            <Row>
                <Col xs="6">
                    <TextBox label="Address Line2" value={this.formState.values.currentAddress.address2}
                        onChange={this.formState.handleChange}
                        errorMessage={MJPCommonUtils.getError(this.formState, "currentAddress.address2")}
                        fieldName="currentAddress.address2" />
                </Col>
            </Row>
            <Row>
                <Col xs="6">
                    <TextBox label="City" fieldName="currentAddress.city" isMandatory={true}
                        errorMessage={MJPCommonUtils.getError(this.formState, "currentAddress.city")}
                        onChange={this.formState.handleChange}
                        value={this.model.currentAddress.city} />
                </Col>
            </Row>
            <Row>
              
                <Col xs="4">
                    <TextBox label="Pincode" fieldName="currentAddress.pincode" isMandatory={true}
                        errorMessage={MJPCommonUtils.getError(this.formState, "currentAddress.pincode")}
                        onChange={this.formState.handleChange}
                        value={this.model.currentAddress.pincode} />
                </Col>
            </Row>
        </>);
    }

    renderForm() {
        return (<Formik
            initialValues={this.model}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(e) => { }}>
            {
                (props) => {
                    this.formState = props;
                    return this.renderProfileDetails();
                }
            }
        </Formik>);
    }

    private async updatePersonalInfo(): Promise<void> {
        this.setState({ status: Status.Processing, statusMessage: "Updating Details..." });

        MJPCommonUtils.clearErrors(this.formState);
        this.formState.setErrors([] as any);

        //Update status
        var result = await this.applicantService.updatePersonalInfo(this.formState.values);
        if (!result.success) {

            //set the errors
            MJPCommonUtils.updateErrors(result, this.formState);
            //Set the failure status
            this.setState({
                status: Status.Failure,
                statusMessage: "Update failed. Please fix the errors and try again"
            });
        }
        else {
            //success.
            this.setState({
                status: Status.Success,
                statusMessage: "Personal Information updated successfully"
            });
        }
    }


    renderActionButtons() {
        return (
            <div>
                <Button outline className="ml-2" color="teal"
                    onClick={async (e) => {
                        //save the details
                        await this.updatePersonalInfo();
                    }}> <FiCheck />&nbsp;Confirm</Button>

                <Button outline className="ml-2" color="teal"
                    onClick={async (e) => {
                        //Load the details
                        if(UserContext.isApplicant()){
                            //For applicant, just load the detials
                            this.setState({ status: Status.Loading, statusMessage: "Loading Profile.." });
                            await this.loadPersonalDetails();
                            this.setState({ status: Status.None });
                        }
                        else {
                            //Staff role.Navigate to applciatns
                            MJPRouteUtils.navigateToApplicants();
                        }
                       
                    }}>

                    <AiOutlineClose />Cancel</Button>
            </div>);
    }


    renderContactInformation() {
        return (<>
            {this.renderEmailAndPhone()}
            <hr />

            {this.renderCurrentAddress()}
            <hr />

            {
                this.renderPermanentAddress()
            }

        </>);
    }

    renderBody() {

        var title = "Personal & Professional Details";

        return (<div>
            <div>
                <PageTitle title={title} actionButtons={this.renderActionButtons()} />
            </div>
            <PageProcessingStatus status={this.state.status} statusMessage={this.state.statusMessage} />

            {this.renderForm()}

        </div>);
    }


    renderDepartmentAndRank(){
        
        var ranks = (this.masters.ranks.filter((item) => item.departmentId == this.formState.values.departmentId));
    
        return (<><Row>
            <Col xs="6">
            <DropdownList labelText="Department" fieldName="departmentId" class="col-10"
                onChange={(e) => {
                //Set the GradeId to NULL..
                this.formState.setFieldValue("rankId", null);
                //Handle default..
                this.formState.handleChange(e);
                }} addDefaultSelect={true}
                errorMessage={this.formState.errors.departmentId}
                value={this.formState.values.departmentId?.toString()}
                options={this.masters.departments}
                isMandatory={true}
                displayMember="displayText" valueMember="itemId" />
            </Col>
    
            <Col xs="6">
            <DropdownList labelText="Rank" fieldName="rankId" class="col-10"
                onChange={this.formState.handleChange} addDefaultSelect={true}
                errorMessage={this.formState.errors.rankId}
                value={this.formState.values.rankId?.toString()}
                options={ranks}
                isMandatory={true}
                displayMember="rankName" valueMember="rankId" />
            </Col>
        </Row>
        </>);
    }


    renderCatgoryAndVesselType(){
     
        return (<><Row>
            <Col xs="6">
                <DropdownList labelText="Category" fieldName="categoryId" class="col-10"
                    onChange={ this.formState.handleChange }
                    addDefaultSelect={true}
                    errorMessage={this.formState.errors.categoryId}
                    value={this.formState.values.categoryId?.toString()}
                    options={this.masters.categories}
                    isMandatory={true}
                    displayMember="categoryName" valueMember="categoryId" />
            </Col>
    
            <Col xs="6">
                <DropdownList labelText="Vessel Type" fieldName="vesselTypeId" class="col-10"
                    onChange={this.formState.handleChange} addDefaultSelect={true}
                    errorMessage={this.formState.errors.vesselTypeId}
                    value={this.formState.values.vesselTypeId?.toString()}
                    options={this.masters.vesselTypes}
                    isMandatory={true}
                    displayMember="displayText" valueMember="itemId" />
            </Col>
        </Row>  
        </>);
    }


    private months = [
        new ListItem(0, "0"),
        new ListItem(1, "1"),
        new ListItem(2, "2"),
        new ListItem(3, "3"),
        new ListItem(4, "4"),
        new ListItem(5, "5"),
        new ListItem(6, "6"),
        new ListItem(7, "7"),
        new ListItem(8, "8"),
        new ListItem(9, "9"),
        new ListItem(10, "10"),
        new ListItem(11, "11"),
    ]

    renderWorkInfo() {

        //Experience will be in months. Convert that to Months & days
       
        return (<>
              <div className="subtitle">Professional Details</div>
           
            { this.renderCatgoryAndVesselType() }
            { this.renderDepartmentAndRank() }
            <Row>
              
                <Col xs="6">
                    <Row>
                     <TextBox label="Current Annual Salary" fieldName="annualSalary" type="number"
                        errorMessage={this.formState.errors.annualSalary} class="col-6"
                        onChange={this.formState.handleChange} isMandatory={false}
                        value={this.formState.values.annualSalary && this.formState.values.annualSalary.toString()} />

                    <DropdownList labelText="&nbsp;" fieldName="salaryCurrencyId"
                        onChange={this.formState.handleChange} addDefaultSelect={true}

                        errorMessage={this.formState.errors.salaryCurrencyId}
                        value={this.formState.values.salaryCurrencyId}
                        options={this.props.masters.currencies} class="col-4"
                        displayMember="displayText" valueMember="itemId" />
                    </Row>
                </Col>
             
                <Col xs="6">
                    <Row>
                     <TextBox label="Expected Salary" fieldName="expectedSalary" type="number"
                        errorMessage={this.formState.errors.expectedSalary} class="col-6"
                        onChange={this.formState.handleChange} isMandatory={false}
                        value={this.formState.values.expectedSalary && this.formState.values.expectedSalary.toString()} />

                    <DropdownList labelText="&nbsp;" fieldName="expectedCurrencyId"
                        onChange={this.formState.handleChange} addDefaultSelect={true}

                        errorMessage={this.formState.errors.expectedCurrencyId}
                        value={this.formState.values.expectedCurrencyId}
                        options={this.props.masters.currencies} class="col-4"
                        displayMember="displayText" valueMember="itemId" />
                    </Row>
                </Col>
                {/* <Col xs="2">
                    <DropdownList labelText="Currency" fieldName="salaryCurrencyId"
                        onChange={this.formState.handleChange} addDefaultSelect={true}

                        errorMessage={this.formState.errors.salaryCurrencyId}
                        value={this.formState.values.salaryCurrencyId} isMandatory={true}
                        options={this.props.masters.currencies}
                        displayMember="displayText" valueMember="itemId" />

                </Col> */}
            </Row>
          
                <Col xs="6">
                <Row>
                <TextBox label="Total Experience" fieldName="experienceYrs" type="number"
                        errorMessage={this.formState.errors.experienceYrs} class="col-5"
                        onChange={this.formState.handleChange} isMandatory={true}
                        value={this.formState.values.experienceYrs as any} />
                <span className="px-1 py-4">yrs</span>
                <DropdownList labelText="&nbsp;" fieldName="experienceMonths"
                        onChange={this.formState.handleChange} addDefaultSelect={false}

                        errorMessage={this.formState.errors.experienceMonths}
                        value={this.formState.values.experienceMonths}
                        options={this.months} class="col-4"
                        displayMember="displayText" valueMember="itemId" />
                   
                <span className="px-1 py-4">months</span>
                        </Row> 
                </Col>
          
        </>);
    }


    renderProfileDetails() {
        return (<Card><Row>
            <Col xs="11">
                 {this.renderBasicInformation()}
                 <hr />
                 { this.renderWorkInfo() }
                <hr />
                {this.renderContactInformation()}
            </Col>

          
        </Row></Card>);
    }


    render() {

        return (this.state.status == Status.Loading) ?
            <PageLoader loadingMessage="Loading Profile.." /> :
            this.renderBody();
    }
}