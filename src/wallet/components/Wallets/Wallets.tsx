import { cn } from '@bem-react/classname'
import AddIcon from '@material-ui/icons/Add'
import React, { useState } from 'react'
import { Dialog, DialogContent } from '@material-ui/core'

import './Wallets.scss'

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper'
import { RoundButton } from 'shared/components/RoundButton/RoundButton'
import { Token } from 'shared/models/token'

import { Wallet } from 'wallet/state/models/wallet'
import { WalletRow } from 'wallet/components/WalletRow/WalletRow'
import { EditWallet } from 'wallet/components/EditWallet/EditWallet'
import { DeleteWallet } from 'wallet/components/DeleteWallet/DeleteWallet'

export const componentId = 'Wallets'

const css = cn(componentId)
const test = testIdBuilder(componentId)

export interface WalletsHandlers {
  onReceive: (wallet: Wallet) => void
  onSend: (wallet: Wallet) => void
  onDelete: (wallet: Wallet) => void
  onRename: (wallet: Wallet, name: string) => void
  onAdd: () => void
  onOpen: (wallet: Wallet) => void
}
export interface WalletsProps {
  handlers: WalletsHandlers
  rate: number
  token: Token
  wallets: Wallet[]
}

export const Wallets: React.FC<WalletsProps> = ({ handlers, wallets, rate, token }) => {
  const [rollUpSignal, setRollUpSignal] = useState(0)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)

  const handleWalletRename = (name: string) => {
    if (selectedWallet) {
      setOpenEditDialog(false)
      handlers.onRename(selectedWallet, name)
    } else {
      throw new Error('No active wallet set!')
    }
  }
  const handleWalletDelete = () => {
    if (selectedWallet) {
      setOpenDeleteDialog(false)
      handlers.onDelete(selectedWallet)
    } else {
      throw new Error('No active wallet set!')
    }
  }

  return (
    <div className={css()} data-testid={test()}>
      {wallets.map((wallet, index) => (
        <WalletRow
          rollUp={rollUpSignal}
          wallet={wallet}
          token={token}
          rate={rate}
          key={index}
          onEditClick={(_wallet) => {
            setSelectedWallet(_wallet)
            setOpenEditDialog(true)
          }}
          onReceiveClick={handlers.onReceive}
          onRollUpClick={() => setRollUpSignal(rollUpSignal + 1)}
          onSendClick={handlers.onSend}
          onWalletNameClick={handlers.onOpen}
        />
      ))}

      <div className={css('Add')}>
        <RoundButton label={'Add wallet'} onClick={handlers.onAdd}>
          <AddIcon />
        </RoundButton>
      </div>

      <Dialog
        onClose={() => {
          setOpenEditDialog(false)
        }}
        open={openEditDialog}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogContent dividers={true}>
          <EditWallet
            walletName={selectedWallet?.name || ''}
            onRename={handleWalletRename}
            onDelete={() => {
              setOpenDeleteDialog(true)
              setOpenEditDialog(false)
            }}
            onCancel={() => {
              setOpenEditDialog(false)
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={() => {
          setOpenDeleteDialog(false)
        }}
        open={openDeleteDialog}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogContent dividers={true}>
          <DeleteWallet
            walletName={selectedWallet?.name || ''}
            onDelete={handleWalletDelete}
            onCancel={() => {
              setOpenDeleteDialog(false)
              setOpenEditDialog(true)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
