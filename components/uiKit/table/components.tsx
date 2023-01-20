import { Checkbox, Divider, Form, Input, List, Popover } from 'antd'
import { IRole } from 'core/wcs/role'
import { IUserRole } from 'core/wcs/userRole/InterfaceUserRole/interface/IUserRole'
import { FC, useCallback, useEffect, useState } from 'react'
import { ButtonUiKit } from '../buttons'
import { IActionsButtonProps, IEmailTableProps, IUserStatusProps } from './interfaces'
import {
  ActionsButtonTableContainer,
  EmailTableContainer,
  SelectionFormTable,
  UserRoleSearchTable,
  UserRoleTableContainer,
  UserStatusContainer,
  SuggestedPricesTableContainer,
  TextStatusTableContainer,
  CarTypeTableContainer,
} from './styles'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { IUserRoleS } from 'core/wcs/userRole/IUserRoleService'
import { ToastAlert } from '../toastAlert/toastAlert'
import { IRoleUserPermissionS } from 'core/wcs/roleUserPermission/IRoleUserPermissionService'
import {
  IRoleUserPermission,
  IUserPermissionRoutePath,
  IUserRoleActions,
} from 'core/wcs/roleUserPermission/InterfaceRoleUserPermission/IRoleUserPermission'
import moment from 'moment'
export const EmailTable: FC<IEmailTableProps> = ({ email }) => {
  return (
    <EmailTableContainer>
      <div className="email">
        <span className="material-icons">email</span>
        <span>
          {email ? (
            <>
              <Popover placement="bottom" content={email}>
                <div className="showEmail">مشاهده</div>
              </Popover>
            </>
          ) : (
            <div className="noEmail">----------</div>
          )}
        </span>
      </div>
    </EmailTableContainer>
  )
}
export const ActionsButtonTable: FC<IActionsButtonProps> = ({ action, iconName, onClick }) => {
  return (
    <ActionsButtonTableContainer>
      <div className="action" onClick={onClick}>
        <span className="material-icons">{iconName}</span>
        <span>{action}</span>
      </div>
    </ActionsButtonTableContainer>
  )
}
export const UserStatusTable: FC<IUserStatusProps> = ({ isActive, isBlock, onChangeBlock, onChangeStatus }) => {
  return (
    <UserStatusContainer>
      <div
        className={`${isActive && !isBlock ? 'active' : isBlock ? 'disabled' : ''} left`}
        onClick={() => {
          if (isActive || isBlock) return
          onChangeStatus(true)
        }}
      >
        فعال
      </div>
      <div
        className={`${!isActive && !isBlock ? 'active' : ''} center`}
        onClick={() => {
          if (isBlock) {
            onChangeBlock()
            onChangeStatus(false)
            return
          }
          if (!isActive) return
          onChangeStatus(false)
        }}
      >
        غیرفعال
      </div>
      <div
        className={`${isBlock ? 'active' : ''} right`}
        onClick={() => {
          if (isBlock) return
          onChangeBlock()
        }}
      >
        مسدود
      </div>
    </UserStatusContainer>
  )
}

export const UserRoleTable: FC<{
  options?: IRole[]
  dropDown?: boolean
  title?: string
  userRoles: string
  service: IUserRoleS<IUserRole>
  userId: number
  userPermission?: boolean
  permissionService?: IRoleUserPermissionS<IRoleUserPermission>
  routePath?: IUserPermissionRoutePath
  fetchAgain?: () => void
}> = ({ options, dropDown = true, userRoles, service, userId, userPermission = false, permissionService, routePath, fetchAgain }) => {
  const [selectedRole, setSelectedRole] = useState<string[]>([])
  const [selectedTitles, setSelectedTitles] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedAction, setSelectedAction] = useState<IRoleUserPermission[]>([])
  const [permissionOption, setPermissionOption] = useState<IUserRoleActions[]>([])
  const [roleOptions, setRoleOption] = useState<IRole[]>(options || [])
  const [searchValue, setSearchValue] = useState<string>('')
  const [initialPermissionOption, setInitialPermissionOption] = useState<IUserRoleActions[]>([])
  const changeTitle = useCallback(
    (roles: string[]) => {
      if (!options) return
      const selected: IRole[] = []
      roles.forEach(id => {
        const rol = options.find(role => Number(id) === role.rol_ID)
        if (rol) {
          selected.push(rol)
        }
      })
      let newTitle = ''
      selected.forEach((role, index) => {
        if (role) newTitle = newTitle.concat(index > 0 ? ','.concat(role.transTagText) : role.transTagText)
      })
      setSelectedTitles(newTitle)
    },
    [options],
  )

  const Content: FC<{ data?: IRole[] }> = ({ data }) => {
    const checkBoxHandler = (roleId: string) => {
      const existId = selectedRole.find(item => item === roleId)
      if (existId) {
        const newRoleIds = selectedRole.filter(roleId => roleId !== existId)
        setSelectedRole(newRoleIds)
      } else {
        setSelectedRole(prev => [...prev, roleId])
      }
    }
    const userPermissionCheckBoxHandler = (e: CheckboxChangeEvent, RoutStrID: number) => {
      if (e.target.checked) {
        setSelectedAction(perv => [
          ...perv,
          {
            rlUsrPer_RolID_UsrID: userId,
            rlUsrPer_RoutStrID: RoutStrID,
            rlUsrPer_BitMrge: true,
            rlUsrPer_ParentID: routePath?.routeStructure_ParentID,
          },
        ])
      } else {
        const newActions = selectedAction.filter(act => act.rlUsrPer_RoutStrID !== RoutStrID)
        setSelectedAction(newActions)
      }
    }
    useEffect(() => {
      if (userPermission && permissionService && routePath && !initialPermissionOption.length) {
        const formData = new FormData()
        formData.append('UsrRol_ID', String(userId))
        formData.append('FormID', String(routePath.routeStructure_ParentID))
        permissionService.getAllPermissionUserActions(formData).then(res => {
          if (res.data) {
            const selected: IRoleUserPermission[] = []
            res.data.forEach(action => {
              if (action.action_State) {
                selected.push({
                  rlUsrPer_RolID_UsrID: userId,
                  rlUsrPer_RoutStrID: action.routstructure_ID,
                  rlUsrPer_BitMrge: action.action_State,
                  rlUsrPer_ParentID: routePath?.routeStructure_ParentID,
                })
              }
            })
            setSelectedAction(selected)
            setInitialPermissionOption(res.data)
            setPermissionOption(res.data)
          }
        })

        // setPermissionOption()
      }
    }, [])
    return (
      <SelectionFormTable>
        <Form dir="rtl">
          <div className="listHolder">
            {data && data.length > 0 && (
              <List
                size="small"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    {
                      <Checkbox
                        onChange={e => checkBoxHandler(item.rol_ID.toString())}
                        checked={!!selectedRole.find(role => Number(role) === item.rol_ID)}
                      >
                        {item.transTagText}
                      </Checkbox>
                    }
                  </List.Item>
                )}
              />
            )}
            {initialPermissionOption.length > 0 && (
              <List
                size="small"
                dataSource={permissionOption}
                renderItem={item => (
                  <List.Item>
                    {
                      <Checkbox
                        onChange={e => userPermissionCheckBoxHandler(e, item.routstructure_ID)}
                        checked={!!selectedAction.find(selected => selected.rlUsrPer_RoutStrID === item.routstructure_ID)}
                      >
                        {item.tag_Name}
                      </Checkbox>
                    }
                  </List.Item>
                )}
              />
            )}
            {!permissionOption.length && !data && <h6 className="d-flex justify-content-center text-center">صبر کنید</h6>}
          </div>
          <Divider style={{ transform: 'translateX(16px)', minWidth: '120%' }} />
          {data && data.length > 0 && (
            <ButtonUiKit loading={loading} type="default" className="submitButton" onClick={submitHandler}>
              ثبت
            </ButtonUiKit>
          )}
          {initialPermissionOption.length > 0 && (
            <ButtonUiKit loading={loading} type="default" className="submitButton" onClick={permissionSubmitHandler}>
              ثبت
            </ButtonUiKit>
          )}
        </Form>
      </SelectionFormTable>
    )
  }

  const submitHandler = () => {
    setLoading(true)
    const data = selectedRole.map(role => ({ usr_ID: userId, rol_ID: Number(role) }))
    const formData = new FormData()
    formData.append('UserID', String(userId))
    if (selectedRole.length) {
      service
        .deleteAllUserRole(formData)
        .then(res => {
          if (selectedRole.length) {
            service
              .insertUserRole(data)
              .then(res => {
                if (res.success) {
                  ToastAlert.success('تخصیص نقش با موفقیت انجام شد')
                  changeTitle(selectedRole)
                } else {
                  ToastAlert.error('خطا در تخصیص نقش به کاربر')
                }
              })
              .catch(err => console.log(err))
          }
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    } else {
      service
        .deleteAllUserRole(formData)
        .then(res => {
          if (res.success) {
            ToastAlert.success('تخصیص نقش با موفقیت انجام شد')
            changeTitle(selectedRole)
          } else {
            ToastAlert.error('خطا در تخصیص نقش به کاربر')
          }
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }
  }
  const permissionSubmitHandler = () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('UserID', String(userId))
    formData.append('ParentID', String(routePath?.routeStructure_ParentID))
    if (selectedRole.length) {
      permissionService?.deleteAllPermissionUser(formData).finally(() => {
        if (selectedAction.length) {
          permissionService
            .insert(selectedAction)
            .then(res => {
              if (res.success) {
                ToastAlert.success('تخصیص نقش با موفقیت انجام شد')
                changeTitle(selectedRole)
              } else {
                ToastAlert.error('خطا در تخصیص نقش به کاربر')
              }
            })
            .catch(err => console.log(err))
            .finally(() => {
              setLoading(false)
            })
        } else {
          setLoading(false)
        }
      })
    } else {
      permissionService
        ?.insert(selectedAction)
        .then(res => {
          if (res.success) {
            ToastAlert.success('تخصیص نقش با موفقیت انجام شد')
            changeTitle(selectedRole)
          } else {
            ToastAlert.error('خطا در تخصیص نقش به کاربر')
          }
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }
  }
  const onSearch = (value: string) => {
    if (options && options.length > 0) {
      const newData = options?.filter(role => role.transTagText.includes(value))
      setRoleOption(newData)
    } else {
      if (initialPermissionOption.length > 0) {
        const newData = initialPermissionOption?.filter(action => action.tag_Name.includes(value))
        setPermissionOption(newData)
      }
    }
  }

  useEffect(() => {
    const roles = userRoles.split(',')
    setSelectedRole(roles)
    changeTitle(roles)
  }, [changeTitle, userRoles])
  return (
    <UserRoleTableContainer>
      <Popover
        placement="bottomLeft"
        title={
          <UserRoleSearchTable dir="rtl">
            <Input
              placeholder="جستجو"
              prefix={<span className="material-icons">search</span>}
              onChange={e => {
                onSearch(e.target.value)
                setSearchValue(e.target.value)
              }}
              value={searchValue}
            />
          </UserRoleSearchTable>
        }
        content={<Content data={roleOptions} />}
        trigger="click"
      >
        <button className="userRoleButton ">
          <span className="text-truncate textHolder text-center w-100">{dropDown ? selectedTitles : 'ویرایش'}</span>

          {dropDown && <span className="material-icons">arrow_drop_down</span>}
        </button>
      </Popover>
    </UserRoleTableContainer>
  )
}

export const SuggestedPricesTable: FC<{ minPrice: number; maxPrice: number; flexDir?: string }> = ({
  maxPrice,
  minPrice,
  flexDir = 'row',
}) => {
  return (
    <SuggestedPricesTableContainer dir="rtl" flexDir={flexDir}>
      <span className="minPrice">
        <span>{minPrice.toLocaleString()}</span>
        <span className="material-icons">arrow_drop_down</span>
      </span>
      <span className="maxPrice">
        <span>{maxPrice.toLocaleString()}</span>
        <span className="material-icons">arrow_drop_up</span>
      </span>
    </SuggestedPricesTableContainer>
  )
}

export const TextStatusTable: FC<{ type: 'inquiries' | 'legalContract'; status: 0 | 1 | 2; onClick?: () => void }> = ({
  type,
  status,
  onClick,
}) => {
  const types = {
    inquiries: {
      0: 'تایید نشده',
      1: 'تایید شده',
      2: 'در حال بررسی',
    },
    legalContract: {
      0: 'منعقد نشده',
      1: 'منعقد شده',
      2: 'درحال انعقاد',
    },
  }
  const icon = () => {
    switch (status) {
      case 0:
        return 'close'
      case 1:
        return 'done'
      case 2:
        return 'noise_control_off'
      default:
        return ''
    }
  }
  return (
    <TextStatusTableContainer
      status={status}
      hover={!!onClick}
      onClick={() => {
        if (onClick) onClick()
      }}
    >
      <span className="material-icons icon">{icon()}</span>
      <span className="title"> {types[type][status]}</span>
    </TextStatusTableContainer>
  )
}

export const CarTypeTable: FC<{ typeCar: string; years: string; dir: string }> = ({ typeCar, years, dir = 'row' }) => {
  return (
    <CarTypeTableContainer dir={dir}>
      <div>
        <span className="years">{moment(years).format('Y')}</span>
      </div>
      {/* <div className="borderCarType"></div> */}
      <div>
        <span className="typeCar">{typeCar}</span>
      </div>
    </CarTypeTableContainer>
  )
}
