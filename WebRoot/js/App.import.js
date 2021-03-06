/**
 * 系统导入的模块js，主要用于后加载方式，需要使用某些js时，需要在此指定加载哪一些。
 */
Ext.ns("App");
App.importJs = {
    MenuView: [
        __ctxPath + '/js/system/MenuView.js',
        __ctxPath + '/js/system/MenuForm.js',
        __ctxPath + '/js/system/MenuFunctionForm.js',
        __ctxPath + '/js/system/MenuUrlForm.js',
        __ctxPath + '/js/system/IconSelector.js'
    ],
    AppRoleView: [
        __ctxPath + '/js/system/AppRoleView.js',
        __ctxPath + '/ext3/ux/CheckTreePanel.js',
        __ctxPath + '/js/system/RoleGrantRightView.js',
        __ctxPath + '/js/system/AppRoleForm.js'],
    PersonalDocumentView: [
        __ctxPath + '/js/document/PersonalDocumentView.js',
        __ctxPath + '/js/document/DocumentView.js',
        __ctxPath + '/js/document/DocumentForm.js',
        __ctxPath + '/js/document/DocumentSharedForm.js',
        __ctxPath + '/js/document/DocFolderForm.js',
        __ctxPath + '/js/selector/RoleSelector.js'
    ],
    DocumentSharedView: [
        __ctxPath + '/js/document/DocumentSharedView.js',
        __ctxPath + '/js/document/DocumentSharedDetail.js'],
    DocFolderSharedView: [
        __ctxPath + '/js/document/FindPublicDocumentView.js',
        __ctxPath + '/js/document/DocFolderView.js',
        __ctxPath + '/js/document/DocFolderForm.js',
        __ctxPath + '/js/document/DocFolderSharedView.js',
        __ctxPath + '/js/document/DocFolderSharedForm.js',
        __ctxPath + '/js/document/DocPrivilegeForm.js',
        __ctxPath + '/js/document/DocPrivilegeView.js',
        __ctxPath + '/ext3/ux/CheckColumn.js'],
    FindPublicDocumentView: [
        __ctxPath + '/js/document/FindPublicDocumentView.js',
        __ctxPath + '/js/document/PublicDocumentView.js',
        __ctxPath + '/js/document/PublicDocumentDetail.js',
        __ctxPath + '/js/document/NewPublicDocumentForm.js',
        __ctxPath + '/js/document/DocFolderSelector.js'],
    NewPublicDocumentForm: [
        __ctxPath + '/js/document/NewPublicDocumentForm.js',
        __ctxPath + '/js/document/DocFolderSelector.js'],
    DocFolderMoveForm: [
        __ctxPath + '/js/document/DocFolderMoveForm.js',
        __ctxPath + '/js/document/PersonalDocFolderSelector.js'],
    NoticeView: [
        __ctxPath + '/js/info/NoticeView.js',
        __ctxPath + '/js/info/NoticeForm.js',
        __ctxPath + '/js/selector/SectionSelector.js'],
    ReportTemplateView: [
        __ctxPath + '/js/system/ReportTemplateView.js',
        __ctxPath + '/js/system/ReportTemplateForm.js',
        __ctxPath + '/js/system/ReportParamForm.js',
        __ctxPath + '/js/system/ReportParamView.js',
        __ctxPath + '/js/system/ReportTemplatePreview.js',
        __ctxPath + '/ext3/ux/ext-basex.js'
    ],
    MessageView: [
        __ctxPath + '/js/info/MessageView.js',
        __ctxPath + '/js/info/MessageForm.js',
        __ctxPath + '/js/info/MessageWin.js'],
    MessageManageView: [
        __ctxPath + '/js/info/MessageManageView.js',
        __ctxPath + '/js/info/MessageForm.js'
    ],
    PhoneBookView: [
        __ctxPath + '/js/communicate/PhoneBookView.js',
        __ctxPath + '/js/communicate/PhoneGroupForm.js',
        __ctxPath + '/js/communicate/PhoneBookForm.js'],
    AppUserView: [
        __ctxPath + '/js/system/AppUserView.js',
        __ctxPath + '/ext3/ux/ItemSelector.js',
        __ctxPath + '/ext3/ux/MultiSelect.js',
        __ctxPath + '/js/system/DynamicPwdForm.js',
        __ctxPath + '/js/system/ResetPasswordForm.js',
        __ctxPath + '/js/system/setPasswordForm.js'],
    ProfileForm: [
        __ctxPath + '/js/system/ProfileForm.js',
        __ctxPath + '/js/system/ResetPasswordForm.js'],
    NewsView: [
        __ctxPath + '/js/info/NewsView.js',
        __ctxPath + '/js/info/NewsForm.js',
        __ctxPath + '/js/selector/SectionSelector.js'],
    CompanyView: [
        __ctxPath + '/js/system/CompanyView.js'],
    FileAttachView: [
        __ctxPath + '/js/system/FileAttachView.js',
        __ctxPath + '/js/system/FileAttachDetail.js'],
    DiaryView: [
        __ctxPath + '/js/system/DiaryView.js',
        __ctxPath + '/js/system/DiaryForm.js'],
    MySubUserDiaryView: [
        __ctxPath + '/js/system/MySubUserDiaryView.js',
        __ctxPath + '/js/system/DiaryDetail.js'],
    PersonalMailBoxView: [
        __ctxPath + '/ext3/ux/RowExpander.js',
        __ctxPath + '/js/communicate/PersonalMailBoxView.js',
        __ctxPath + '/js/communicate/MailView.js',
        __ctxPath + '/js/communicate/MailForm.js',
        __ctxPath + '/js/communicate/MailFolderForm.js'
    ],
    MailForm: [
        __ctxPath + '/js/communicate/MailForm.js'],
    PersonalPhoneBookView: [
        __ctxPath + '/js/communicate/PersonalPhoneBookView.js',
        __ctxPath + '/js/communicate/PhoneBookView.js',
        __ctxPath + '/js/communicate/PhoneGroupForm.js',
        __ctxPath + '/js/communicate/PhoneBookForm.js'],
    SharedPhoneBookView: [
        __ctxPath + '/js/communicate/SharedPhoneBookView.js',
        __ctxPath + '/js/communicate/SharedPhoneBookWin.js'],
    FlowManagerView: [
        __ctxPath + '/js/flow/ProTypeForm.js',
        __ctxPath + '/js/selector/GlobalTypeSelector.js',
        __ctxPath + '/js/system/GlobalTypeForm.js',
        __ctxPath + '/js/flow/ProDefRightsForm.js',
        __ctxPath + '/js/flow/ProDefinitionForm.js',
        __ctxPath + '/js/flow/ProDefinitionView.js',
        __ctxPath + '/js/flow/FlowManagerView.js',
        __ctxPath + '/js/flow/ProDefinitionDetail.js',
        __ctxPath + '/js/flow/ProDefinitionSetting.js',
        __ctxPath + '/js/flow/MyTaskView.js',
        __ctxPath + '/js/flow/ProcessNextForm.js',
        __ctxPath + '/js/flow/FormDesignWindow.js',
        __ctxPath + '/js/flow/FormEditorWindow.js',
        __ctxPath + '/js/flowDesign/FlowDesignerWindow.js',
        __ctxPath + '/js/selector/FormDefSelector.js',
        __ctxPath + '/js/flow/FormDefForm.js',
        __ctxPath + '/js/flow/FormDefDetailForm.js',
        __ctxPath + '/js/selector/JobSelector.js',
        __ctxPath + '/js/flow/FieldRightsForm.js',
        __ctxPath + '/js/flow/TaskSignForm.js',
        __ctxPath + '/js/selector/RoleSelector.js',
        __ctxPath + '/js/selector/RelativeJobSelector.js',
        __ctxPath + '/js/selector/UserDialog.js',
        __ctxPath + '/js/selector/RoleDialog.js',
        __ctxPath + '/js/selector/PositionDialog.js',
        __ctxPath + '/js/selector/ReJobDialog.js',
        __ctxPath + '/js/selector/DepSelector.js'
    ],
    TaskManager: [
        __ctxPath + '/js/flow/TaskDueDateWindow.js',
        __ctxPath + '/js/flow/TaskHandlerWindow.js',
        __ctxPath + '/js/flow/TaskManager.js',
        __ctxPath + '/js/flow/ProcessNextForm.js',
        __ctxPath + '/js/flow/PathChangeWindow.js'
    ],
    NewProcess: [
        __ctxPath + '/js/flow/NewProcess.js',
        __ctxPath + '/js/flow/ProDefinitionDetail.js',
        __ctxPath + '/js/flow/ProDefinitionView.js'
        //__ctxPath+'/js/flow/ProcessRunStart.js'
    ],
    ProcessRunView: [
        __ctxPath + '/js/flow/ProcessRunView.js',
        __ctxPath + '/js/flow/ProcessRunDetail.js'
        //__ctxPath+'/js/flow/ProcessRunStart.js'
    ],
    ProcessHistoryView: [
        __ctxPath + '/js/flow/ProcessHistoryView.js',
        __ctxPath + '/js/flow/ProcessRunDetail.js'
    ],
    MyTaskView: [
        __ctxPath + '/js/flow/MyTaskView.js',
        __ctxPath + '/js/flow/ChangeTaskView.js',
        __ctxPath + '/js/flow/ProcessNextForm.js'
    ],

    ProcessRunFinishView: [
        __ctxPath + '/js/flow/ProcessRunFinishView.js',
        __ctxPath + '/js/flow/ProcessRunDetail.js'
    ],

    BookManageView: [
        __ctxPath + '/js/admin/BookManageView.js',
        __ctxPath + '/js/admin/BookView.js',
        __ctxPath + '/js/admin/BookForm.js',
        __ctxPath + '/js/admin/BookTypeForm.js',
        __ctxPath + '/js/admin/BookBorrowForm.js',
        __ctxPath + '/js/admin/BookAmountForm.js',
        __ctxPath + '/js/selector/BookSelector.js'
    ],
    BookTypeView: [
        __ctxPath + '/js/admin/BookTypeView.js',
        __ctxPath + '/js/admin/BookTypeForm.js'],
    BookBorrowView: [
        __ctxPath + '/js/admin/BookBorrowView.js',
        __ctxPath + '/js/admin/BookBorrowForm.js',
        __ctxPath + '/js/admin/BookReturnForm.js',
        __ctxPath + '/js/selector/BookSelector.js'
    ],
    BookReturnView: [
        __ctxPath + '/js/admin/BookReturnView.js',
        __ctxPath + '/js/admin/BookReturnForm.js',
        __ctxPath + '/js/selector/BookSelector.js'
    ],
    OfficeGoodsManageView: [
        __ctxPath + '/js/admin/OfficeGoodsManageView.js',
        __ctxPath + '/js/admin/OfficeGoodsTypeForm.js',
        __ctxPath + '/js/admin/OfficeGoodsView.js',
        __ctxPath + '/js/admin/OfficeGoodsForm.js'
    ],
    InStockView: [
        __ctxPath + '/js/admin/InStockView.js',
        __ctxPath + '/js/admin/InStockForm.js',
        __ctxPath + '/js/selector/GoodsSelector.js'
    ],
    GoodsApplyView: [
        __ctxPath + '/js/admin/GoodsApplyView.js',
        __ctxPath + '/js/admin/GoodsApplyForm.js',
        __ctxPath + '/js/admin/GoodsCheckForm.js',
        __ctxPath + '/js/selector/GoodsSelector.js'
    ],
    CarView: [
        __ctxPath + '/js/admin/CarView.js',
        __ctxPath + '/js/admin/CarForm.js'
    ],
    CartRepairView: [
        __ctxPath + '/js/admin/CartRepairView.js',
        __ctxPath + '/js/admin/CartRepairForm.js',
        __ctxPath + '/js/selector/CarSelector.js'
    ],
    CarApplyView: [
        __ctxPath + '/js/admin/CarApplyView.js',
        __ctxPath + '/js/admin/CarApplyForm.js',
        __ctxPath + '/js/admin/CarCheckForm.js',
        __ctxPath + '/js/selector/CarSelector.js'
    ],
    AppointmentView: [
        __ctxPath + '/js/task/AppointmentView.js',
        __ctxPath + '/js/task/AppointmentForm.js'
    ],
    CalendarPlanView: [
        __ctxPath + '/js/task/CalendarPlanView.js',
        __ctxPath + '/js/task/CalendarPlanForm.js',
        __ctxPath + '/js/task/CalendarPlanFinishForm.js'
    ],
    MyPlanTaskView: [
        __ctxPath + '/js/task/CalendarPlanView.js',
        __ctxPath + '/js/task/CalendarPlanForm.js',
        __ctxPath + '/js/task/CalendarPlanFinishForm.js',
        __ctxPath + '/ext3/ux/caltask/e2cs_zh_CN.js',
        __ctxPath + '/ext3/ux/caltask/calendar.gzjs',
        __ctxPath + '/ext3/ux/caltask/scheduler.gzjs',
        __ctxPath + '/ext3/ux/caltask/monthview.gzjs',
        __ctxPath + '/ext3/ux/caltask/weekview.gzjs',
        __ctxPath + '/ext3/ux/caltask/dayview.gzjs',
        __ctxPath + '/ext3/ux/caltask/task.gzjs',
        __ctxPath + '/js/task/MyPlanTaskView.gzjs',
        __ctxPath + '/js/task/CalendarPlanDetailView.js'
    ],
    PlanTypeView: [
        __ctxPath + '/js/task/PlanTypeView.js',
        __ctxPath + '/js/task/PlanTypeForm.js'
    ],
    WorkPlanView: [
        __ctxPath + '/js/task/WorkPlanView.js',
        __ctxPath + '/js/task/NewWorkPlanForm.js',
        __ctxPath + '/ext3/ux/Ext.ux.IconCombob.js'

    ],
    PersonalWorkPlanView: [
        __ctxPath + '/js/task/PersonalWorkPlanView.js',
        __ctxPath + '/js/task/PersonalWorkPlanForm.js',
        __ctxPath + '/js/task/WorkPlanDetail.js',
        __ctxPath + '/js/task/PersonalPlanTypeForm.js',
        __ctxPath + '/ext3/ux/Ext.ux.IconCombob.js'
    ],
    NewWorkPlanForm: [
        __ctxPath + '/js/task/NewWorkPlanForm.js',
        __ctxPath + '/ext3/ux/Ext.ux.IconCombob.js'
    ],
    DepWorkPlanView: [
        __ctxPath + '/js/task/DepWorkPlanView.js',
        __ctxPath + '/js/selector/GlobalTypeSelector.js',
        __ctxPath + '/js/task/DepWorkPlanForm.js',
        __ctxPath + '/js/task/WorkPlanDetail.js',
        __ctxPath + '/ext3/ux/Ext.ux.IconCombob.js'
    ],
    CustomerView: [
        __ctxPath + '/js/customer/CustomerView.js',
        __ctxPath + '/js/customer/CustomerForm.js',
        __ctxPath + '/js/customer/CusLinkmanForm.js',
        __ctxPath + '/js/customer/SendMailForm.js',
        __ctxPath + '/js/selector/CustomerSelector.js'
    ],
    CusLinkmanView: [
        __ctxPath + '/js/customer/CusLinkmanView.js',
        __ctxPath + '/js/customer/CusLinkmanForm.js',
        __ctxPath + '/js/selector/CustomerSelector.js'
    ],
    FixedAssetsManageView: [
        __ctxPath + '/js/admin/FixedAssetsManageView.js',
        __ctxPath + '/js/admin/FixedAssetsView.js',
        __ctxPath + '/js/admin/FixedAssetsForm.js',
        __ctxPath + '/js/admin/AssetsTypeForm.js',
        __ctxPath + '/js/admin/DepreWin.js',
        __ctxPath + '/js/admin/WorkGrossWin.js'
    ],
    DepreTypeView: [
        __ctxPath + '/js/admin/DepreTypeForm.js',
        __ctxPath + '/js/admin/DepreTypeView.js'
    ],
    DepreRecordView: [
        __ctxPath + '/js/admin/DepreRecordForm.js',
        __ctxPath + '/js/admin/DepreRecordView.js'
    ],
    CusConnectionView: [
        __ctxPath + '/js/customer/CusConnectionView.js',
        __ctxPath + '/js/customer/CusConnectionForm.js',
        __ctxPath + '/js/selector/CustomerSelector.js'
    ],
    ProjectView: [
        __ctxPath + '/js/customer/ProjectView.js',
        __ctxPath + '/js/customer/ProjectForm.js',
        __ctxPath + '/js/customer/ContractForm.js',
        __ctxPath + '/js/customer/ContractConfigView.js',
        __ctxPath + '/ext3/ux/RowEditor.js',
        __ctxPath + '/js/selector/CustomerSelector.js',
        __ctxPath + '/js/selector/ProjectSelector.js'
    ],
    ContractView: [
        __ctxPath + '/js/customer/ContractView.js',
        __ctxPath + '/js/customer/ContractForm.js',
        __ctxPath + '/js/customer/ContractConfigView.js',
        __ctxPath + '/ext3/ux/RowEditor.js',
        __ctxPath + '/js/selector/ProjectSelector.js'
    ],
    ProductView: [
        __ctxPath + '/js/customer/ProductView.js',
        __ctxPath + '/js/customer/ProductForm.js',
        __ctxPath + '/js/selector/ProviderSelector.js'
    ],
    ProviderView: [
        __ctxPath + '/js/customer/ProviderView.js',
        __ctxPath + '/js/customer/ProviderForm.js',
        __ctxPath + '/js/customer/SendMailForm.js'
    ],
    //-------------personal moduels------------------------
    HolidayRecordView: [
        __ctxPath + '/js/personal/HolidayRecordView.js',
        __ctxPath + '/js/personal/HolidayRecordForm.js'
    ],
    DutySectionView: [
        __ctxPath + '/js/personal/DutySectionView.js',
        __ctxPath + '/js/personal/DutySectionForm.js'
    ],
    DutySystemView: [
        __ctxPath + '/js/personal/DutySystemView.js',
        __ctxPath + '/js/personal/DutySystemForm.js',
        __ctxPath + '/js/selector/DutySectionSelector.js'
    ],
    SignInOffView: [
        __ctxPath + '/js/personal/SignInOffView.js'
    ],
    DutyRegisterPersonView: [
        __ctxPath + '/js/personal/DutyRegisterPersonView.js'
    ],
    DutyRegisterView: [
        __ctxPath + '/js/personal/DutyRegisterView.js',
        __ctxPath + '/js/personal/DutyRegisterForm.js'
    ],
    ErrandsRegisterView: [
        __ctxPath + '/js/personal/ErrandsRegisterView.js',
        __ctxPath + '/js/personal/ErrandsRegisterDetail.js',
        __ctxPath + '/js/personal/ErrandsRegisterForm.js',
        __ctxPath + '/js/flow/ProcessNextForm.js'
    ],
    ErrandsRegisterOutView: [
        __ctxPath + '/js/personal/ErrandsRegisterOutView.js',
        __ctxPath + '/js/personal/ErrandsRegisterOutForm.js'
    ],
    SysConfigView: [
        __ctxPath + '/js/system/SysConfigView.js',
        __ctxPath + '/js/communicate/SmsMobileForm.js'
    ],
    //-------------personal moduels------------------------
    //-------------Home Message Detail moduels-------------
    NoticeDetail: [
        __ctxPath + '/js/info/NoticeDetail.js'
    ],
    NewsDetail: [
        __ctxPath + '/js/info/NewsDetail.js'
    ],
    PublicDocumentDetail: [
        __ctxPath + '/js/document/PublicDocumentDetail.js'
    ],
    MailDetail: [
        __ctxPath + '/js/communicate/MailDetail.js',
        __ctxPath + '/js/communicate/MailForm.js'
    ],
    CalendarPlanDetail: [
        __ctxPath + '/js/task/CalendarPlanDetail.js'
    ],
    AppointmentDetail: [
        __ctxPath + '/js/task/AppointmentDetail.js'
    ],
    //-------------Home Message Detail moduels-------------
    //-------------Search moduels--------------------------
    SearchNews: [
        __ctxPath + '/js/search/SearchNews.js',
        __ctxPath + '/js/info/NewsDetail.js'
    ],
    SearchMail: [
        __ctxPath + '/ext3/ux/RowExpander.js',
        __ctxPath + '/js/search/SearchMail.js',
        __ctxPath + '/js/communicate/MailView.js',
        __ctxPath + '/js/communicate/MailForm.js'
    ],
    SearchNotice: [
        __ctxPath + '/js/search/SearchNotice.js'
    ],
    SearchDocument: [
        __ctxPath + '/js/search/SearchDocument.js',
        __ctxPath + '/js/document/PublicDocumentDetail.js'
    ],
    HireIssueView: [
        __ctxPath + '/js/hrm/HireIssueView.js',
        __ctxPath + '/js/hrm/HireIssueForm.js',
        __ctxPath + '/js/hrm/HireIssueCheckWin.js'
    ],
    ResumeView: [
        __ctxPath + '/js/hrm/ResumeView.js',
        __ctxPath + '/js/hrm/ResumeForm.js'
    ],
    //-------------Search moduels--------------------------
    NewsCommentView: [
        __ctxPath + '/js/info/NewsCommentView.js',
        __ctxPath + '/ext3/ux/RowExpander.js'
    ],
    DictionaryView: [
        __ctxPath + '/js/system/DictionaryView.js',
        __ctxPath + '/js/system/DictionaryForm.js'
    ],
    SalaryItemView: [
        __ctxPath + '/js/hrm/SalaryItemForm.js',
        __ctxPath + '/js/hrm/SalaryItemView.js'
    ],
    StandSalaryForm: [
        __ctxPath + '/js/hrm/StandSalaryForm.js',
        __ctxPath + '/js/hrm/StandSalaryItemView.js',
        __ctxPath + '/js/selector/SalaryItemSelector.js'
    ],
    StandSalaryView: [
        __ctxPath + '/js/hrm/StandSalaryView.js',
        __ctxPath + '/js/hrm/StandSalaryForm.js',
        __ctxPath + '/js/hrm/StandSalaryItemView.js',
        __ctxPath + '/js/hrm/CheckStandSalaryForm.js',
        __ctxPath + '/js/hrm/CheckStandSalaryItemView.js',
        __ctxPath + '/js/selector/SalaryItemSelector.js'
    ],
    JobChangeForm: [
        __ctxPath + '/js/hrm/JobChangeForm.js',
        __ctxPath + '/js/selector/EmpProfileSelector.js',
        __ctxPath + '/js/selector/PositionDialog.js'
    ],
    JobChangeView: [
        __ctxPath + '/js/hrm/JobChangeView.js',
        __ctxPath + '/js/hrm/JobChangeForm.js',
        __ctxPath + '/js/selector/EmpProfileSelector.js',
        __ctxPath + '/js/hrm/CheckJobChangeWin.js',
        __ctxPath + '/js/selector/PositionDialog.js'
    ],
    EmpProfileForm: [
        __ctxPath + '/js/hrm/EmpProfileForm.js',
        __ctxPath + '/js/selector/PositionDialog.js'
    ],
    EmpProfileView: [
        __ctxPath + '/js/hrm/EmpProfileView.js',
        __ctxPath + '/js/hrm/EmpProfileForm.js',
        __ctxPath + '/js/hrm/CheckEmpProfileForm.js',
        __ctxPath + '/js/hrm/RecoveryProfileWin.js'
    ],
    SalaryPayoffForm: [
        __ctxPath + '/js/hrm/SalaryPayoffForm.js',
        __ctxPath + '/js/selector/EmpProfileSelector.js'
    ],
    SalaryPayoffView: [
        __ctxPath + '/js/hrm/SalaryPayoffForm.js',
        __ctxPath + '/js/selector/EmpProfileSelector.js',
        __ctxPath + '/js/hrm/CheckSalaryPayoffForm.js',
        __ctxPath + '/js/hrm/SalaryPayoffView.js'
    ],
    PersonalSalaryView: [
        __ctxPath + '/ext3/ux/RowExpander.js',
        __ctxPath + '/js/personal/PersonalSalaryView.js'
    ],
    SystemLogView: [
        __ctxPath + '/js/system/SystemLogView.js'
    ],
    MyProcessRunView: [
        __ctxPath + '/js/flow/MyProcessRunView.js',
        __ctxPath + '/js/flow/ProcessRunDetail.js'
    ],
    MyRunningTaskView: [__ctxPath + '/js/flow/MyRunningTaskView.js',
        __ctxPath + '/js/flow/ProcessRunDetail.js'],
    PersonalTipsView: [
        __ctxPath + '/js/info/PersonalTipsView.js'
    ],

    OutMailUserSetingForm: [
        __ctxPath + '/js/communicate/OutMailUserSetingForm.js'
    ],
    OutMailBoxView: [
        __ctxPath + '/ext3/ux/RowExpander.js',
        __ctxPath + '/js/communicate/OutMailBoxView.js',
        __ctxPath + '/js/communicate/OutMailView.js',
        __ctxPath + '/js/communicate/OutMailForm.js',
        __ctxPath + '/js/communicate/OutMailFolderForm.js',
        __ctxPath + '/js/selector/EMailSelector.js'
    ],
    OutMailForm: [
        __ctxPath + '/js/communicate/OutMailForm.js',
        __ctxPath + '/js/selector/EMailSelector.js'
    ],
    SmsMobileView: [
        __ctxPath + '/js/communicate/SmsMobileView.js',
        __ctxPath + '/js/communicate/SmsMobileForm.js'
    ],
    GlobalTypeManager: [
        __ctxPath + '/js/system/GlobalTypeManager.js',
        __ctxPath + '/js/system/GlobalTypeForm.js',
        __ctxPath + '/js/system/TypeKeyForm.js'
    ],
    PrivateDocumentView: [
        __ctxPath + '/js/document/PrivateDocumentView.js',
        __ctxPath + '/js/document/DocumentForm.js',
        __ctxPath + '/js/document/DocFolderForm.js',
        __ctxPath + '/js/document/DocumentSharedForm.js',
        __ctxPath + '/js/document/FileDetailShowWin.js',
        __ctxPath + '/js/selector/RoleSelector.js'
    ],
    KnowledgeManageView: [
        __ctxPath + '/js/document/KnowledgeManageView.js',
        __ctxPath + '/js/document/KnowledgeRightsForm.js',
        __ctxPath + '/js/document/KnowledgeForm.js',
        __ctxPath + '/js/document/DocFolderForm.js',
        __ctxPath + '/js/document/DocFolderSelector.js',
        __ctxPath + '/js/document/FileDetailShowWin.js',
        __ctxPath + '/js/document/DocumentDetailWin.js',
        __ctxPath + '/js/document/KnowledgePrivilegeWin.js',
        __ctxPath + '/js/document/DocFolderSharedForm.js',
        __ctxPath + '/ext3/ux/CheckColumn.js',
        __ctxPath + '/js/selector/RoleSelector.js'
    ],
    SuggestBoxView: [
        __ctxPath + '/js/info/SuggestBoxView.js',
        __ctxPath + '/js/info/SuggestBoxForm.js',
        __ctxPath + '/js/info/SuggestBoxReplyForm.js',
        __ctxPath + '/js/info/SuggestBoxDisplay.js'
    ],
    GoodsCheckView: [
        __ctxPath + '/js/admin/GoodsCheckView.js',
        __ctxPath + '/js/admin/GoodsCheckForm.js'
    ],
    CarCheckView: [
        __ctxPath + '/js/admin/CarCheckView.js',
        __ctxPath + '/js/admin/CarCheckForm.js'
    ],
    PublicPhoneBookView: [
        __ctxPath + '/js/communicate/PublicPhoneBookView.js',
        __ctxPath + '/js/communicate/PublicPhoneGroupForm.js',
        __ctxPath + '/js/communicate/PhoneBookForm.js'
    ],
    RegulationView: [
        __ctxPath + '/js/admin/RegulationForm.js',
        __ctxPath + '/js/admin/RegulationView.js',
        __ctxPath + '/js/admin/RegulationScanWin.js',
        __ctxPath + '/js/selector/GlobalTypeSelector.js'
    ],
    RegulationScanView: [
        __ctxPath + '/js/admin/RegulationScanView.js',
        __ctxPath + '/js/admin/RegulationScanWin.js'
    ],
    LeaveManageView: [
        __ctxPath + '/js/personal/LeaveManageView.js',
        __ctxPath + '/js/personal/LeaveManageWin.js'
    ],
    OnlineDocumentManageView: [
        __ctxPath + '/js/document/OnlineDocumentManageView.js',
        __ctxPath + '/js/document/OnlineDocumentForm.js',
        __ctxPath + '/js/core/ntkoffice/NtkOfficePanel.js',
        __ctxPath + '/js/selector/SealSelector.js',
        __ctxPath + '/js/selector/PaintTemplateSelector.js',
        __ctxPath + '/js/document/DocFolderForm.js',
        __ctxPath + '/ext3/ux/CheckColumn.js',
        __ctxPath + '/js/document/DocFolderSharedForm.js',
        __ctxPath + '/js/document/DocFolderSelector.js',
        __ctxPath + '/js/document/FileDetailShowWin.js',
        __ctxPath + '/js/document/KnowledgePrivilegeWin.js',
        __ctxPath + '/js/document/OnlineDocumentDetail.js',
        __ctxPath + '/js/selector/RoleSelector.js'
    ],
    PaintTemplateView: [
        __ctxPath + '/js/document/PaintTemplateView.js',
        __ctxPath + '/js/document/PaintTemplateForm.js',
        __ctxPath + '/js/core/ntkoffice/NtkOfficePanel.js',
        __ctxPath + '/js/document/DocumentTemplateForm.js',
        __ctxPath + '/js/selector/SealSelector.js',
        __ctxPath + '/js/selector/PaintTemplateSelector.js'
    ],
    SealView: [
        __ctxPath + '/js/document/SealView.js',
        __ctxPath + '/js/document/SealForm.js',
        __ctxPath + '/js/core/ntkosign/NtkoSignPanel.js',
        __ctxPath + '/js/document/MakeSealForm.js',
        __ctxPath + '/js/document/SealShowPanel.js'
    ],
    SectionList: [
        __ctxPath + '/js/info/SectionList.js',
        __ctxPath + '/js/info/SectionForm.js',
        __ctxPath + '/js/selector/SectionSelector.js'
    ],
    SectionView: [
        __ctxPath + '/ext3/ux/Portal.js',
        __ctxPath + '/ext3/ux/PortalColumn.js',
        __ctxPath + '/ext3/ux/Portlet.js',
        __ctxPath + '/js/info/SectionView.js',
        __ctxPath + '/js/info/SectionForm.js',
        __ctxPath + '/js/selector/SectionSelector.js'

    ],
    FormDefView: [
        __ctxPath + '/js/flow/FormDefView.js',
        __ctxPath + '/js/flow/FormDefForm.js',
        __ctxPath + '/js/fckdesign/Fckdesigner.js',
        __ctxPath + '/js/fckdesign/FormDesignPanelForm.js',
        __ctxPath + '/js/flow/FormDefDetailWin.js'
    ],
    FlowFormProsView: [
        __ctxPath + '/js/flow/FlowFormProsView.js',
        //__ctxPath + '/js/flow/FlowFormQueryView.js',
        __ctxPath + '/js/flow/FlowFormQueryForms.js',
        __ctxPath + '/js/flow/FlowFormQueryEntity.js',
        __ctxPath + '/js/flow/FlowFormEntityView.js'
    ],
    OutMailSetView: [
        __ctxPath + '/js/system/OutMailSetForm.js',
        __ctxPath + '/js/system/OutMailSetView.js'
    ],
    ProInstanceMgr: [
        __ctxPath + '/js/flow/ProInstanceMgr.js',
        __ctxPath + '/js/flow/ProInstanceView.js',
        __ctxPath + '/js/flow/ProInstanceDetail.js',
        __ctxPath + '/js/flow/PathChangeWindow.js',
        __ctxPath + '/js/flow/ProcessNextForm.js',
        __ctxPath + '/js/flow/TaskHandlerWindow.js',
        __ctxPath + '/js/flow/TaskDueDateWindow.js'
    ],
    JforumView: [
        __ctxPath + '/js/info/JforumView.js'
    ],
    MyFileAttachView: [
        __ctxPath + '/js/system/MyFileAttachView.js'
    ],
    ReportTemplateMenu: [
        __ctxPath + '/js/system/ReportTemplateMenu.js',
        __ctxPath + '/js/system/ReportTemplatePreview.js'
    ],
    DutyView: [
        __ctxPath + '/js/personal/DutyView.js',
        __ctxPath + '/js/personal/DutyForm.js'
    ],
    ComIndexPage: [
        __ctxPath + '/ext3/ux/Portal.js',
        __ctxPath + '/ext3/ux/PortalColumn.js',
        __ctxPath + '/ext3/ux/Portlet.js',
        __ctxPath + '/js/info/ComIndexPage.js'
    ],
    AppHome: [
        __ctxPath + '/ext3/ux/Portal.js',
        __ctxPath + '/ext3/ux/PortalColumn.js',
        __ctxPath + '/ext3/ux/Portlet.js',
        __ctxPath + '/js/App.home.js'
    ],
    DicManager: [
        __ctxPath + '/js/system/GlobalTypeForm.js',
        __ctxPath + '/js/system/DicManager.js',
        __ctxPath + '/js/system/DicTypeChangeWin.js',
        __ctxPath + '/js/core/ux/TreeCombo.js',
        __ctxPath + '/js/system/DictionaryForm.js'
    ],
    BoardRooView: [__ctxPath + '/js/admin/BoardRooView.js',
        __ctxPath + '/js/admin/BoardRooForm.js'],
    BoardTypeView: [__ctxPath + '/js/admin/BoardTypeView.js',
        __ctxPath + '/js/admin/BoardTypeForm.js'],
    AddConfSummaryView: [__ctxPath + '/js/admin/AddConfSummaryView.js',
        __ctxPath + '/js/selector/ConferenceSelector.js'],
    AddConferenceView: [__ctxPath + '/js/admin/AddConferenceView.js'],
    ConfSummaryView: [__ctxPath + '/js/admin/ConfSummaryView.js',
        __ctxPath + '/js/admin/ConfSummaryForm.js',
        __ctxPath + '/js/admin/ConfSummaryDetailForm.js'],
    MyJoinConferenceView: [__ctxPath + '/js/admin/MyJoinConferenceView.js',
        __ctxPath + '/js/admin/ConferenceForm.js',
        __ctxPath + '/js/admin/ConferenceDetailForm.js'],
    MyJoinedConferenceView: [__ctxPath + '/js/admin/MyJoinedConferenceView.js',
        __ctxPath + '/js/admin/ConferenceForm.js',
        __ctxPath + '/js/admin/ConferenceDetailForm.js'],
    ZanCunConferenceView: [__ctxPath + '/js/admin/ZanCunConferenceView.js',
        __ctxPath + '/js/admin/ConferenceDetailForm.js',
        __ctxPath + '/js/admin/ConferenceForm.js'],
    YiKaiConferenceView: [__ctxPath + '/js/admin/YiKaiConferenceView.js',
        __ctxPath + '/js/admin/ConferenceDetailForm.js',
        __ctxPath + '/js/admin/ConferenceForm.js'],
    DaiKaiConferenceView: [__ctxPath + '/js/admin/DaiKaiConferenceView.js',
        __ctxPath + '/js/admin/ConferenceDetailForm.js',
        __ctxPath + '/js/admin/ConferenceForm.js'],
    DaiConfApplyView: [__ctxPath + '/js/admin/DaiConfApplyView.js',
        __ctxPath + '/js/admin/ConfApplyForm.js',
        __ctxPath + '/js/admin/ConferenceDetailForm.js'],
    ConfApplyView: [__ctxPath + '/js/admin/ConfApplyView.js',
        __ctxPath + '/js/admin/ConferenceDetailForm.js'],


//档案管理
    ArchFondView: [
        __ctxPath + '/js/arch/ArchFondView.js',
        __ctxPath + '/js/arch/ArchFondForm.js',
        __ctxPath + '/ext3/ux/PagingStore.js',
        __ctxPath + '/js/system/GlobalTypeForm.js'
    ],

    ArchRollView: [
        __ctxPath + '/js/arch/ArchRollView.js',
        __ctxPath + '/js/arch/ArchRollForm.js',
        __ctxPath + '/ext3/ux/PagingStore.js',
        __ctxPath + '/js/system/GlobalTypeForm.js'
    ]
    ,
    RollFileView: [
        __ctxPath + '/js/arch/RollFileView.js',
        __ctxPath + '/js/arch/RollFileForm.js',
        __ctxPath + '/js/system/GlobalTypeForm.js',
        __ctxPath + '/js/arch/RollFileListView.js',
        //__ctxPath + '/js/arch/RollFileListForm.js',//屏蔽查看附件明细
        __ctxPath + '/js/arch/ViewFileWindow.js'
    ],
    TidyFileView: [
        __ctxPath + '/js/arch/TidyFileView.js',
        //__ctxPath + '/js/arch/RollFileForm.js',//屏蔽增加
        __ctxPath + '/js/arch/TidyFileForm.js',
        //__ctxPath + '/js/system/GlobalTypeForm.js',//屏蔽增加分类
        __ctxPath + '/js/arch/ViewFileWindow.js',
        __ctxPath + '/js/arch/MyBorrowFileViewWindow.js',
        __ctxPath + '/js/arch/MyBorrowFileSlaveListGrid.js',
        __ctxPath + '/ext3/ux/PagingMemoryProxy.js',
        __ctxPath + '/ext3/ux/PagingStore.js',
        __ctxPath + '/js/core/ux/TreeCombo.js'
    ]
    ,
    NewBorrowRecordFormPan: [
        __ctxPath + '/js/arch/NewBorrowRecordFormPan.js',
        __ctxPath + '/ext3/ux/PagingStore.js',
        __ctxPath + '/js/arch/BorrowFileListView.js',
        __ctxPath + '/js/arch/SelectFondWindow.js',
        __ctxPath + '/js/arch/SelectRollWindow.js',
        __ctxPath + '/js/arch/SelectFileWindow.js'

    ],
    CheckBorrowRecordView: [
        __ctxPath + '/js/arch/CheckBorrowRecordView.js',
        __ctxPath + '/js/arch/CheckBorrowRecordForm.js',
        //__ctxPath + '/js/arch/CheckBorrowFileListView.js',
        __ctxPath + '/js/arch/MyBorrowFilePanel.js',
        __ctxPath + '/js/arch/MyBorrowFileTypePanel.js',
        __ctxPath + '/js/arch/MyBorrowFileListPanel.js',
        __ctxPath + '/js/arch/ViewFileWindow.js',

        __ctxPath + '/js/arch/MyBorrowFileViewWindow.js',
        __ctxPath + '/js/arch/MyBorrowFileSlaveListGrid.js'

    ],
    MyBorrowRecordView: [
        __ctxPath + '/js/arch/MyBorrowRecordView.js',
        __ctxPath + '/js/arch/MyBorrowFilePanel.js',
        __ctxPath + '/js/arch/MyBorrowFileTypePanel.js',
        __ctxPath + '/js/arch/MyBorrowFileListPanel.js',
        __ctxPath + '/js/arch/ViewFileWindow.js',
        __ctxPath + '/ext3/ux/PagingStore.js',
        __ctxPath + '/js/arch/MyBorrowFileViewWindow.js',
        __ctxPath + '/js/arch/MyBorrowFileSlaveListGrid.js',
        /*************************************************/
        __ctxPath + '/js/arch/BorrowRecordForm.js',
        __ctxPath + '/js/arch/BorrowFileListView.js',
        __ctxPath + '/js/arch/SelectFondWindow.js',
        __ctxPath + '/js/arch/SelectRollWindow.js',
        __ctxPath + '/js/arch/SelectFileWindow.js'
    ],
    StatisticsArchYearReportPanel: [
        __ctxPath + '/js/arch/StatisticsArchYearReportPanel.js'
    ],
    StatisticsArchRollReportPanel: [
        __ctxPath + '/js/arch/StatisticsArchRollReportPanel.js'
    ],
    StatisticsArchFileReportPanel: [
        __ctxPath + '/js/arch/StatisticsArchFileReportPanel.js'
    ],
    archSetingManager: [
        __ctxPath + '/js/arch/archSetingManager.js',
        //__ctxPath + '/js/system/GlobalTypeForm.js',
        //__ctxPath + '/js/system/DicTypeChangeWin.js',
        __ctxPath + '/js/system/DictionaryForm.js'
    ],
    ArchiveTypeTempView: [
        __ctxPath + '/js/archive/ArchiveTypeTempView.js',
        __ctxPath + '/js/system/GlobalTypeForm.js',
        __ctxPath + '/js/archive/ArchTemplateView.js',
        __ctxPath + '/js/archive/ArchTemplateForm.js',
        __ctxPath + '/js/archive/OfficeTemplateView.js',
        __ctxPath + '/js/selector/GlobalTypeSelector.js',
        __ctxPath + '/js/core/ntkoffice/NtkOfficePanel.js'
    ],
    ArchFlowConfView: [
        __ctxPath + '/js/archive/ArchFlowConfView.js',
        __ctxPath + '/js/selector/FlowSelector.js'
    ],
    ArchivesSignView: [
        __ctxPath + '/js/archive/ArchivesSignView.js',
        __ctxPath + '/js/archive/ArchivesDetailWin.js'
    ],
    ArchivesMonitor: [
        __ctxPath + '/js/archive/ArchivesMonitor.js',
        __ctxPath + '/js/archive/ArchivesDetailWin.js',
        __ctxPath + '/js/archive/ArchHastenForm.js',
        __ctxPath + '/js/flow/ProcessNextForm.js',
        __ctxPath + '/js/flow/ProcessRunDetail.js'
    ]

//  start:  Generated for ProcessModule From Template: App.import.js.vm
    , ProcessModuleView: [
        __ctxPath + '/js/flow/ProcessModuleView.js',
        __ctxPath + '/js/flow/ProcessModuleForm.js',
        __ctxPath + '/js/selector/FlowSelector.js'
    ]

//  end:  Generated for ProcessModule From Template: App.import.js.vm

    , OrgSettingView: [
        __ctxPath + '/js/system/OrgSettingView.js',
        __ctxPath + '/js/system/DemensionForm.js',
        __ctxPath + '/js/system/PositionForm.js',
        __ctxPath + '/js/system/OrganizationForm.js',
        __ctxPath + '/js/system/CompanyWin.js',
        __ctxPath + '/js/system/DepartmentWin.js',
        __ctxPath + '/js/selector/RoleDialog.js',
        __ctxPath + '/js/selector/PositionDialog.js',
        __ctxPath + '/js/selector/UserDialog.js'
    ],
    PositionUserView: [
        __ctxPath + '/js/system/PositionUserView.js',
        __ctxPath + '/js/system/PositionForm.js',
        __ctxPath + '/js/selector/PositionDialog.js',
        __ctxPath + '/js/selector/UserDialog.js'
    ],
    DepUserView: [
        __ctxPath + '/js/system/DepUserView.js',
        __ctxPath + '/js/system/DepForm.js',
        __ctxPath + '/js/selector/UserDialog.js',
        __ctxPath + '/js/system/RelativeUserView.js',
        __ctxPath + '/js/system/RelativeUserForm.js',
        __ctxPath + '/js/system/RelativeJobView.js',
        __ctxPath + '/js/system/RelativeJobForm.js'
    ],
    UserFormPanel: [
        __ctxPath + '/js/system/UserFormPanel.js',
        __ctxPath + '/js/system/setPasswordForm.js'
    ]
//  start:  Generated for KnowledgeRights From Template: App.import.js.vm
    , KnowledgeRightsView: [
        __ctxPath + '/js/document/KnowledgeRightsView.js',
        __ctxPath + '/js/document/KnowledgeRightsForm.js'
    ]

//  end:  Generated for KnowledgeRights From Template: App.import.js.vm

    , OrgStructureView: [
        __ctxPath + '/js/system/OrgStructureView.js'
    ]
    , DemensionView: [
        __ctxPath + '/js/system/DemensionView.js',
        __ctxPath + '/js/system/DemensionForm.js'
    ],

    //业务视图
    //初评
    PreBusinessForm: [
        __ctxPath + '/js/pre_business/PreBusinessForm.js'
    ],
    PreBusinessView: [
        __ctxPath + '/js/pre_business/PreBusinessView.js',
        __ctxPath + '/js/pre_business/PreBusinessForm.js'
    ],

    BusinessForm: [
        __ctxPath + '/js/business/BusinessForm.js'
    ],
    BusinessView: [
        __ctxPath + '/js/business/BusinessView.js',
        __ctxPath + '/js/business/BusinessForm.js'
    ],

    RealtyForm: [
        __ctxPath + '/js/realty/RealtyForm.js'
    ],
    RealtyView: [
        __ctxPath + '/js/realty/RealtyView.js',
        __ctxPath + '/js/realty/RealtyForm.js'
    ],

    TenderForm: [
        __ctxPath + '/js/tender/TenderForm.js'
    ],
    TenderView: [
        __ctxPath + '/js/tender/TenderView.js',
        __ctxPath + '/js/tender/TenderForm.js'
    ]
};