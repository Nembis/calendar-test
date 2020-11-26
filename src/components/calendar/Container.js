import logo from './logo.svg'
import './App.css'
import { getDaysInMonth, startOfMonth, endOfMonth, eachDayOfInterval, getDate, getMonth, format } from 'date-fns'
import { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@material-ui/core/Box'
import { Button, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { grey, red } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        backgroundColor: grey[50],
        color: grey[900],
        maxWidth: 455,
        minHeight: 400,
        textAlign: 'center',
        margin: '0 auto',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 5
    },
    griditem: {
        width: '50px',
        height: '50px',
        padding: 5,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        margin: 5,
        borderRadius: 50
    },
    gridbody: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    navbox: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    roundbutton: {
        borderRadius: 50,
        width: 40,
        minWidth: 40,
        height: 40,
        minHeight: 40,
        margin: 5,
        padding: 5
    },
    duedate: {
        width: 5,
        height: 5,
        borderRadius: 50,
        backgroundColor: red[400],
        margin: '0 auto'
    }
}))

const useDateNavigation = () => {
    const Today = useRef(new Date())

    const [SelectedMonth, setSelectedMonth] = useState(null)

    const [TotalDays, setTotalDays] = useState(0)
    const [StartDate, setStartDate] = useState(0)
    const [EndDate, setEndDate] = useState(0)
    const [DayList, setDayList] = useState(null)

    // Set the starting month
    useEffect(() => {
        if (SelectedMonth === null) {
            setSelectedMonth(getMonth(Today.current))
        } else {
            console.log(SelectedMonth)
        }
    }, [SelectedMonth])

    // Generate the Month Info
    useEffect(() => {
        if (SelectedMonth !== null && SelectedMonth !== undefined) {
            setTotalDays(getDaysInMonth(new Date(2020, SelectedMonth, 1)))
        }
    }, [SelectedMonth])

    useEffect(() => {
        if (SelectedMonth !== null && SelectedMonth !== undefined) {
            const ExpectedDate = new Date(2020, SelectedMonth, 1)
            setStartDate(startOfMonth(ExpectedDate))
        }
    }, [SelectedMonth])

    useEffect(() => {
        if (SelectedMonth !== null && SelectedMonth !== undefined) {
            const ExpectedDate = new Date(2020, SelectedMonth, 1)
            setEndDate(endOfMonth(ExpectedDate))
        }
    }, [SelectedMonth])

    // Generate the list of days
    useEffect(() => {
        console.log('in here')
        if (TotalDays && StartDate && EndDate) {
            console.log('in here')
            console.log('start', StartDate)
            console.log('end', EndDate)
            setDayList(
                eachDayOfInterval({
                    start: StartDate,
                    end: EndDate
                })
            )
        }
    }, [EndDate, StartDate, TotalDays])

    const HandleNextMonthPress = useCallback(() => {
        if (!isNaN(SelectedMonth)) {
            // Reset on last month
            if (+SelectedMonth === 11) {
                setSelectedMonth(0)
            } else {
                setSelectedMonth(c => (c += 1))
            }
        }
    }, [SelectedMonth])

    const HandlePreviousMonthPress = useCallback(() => {
        if (!isNaN(SelectedMonth)) {
            // Reset on first
            if (+SelectedMonth === 0) {
                setSelectedMonth(11)
            } else {
                setSelectedMonth(c => (c -= 1))
            }
        }
    }, [SelectedMonth])

    return [SelectedMonth, TotalDays, StartDate, EndDate, DayList, HandleNextMonthPress, HandlePreviousMonthPress]
}

export default () => {
    const classes = useStyles()
    const [SelectedMonth, TotalDays, StartDate, EndDate, DayList, HandleNextMonthPress, HandlePreviousMonthPress] = useDateNavigation()

    // if (!!TotalDays || !!StartDate || !!EndDate) return null

    return (
        <div>
            <p>Calendar</p>
            {SelectedMonth !== null ? (
                <Box className={classes.navbox}>
                    <Button onClick={HandlePreviousMonthPress}>
                        <Typography style={{ color: grey[100] }}>Previous</Typography>
                    </Button>
                    <Typography>{format(new Date(2020, SelectedMonth, 1), 'LLLL')}</Typography>
                    <Button onClick={HandleNextMonthPress}>
                        <Typography style={{ color: grey[100] }}>Next</Typography>
                    </Button>
                </Box>
            ) : null}

            {DayList !== null ? <Calendar Days={DayList} /> : null}
        </div>
    )
}
