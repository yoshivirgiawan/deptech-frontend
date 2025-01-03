'use client'

// MUI Imports
import type { ReactNode } from 'react'

import type { ButtonProps } from '@mui/material'
import { Box, Button, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'

type PageHeaderProps = {
  title: string
  actionComponent?: ReactNode
  actionButtonProps?: ButtonProps
  hideActionButton?: boolean
}

const PageHeader = (props: PageHeaderProps) => {
  const { title, hideActionButton, actionComponent, actionButtonProps } = props

  return (
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} className='mb-4'>
      <Typography variant='h4' className='mbe-1'>
        {title}
      </Typography>
      {hideActionButton ? (
        <Box />
      ) : (
        <>
          <Box alignItems='center' display='flex' gap={4}>
            {!!actionComponent ? (
              actionComponent
            ) : (
              <Button
                variant='tonal'
                color='secondary'
                startIcon={<i className='tabler-caret-left' />}
                {...actionButtonProps}
              >
                {actionButtonProps?.children ?? 'Back'}
              </Button>
            )}
          </Box>
        </>
      )}
    </Stack>
  )
}

export default PageHeader
