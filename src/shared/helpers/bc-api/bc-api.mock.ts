import { AccountStatus } from 'shared/models/account-status'

export const bsApiMock = {
  status: async (status: AccountStatus) => (await status) || AccountStatus.None,
}
