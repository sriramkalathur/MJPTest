import React from "react";
import { ApplicationInfo, EditJobPositionInformation, JobApplicationDetails, JobPositionDetails, StatusHistoryItem } from "../../models/JobPositions";
import { CommonUtils, DateField, DialogResult, DropdownList, FieldLabel, ListItem, ProcessingMessage, Status, StatusElement, TextBox } from "common";
import { JobPositionSearchFilter } from "../JobApplication/JobPositionSearchFilter";
import { Button, Badge, ButtonGroup as RSBtnGroup, Card, CardBody, CardGroup, CardLink, CardSubtitle, CardText, CardTitle, Col, Row, CardHeader, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Spinner, Nav, NavItem, NavLink, TabContent, TabPane, ButtonGroup, Input, Label, FormGroup, FormFeedback } from "reactstrap";
import { JobApplicationService } from "../../services/JobApplicationService";

import { Backdrop, Box, Checkbox, Chip, CircularProgress, Divider, LinearProgress, Rating, Skeleton, Step, StepContent, StepLabel, Stepper, Tab, Tabs, Typography } from "@mui/material";
import { PageLoader, PageTitleActionBar } from "../../common/MJPCommon";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { MJPConstants } from "../../MJPConstants";

import { BiEnvelope, BiPhoneCall } from "react-icons/bi";

import { MJPUserRoles, UserContext } from "../../authentication/UserContext";


import { FiCheck, FiLogIn } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { ChoiceList, ChoiceItem } from "../../common/ChoiceList";

import { Formik, FormikProps } from "formik";
import { CompanyDetails, JobApplicationStatus, JobApplicationStatusHistory, JobPositionStatus, PageTitle } from "../MJPComponents";
import { MJPCommonUtils } from "../../common/CommonUtils";
import { MJPRouteUtils } from "../../common/MJPRouteUtils";


import { JobPositionCategory, JobPositionFeature, JobPositionMasters } from "../../models/JobPositionModels";
import { EditJobFeaturePopup } from "./Features/EditJobFeaturePopup";
import { JobFeaturesList } from "./Features/JobFeaturesList";

import { JobPositionService } from "../../services/JobPositionService";
import { JobPositionInformation } from "../../models/JobPositions";
import { JobFeatureService } from "../../services/JobFeatureService";
import { JobRequirementsList } from "./Requirements/JobRequirementsList";
import { JobPositionTagsList } from "./JobPositionTagsList";
import { MasterService } from "../../services/MasterService";
import { DocumentsList } from "../DocumentList";

import { DocumentType } from "../../models/DocumentModel";
import { JobPositionFeaturesView, JobPositionRequirementsView } from "../JobApplication/JobApplicationCommonComponents";
import { AccessDenied } from "../../authentication/AccessDenied";
import { MdAddToHomeScreen } from "react-icons/md";
import { SiThewashingtonpost } from "react-icons/si";

class PropsModel {

  jobPositionId: number;
}

class StateModel {
  status: Status;

  statusMessage: string;

  tabIndex: string;

}


export class EditJobPositionDetails extends React.Component<PropsModel, StateModel> {

  private formState: FormikProps<EditJobPositionInformation>;

  private jobService: JobPositionService;

  private model: EditJobPositionInformation;

  private masters: JobPositionMasters;

  private masterService: MasterService;

  constructor(props: any) {
    super(props);

    var newItem = new JobApplicationDetails();
    newItem.applicationDetails = new ApplicationInfo();

    this.state = {
      status: Status.Loading,
      statusMessage: "Loading",
      tabIndex: "1",
    };

    this.jobService = new JobPositionService();
    this.masterService = new MasterService();
  }


  async componentDidMount() {

    //Load the Position detials..
    await this.loadJobPosition();
  }


  async loadJobPosition() {


    this.setState({ status: Status.Loading, statusMessage: "Loading Job Position.." });

    if (!this.isNewJobPosition()) {
      //Load the job position detials
      this.model = await this.jobService.selectJobPosition(this.props.jobPositionId);
    }
    else {
      //create a new object
      this.model = new EditJobPositionInformation();
      this.model.jobPositionId = 0;
      this.model.statusId = MJPConstants.JOB_STATUS_OPEN;

      if (UserContext.isCompanyUser) {

        //If compnay user, selet the compnay by default
        this.model.companyId = UserContext.loggedInUser.companyId;
      }
    }

    //load the masters
    this.masters = await this.masterService.selectJobPositionMasters();

    this.setState({ status: Status.None });
  }


  renderDepartmentAndRanks() {

    var ranks = (this.masters.ranks.filter((item) => item.departmentId == this.formState.values.departmentId));

    return (<><Row>
      <Col xs="5">
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
          isReadOnly={this.isReadOnly}
          displayMember="displayText" valueMember="itemId" />
      </Col>

      <Col xs="5">
        <DropdownList labelText="Rank" fieldName="rankId" class="col-10"
          onChange={this.formState.handleChange} addDefaultSelect={true}
          errorMessage={this.formState.errors.rankId}
          value={this.formState.values.rankId?.toString()}
          options={ranks}
          isMandatory={true}

          isReadOnly={this.isReadOnly}
          displayMember="rankName" valueMember="rankId" />
      </Col>
    </Row>

    </>);
  }


  renderCategoryAndVesselTypes() {

    return (<><Row>
      <Col xs="5">
        <DropdownList labelText="Category" fieldName="categoryId" class="col-10"
          onChange={this.formState.handleChange}
          addDefaultSelect={true}
          errorMessage={this.formState.errors.categoryId}
          value={this.formState.values.categoryId?.toString()}
          options={this.masters.categories}
          isMandatory={true}
          isReadOnly={this.isReadOnly}
          displayMember="categoryName" valueMember="categoryId" />
      </Col>

      <Col xs="5">
        <DropdownList labelText="VesselType" fieldName="vesselTypeId" class="col-10"
          onChange={this.formState.handleChange} addDefaultSelect={true}
          errorMessage={this.formState.errors.vesselTypeId}
          value={this.formState.values.vesselTypeId?.toString()}
          options={this.masters.vesselTypes}
          isMandatory={true}

          isReadOnly={this.isReadOnly}
          displayMember="displayText" valueMember="itemId" />
      </Col>
    </Row>

    </>);
  }


  renderJobInfo() {


    return (<>
      <Row>
        <Col xs="5">
          <TextBox label="Position Title" fieldName="positionTitle"
            onChange={this.formState.handleChange} class="col-10"
            errorMessage={this.formState.errors.positionTitle}
            isMandatory={true}
            isReadOnly={this.isReadOnly}
            value={this.formState.values.positionTitle} />
        </Col>
        <Col xs="5">
          <TextBox label="Job Summary" fieldName="jdSummary"
            onChange={this.formState.handleChange}
            type="textarea" rows={2} class="col-11"
            errorMessage={this.formState.errors.jdSummary}
            isMandatory={true}
            isReadOnly={this.isReadOnly}
            value={this.formState.values.jdSummary} />
        </Col>
      </Row>

      <Row>
        <Col xs="5">
          <DropdownList labelText="Company" fieldName="companyId"

            onChange={this.formState.handleChange} addDefaultSelect={true}
            errorMessage={this.formState.errors.companyId}
            value={this.formState.values.companyId} class="col-10"
            options={this.masters.companies}
            isMandatory={true}
            isReadOnly={this.isReadOnly || (UserContext.isCompanyUser())}
            displayMember="displayName" valueMember="companyId" />
        </Col>
        <Col xs="5">
          <TextBox label="Company Job Code" fieldName="companyJobCode"
            onChange={this.formState.handleChange}
            class="col-10"
            isMandatory={false}
            isReadOnly={this.isReadOnly}
            errorMessage={this.formState.errors.companyJobCode}
            value={this.formState.values.companyJobCode} />
        </Col>
      </Row>
    </>);
  }




  renderExperience() {
    return (<><Row>

      <Col xs="5">

        <Row>
          <TextBox label="Experience" fieldName="minExperience"
            onChange={this.formState.handleChange} class="col-4"
            type="number" isMandatory={true}
            isReadOnly={this.isReadOnly}
            errorMessage={this.formState.errors.minExperience as string}
            value={this.formState.values.minExperience as any} />
          <span className="px-2 py-4">to</span>

          <TextBox label=" " fieldName="maxExperience"
            isReadOnly={this.isReadOnly}
            onChange={this.formState.handleChange} class="col-4"
            type="number"
            errorMessage={this.formState.errors.maxExperience as string}
            value={this.formState.values.maxExperience as any} />
          <span className="px-2 py-4">yrs</span>
        </Row>
      </Col>

      <Col xs="5">

        <Row>
          <TextBox label="Annual Salary Range" fieldName="salaryRange"
            onChange={this.formState.handleChange}
            errorMessage={this.formState.errors.salaryRange as string}
            isMandatory={false} class="col-6"
            isReadOnly={this.isReadOnly}
            value={this.formState.values.salaryRange as any} />

          <DropdownList labelText="&nbsp;" fieldName="currencyId"
            onChange={this.formState.handleChange} addDefaultSelect={true}
            errorMessage={this.formState.errors.currencyId}
            value={this.formState.values.currencyId}
            options={this.masters.currencies}
            isReadOnly={this.isReadOnly} class="col-4"
            displayMember="displayText" valueMember="itemId" />
        </Row>
      </Col>

    </Row>
      <Row>
        <Col xs="5">
          <TextBox label="Number of Positions" fieldName="numberOfPositions"
            onChange={this.formState.handleChange} type="number"
            errorMessage={this.formState.errors.numberOfPositions}
            isMandatory={true} class="col-4"
            isReadOnly={this.isReadOnly}
            value={this.formState.values.numberOfPositions as any} />

        </Col>

        <Col xs="5">
          <DateField label="Last date of application" fieldName="lastDateOfApplication"
            onChange={this.formState.handleChange} class="col-6"
            isMandatory={false}
            isReadOnly={this.isReadOnly}
            errorMessage={this.formState.errors.lastDateOfApplication as string}
            date={this.formState.values.lastDateOfApplication} />
        </Col>

      </Row></>);

  }


  renderInterviewDetails() {
    return (<><Row>

      <Col xs="5">
        <DateField label="Interview Date" fieldName="interviewDate"
          onChange={this.formState.handleChange} class="col-6"
          isReadOnly={this.isReadOnly}
          errorMessage={this.formState.errors.interviewDate as string}
          date={this.formState.values.interviewDate} />
      </Col>

      <Col xs="5">
        <TextBox label="Interview Address/venue" fieldName="interviewLocation"
          onChange={this.formState.handleChange}
          type="textarea" rows={2} class="col-11"

          isReadOnly={this.isReadOnly}
          errorMessage={this.formState.errors.interviewLocation}
          value={this.formState.values.interviewLocation} />
      </Col>
    </Row>

    </>);
  }

  renderExpiryDate(){
    return ( <Row>
      {(this.formState.values.jobPositionId != 0) &&
        <Col xs="5">

          { /* Render PostedOn only for existing postions */}

          <div className="px-1">
            <FieldLabel label="Posted On">
              {CommonUtils.getDisplayDateTime(this.formState.values.postedOn)}
            </FieldLabel>
          </div>
        </Col>
      }
      <Col xs="5">
        <DateField label="Expiry Date" fieldName="expiryDate"
          onChange={this.formState.handleChange} class="col-6"
          isMandatory={true}

          errorMessage={this.formState.errors.expiryDate as string}
          date={this.formState.values.expiryDate} />
      </Col>
    </Row>);
  }

  get isExpired(): boolean {
    return this.formState.values.statusId == MJPConstants.JOB_STATUS_EXPIRED;
  }

  get isReadOnly(): boolean {
    //If the Jobstatus is expired, then the job position should be read-only
    return this.formState.values.statusId == MJPConstants.JOB_STATUS_EXPIRED;
  }


  yesNoOptions = [
    {
      value: false,
      displayText: "No"
    },
    {
      value: true,
      displayText: "Yes"
    }
  ];

  renderOtherFields() {
    return (<>
      <Row>

        <Col xs="5">

          {
            (this.isExpired) ? (<FieldLabel label="Status">
              <JobPositionStatus statusId={this.formState.values.statusId} />
            </FieldLabel>) :
              (<DropdownList labelText="Status" fieldName="statusId" class="col-6"
                onChange={this.formState.handleChange} addDefaultSelect={true}
                errorMessage={this.formState.errors.statusId}
                value={this.formState.values.statusId}
                isReadOnly={this.formState.values.jobPositionId == 0 || this.isReadOnly}
                options={this.masters.status}
                isMandatory={true}
                displayMember="displayText" valueMember="itemId" />)
          }
        </Col>


        <Col xs="5">
          <DropdownList labelText="Is Recommended" fieldName="isRecommended" class="col-6"
            onChange={this.formState.handleChange} addDefaultSelect={true}
            errorMessage={this.formState.errors.isRecommended}
            value={this.formState.values.isRecommended}
            options={this.yesNoOptions}
            isMandatory={true}
            isReadOnly={this.isReadOnly}
            displayMember="displayText" valueMember="value" />
        </Col>
     </Row>
     </>);
  }


  renderStaffRemarks(){
    return  (<Row>
    <Col xs="5">
      <TextBox label="Staff Remarks" fieldName="staffRemarks"
        onChange={this.formState.handleChange}
        type="textarea" rows={2} class="col-11"
        isMandatory={false}
        isReadOnly={this.isReadOnly}
        errorMessage={this.formState.errors.staffRemarks}
        value={this.formState.values.staffRemarks} />
    </Col>
  </Row>);
  }

  renderDetails() {

    return (
      <>
        {this.renderJobInfo()}
        {this.renderCategoryAndVesselTypes()}
        {this.renderDepartmentAndRanks()}

        {this.renderExperience()}
        {this.renderInterviewDetails()}
       
        {this.renderOtherFields()}
        {this.renderExpiryDate()}
        {this.renderStaffRemarks() }
        {this.renderTags()}
      </>);
  }




  renderRequirements() {

    return (<div>

      <Row className="pd10">
        <Col xs="9">
          <JobRequirementsList jobPositionId={this.props.jobPositionId} />
        </Col>
      </Row>

    </div>
    );
  }


  renderTags() {
    return (<div>

      <JobPositionTagsList tags={this.model.tags}
        errorMessage={this.formState.errors.tags as string} />

    </div>);
  }

  renderFeatures() {

    return (<div>
      <Row className="pd10">
        <Col xs="9">
          <JobFeaturesList jobPositionId={this.props.jobPositionId} />
        </Col>
      </Row>
    </div>);

  }




  renderTitleBar() {

    var title = + (this.isNewJobPosition()) ? "New Job Position" : "Job Position - " + this.model.jobCode;
    return (<PageTitle title={title} actionButtons={this.renderActionButtons()} />);
  }

  TAB_INDEX_DETAILS = "1";

  TAB_INDEX_FEATURES = "2";


  TAB_INDEX_REQUIREMENTS = "3";

  TAB_INDEX_DOCUMENTS = "4";

  isNewJobPosition() {
    return (this.props.jobPositionId == 0);
  }

  renderTabs() {
    return (<div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={(this.state.tabIndex == this.TAB_INDEX_DETAILS) ? "active" : ""}
            onClick={(e) => this.setState({ tabIndex: this.TAB_INDEX_DETAILS })}
          >
            Details
          </NavLink>

        </NavItem>
        { /* For new Job, only detials wll be shown as JobID is not yet created */}
        {(!this.isNewJobPosition()) &&
          <>
            <NavItem>
              <NavLink
                className={(this.state.tabIndex == this.TAB_INDEX_REQUIREMENTS) ? "active" : ""}
                onClick={(e) => this.setState({ tabIndex: this.TAB_INDEX_REQUIREMENTS })}
              >
                Requirements
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={(this.state.tabIndex == this.TAB_INDEX_FEATURES) ? "active" : ""}
                onClick={(e) => this.setState({ tabIndex: this.TAB_INDEX_FEATURES })}
              >
                Features
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={(this.state.tabIndex == this.TAB_INDEX_DOCUMENTS) ? "active" : ""}
                onClick={(e) => this.setState({ tabIndex: this.TAB_INDEX_DOCUMENTS })}
              >
                Documents
              </NavLink>
            </NavItem>
          </>
        }
      </Nav>
      <TabContent activeTab={this.state.tabIndex}>
        <TabPane tabId={this.TAB_INDEX_DETAILS}>
          <div className="py-3">
            {this.renderDetails()}

          </div>
        </TabPane>
        <TabPane tabId={this.TAB_INDEX_REQUIREMENTS}>
          <div> {this.renderRequirements()}

          </div>
        </TabPane>
        <TabPane tabId={this.TAB_INDEX_FEATURES}>
          <div> {this.renderFeatures()}

          </div>
        </TabPane>
        <TabPane tabId={this.TAB_INDEX_DOCUMENTS}>
          <div>
            <DocumentsList
              allowDelete={UserContext.isStaffRole()}
              itemId={this.model.jobPositionId} documentType={DocumentType.JobPosition} />
          </div>
        </TabPane>
      </TabContent></div>);
  }





  renderForm() {
    return (<div className="pd10">
      <Formik
        initialValues={this.model}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(e) => { }}>
        {
          (props) => {
            this.formState = props;
            return this.renderBody();
          }
        }
      </Formik></div>);
  }



  renderProcessingStatus() {

    switch (this.state.status) {
      case Status.Processing: {
        return (<div className="px-1 py-3"><ProcessingMessage statusMessage="Updating Job Application.." /></div>);
      }
      case Status.Failure: {
        return (<div className="px-1 py-2 error"> Save failed. Please fix the errors and try agin </div>);
      }

    }
  }




  private async updateJobPosition(): Promise<void> {
    this.setState({ status: Status.Processing });

    MJPCommonUtils.clearErrors(this.formState);
    this.formState.setErrors([] as any);

    //Update status
    var result = await this.jobService.updateJobPosition(this.formState.values);

    if (!result.success) {

      //set the errors
      MJPCommonUtils.updateErrors(result, this.formState);
      //Set the failure status
      this.setState({ status: Status.Failure });
    }
    else {
      //success.
      //this.state.status = Status.None,
      //refresh application
      MJPRouteUtils.navigateToJobPositions();
    }
  }


  renderActionButtons() {
    return (
      <div>

        <Button outline color="teal" className="ml-2"
          onClick={async (e) => {
            //save the details
            await this.updateJobPosition();
          }}> <FiCheck />&nbsp;Confirm</Button>


        <Button outline color="teal" className="ml-2"
          onClick={(e) => MJPRouteUtils.navigateToJobPositions()} > <AiOutlineClose /> Cancel</Button>
      </div>);
  }

  renderBody() {

    return (<>
      <Row>
        <Col xs="12">
          {this.renderTitleBar()}
        </Col>
      </Row>
      <div>
        {this.renderProcessingStatus()}
      </div>


      <div className="pt-2">
        { /* If it is new job, there is only one tab. So render that directly */}

        {(this.formState.values.jobPositionId == 0) ?
          this.renderDetails() :
          this.renderTabs()}
      </div>
    </>);
  }



  render() {


    return (this.state.status == Status.Loading) ?
      <PageLoader loadingMessage="Loading Job Details.." /> :
      <div>
        { /* If a compnay user is trying to access a job which is not his company, render ACCESS DENIED */}
        {(UserContext.isCompanyUser() && this.model.companyId != UserContext.loggedInUser.companyId) ?
          <AccessDenied /> :

          this.renderForm()}
      </div>

  }
} 