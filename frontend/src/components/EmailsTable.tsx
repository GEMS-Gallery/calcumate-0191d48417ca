import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip, Link, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { backend } from 'declarations/backend';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
}));

type Email = {
  recipient: string;
  subject: string;
  sentTime: string;
  status: string;
};

const EmailsTable: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await backend.getEmails();
        setEmails(result);
      } catch (error) {
        console.error('Error fetching emails:', error);
        setError('Failed to fetch emails. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom sx={{ p: 2 }}>Sent Emails</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Recipient</StyledTableCell>
            {!isMobile && <StyledTableCell>Subject</StyledTableCell>}
            <StyledTableCell>Sent Time</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emails.map((email, index) => (
            <TableRow key={index}>
              <TableCell>{email.recipient}</TableCell>
              {!isMobile && <TableCell>{email.subject}</TableCell>}
              <TableCell>{email.sentTime}</TableCell>
              <TableCell>
                <Chip
                  label={email.status}
                  color={email.status === 'Delivered' ? 'success' : email.status === 'Opened' ? 'primary' : 'default'}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="body2" sx={{ p: 2, textAlign: 'right' }}>
        <Link href="#" color="primary">View All Emails</Link>
      </Typography>
    </TableContainer>
  );
};

export default EmailsTable;