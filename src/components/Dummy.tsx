import * as React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ChecklistIcon from '@material-ui/icons/Assignment';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { i18n } from '../../../../i18n';
import {
  ISites,
  IFranchisees,
  getSite,
  getSiteFranchiseeId,
  PageLoader,
  AssigneeType,
  IChecklistTemplates,
  AssignmentForm,
  IAssignment,
} from 'oneplace-components';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import { mockChecklistTemplate, mockFranchisees, mockSites } from './mockData';
import { IAppContextProp, withAppContext } from './AppContext';

const styles = (_theme: Theme) =>
  createStyles({
    root: {},
    entityCard: {
      marginBottom: 20,
      overflow: 'visible',
    },
    entitySelector: {
      marginTop: 10,
    },
    cardContent: {
      paddingTop: 0,
    },
    listItemTextRoot: {
      padding: '0 16px',
    },
  });

export interface INewChecklistPageProps
  extends WithStyles<typeof styles>,
    IAppContextProp,
    RouteComponentProps<any> {}

export interface INewChecklistPageState {
  loadState: 'loading' | 'loaded';
  franchisees: IFranchisees | null;
  sites: ISites | null;
  assignee: AssigneeType | null;
  assigneeId: number;
  checklistTemplates: IChecklistTemplates | null;
  checklistsByEntitySetting: IChecklistTemplates | null;
}

export const NewChecklistPage = withStyles(styles)(
  withRouter(
    withAppContext(
      class extends React.Component<
        INewChecklistPageProps,
        INewChecklistPageState
      > {
        franchiseData: any;
        checklistData: any;

        constructor(props: any) {
          super(props);
          this.onAssignmentChanged = this.onAssignmentChanged.bind(this);

          let assignee: AssigneeType | null = null;
          let assigneeId = 13582814;

          // Check URL Params
          const searchParams = new URLSearchParams(props.location.search);
          const urlAssignee = searchParams.get('assignee') as AssigneeType;
          const urlAssigneeId = Number(searchParams.get('assigneeId'));

          const siteOnly = false;

          if (
            ((urlAssignee == 'franchisee' && !siteOnly) ||
              urlAssignee == 'site') &&
            !isNaN(urlAssigneeId)
          ) {
            assignee = urlAssignee;
            assigneeId = urlAssigneeId;
          }

          const newMockTemp = {
            templates: mockChecklistTemplate,
          };

          this.state = {
            loadState: 'loaded',
            assignee,
            assigneeId,
            franchisees: mockFranchisees as any,
            sites: mockSites as any,
            checklistTemplates: newMockTemp as any,
            checklistsByEntitySetting: newMockTemp as any,
          };
          this.franchiseData = mockFranchisees;
          this.checklistData = newMockTemp;

          // this.props.nav.updateNavigation({
          //     title: i18n.t('new_checklist'),
          //     showBackButton: true
          // })

          const checklistTemplates = mockChecklistTemplate as any;
          const franchisees = mockFranchisees as any;
          const checklistsByEntitySetting = {
            ...newMockTemp,
          };
          this.setState({
            franchisees,
            sites: [] as any,
            checklistTemplates,
            checklistsByEntitySetting,
            loadState: 'loaded',
          });
          // this.loadData()
        }

        async loadData() {
          // const user = this.props.ctx.auth.user
          // const [franchisees, sites, checklistTemplates] =
          //     await Promise.all([
          //         this.franchiseData
          //             .getFranchisees(user.capabilities.franchiseId)
          //             .getData(),
          //         this.franchiseData
          //             .getSites(user.capabilities.franchiseId)
          //             .getData(),
          //         this.checklistData
          //             .getChecklistTemplates(
          //                 user.capabilities.franchiseId
          //             )
          //             .getData()
          //     ])
          const checklistTemplates = mockChecklistTemplate as any;
          const franchisees = mockFranchisees as any;
          const checklistsByEntitySetting = {
            ...checklistTemplates,
          };
          this.setState({
            franchisees,
            sites: [] as any,
            checklistTemplates,
            checklistsByEntitySetting,
            loadState: 'loaded',
          });
          return;
        }

        onAssignmentChanged(assignment: IAssignment) {
          this.setState(assignment);
          console.log('assignment', assignment);
          const checklistsByEntitySetting = Object.assign(
            {},
            this.state.checklistTemplates
          );
          console.log('checklistsByEntitySetting1', checklistsByEntitySetting);
          let filteredChecklistTemplates = null;
          if (assignment.assignee) {
            if (assignment.assignee == 'franchisee') {
              filteredChecklistTemplates =
                checklistsByEntitySetting.templates.filter(
                  (cl) =>
                    !cl.checklistEntitySetting ||
                    cl.checklistEntitySetting != 'S'
                );
            } else {
              filteredChecklistTemplates =
                checklistsByEntitySetting.templates.filter(
                  (cl) =>
                    !cl.checklistEntitySetting ||
                    cl.checklistEntitySetting != 'F'
                );
            }
            checklistsByEntitySetting.templates = filteredChecklistTemplates;
          }
          console.log('checklistsByEntitySetting2', checklistsByEntitySetting);
          this.setState({ checklistsByEntitySetting });
        }

        getNewChecklistUrl(versionId: number) {
          const location: any = {
            pathname: '/checklists/edit',
          };
          location.search =
            '?versionId=' +
            versionId +
            '&assignee=' +
            this.state.assignee +
            '&assigneeId=' +
            this.state.assigneeId;
          return location;
        }

        getEditChecklistUrl(localId: number) {
          const location: any = {
            pathname: '/checklists/edit',
          };
          location.search = '?localId=' + localId;
          return location;
        }

        async onTemplateSelected(versionId: number) {
          const t = i18n.t;
          // const db = this.props.ctx.db
          // const prompts = this.props.prompts
          console.log('select');

          const franchiseeId =
            this.state.assignee == 'franchisee'
              ? this.state.assigneeId
              : getSiteFranchiseeId(
                  getSite(this.state.sites!.sites, this.state.assigneeId)
                );
          const siteId =
            this.state.assignee == 'franchisee' ? 0 : this.state.assigneeId;

          // const existingId = await db.searchDraftChecklistByAssignee(
          //     versionId,
          //     franchiseeId,
          //     siteId
          // )
          const existingId = null;
          console.log('draft match result', existingId);

          if (existingId) {
            const template = this.state.checklistTemplates!.templates.find(
              (tpl) => tpl.id == versionId
            );
            const checklistName = template!.name;
            const assigneeType =
              this.state.assignee == 'franchisee'
                ? t('customLabel_franchisee')
                : t('customLabel_site');
            // prompts.showPrompt({
            //     title: checklistName,
            //     message: t('draft_checklist_exists_assignee', {
            //         assigneeType
            //     }),
            //     closeButtonLabel: t('cancel'),
            //     actions: [
            //         {
            //             label: t('new_checklist'),
            //             onClick: () => {
            //                 this.navigateToNewChecklist(versionId)
            //             }
            //         },
            //         {
            //             label: t('open_draft'),
            //             onClick: () => {
            //                 this.navigateToEditChecklist(existingId)
            //             }
            //         }
            //     ]
            // })
          } else {
            this.navigateToNewChecklist(versionId);
          }
        }

        navigateToNewChecklist(versionId: number) {
          this.props.history.push(this.getNewChecklistUrl(versionId));
        }

        navigateToEditChecklist(localId: number) {
          this.props.history.push(this.getEditChecklistUrl(localId));
        }

        render() {
          const t = i18n.t;

          if (this.state.loadState == 'loaded') {
            console.log('franchisees', this.state.franchisees);
            console.log('sites', this.state.sites);
            console.log('assignees', this.state.assignee);
            console.log('assignee_id', this.state.assigneeId);

            return (
              <div className={this.props.classes.root}>
                <Card className={this.props.classes.entityCard}>
                  <CardHeader title={t('new_checklist')} />
                  <CardContent className={this.props.classes.cardContent}>
                    <AssignmentForm
                      useAutocomplete={true}
                      franchiseesShown={true}
                      franchisees={this.state.franchisees!}
                      sites={this.state.sites!}
                      assignee={this.state.assignee}
                      assigneeId={this.state.assigneeId}
                      onAssignmentChanged={this.onAssignmentChanged}
                    />
                  </CardContent>
                </Card>
                {this.state.assigneeId > -1 && (
                  <Card>
                    <CardHeader title={t('select_a_checklist_template')} />
                    <CardContent className={this.props.classes.cardContent}>
                      <List>
                        {this.state.checklistsByEntitySetting &&
                          this.state.checklistsByEntitySetting.templates.map(
                            (template) => (
                              <ListItem
                                button
                                style={{
                                  padding: '8px 4px',
                                }}
                                key={template.id}
                                onClick={this.onTemplateSelected.bind(
                                  this,
                                  template.id
                                )}
                              >
                                <Avatar>
                                  <ChecklistIcon />
                                </Avatar>
                                <ListItemText
                                  classes={{
                                    root: this.props.classes.listItemTextRoot,
                                  }}
                                  primary={template.name}
                                  secondary={
                                    t('version') + ' ' + template.version
                                  }
                                />
                              </ListItem>
                            )
                          )}
                      </List>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          } else if (this.state.loadState == 'loading') {
            console.log('loading');
            return <PageLoader loading={true} />;
          } else {
            return (
              <div>
                <PageLoader
                  loading={false}
                  // status={t('data_load_error')}
                />
              </div>
            );
          }
        }
      }
    )
  )
);
export default NewChecklistPage;
