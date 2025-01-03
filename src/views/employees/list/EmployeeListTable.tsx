'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '@/redux-store'

// Type Imports
import type { EmployeeType } from '@/types/pages/employees/employeeTypes'

import type { ThemeColor } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'
import ConfirmationDialog from '@/components/dialogs/confirmation-dialog/ConfirmationDialog'

import PageHeader from '@/@core/components/page-header/PageHeader'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { deleteEmployeeWithToast, fetchAllEmployees } from '@/redux-store/slices/employees'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type PayementStatusType = {
  text: string
  color: ThemeColor
}

type StatusChipColorType = {
  color: ThemeColor
}

export const paymentStatus: { [key: number]: PayementStatusType } = {
  1: { text: 'Paid', color: 'success' },
  2: { text: 'Pending', color: 'warning' },
  3: { text: 'Cancelled', color: 'secondary' },
  4: { text: 'Failed', color: 'error' }
}

export const statusChipColor: { [key: string]: StatusChipColorType } = {
  Delivered: { color: 'success' },
  'Out for Delivery': { color: 'primary' },
  'Ready to Pickup': { color: 'info' },
  Dispatched: { color: 'warning' }
}

type EmployeeTypeWithAction = EmployeeType & {
  action?: string
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Column Definitions
const columnHelper = createColumnHelper<EmployeeTypeWithAction>()

const EmployeeListTable = () => {
  // ** Redux Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.employees)

  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [deleteValue, setDeleteValue] = useState(0)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false)

  // Hooks
  const { lang: locale } = useParams()

  useEffect(() => {
    dispatch(fetchAllEmployees())
  }, [dispatch])

  const handleDeleteOrderType = (id: number) => {
    setDeleteValue(id)
    setDeleteConfirmOpen(true)
  }

  const handleDeleteConfirmation = (value: 'yes' | 'cancel') => {
    if (value === 'yes') {
      deleteEmployeeWithToast(dispatch, deleteValue)
      setDeleteConfirmOpen(false)
    } else if (value === 'cancel') {
      setDeleteValue(0)
      setDeleteConfirmOpen(false)
    }
  }

  const columns = useMemo<ColumnDef<EmployeeTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('first_name', {
        header: 'First Name',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col items-start'>
              <Typography
                component={Link}
                color='text.primary'
                href={getLocalizedUrl(`/employees/details/${row.original.id}`, locale as Locale)}
                className='font-medium hover:text-primary'
              >
                {row.original.first_name}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('last_name', {
        header: 'Last Name',
        cell: ({ row }) => <Typography>{row.original.last_name}</Typography>
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: ({ row }) => <Typography>{row.original.email}</Typography>
      }),
      columnHelper.accessor('phone_number', {
        header: 'Phone Number',
        cell: ({ row }) => (
          <Typography className='font-medium' color='text.primary'>
            {row.original.phone_number}
          </Typography>
        )
      }),
      columnHelper.accessor('address', {
        header: 'Address',
        cell: ({ row }) => (
          <Typography className='font-medium' color='text.primary'>
            {row.original.address}
          </Typography>
        )
      }),
      columnHelper.accessor('gender', {
        header: 'Gender',
        cell: ({ row }) => (
          <Typography className='font-medium' color='text.primary'>
            {row.original.gender}
          </Typography>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton LinkComponent={Link} href={`/${locale}/employees/detail/${row.original.id}`}>
              <i className='tabler-folder-open text-textSecondary' />
            </IconButton>
            <IconButton LinkComponent={Link} href={`/${locale}/employees/edit/${row.original.id}?editfromlist=true`}>
              <i className='tabler-edit text-textSecondary' />
            </IconButton>
            <IconButton onClick={() => handleDeleteOrderType(row.original.id)}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    [locale]
  )

  const table = useReactTable({
    data: store.data as EmployeeType[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      {store.loading ? (
        <>
          <PageHeader title='Employees Page' hideActionButton />
          <div className='flex items-center justify-center min-h-screen'>
            <CircularProgress />
          </div>
        </>
      ) : (
        <>
          <Card>
            <CardContent className='flex justify-between flex-wrap max-sm:flex-col sm:items-center gap-4'>
              <CustomTextField
                select
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
                className='is-full sm:is-[70px]'
              >
                <MenuItem value='10'>10</MenuItem>
                <MenuItem value='25'>25</MenuItem>
                <MenuItem value='50'>50</MenuItem>
                <MenuItem value='100'>100</MenuItem>
              </CustomTextField>
              <div className='flex max-sm:flex-col items-start sm:items-center gap-4 max-sm:is-full'>
                <DebouncedInput
                  value={globalFilter ?? ''}
                  onChange={value => setGlobalFilter(String(value))}
                  placeholder='Search'
                  className='max-sm:is-full'
                />
                <Button
                  variant='contained'
                  color='primary'
                  className='max-sm:is-full'
                  startIcon={<i className='tabler-plus' />}
                  LinkComponent={Link}
                  href={`/${locale}/employees/add`}
                >
                  Add Employee
                </Button>
              </div>
            </CardContent>
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id}>
                          {header.isPlaceholder ? null : (
                            <>
                              <div
                                className={classnames({
                                  'flex items-center': header.column.getIsSorted(),
                                  'cursor-pointer select-none': header.column.getCanSort()
                                })}
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{
                                  asc: <i className='tabler-chevron-up text-xl' />,
                                  desc: <i className='tabler-chevron-down text-xl' />
                                }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                              </div>
                            </>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                {table.getFilteredRowModel().rows.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                        No data available
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {table
                      .getRowModel()
                      .rows.slice(0, table.getState().pagination.pageSize)
                      .map(row => {
                        return (
                          <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                            {row.getVisibleCells().map(cell => (
                              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                          </tr>
                        )
                      })}
                  </tbody>
                )}
              </table>
            </div>
            <TablePagination
              component={() => <TablePaginationComponent table={table} />}
              count={table.getFilteredRowModel().rows.length}
              rowsPerPage={table.getState().pagination.pageSize}
              page={table.getState().pagination.pageIndex}
              onPageChange={(_, page) => {
                table.setPageIndex(page)
              }}
            />
          </Card>
          <ConfirmationDialog
            open={deleteConfirmOpen}
            setOpen={setDeleteConfirmOpen}
            handleConfirmation={handleDeleteConfirmation}
          />
        </>
      )}
    </>
  )
}

export default EmployeeListTable
