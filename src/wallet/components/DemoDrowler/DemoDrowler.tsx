import { cn } from '@bem-react/classname'
import React, { useState } from 'react'
import { FileCopy, Logout } from '@mui/icons-material'
import { Dialog, DialogContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

import './DemoDrowler.scss'

import { ConfirmReset } from 'wallet/components/ConfirmReset/ConfirmReset'

export const componentId = 'DemoDrowler'

const bem = cn(componentId)

export type DemoDrowlerProps = {
  toggle: (event: React.KeyboardEvent | React.MouseEvent) => void
  reset: () => void
  cancelReset: () => void
  exportSeed: (seed: string) => void
}

export const DemoDrowler: React.FC<DemoDrowlerProps> = ({ toggle, reset, exportSeed, cancelReset }) => {
  const [openResetDialog, setOpenResetDialog] = useState(false)

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
          onClick={() => setOpenResetDialog(true)}
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
            exportSeed('test seed')
          }}
        >
          <ListItemIcon className={bem('DrowerItemIcon')}>
            <FileCopy />
          </ListItemIcon>
          <ListItemText className={bem('DrowerItemText')} primary="Export Seed" />
        </ListItem>
      </List>

      <Dialog
        onClose={() => setOpenResetDialog(false)}
        open={openResetDialog}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogContent dividers={true}>
          <ConfirmReset
            data-testid={bem('ConfirmReset')}
            onReset={reset}
            onCancel={() => {
              setOpenResetDialog(false)
              cancelReset()
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}