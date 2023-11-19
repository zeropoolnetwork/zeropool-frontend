import { cn } from '@bem-react/classname'
import React, { useState } from 'react'
import { FileCopy, Logout } from '@mui/icons-material'
import {
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import './DemoDrowler.scss'

import { ConfirmReset } from 'wallet/components/ConfirmReset/ConfirmReset'
import { ExportSeed } from 'wallet/components/ExportSeed/ExportSeed'

export const componentId = 'DemoDrowler'

const bem = cn(componentId)

export type DemoDrowlerProps = {
  toggle: (event: React.KeyboardEvent | React.MouseEvent) => void
  reset: () => void
  cancelReset: () => void
  exportSeed: (password: string) => void
  cancelExport: () => void
}

export const DemoDrowler: React.FC<DemoDrowlerProps> = ({
  toggle,
  reset,
  exportSeed,
  cancelReset,
  cancelExport,
}) => {
  const [resetDialog, setResetDialog] = useState(false)
  const [seedDialog, setSeedDialog] = useState(false)

  return (
    <div
      className={bem()}
      data-testid={bem()}
      role="presentation"
      // onClick={toggle}
      onKeyDown={toggle}
    >
      <List>
        <ListItem
          className={bem('DrowerItem')}
          data-testid={bem('DrowerItemForReset')}
          button={true}
          onClick={() => setResetDialog(true)}
        >
          <ListItemIcon className={bem('DrowerItemIcon')}>
            <Logout />
          </ListItemIcon>
          <ListItemText className={bem('DrowerItemText')} primary="Reset all data" />
        </ListItem>

        <ListItem
          className={bem('DrowerItem')}
          data-testid={bem('DrowerItemForExport')}
          button={true}
          onClick={() => {
            setSeedDialog(true)
          }}
        >
          <ListItemIcon className={bem('DrowerItemIcon')}>
            <FileCopy />
          </ListItemIcon>
          <ListItemText className={bem('DrowerItemText')} primary="Export Seed" />
        </ListItem>
      </List>

      <Dialog
        onClose={() => setResetDialog(false)}
        open={resetDialog}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogContent dividers={true}>
          <ConfirmReset
            data-testid={bem('ConfirmReset')}
            onReset={reset}
            onCancel={() => {
              setResetDialog(false)
              cancelReset()
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={() => setSeedDialog(false)}
        open={seedDialog}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogContent dividers={true}>
          <ExportSeed
            data-testid={bem('ConfirmSeed')}
            onExport={(password) => {
              setSeedDialog(false)
              exportSeed(password)
            }}
            onCancel={() => {
              setSeedDialog(false)
              cancelExport()
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
