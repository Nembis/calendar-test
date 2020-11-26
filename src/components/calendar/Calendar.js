import { Button, Typography } from '@material-ui/core'
import { grey, red } from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { getDate } from 'date-fns'

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
        flexDirection: 'column',
        width: 35
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
    },
    badgeContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'no-wrap'
    }
}))

const DueDate = () => {
    const classes = useStyles()
    return <div className={classes.duedate}></div>
}

export default ({ Days }) => {
    const classes = useStyles()
    return (
        <Grid className={classes.paper} container spacing={2} wrap='wrap'>
            {Days !== null
                ? Days.map((item, idx) => {
                      return (
                          <Grid className={classes.griditem} item key={idx.toString()}>
                              <Button className={classes.roundbutton} variant='outlined' size='small' color='primary'>
                                  <div className={classes.gridbody}>
                                      <Typography>{getDate(item)}</Typography>
                                      <div className={classes.badgeContainer}>
                                          <DueDate />
                                          <DueDate />
                                          <DueDate />
                                      </div>
                                  </div>
                              </Button>
                          </Grid>
                      )
                  })
                : null}
        </Grid>
    )
}
