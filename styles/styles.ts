import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({ // todo egésznek utánaolvasni, hogy kell jól csinálni
        searchPaper: {
            display: 'flex',
            alignItems: 'center',
            height: '3rem',
        },
        margin: {
            margin: theme.spacing(2),
        },
        padding: {
            padding: theme.spacing(2),
        },
        paper: {
            padding: theme.spacing(2),
            // textAlign: 'center',
            // color: theme.palette.text.secondary, // todo
            width: '60ch',
        },
        overflowEllipsis: {
            overflow: 'hidden',
            // maxHeight: '10rem',
            // whiteSpace: 'nowrap',
            // textOverflow: 'ellipsis',
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1, // todo
        },
        iconButton: {
            padding: 10,
        },
        searchBarSpinner: {
            marginRight: '0.9rem'
        }
    }),
);

export default useStyles;
