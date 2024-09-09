import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { backend } from 'declarations/backend';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
}));

type Appointment = {
  clientName: string;
  date: string;
  time: string;
  purpose: string;
};

const AppointmentsTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await backend.getAppointments();
        setAppointments(result);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to fetch appointments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom sx={{ p: 2 }}>Appointments</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Client Name</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            {!isMobile && <StyledTableCell>Time</StyledTableCell>}
            {!isMobile && <StyledTableCell>Purpose</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment, index) => (
            <TableRow key={index}>
              <TableCell>{appointment.clientName}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              {!isMobile && <TableCell>{appointment.time}</TableCell>}
              {!isMobile && <TableCell>{appointment.purpose}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="body2" sx={{ p: 2, textAlign: 'right' }}>
        <Link href="#" color="primary">View All Appointments</Link>
      </Typography>
    </TableContainer>
  );
};

export default AppointmentsTable;